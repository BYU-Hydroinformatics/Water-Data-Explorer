/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxExpanderComponent} from '../../../../../jqwidgets-ts/angular_jqxexpander';

@Component({
    selector: 'my-app',
    templateUrl: `app/expander/defaultfunctionality/app.component.htm`,
    directives: [jqxExpanderComponent]
})

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxExpanderComponent) myExpander: jqxExpanderComponent;

    settings: jqwidgets.ExpanderOptions;
    flag: Boolean = false;
    constructor() {        

        this.settings = {
            width: '350px'
            
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
        this.myExpander.createWidget(this.settings); 
    }
}
