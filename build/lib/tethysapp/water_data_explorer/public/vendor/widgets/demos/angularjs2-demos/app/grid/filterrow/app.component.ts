/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxGridComponent } from '../../../../../jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    template: `<div id='jqxWidgets'>
                        <angularGrid></angularGrid><br />
                        <angularButton (OnClick) = "ClearFiltering()">Remove Filter</angularButton>
                    </div>`,
    directives: [jqxGridComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxGridComponent) myGrid: jqxGridComponent;
    @ViewChild(jqxButtonComponent) clearFilteringButton: jqxButtonComponent;

    settings: jqwidgets.GridOptions;
    flag: Boolean = false;


    constructor()
    {
        var data = generatedata(500);
        var source =
            {
                localdata: data,
                datafields:
                [
                    { name: 'name', type: 'string' },
                    { name: 'productname', type: 'string' },
                    { name: 'available', type: 'bool' },
                    { name: 'date', type: 'date' },
                    { name: 'quantity', type: 'number' }
                ],
                datatype: "array"
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        this.settings = {
            width: 850,
            source: dataAdapter,
            showfilterrow: true,
            filterable: true,
            selectionmode: 'multiplecellsextended',
            columns: [
                { text: 'Name', columntype: 'textbox', filtertype: 'input', datafield: 'name', width: 215 },
                {
                    text: 'Product', filtertype: 'checkedlist', datafield: 'productname', width: 220
                },
                { text: 'Available', datafield: 'available', columntype: 'checkbox', filtertype: 'bool', width: 67 },
                { text: 'Ship Date', datafield: 'date', filtertype: 'range', width: 210, cellsalign: 'right', cellsformat: 'd' },
                { text: 'Qty.', datafield: 'quantity', filtertype: 'number', cellsalign: 'right' }
            ]
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
        this.myGrid.createWidget(this.settings);
        this.clearFilteringButton.createWidget({ width: 100, height: 20 });
    }

    ClearFiltering(): void
    {
        this.myGrid.clearfilters();
    }
}