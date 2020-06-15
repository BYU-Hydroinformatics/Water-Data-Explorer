/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxCalendarComponent} from '../../../../../jqwidgets-ts/angular_jqxcalendar';

@Component({
    selector: 'my-app',
    template: `<angularCalendar></angularCalendar>`,
    directives: [jqxCalendarComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxCalendarComponent) myCalendar: jqxCalendarComponent;

    settings: jqwidgets.CalendarOptions;
    flag: Boolean = false;
    constructor() {        

        this.settings = {
            width: 220,
            height: 220
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
        this.myCalendar.createWidget(this.settings);
    }
}
