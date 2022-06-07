/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxTabsComponent} from '../../../../../jqwidgets-ts/angular_jqxtabs';
import { jqxCheckBoxComponent } from '../../../../../jqwidgets-ts/angular_jqxcheckbox';


@Component({
    selector: 'my-app',
    templateUrl: 'app/tabs/defaultfunctionality/app.component.htm',
    directives: [jqxTabsComponent, jqxCheckBoxComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxTabsComponent) tabs: jqxTabsComponent;
    @ViewChild('animation') checkBox: jqxCheckBoxComponent;
    @ViewChild('contentAnimation') checkBox2: jqxCheckBoxComponent;

    tabsSettings: jqwidgets.TabsOptions;
    checkBoxSettings: jqwidgets.CheckBoxOptions;
    flag: Boolean = false;
    collapsed: Boolean;
    opened: Boolean;

    constructor() {

        this.tabsSettings = {
            width: '90%',
            height: 200,
            position: 'top',
            selectionTracker: false,
            animationType: 'none'
        };
        this.checkBoxSettings = {
            //theme: theme
        };
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            (<HTMLElement>document.getElementById('animation').firstElementChild).style.marginTop = '10px';
            (<HTMLElement>document.getElementById('contentAnimation').firstElementChild).style.marginTop = '10px';
            this.Initialize();
        }
        this.flag = true;
    }

    OnChangeAnimation(event) {
        var checked = event.args.checked;
        if (checked) {
            this.tabsSettings['selectionTracker'] = checked;
            this.tabs.setOptions(this.tabsSettings);
        }
        else {
            this.tabsSettings['selectionTracker'] = checked;
            this.tabs.setOptions(this.tabsSettings);
        }
    }

    OnChangeContentAnimation(event) {
        var checked = event.args.checked;
        if (checked) {
            this.tabs.setOptions({ animationType: 'fade'});
        } 
        else {
            this.tabs.setOptions({ animationType: 'none'});
        }
    }
    
    Initialize(): void {
        this.tabs.createWidget(this.tabsSettings);
        this.checkBox.createWidget(this.checkBoxSettings);
        this.checkBox2.createWidget(this.checkBoxSettings);
    }
}
