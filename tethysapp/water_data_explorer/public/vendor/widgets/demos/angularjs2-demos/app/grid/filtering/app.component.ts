/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxGridComponent } from '../../../../../jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';
import { jqxPanelComponent } from '../../../../../jqwidgets-ts/angular_jqxpanel';
import { jqxCheckBoxComponent } from '../../../../../jqwidgets-ts/angular_jqxcheckbox';

@Component({
    selector: 'my-app',
    template: `<div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;">
                        <angularGrid (OnFilter)="OnFilter($event)"></angularGrid>
                        <div id="eventslog" style="margin-top: 30px;">
                            <div style="width: 200px; float: left; margin-right: 10px;">
                                <angularButton (OnClick)="ClearFiltering()">Remove Filter</angularButton>
                                <angularCheckBox #filterBackground (OnChange)="OnFilterBackground($event)">Filter Background</angularCheckBox>
                                <angularCheckBox #filterIcons (OnChange)="OnFilterIcon($event)">Show All Filter Icons</angularCheckBox>                                
                            </div>
                            <div style="float: left;">
                                Event Log:
                                <angularPanel></angularPanel>
                            </div>
                        </div>
                    </div>`,
    directives: [jqxGridComponent, jqxButtonComponent, jqxCheckBoxComponent, jqxPanelComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxGridComponent) myGrid: jqxGridComponent;
    @ViewChild(jqxButtonComponent) clearFilteringButton: jqxButtonComponent;
    @ViewChild('filterBackground') filterBackgroundCheckBox: jqxCheckBoxComponent;
    @ViewChild('filterIcons') filterIconsCheckBox: jqxCheckBoxComponent;
    @ViewChild(jqxPanelComponent) eventLogPanel: jqxPanelComponent;

    settings: jqwidgets.GridOptions;
    clearFilteringButtonSettings: jqwidgets.ButtonOptions;
    filterBackgroundCheckBoxSettings: jqwidgets.CheckBoxOptions;
    filterIconsCheckBoxSettings: jqwidgets.CheckBoxOptions;
    eventLogPanelSettings: jqwidgets.PanelOptions;
    flag: Boolean = false;
    
    constructor()
    {
        var data = generatedata(500);
        var source =
            {
                localdata: data,
                datafields:
                [
                    { name: 'firstname', type: 'string' },
                    { name: 'lastname', type: 'string' },
                    { name: 'productname', type: 'string' },
                    { name: 'date', type: 'date' },
                    { name: 'quantity', type: 'number' },
                    { name: 'price', type: 'number' }
                ],
                datatype: "array"
            };
        var self = this;
        var addfilter = function ()
        {
            var filtergroup = new $.jqx.filter();
            var filter_or_operator = 1;
            var filtervalue = 'Beate';
            var filtercondition = 'contains';
            var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
            filtervalue = 'Andrew';
            filtercondition = 'starts_with';
            var filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter1);
            filtergroup.addfilter(filter_or_operator, filter2);
            // add the filters.
            self.myGrid.addfilter('firstname', filtergroup);
            // apply the filters.
            self.myGrid.applyfilters();
        }
        var adapter = new $.jqx.dataAdapter(source);

        this.settings = {
            width: 850,
            source: adapter,
            filterable: true,
            sortable: true,
            ready: function ()
            {
                addfilter();
            },
            autoshowfiltericon: true,
            columns: [
                { text: 'First Name', datafield: 'firstname', width: 160 },
                { text: 'Last Name', datafield: 'lastname', width: 160 },
                { text: 'Product', datafield: 'productname', width: 170 },
                { text: 'Order Date', datafield: 'date', filtertype: 'date', width: 160, cellsformat: 'dd-MMMM-yyyy' },
                { text: 'Quantity', datafield: 'quantity', width: 80, cellsalign: 'right' },
                { text: 'Unit Price', datafield: 'price', cellsalign: 'right', cellsformat: 'c2' }
            ]
        };

        this.eventLogPanelSettings = { width: 300, height: 80 };
        this.clearFilteringButtonSettings = { width: 120 };
        this.filterBackgroundCheckBoxSettings = { checked: true, height: 25 };
        this.filterIconsCheckBoxSettings = { checked: false, height: 25 };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            var self = this;
            self.Initialize();
            // Set style on the Panel
            var panel = <HTMLElement>document.getElementsByTagName('angularPanel')[0].firstElementChild;
            panel.style.border = 'none';
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myGrid.createWidget(this.settings);
        this.clearFilteringButton.createWidget(this.clearFilteringButtonSettings);
        this.filterBackgroundCheckBox.createWidget(this.filterBackgroundCheckBoxSettings);
        this.filterIconsCheckBox.createWidget(this.filterIconsCheckBoxSettings);
        this.eventLogPanel.createWidget(this.eventLogPanelSettings);        
    }

    OnFilter(event): void
    {
        this.eventLogPanel.clearcontent();
        var filterinfo = this.myGrid.getfilterinformation();
        var eventData = "Triggered 'filter' event";
        for (var i = 0; i < filterinfo.length; i += 1)
        {
            var eventData = "Filter Column: " + filterinfo[i].filtercolumntext;
            this.eventLogPanel.prepend('<div style="margin-top: 5px;">' + eventData + '</div>');
        }
    }

    ClearFiltering(): void
    {
        this.myGrid.clearfilters();
    }

    OnFilterBackground(event): void
    {
        this.myGrid.setOptions({ showfiltercolumnbackground: event.args.checked });
    }

    OnFilterIcon(event): void
    {
        this.myGrid.setOptions({ autoshowfiltericon: !event.args.checked });
    }
}