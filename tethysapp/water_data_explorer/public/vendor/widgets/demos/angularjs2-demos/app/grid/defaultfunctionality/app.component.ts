/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxGridComponent } from '../../../../../jqwidgets-ts/angular_jqxgrid';

@Component({
    selector: 'my-app',
    template: `<angularGrid></angularGrid>`,
    directives: [jqxGridComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxGridComponent) myGrid: jqxGridComponent;

    settings: jqwidgets.GridOptions;
    flag: Boolean = false;
    
    url = "../sampledata/products.xml";
    // prepare the data
    source =
    {
        datatype: "xml",
        datafields: [
            { name: 'ProductName', type: 'string' },
            { name: 'QuantityPerUnit', type: 'int' },
            { name: 'UnitPrice', type: 'float' },
            { name: 'UnitsInStock', type: 'float' },
            { name: 'Discontinued', type: 'bool' }
        ],
        root: "Products",
        record: "Product",
        id: 'ProductID',
        url: this.url
    };
    cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
        if (value < 20) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
        }
        else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
        }
    };
    dataAdapter = new $.jqx.dataAdapter(this.source, {
        downloadComplete: function (data, status, xhr) {  },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });

    constructor() {
        this.settings = {
            width: 850,
            source: this.dataAdapter,
            pageable: true,
            autoheight: true,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            editable: true,
            selectionmode: 'multiplecellsadvanced',
            columns: [
                {
                    text: 'Product Name', columngroup: 'ProductDetails',
                    datafield: 'ProductName', width: 250
                },
                {
                    text: 'Quantity per Unit', columngroup: 'ProductDetails',
                    datafield: 'QuantityPerUnit', cellsalign: 'right', align: 'right', width: 200
                },
                { text: 'Unit Price', columngroup: 'ProductDetails', datafield: 'UnitPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2', width: 200 },
                { text: 'Units In Stock', datafield: 'UnitsInStock', cellsalign: 'right', cellsrenderer: this.cellsrenderer, width: 100 },
                { text: 'Discontinued', columntype: 'checkbox', datafield: 'Discontinued' }
            ],
            columngroups: [
                { text: 'Product Details', align: 'center', name: 'ProductDetails' }
            ]
        };
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            var self = this;
            self.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void {
        this.myGrid.createWidget(this.settings);
    }
}