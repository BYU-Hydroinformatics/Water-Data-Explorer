/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxComplexInputComponent} from '../../../../../jqwidgets-ts/angular_jqxcomplexinput';
import {jqxButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    template: `<angularComplexInput></angularComplexInput>
               <div style="margin-top: 20px;">
                   <angularButton #getReal (OnClick)="GetReal($event)" style="display:inline-block">Get real part</angularButton>
                   <angularButton #getImaginary (OnClick)="GetImaginary($event)" style="display:inline-block">Get imaginary part</angularButton>
               </div>`,
    directives: [jqxComplexInputComponent, jqxButtonComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxComplexInputComponent) myComplexInput: jqxComplexInputComponent;
    @ViewChild('getReal') getRealButton: jqxButtonComponent;
    @ViewChild('getImaginary') getImaginaryButton: jqxButtonComponent;

    complexInputSettings: jqwidgets.ComplexInputOptions;
    ButtonsSettings: jqwidgets.ButtonOptions;
    flag: Boolean = false;
    constructor() {        

        this.complexInputSettings = {
            width: 250,
            height: 25,
            value: "15 + 7.2i"
        }   
        this.ButtonsSettings = {
            width: 150
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
    
    Initialize() : void
    {
        this.myComplexInput.createWidget(this.complexInputSettings);
        this.getRealButton.createWidget(this.ButtonsSettings);
        this.getImaginaryButton.createWidget(this.ButtonsSettings);

    }

    GetReal()
    {
        var realPart = this.myComplexInput.getReal();
        alert("Real part is " + realPart);
    };

    GetImaginary()
    {
        var imaginaryPart = this.myComplexInput.getImaginary();
        alert("Imaginary part is " + imaginaryPart);
    };
}
