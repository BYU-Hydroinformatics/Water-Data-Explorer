/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxListMenuComponent } from '../../../../../jqwidgets-ts/angular_jqxlistmenu';

@Component({
    selector: 'my-app',
    styles: [
        `#list img
        {
            width: 50px;
            height: 55px;
        }`,
        `#list div
        {
            margin-top: -35px;
            margin-left: 80px;
        }`,
        `.jqx-listmenu-item
        {
            padding: 0px;
            min-height: 57px;
        }`
    ],
    templateUrl: 'app/listmenu/defaultfunctionality/app.component.htm',
    directives: [jqxListMenuComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxListMenuComponent) myListMenu: jqxListMenuComponent;

    settings: jqwidgets.ListMenuOptions;
    flag: Boolean = false;

    constructor()
    {
        this.settings = {
            autoSeparators: true, enableScrolling: false, showHeader: true, width: '600px', placeHolder: 'Find contact...'
        };
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
        this.myListMenu.createWidget(this.settings);
    }
}