/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxNavBarComponent } from '../../../../../jqwidgets-ts/angular_jqxnavbar';

@Component({
    selector: 'my-app',
    templateUrl: 'app/navbar/defaultfunctionality/app.component.htm',
    directives: [jqxNavBarComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild('firstNavBar') navbar1: jqxNavBarComponent;
    @ViewChild('secondNavBar') navbar2: jqxNavBarComponent;
    @ViewChild('thirdNavBar') navbar3: jqxNavBarComponent;
    @ViewChild('fourthNavBar') navbar4: jqxNavBarComponent;
    @ViewChild('fifthNavBar') navbar5: jqxNavBarComponent;
    @ViewChild('sixthNavBar') navbar6: jqxNavBarComponent;

    settings: jqwidgets.NavBarOptions;
    fifthNavBarSettings: jqwidgets.NavBarOptions;
    sixthNavBarSettings: jqwidgets.NavBarOptions;
    flag: Boolean = false;

    constructor()
    {       
        this.settings = {
            height: 40, selectedItem: 0
        };

        this.fifthNavBarSettings = {
            height: 160, selectedItem: 0
        };

        this.sixthNavBarSettings = {
            height: 40, columns: ['30%', '50%', '20%'], selectedItem: 0
        };
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
        this.navbar1.createWidget(this.settings);
        this.navbar2.createWidget(this.settings);
        this.navbar3.createWidget(this.settings);
        this.navbar4.createWidget(this.settings);
        this.navbar5.createWidget(this.fifthNavBarSettings);
        this.navbar6.createWidget(this.sixthNavBarSettings);
    }
}