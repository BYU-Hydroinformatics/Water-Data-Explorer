/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxDataTableComponent} from '../../../../../jqwidgets-ts/angular_jqxdatatable';

@Component({
    selector: 'my-app',
    templateUrl: 'app/datatable/defaultfunctionality/app.component.htm',
    directives: [jqxDataTableComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxDataTableComponent) myDataTable: jqxDataTableComponent;

    settings: jqwidgets.DataTableOptions;
    flag: Boolean = false;
    constructor() {        

        this.settings = {
            altRows: true,
            sortable: true,
            editable: true,
            selectionMode: 'singleRow',
            columns: [
                { text: 'First Name', dataField: 'First Name', width: 200 },
                { text: 'Last Name', dataField: 'Last Name', width: 200 },
                { text: 'Product', dataField: 'Product', width: 250 },
                { text: 'Unit Price', dataField: 'Price', width: 100, align: 'right', cellsAlign: 'right', cellsFormat: 'c2' },
                { text: 'Quantity', dataField: 'Quantity', width: 100, align: 'right', cellsAlign: 'right', cellsFormat: 'n' }
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
