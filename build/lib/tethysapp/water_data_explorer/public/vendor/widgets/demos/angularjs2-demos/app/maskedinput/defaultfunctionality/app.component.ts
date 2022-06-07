/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxMaskedInputComponent } from '../../../../../jqwidgets-ts/angular_jqxmaskedinput';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    template: `<div id='jqxWidgets'>
                        <div style='margin-top: 10px;'>Numeric</div>
                        <angularMaskedInput #numericInput></angularMaskedInput>
                        <div style='margin-top: 10px;'>Zip Code</div>
                        <angularMaskedInput #zipCodeInput></angularMaskedInput>
                        <div style='margin-top: 10px;'>SSN</div>
                        <angularMaskedInput #ssnInput></angularMaskedInput>
                        <div style='margin-top: 10px;'>Phone Number</div>
                        <angularMaskedInput #phoneInput></angularMaskedInput>
                        <div style='margin-top: 10px;'>IP Address (ex: 255.255.255.255)</div>
                        <angularMaskedInput #regexInput></angularMaskedInput>
                        <div style='margin-top: 10px;'>Disabled</div>
                        <angularMaskedInput #disabledInput></angularMaskedInput>
                        <angularButton style="display: inline-block;" #clearButton (OnClick) = "Clear($event)">Clear</angularButton>
                    </div>`,
    directives: [jqxMaskedInputComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild('numericInput') myNumericInput: jqxMaskedInputComponent;
    @ViewChild('zipCodeInput') myZipCodeInput: jqxMaskedInputComponent;
    @ViewChild('ssnInput') mySsnInput: jqxMaskedInputComponent;
    @ViewChild('phoneInput') myPhoneInput: jqxMaskedInputComponent;
    @ViewChild('regexInput') myRegexInput: jqxMaskedInputComponent;
    @ViewChild('disabledInput') myDisabledInput: jqxMaskedInputComponent;
    @ViewChild('clearButton') clear: jqxButtonComponent;

    numericInputSettings: jqwidgets.MaskedInputOptions;
    zipCodeInputSettings: jqwidgets.MaskedInputOptions;
    ssnInputSettings: jqwidgets.MaskedInputOptions;
    phoneInputSettings: jqwidgets.MaskedInputOptions;
    regexInputSettings: jqwidgets.MaskedInputOptions;
    disabledInputSettings: jqwidgets.MaskedInputOptions;
    clearButtonSettings: jqwidgets.ButtonOptions;
    flag: Boolean = false;

    constructor()
    {
        this.numericInputSettings = { width: '250px', height: '25px' };
        this.zipCodeInputSettings = { width: 250, height: 25, mask: '#####-####' };
        this.ssnInputSettings = { width: 250, height: 25, mask: '###-##-####' };
        this.phoneInputSettings = { width: 250, height: 25, mask: '(###)###-####' };
        this.regexInputSettings = { width: 250, height: 25, mask: '[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5]' };
        this.disabledInputSettings = { width: 250, height: 25, disabled: true };
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
        this.myNumericInput.createWidget(this.numericInputSettings);
        this.myZipCodeInput.createWidget(this.zipCodeInputSettings);
        this.mySsnInput.createWidget(this.ssnInputSettings);
        this.myPhoneInput.createWidget(this.phoneInputSettings);
        this.myRegexInput.createWidget(this.regexInputSettings);
        this.myDisabledInput.createWidget(this.disabledInputSettings);
        this.clear.createWidget({});
    }

    Clear(event): void
    {
        this.myNumericInput.clear();
        this.myZipCodeInput.clear();
        this.mySsnInput.clear();
        this.myPhoneInput.clear();
        this.myRegexInput.clear();
        this.myDisabledInput.clear();
    }
}