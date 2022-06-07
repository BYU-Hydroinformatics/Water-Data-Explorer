/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxButtonGroupComponent} from '../../../../../jqwidgets-ts/angular_jqxbuttongroup';
import {jqxRadioButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxradiobutton';

@Component({
    selector: 'my-app',
    template: `<angularButtonGroup (OnButtonClick)="ButtonGroupOnClick($event)">
                    <button style="padding:4px 16px;" id="Left">Left</button>
                    <button style="padding:4px 16px;" id= "Center">Center</button>
                    <button style= "padding:4px 16px;" id= "Right">Right</button>
                </angularButtonGroup>
                <h4>Modes</h4>
                <angularRadioButton (OnChecked)="DefaltModeSelected($event)" #DefaultMode>Default</angularRadioButton>
                <angularRadioButton (OnChecked)="RadioModeSelected($event)" #RadioMode>RadioButtons</angularRadioButton>
                <angularRadioButton (OnChecked)="CheckBoxModeSelected($event)" #CheckBoxMode>CheckBoxes</angularRadioButton>   
                <div id="log" style="margin-top: 10px;"></div>`,
    directives: [jqxButtonGroupComponent, jqxRadioButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxButtonGroupComponent) myButtonGroup: jqxButtonGroupComponent;
    @ViewChild('DefaultMode') myDefaultModeRadioButton: jqxRadioButtonComponent;
    @ViewChild('RadioMode') myRadioModeRadioButton: jqxRadioButtonComponent;
    @ViewChild('CheckBoxMode') myCheckBoxModeRadioButton: jqxRadioButtonComponent;

    settings: jqwidgets.ButtonGroupOptions;
    flag: Boolean = false;
    constructor()
    {

        this.settings = {
            mode: 'default',
            width: '300px'
        }
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
        this.myButtonGroup.createWidget(this.settings);
        this.myDefaultModeRadioButton.createWidget({});
        this.myRadioModeRadioButton.createWidget({});
        this.myCheckBoxModeRadioButton.createWidget({});
        this.myDefaultModeRadioButton.check();
    }
    DefaltModeSelected(): void
    {
        this.myButtonGroup.setOptions({ mode: 'default' });
    }
    CheckBoxModeSelected(): void
    {
        this.myButtonGroup.setOptions({ mode: 'checkbox' });
    }
    RadioModeSelected(): void
    {
        this.myButtonGroup.setOptions({ mode: 'radio' });
    }
    ButtonGroupOnClick(event): void
    {
        var clickedButton = event.args.button;
        (<HTMLElement>document.getElementById("log")).innerHTML = "Clicked: " + clickedButton[0].id;
    }
}
