/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxNumberInputComponent } from '../../../../../jqwidgets-ts/angular_jqxnumberinput';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    templateUrl: 'app/numberinput/defaultfunctionality/app.component.htm',
    directives: [jqxNumberInputComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild('numericInput') numericInput: jqxNumberInputComponent;
    @ViewChild('percentageInput') percentageInput: jqxNumberInputComponent;
    @ViewChild('currencyInput') currencyInput: jqxNumberInputComponent;
    @ViewChild('disabledInput') disabledInput: jqxNumberInputComponent;

    numericInputSettings: jqwidgets.NumberInputOptions;
    percentageInputSettings: jqwidgets.NumberInputOptions;
    currencyInputSettings: jqwidgets.NumberInputOptions;
    disabledInputSettings: jqwidgets.NumberInputOptions;

    buttonsSettings: jqwidgets.ButtonOptions;
    flag: Boolean = false;

    constructor()
    {
        var self = this;

        this.numericInputSettings = { width: '250px', height: '25px', spinButtons: true };
        this.percentageInputSettings = { width: '250px', height: '25px', digits: 3, symbolPosition: 'right', symbol: '%', spinButtons: true };
        this.currencyInputSettings = { width: '250px', height: '25px', symbol: '$', spinButtons: true };
        this.disabledInputSettings = { width: 250, height: 25, disabled: true, spinButtons: true };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.numericInput.createWidget(this.numericInputSettings);
        this.percentageInput.createWidget(this.percentageInputSettings);
        this.currencyInput.createWidget(this.currencyInputSettings);
        this.disabledInput.createWidget(this.disabledInputSettings);
    }
}