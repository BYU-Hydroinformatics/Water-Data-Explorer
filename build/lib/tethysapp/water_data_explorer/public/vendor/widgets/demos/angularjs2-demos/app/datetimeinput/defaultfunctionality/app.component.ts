/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxDateTimeInputComponent} from '../../../../../jqwidgets-ts/angular_jqxdatetimeinput';

@Component({
    selector: 'my-app',
    template: `<label>Date Input</label>
                <angularDateTimeInput #dateInput></angularDateTimeInput><br />
                <label>Time Input</label>
                <angularDateTimeInput #timeInput></angularDateTimeInput><br />
                <label>Date Time Input</label>
                <angularDateTimeInput #dateTimeInput></angularDateTimeInput>`,
    directives: [jqxDateTimeInputComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild('dateInput') myDateInput: jqxDateTimeInputComponent;
    @ViewChild('timeInput') myTimeInput: jqxDateTimeInputComponent;
    @ViewChild('dateTimeInput') myDateTimeInput: jqxDateTimeInputComponent;

    dateInputSettings: jqwidgets.DateTimeInputOptions;
    timeInputSettings: jqwidgets.DateTimeInputOptions;
    dateTimeInputSettings: jqwidgets.DateTimeInputOptions;
    flag: Boolean = false;
    constructor() {        

        this.dateInputSettings = {
            width: '300px', height: '25px'
        }    
        this.timeInputSettings = {
            formatString: "T", showTimeButton: true, showCalendarButton: false, width: '300px', height: '25px'
        }  
        this.dateTimeInputSettings = {
            formatString: "F", showTimeButton: true, width: '300px', height: '25px'
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
        this.myDateInput.createWidget(this.dateInputSettings);
        this.myTimeInput.createWidget(this.timeInputSettings);
        this.myDateTimeInput.createWidget(this.dateTimeInputSettings);
    }
}
