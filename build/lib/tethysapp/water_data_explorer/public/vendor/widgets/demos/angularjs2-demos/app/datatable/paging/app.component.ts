/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxDataTableComponent} from '../../../../../jqwidgets-ts/angular_jqxdatatable';

@Component({
    selector: 'my-app',
    template: '<angularDataTable></angularDataTable>',
    directives: [jqxDataTableComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxDataTableComponent) myDataTable: jqxDataTableComponent;


    settings: jqwidgets.DataTableOptions;
    flag: Boolean = false;
    source =
    {
        localData: generatedata(200),
        dataType: "array",
        datafields:
        [
            { name: 'firstname', type: 'string' },
            { name: 'lastname', type: 'string' },
            { name: 'productname', type: 'string' },
            { name: 'quantity', type: 'number' },
            { name: 'price', type: 'number' },
            { name: 'total', type: 'number' }
        ]
    };
    dataAdapter = new $.jqx.dataAdapter(this.source);

    constructor()
    {

        this.settings = {
            width: 850,
            source: this.dataAdapter,
            pageable: true,
            pagerMode: 'advanced',
            altRows: true,
            columns: [
                { text: 'Name', dataField: 'firstname', width: 150 },
                { text: 'Last Name', dataField: 'lastname', width: 150 },
                { text: 'Product', editable: false, dataField: 'productname', width: 250 },
                { text: 'Quantity', dataField: 'quantity', width: 80, cellsAlign: 'right' },
                { text: 'Unit Price', dataField: 'price', width: 80, cellsAlign: 'right', cellsFormat: 'c2' },
                { text: 'Total', dataField: 'total', cellsAlign: 'right', cellsFormat: 'c2' }
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

    Initialize(): void
    {
        this.myDataTable.createWidget(this.settings);
    }
}
