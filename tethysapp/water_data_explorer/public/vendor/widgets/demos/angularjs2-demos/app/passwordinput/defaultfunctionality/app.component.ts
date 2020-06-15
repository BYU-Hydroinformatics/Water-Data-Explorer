/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxPasswordInputComponent } from '../../../../../jqwidgets-ts/angular_jqxpasswordinput';
import { jqxExpanderComponent } from '../../../../../jqwidgets-ts/angular_jqxexpander';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';
import { jqxValidatorComponent } from '../../../../../jqwidgets-ts/angular_jqxvalidator';
import { jqxInputComponent } from '../../../../../jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from '../../../../../jqwidgets-ts/angular_jqxdropdownlist';

@Component({
    selector: 'my-app',
    templateUrl: 'app/passwordinput/defaultfunctionality/app.component.htm',
    directives: [jqxPasswordInputComponent, jqxExpanderComponent, jqxButtonComponent, jqxValidatorComponent, jqxInputComponent, jqxDropDownListComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild('expanderAng') expander: jqxExpanderComponent;
    @ViewChild('firstName') firstNameInput: jqxInputComponent;
    @ViewChild('lastName') lastNameInput: jqxInputComponent;
    @ViewChild('userName') userNameInput: jqxInputComponent;
    @ViewChild('password') passwordInput: jqxPasswordInputComponent;
    @ViewChild('passwordConfirm') passwordConfirmInput: jqxPasswordInputComponent;
    @ViewChild('submit') submit: jqxButtonComponent;

    flag: Boolean = false;
    expanderSettings: jqwidgets.ExpanderOptions;
    buttonsSettings: jqwidgets.ButtonOptions;
    inputSettings: jqwidgets.InputOptions;
    passwordInputSettings: jqwidgets.PasswordInputOptions;
    passwordConfirmInputSettings: jqwidgets.PasswordInputOptions;

    constructor() {


    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            var self = this;
            self.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void {
        let that = this;
        this.expander.createWidget({
            toggleMode: 'none',
            width: '350px',
            showArrow: false, initContent() {
                let inputSettings = { width: '300px', height: '20px' };
                let passwordInputSettings = { width: '300px', height: '20px', showStrength: true, showStrengthPosition: "right" };
                let passwordConfirmInputSettings = { width: '300px', height: '20px' };
                that.firstNameInput.createWidget(inputSettings);
                that.lastNameInput.createWidget(inputSettings);
                that.userNameInput.createWidget(inputSettings);
                that.passwordInput.createWidget(passwordInputSettings);
                that.passwordConfirmInput.createWidget(passwordConfirmInputSettings);
                that.submit.createWidget({});
            }
        });
    }

    ButtonClicked(): void {
        alert("Submitting Data");
    } 
}