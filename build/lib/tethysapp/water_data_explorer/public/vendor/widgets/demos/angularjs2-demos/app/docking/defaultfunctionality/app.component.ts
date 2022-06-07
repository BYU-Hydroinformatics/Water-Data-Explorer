/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {jqxDockingComponent} from '../../../../../jqwidgets-ts/angular_jqxdocking';
import {jqxCalendarComponent} from '../../../../../jqwidgets-ts/angular_jqxcalendar';
import {jqxTabsComponent} from '../../../../../jqwidgets-ts/angular_jqxtabs';
import {jqxListBoxComponent} from '../../../../../jqwidgets-ts/angular_jqxlistbox';
import {jqxPanelComponent} from '../../../../../jqwidgets-ts/angular_jqxpanel';

@Component({
    selector: 'my-app',
    templateUrl: `app/docking/defaultfunctionality/app.component.htm`,
    directives: [jqxDockingComponent, jqxCalendarComponent, jqxTabsComponent, jqxListBoxComponent, jqxPanelComponent]
})

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxDockingComponent) myDocking: jqxDockingComponent;
    @ViewChild(jqxCalendarComponent) myCalendar: jqxCalendarComponent;
    @ViewChild(jqxTabsComponent) myTabs: jqxTabsComponent;
    @ViewChild(jqxListBoxComponent) myListBox: jqxListBoxComponent;
    @ViewChild(jqxPanelComponent) myPanel: jqxPanelComponent;

    DockingSettings: jqwidgets.DockingOptions;
    CalendarSettings: jqwidgets.CalendarOptions;
    TabsSettings: jqwidgets.TabsOptions;
    ListBoxSettings: jqwidgets.ListBoxOptions;
    PanelSettings: jqwidgets.PanelOptions;

    source = [
        'JavaScript Certification - Welcome to our network',
        'Business Challenges via Web take a part',
        'jQWidgets better web, less time. Take a tour',
        'Facebook - you have 7 new notifications',
        'Twitter - John Doe is following you. Look at his profile',
        'New videos, take a look at YouTube.com'
    ];

    flag: Boolean = false;
    constructor() {        

        this.DockingSettings = {
            orientation: 'horizontal', width: 800, mode: 'docked'
        } 
        this.CalendarSettings = {
            width: 180, height: 180
        } 
        this.TabsSettings = {
            width: 375, height: 181, selectedItem: 1
        } 
        this.ListBoxSettings = {
            source: this.source, width: 375, height: 181
        } 
        this.PanelSettings = {
            width: 375, height: 180 
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
        this.myDocking.createWidget(this.DockingSettings);
        this.myCalendar.createWidget(this.CalendarSettings);
        this.myTabs.createWidget(this.TabsSettings);
        this.myListBox.createWidget(this.ListBoxSettings);
        this.myPanel.createWidget(this.PanelSettings); 

        this.myDocking.disableWindowResize('window1');
        this.myDocking.disableWindowResize('window2');
        this.myDocking.disableWindowResize('window3');
        this.myDocking.disableWindowResize('window4');
    }
}
