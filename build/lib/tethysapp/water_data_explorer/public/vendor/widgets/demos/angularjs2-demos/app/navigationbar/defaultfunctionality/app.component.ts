/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxNavigationBarComponent } from '../../../../../jqwidgets-ts/angular_jqxnavigationbar';

@Component({
    selector: 'my-app',
    templateUrl: 'app/navigationbar/defaultfunctionality/app.component.htm',
    directives: [jqxNavigationBarComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxNavigationBarComponent) myNavigationBar: jqxNavigationBarComponent;

    settings: jqwidgets.NavigationBarOptions;
    flag: Boolean = false;

    constructor()
    {       
        this.settings = {
            width: 400, height: 460
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
        this.myNavigationBar.createWidget(this.settings);
    }
}