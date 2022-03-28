/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxCheckBoxComponent} from '../../../../../jqwidgets-ts/angular_jqxcheckbox';

@Component({
    selector: 'my-app',
    templateUrl: `app/checkbox/defaultfunctionality/app.component.htm`,
    directives: [jqxCheckBoxComponent]
})

export class AppComponent implements AfterViewChecked { 
    @ViewChild('CheckBox1') CheckBox1: jqxCheckBoxComponent;
    @ViewChild('CheckBox2') CheckBox2: jqxCheckBoxComponent;
    @ViewChild('CheckBox3') CheckBox3: jqxCheckBoxComponent;
    @ViewChild('CheckBox4') CheckBox4: jqxCheckBoxComponent;
    @ViewChild('CheckBox5') CheckBox5: jqxCheckBoxComponent;
    @ViewChild('CheckBox6') CheckBox6: jqxCheckBoxComponent;
    @ViewChild('CheckBox7') CheckBox7: jqxCheckBoxComponent;
    @ViewChild('CheckBox8') CheckBox8: jqxCheckBoxComponent;
    @ViewChild('CheckBox9') CheckBox9: jqxCheckBoxComponent;
    @ViewChild('CheckBox10') CheckBox10: jqxCheckBoxComponent;
    @ViewChild('CheckBox11') CheckBox11: jqxCheckBoxComponent;
    @ViewChild('CheckBox12') CheckBox12: jqxCheckBoxComponent;
    @ViewChild('CheckBox13') CheckBox13: jqxCheckBoxComponent;

    settings: jqwidgets.CheckBoxOptions;
    flag: Boolean = false;
    constructor() {        

        this.settings = {
            width: 120, height: 25
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
        this.CheckBox1.createWidget(this.settings); 
        this.CheckBox2.createWidget(this.settings);     
        this.CheckBox3.createWidget(this.settings); 
        this.CheckBox4.createWidget(this.settings); 
        this.CheckBox5.createWidget(this.settings); 
        this.CheckBox6.createWidget(this.settings); 
        this.CheckBox7.createWidget(this.settings); 
        this.CheckBox8.createWidget(this.settings); 
        this.CheckBox9.createWidget(this.settings); 
        this.CheckBox10.createWidget(this.settings); 
        this.CheckBox11.createWidget(this.settings);
        this.CheckBox12.createWidget(this.settings); 
        this.CheckBox13.createWidget(this.settings); 

        this.CheckBox2.setOptions({ checked: true });  
        this.CheckBox10.setOptions({ checked: true }); 
        this.CheckBox11.setOptions({ checked: false });
        this.CheckBox12.setOptions({ hasThreeStates: true, checked: null });
        this.CheckBox13.setOptions({ disabled: true });
    }

    CheckBox10OnChange(event)
    {
        let checked = event.args.checked;
        if (checked)
        {
            (<HTMLElement>document.getElementsByTagName('angularCheckBox')[9].childNodes[0].childNodes.item(2)).innerHTML = 'Checked';
        }
        else
        {
            (<HTMLElement>document.getElementsByTagName('angularCheckBox')[9].childNodes[0].childNodes.item(2)).innerHTML = 'Unchecked';
        }
    }
    CheckBox11OnChange(event)
    {
        let checked = event.args.checked;
        if (checked)
        {
            (<HTMLElement>document.getElementsByTagName('angularCheckBox')[10].childNodes[0].childNodes.item(2)).innerHTML = 'Checked';
        }
        else
        {
            (<HTMLElement>document.getElementsByTagName('angularCheckBox')[10].childNodes[0].childNodes.item(2)).innerHTML = 'Unchecked';
        }
    }
    CheckBox12OnChange(event)
    {
        let checked = event.args.checked;
        if (checked)
        {
            (<HTMLElement>document.getElementsByTagName('angularCheckBox')[11].childNodes[0].childNodes.item(2)).innerHTML = 'Checked';
        }
        else if (false == checked)
        {
            (<HTMLElement>document.getElementsByTagName('angularCheckBox')[11].childNodes[0].childNodes.item(2)).innerHTML = 'Unchecked';
        }
        else
        {
            (<HTMLElement>document.getElementsByTagName('angularCheckBox')[11].childNodes[0].childNodes.item(2)).innerHTML = 'Indeterminate';
        }
    }
}
