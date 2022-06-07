/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import {jqxButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxbutton';
import {jqxInputComponent} from '../../../../../jqwidgets-ts/angular_jqxinput';
import {jqxValidatorComponent} from '../../../../../jqwidgets-ts/angular_jqxvalidator'; 

@Component({
    selector: 'my-app',
    templateUrl: 'app/validator/defaultfunctionality/app.component.htm',
    styleUrls: ['app/validator/defaultfunctionality/app.component.css'],
    directives: [jqxButtonComponent, jqxValidatorComponent, jqxInputComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked {
    @ViewChild('userInput') userInput: jqxInputComponent;
    @ViewChild('emailInput') emailInput: jqxInputComponent;
    @ViewChild('button') button: jqxButtonComponent;
    @ViewChild(jqxValidatorComponent) validator: jqxValidatorComponent;

    inputSettings: jqwidgets.InputOptions;
    validatorSettings: jqwidgets.ValidatorOptions;

    flag: Boolean = false;

    constructor() {
        
        this.validatorSettings = {
            rules: [
                {
                    input: '#userInput',
                    message: 'Username is required!',
                    action: 'keyup, blur, change',
                    rule: 'required'
                },
            
                {
                    input: '#emailInput',
                    message: 'E-mail is required!',
                    action: 'keyup, blur, change',
                    rule: 'required'
                }
             ]
        }
    }

    OnSend() {
        this.validator.validate(<HTMLElement>document.getElementById('testForm'));
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void {
        this.button.createWidget({});
        this.userInput.createWidget(this.inputSettings);
        this.emailInput.createWidget(this.inputSettings);
        this.validator.createWidget(this.validatorSettings);
    }
}
