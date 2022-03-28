/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxProgressBarComponent } from '../../../../../jqwidgets-ts/angular_jqxprogressbar';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';
import { jqxCheckBoxComponent } from '../../../../../jqwidgets-ts/angular_jqxcheckbox';

@Component({
    selector: 'my-app',
    templateUrl: 'app/progressbar/defaultfunctionality/app.component.htm',
    directives: [jqxProgressBarComponent, jqxButtonComponent, jqxCheckBoxComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild('horizontal') myHorizontalProgressBar: jqxProgressBarComponent;
    @ViewChild('vertical') myVerticalProgressBar: jqxProgressBarComponent;
    @ViewChild(jqxButtonComponent) button: jqxButtonComponent;
    @ViewChild('checkbox') checkbox: jqxCheckBoxComponent;
    @ViewChild('customtextcheckbox') customtextcheckbox: jqxCheckBoxComponent;

    flag: Boolean = false;
    horizontalProgressBarSettings: jqwidgets.ProgressBarOptions;
    verticalProgressBarSettings: jqwidgets.ProgressBarOptions;
    buttonsSettings: jqwidgets.ButtonOptions;
    checkBoxSettings: jqwidgets.CheckBoxOptions;
    valueInput: number;
    isUpdated: boolean = false;

    constructor()
    {
        this.horizontalProgressBarSettings = {
            width: 250,
            height: 30,
            value: 50
        };

        this.verticalProgressBarSettings = {
            width: 30,
            height: 250,
            value: 50,
            orientation: 'vertical'
        };

        this.buttonsSettings = {};
        this.checkBoxSettings = {};
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            var self = this;
            self.Initialize();
            (<HTMLElement>document.getElementsByTagName('angularButton')[0].firstElementChild).style.display = 'inline-block';
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myHorizontalProgressBar.createWidget(this.horizontalProgressBarSettings);
        this.myVerticalProgressBar.createWidget(this.verticalProgressBarSettings);
        this.button.createWidget(this.buttonsSettings);
        this.checkbox.createWidget(this.checkBoxSettings);
        this.customtextcheckbox.createWidget(this.checkBoxSettings);
    }

    renderText = function (text)
    {
        return "<span class='jqx-rc-all' style='background: #ffe8a6; color: #e53d37; font-style: italic;'>" + text + "</span>";
    }

    getValueInput = function ()
    {
        return parseInt((<any>document.getElementById('ValueInput')).value);
    }

    OnClick(): void
    {
        var value = this.getValueInput();
        if (!isNaN(value))
        {
            this.valueInput = value;
            this.myHorizontalProgressBar.val(value);
            this.myVerticalProgressBar.val(value);
            this.isUpdated = true;
        }
    }

    OnCheckbox(event): void
    {
        var value = this.getValueInput();
        if (value != null && this.isUpdated)
        {
            this.horizontalProgressBarSettings.value = this.valueInput;
            this.verticalProgressBarSettings.value = this.valueInput;
        }

        var isChecked = event.args.checked;
        this.horizontalProgressBarSettings.showText = isChecked;
        this.myHorizontalProgressBar.setOptions(this.horizontalProgressBarSettings);
        this.verticalProgressBarSettings.showText = isChecked;
        this.myVerticalProgressBar.setOptions(this.verticalProgressBarSettings);
    }

    OnCustomtextcheckbox(event): void
    {
        var value = this.getValueInput();
        if (value != null && this.isUpdated)
        {
            this.horizontalProgressBarSettings.value = this.valueInput;
            this.verticalProgressBarSettings.value = this.valueInput;
        }

        if (event.args.checked)
        {
            this.horizontalProgressBarSettings.renderText = this.renderText;
            this.myHorizontalProgressBar.setOptions(this.horizontalProgressBarSettings);
            this.verticalProgressBarSettings.renderText = this.renderText;
            this.myVerticalProgressBar.setOptions(this.verticalProgressBarSettings);
        }
        else
        {
            this.horizontalProgressBarSettings.renderText = null;
            this.myHorizontalProgressBar.setOptions(this.horizontalProgressBarSettings);
            this.verticalProgressBarSettings.renderText = null;
            this.myVerticalProgressBar.setOptions(this.verticalProgressBarSettings);
        }
    }
}