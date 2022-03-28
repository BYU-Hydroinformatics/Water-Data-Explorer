/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxRangeSelectorComponent } from '../../../../../jqwidgets-ts/angular_jqxrangeselector';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    templateUrl: 'app/rangeselector/defaultfunctionality/app.component.htm',
    styles: [
        `angularButton {
            float: left;            
        }`,
        `angularButton:last-child {
            margin-left: 10px;           
        }`
    ],
    directives: [jqxRangeSelectorComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxRangeSelectorComponent) myRangeSelector: jqxRangeSelectorComponent;
    @ViewChild('getButton') getButton: jqxButtonComponent;
    @ViewChild('setButton') setButton: jqxButtonComponent;

    flag: Boolean = false;
    settings: jqwidgets.RangeSelectorOptions;
    getButtonSettings: jqwidgets.ButtonOptions;
    setButtonSettings: jqwidgets.ButtonOptions;

    constructor()
    {
        this.settings = {
            width: 750,
            height: 100,
            min: 0,
            max: 200,
            range: { from: 10, to: 50 },
            majorTicksInterval: 10,
            minorTicksInterval: 1 
        };

        this.setButtonSettings = {};
        this.getButtonSettings = this.setButtonSettings;
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            var self = this;
            self.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myRangeSelector.createWidget(this.settings);
        this.setButton.createWidget(this.setButtonSettings);
        this.getButton.createWidget(this.getButtonSettings);
    }

    OnClickGet(): void
    {
        var range = this.myRangeSelector.getRange();
        alert("The selected range is from " + range.from + " to " + range.to);
    }

    OnClickSet(): void
    {
        this.myRangeSelector.setRange(30, 70);
    }
}