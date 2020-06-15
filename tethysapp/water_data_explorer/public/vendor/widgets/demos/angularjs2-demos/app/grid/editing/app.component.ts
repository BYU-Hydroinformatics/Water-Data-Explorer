/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxGridComponent } from '../../../../../jqwidgets-ts/angular_jqxgrid';

@Component({
    selector: 'my-app',
    template: `<div id='jqxWidgets'>
                        <angularGrid (OnCellbeginedit)="Cellbeginedit($event)" (OnCellendedit)="Cellendedit($event)"></angularGrid>
                        <div style="font-size: 12px; font-family: Verdana, Geneva, 'DejaVu Sans', sans-serif; margin-top: 30px;">
                            <div id="cellbegineditevent"></div>
                            <div style="margin-top: 10px;" id="cellendeditevent"></div>
                        </div>
                    </div>`,
    directives: [jqxGridComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxGridComponent) myGrid: jqxGridComponent;

    settings: jqwidgets.GridOptions;
    flag: Boolean = false;
    
    constructor()
    {
        var data = generatedata(500);
        var source =
            {
                localdata: data,
                datatype: "array",
                updaterow: function (rowid, rowdata, commit)
                {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failder.
                    commit(true);
                },
                datafields:
                [
                    { name: 'firstname', type: 'string' },
                    { name: 'lastname', type: 'string' },
                    { name: 'productname', type: 'string' },
                    { name: 'available', type: 'bool' },
                    { name: 'quantity', type: 'number' },
                    { name: 'price', type: 'number' },
                    { name: 'date', type: 'date' }
                ]
            };
        var dataAdapter = new $.jqx.dataAdapter(source);

        this.settings = {
            width: 850,
            source: dataAdapter,
            editable: true,
            enabletooltips: true,
            selectionmode: 'multiplecellsadvanced',
            columns: [
                { text: 'First Name', columntype: 'textbox', datafield: 'firstname', width: 120 },
                { text: 'Last Name', datafield: 'lastname', columntype: 'textbox', width: 120 },
                { text: 'Product', columntype: 'dropdownlist', datafield: 'productname', width: 195 },
                { text: 'Available', datafield: 'available', columntype: 'checkbox', width: 67 },
                {
                    text: 'Ship Date', datafield: 'date', columntype: 'datetimeinput', width: 110, align: 'right', cellsalign: 'right', cellsformat: 'd',
                    validation: function (cell, value: any)
                    {
                        if (value == "")
                            return true;
                        var year = value.getFullYear();
                        if (year >= 2017)
                        {
                            return { result: false, message: "Ship Date should be before 1/1/2017" };
                        }
                        return true;
                    }
                },
                {
                    text: 'Quantity', datafield: 'quantity', width: 70, align: 'right', cellsalign: 'right', columntype: 'numberinput',
                    validation: function (cell, value)
                    {
                        if (value < 0 || value > 150)
                        {
                            return { result: false, message: "Quantity should be in the 0-150 interval" };
                        }
                        return true;
                    },
                    createeditor: function (row, cellvalue, editor)
                    {
                        editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
                    }
                },
                {
                    text: 'Price', datafield: 'price', align: 'right', cellsalign: 'right', cellsformat: 'c2', columntype: 'numberinput',
                    validation: function (cell, value)
                    {
                        if (value < 0 || value > 15)
                        {
                            return { result: false, message: "Price should be in the 0-15 interval" };
                        }
                        return true;
                    },
                    createeditor: function (row, cellvalue, editor)
                    {
                        editor.jqxNumberInput({ digits: 3 });
                    }
                }
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
    }

    Cellbeginedit(event): void
    {
        var args = event.args;
        var begineditLog = document.getElementById('cellbegineditevent');
        begineditLog.innerText = "Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value;
    }

    Cellendedit(event): void
    {
        var args = event.args;
        var endeditLog = document.getElementById('cellendeditevent');
        endeditLog.innerText = "Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value;
    }
}