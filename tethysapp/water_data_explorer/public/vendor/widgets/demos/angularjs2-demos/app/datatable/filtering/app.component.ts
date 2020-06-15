/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxDataTableComponent} from '../../../../../jqwidgets-ts/angular_jqxdatatable';

@Component({
    selector: 'my-app',
    template: '<angularDataTable></angularDataTable>',
    directives: [jqxDataTableComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxDataTableComponent) myDataTable: jqxDataTableComponent;


    settings: jqwidgets.DataTableOptions;
    flag: Boolean = false;
    source =
    {
        dataType: "xml",
        dataFields: [
            { name: 'SupplierName', type: 'string' },
            { name: 'Quantity', type: 'number' },
            { name: 'OrderDate', type: 'date' },
            { name: 'OrderAddress', type: 'string' },
            { name: 'Freight', type: 'number' },
            { name: 'Price', type: 'number' },
            { name: 'City', type: 'string' },
            { name: 'ProductName', type: 'string' },
            { name: 'Address', type: 'string' }
        ],
        url: '../sampledata/orderdetailsextended.xml',
        root: 'DATA',
        record: 'ROW'
    };
    dataAdapter = new $.jqx.dataAdapter(this.source, {
        loadComplete: function ()
        {
            // data is loaded.
        }
    });

    constructor() {        

        this.settings = {
            source: this.dataAdapter,
            pageable: true,
            altRows: true,
            filterable: true,
            width: '70%',
            height: '70%',
            columns: [
                { text: 'Supplier Name', cellsAlign: 'center', align: 'center', dataField: 'SupplierName', width: 250 },
                { text: 'Name', cellsAlign: 'center', align: 'center', dataField: 'ProductName', width: 250 },
                { text: 'Quantity', dataField: 'Quantity', cellsFormat: 'd', cellsAlign: 'center', align: 'center', width: 120 },
                { text: 'Price', dataField: 'Price', cellsFormat: 'c2', align: 'center', cellsAlign: 'center', width: 120 },
                { text: 'City', cellsAlign: 'center', align: 'center', dataField: 'City' }
            ]
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
        this.myDataTable.createWidget(this.settings);
    }
}
