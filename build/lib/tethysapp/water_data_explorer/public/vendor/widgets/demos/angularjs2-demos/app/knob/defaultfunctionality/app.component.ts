/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxKnobComponent } from '../../../../../jqwidgets-ts/angular_jqxknob';
import { jqxNumberInputComponent } from '../../../../../jqwidgets-ts/angular_jqxnumberinput';

@Component({
    selector: 'my-app',
    template: `<div id='jqxWidgets'> 
                        <angularKnob (OnChange)="OnChange($event)"></angularKnob>
                        <div class="inputField">
                            <angularNumberInput id="numberInput" (mousedown)="OnMouseDown($event)" (keyup)="OnKeyup()" (OnValueChanged)="OnValueChanged()"></angularNumberInput>
                        </div>
                   </div>`,
    styleUrls: ['app/knob/defaultfunctionality/app.component.css'],
    directives: [jqxKnobComponent, jqxNumberInputComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxKnobComponent) myKnob: jqxKnobComponent;
    @ViewChild(jqxNumberInputComponent) numberInput: jqxNumberInputComponent;

    settings: jqwidgets.KnobOptions;
    numberInputSettings: jqwidgets.NumberInputOptions;
    flag: Boolean = false;

    constructor()
    {

        this.settings = {
            value: 60,
            min: 0,
            max: 100,
            startAngle: 120,
            endAngle: 420,
            snapToStep: true,
            rotation: 'clockwise',
            style: {
                stroke: '#dfe3e9', strokeWidth: 3,
                fill: { color: '#fefefe', gradientType: "linear", gradientStops: [[0, 1], [50, 0.9], [100, 1]] }
            },
            marks: {
                colorRemaining: { color: 'grey', border: 'grey' },
                colorProgress: { color: '#00a4e1', border: '#00a4e1' },
                type: 'line',
                offset: '71%',
                thickness: 3,
                size: '6%',
                majorSize: '9%',
                majorInterval: 10,
                minorInterval: 2
            },
            labels: {
                offset: '88%',
                step: 10,
                visible: true
            },
            progressBar: {
                style: { fill: '#00a4e1', stroke: 'grey' },
                size: '9%',
                offset: '60%',
                background: { fill: 'grey', stroke: 'grey' }
            },
            pointer: { type: 'arrow', style: { fill: '#00a4e1', stroke: 'grey' }, size: '59%', offset: '49%', thickness: 20 }
        };

        this.numberInputSettings = {
            width: 60,
            height: '40px',
            decimal: 60, // starting value same as widget
            min: 0, // same as widget
            max: 100, // same as widget
            textAlign: 'center',
            decimalDigits: 1,
            inputMode: 'simple'
        };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
            (<HTMLElement>document.getElementById('numberInput').firstElementChild).style.border = 'none';
            (<HTMLElement>document.getElementById('numberInput').firstElementChild).style.backgroundColor = 'transparent';
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myKnob.createWidget(this.settings);
        this.numberInput.createWidget(this.numberInputSettings);
    }

    OnMouseDown(): void
    {
        event.stopPropagation();
    }

    OnKeyup(): void
    {
        var val = this.numberInput.val();
        this.myKnob.val(val);
    }

    OnChange(event): void
    {
        if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') { return; }
        this.numberInput.val(event.args.value);
    }

    OnValueChanged(): void
    {
        var val = this.numberInput.val();
        this.myKnob.val(val);
    }
}