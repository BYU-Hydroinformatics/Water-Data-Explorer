/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxPanelComponent } from '../../../../../jqwidgets-ts/angular_jqxpanel';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    templateUrl: 'app/panel/defaultfunctionality/app.component.htm',
    directives: [jqxPanelComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxPanelComponent) myPanel: jqxPanelComponent;

    settings: jqwidgets.PanelOptions;
    flag: Boolean = false;

    constructor()
    {
        var self = this;

        this.settings = { width: 350, height: 350 };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myPanel.createWidget(this.settings);
    }
}