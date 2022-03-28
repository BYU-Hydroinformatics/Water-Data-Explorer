/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxGridComponent } from '../../../../../jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    templateUrl: 'app/grid/grouping/app.component.htm',
    directives: [jqxGridComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxGridComponent) myGrid: jqxGridComponent;
    @ViewChild('ExpandGroup') ExpandGroupButton: jqxButtonComponent;
    @ViewChild('CollapseGroup') CollapseGroupButton: jqxButtonComponent;
    @ViewChild('ExpandAllGroup') ExpandAllGroupButton: jqxButtonComponent;
    @ViewChild('CollapseAllGroup') CollapseAllGroupButton: jqxButtonComponent;

    settings: jqwidgets.GridOptions;
    flag: Boolean = false;
    buttonsSettings: jqwidgets.ButtonOptions;
    url = "../sampledata/customers.xml";
    source =
    {
        datatype: "xml",
        datafields: [
            { name: 'CompanyName', map: 'm\\:properties>d\\:CompanyName', type: 'string' },
            { name: 'ContactName', map: 'm\\:properties>d\\:ContactName', type: 'string' },
            { name: 'ContactTitle', map: 'm\\:properties>d\\:ContactTitle', type: 'string' },
            { name: 'City', map: 'm\\:properties>d\\:City', type: 'string' },
            { name: 'PostalCode', map: 'm\\:properties>d\\:PostalCode', type: 'string' },
            { name: 'Country', map: 'm\\:properties>d\\:Country', type: 'string' }
        ],
        root: "entry",
        record: "content",
        id: 'm\\:properties>d\\:CustomerID',
        url: this.url
    };
    dataAdapter = new $.jqx.dataAdapter(this.source);

    constructor()
    {
        this.settings = {
            width: 850,
            groupable: true,
            columns: [
                { text: 'Company Name', datafield: 'CompanyName', width: 250 },
                { text: 'City', datafield: 'City', width: 120 },
                { text: 'Country', datafield: 'Country' }
            ],
            source: this.dataAdapter,
            groups: ['City']
        };

        this.buttonsSettings = {};
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
        this.myGrid.createWidget(this.settings);
        this.ExpandGroupButton.createWidget(this.buttonsSettings);
        this.CollapseGroupButton.createWidget(this.buttonsSettings);
        this.ExpandAllGroupButton.createWidget(this.buttonsSettings);
        this.CollapseAllGroupButton.createWidget(this.buttonsSettings);
    }

    OnExpandGroup(): void
    {
        var inputDom = <any>document.getElementById('groupnum');
        var groupnum = inputDom.value;
        if (!isNaN(groupnum))
        {
            this.myGrid.expandgroup(groupnum);
        }
    }

    OnCollapseGroup(): void
    {
        var inputDom = <any>document.getElementById('groupnum');
        var groupnum = inputDom.value;
        if (!isNaN(groupnum))
        {
            this.myGrid.collapsegroup(groupnum);
        }
    }

    OnExpandAllGroup(): void
    {
        this.myGrid.expandallgroups();
    }

    OnCollapseAllGroup(): void
    {
        this.myGrid.collapseallgroups();
    }

    OnGroupexpand(event): void
    {
        var args = event.args;
        var expandedgroupLog = document.getElementById('expandedgroup');
        expandedgroupLog.innerText = "Group: " + args.group + ", Level: " + args.level;
    }

    OnGroupcollapse(event): void
    {
        var args = event.args;
        var collapsedgroupLog = document.getElementById('collapsedgroup');
        collapsedgroupLog.innerText = "Group: " + args.group + ", Level: " + args.level;
    }
}