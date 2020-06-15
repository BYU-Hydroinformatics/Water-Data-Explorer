/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked, } from '@angular/core';
import {jqxDataTableComponent} from '../../../../../jqwidgets-ts/angular_jqxdatatable';
import {jqxButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxbutton';
import {jqxInputComponent} from '../../../../../jqwidgets-ts/angular_jqxinput';
import {jqxTooltipComponent} from '../../../../../jqwidgets-ts/angular_jqxtooltip';

@Component({
    selector: 'my-app',
    template: `<angularDataTable></angularDataTable>`,
    directives: [jqxDataTableComponent, jqxButtonComponent, jqxInputComponent, jqxTooltipComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxDataTableComponent) myDataTable: jqxDataTableComponent;
    @ViewChild(jqxTooltipComponent) myTooltip: jqxTooltipComponent;
    @ViewChild(jqxButtonComponent) myAddButton: jqxButtonComponent;
    
    settings: jqwidgets.DataTableOptions;
    flag: Boolean = false; flagTwo: Boolean = false; theme = $.jqx.theme;
    orderdetailsurl = "../sampledata/orderdetails.xml";
    ordersSource =
    {
        dataFields: [
            { name: 'OrderID', type: 'int' },
            { name: 'Freight', type: 'float' },
            { name: 'ShipName', type: 'string' },
            { name: 'ShipAddress', type: 'string' },
            { name: 'ShipCity', type: 'string' },
            { name: 'ShipCountry', type: 'string' },
            { name: 'ShippedDate', type: 'date' }
        ],
        root: "Orders",
        record: "Order",
        dataType: "xml",
        id: 'OrderID',
        url: this.orderdetailsurl,
        addRow: function (rowID, rowData, position, commit)
        {
            // synchronize with the server - send insert command
            // call commit with parameter true if the synchronization with the server is successful 
            // and with parameter false if the synchronization failed.
            // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
            commit(true);
        },
        updateRow: function (rowID, rowData, commit)
        {
            // synchronize with the server - send update command
            // call commit with parameter true if the synchronization with the server is successful 
            // and with parameter false if the synchronization failed.
            commit(true);
        },
        deleteRow: function (rowID, commit)
        {
            // synchronize with the server - send delete command
            // call commit with parameter true if the synchronization with the server is successful 
            // and with parameter false if the synchronization failed.
            commit(true);
        }
    };
  
    constructor() {        
        let self = this;
        let theme = $.jqx.theme;
        let flag = false;
        let dataAdapter = new $.jqx.dataAdapter(this.ordersSource, {
            loadComplete: function () {
                // data is loaded.
            }
        });

        this.settings = {
            width: 850,
            source: dataAdapter,
            pageable: true,
            editable: true,
            showToolbar: true,
            altRows: true,
            ready: function () {
                // called when the DataTable is loaded.         
            },
            pagerButtonsCount: 8,
            toolbarHeight: 35,
            renderToolbar: function (toolBar) {
                if (flag === false) {
                    flag = true;
                } else {
                    return;
                }

                let toTheme = function (className) {
                    if (theme == "") return className;
                    return className + " " + className + "-" + theme;
                }

                // appends buttons to the status bar.
                let container = document.createElement("div");
                let fragment = document.createDocumentFragment();
                container.style.overflow = 'hidden';
                container.style.position = 'relative';
                container.style.height = '100%';
                container.style.width = '100%';

                function createButtons(name, cssClass: string) {
                    self[name] = document.createElement('div');
                    self[name].style.cssFloat = 'left';
                    self[name].style.padding = '3px';
                    self[name].style.margin = '2px';
                    let iconDiv = document.createElement('div');
                    iconDiv.style.margin = '4px';
                    iconDiv.style.width = '16px';
                    iconDiv.style.height = '16px';
                    iconDiv.className = cssClass;

                    self[name].appendChild(iconDiv);
                    return self[name];
                }
                let buttons = [
                    createButtons('addButton', toTheme('jqx-icon-plus')),
                    createButtons('editButton', toTheme('jqx-icon-edit')),
                    createButtons('deleteButton', toTheme('jqx-icon-delete')),
                    createButtons('cancelButton', toTheme('jqx-icon-cancel')),
                    createButtons('updateButton', toTheme('jqx-icon-save'))
                ];
                for (let i = 0; i < buttons.length; i++) {
                    fragment.appendChild(buttons[i]);
                }
                container.appendChild(fragment)
                toolBar[0].appendChild(container);


                let addButtonOptions: jqwidgets.ButtonOptions =
                    {
                        height: 25, width: 25
                    }
                let otherButtonsOptions: jqwidgets.ButtonOptions =
                    {
                        disabled: true, height: 25, width: 25
                    }
                let myAddButton: jqwidgets.jqxButton = jqwidgets.createInstance(buttons[0], 'jqxButton', addButtonOptions);
                let myEditButton: jqwidgets.jqxButton = jqwidgets.createInstance(buttons[1], 'jqxButton', otherButtonsOptions);
                let myDeleteButton: jqwidgets.jqxButton = jqwidgets.createInstance(buttons[2], 'jqxButton', otherButtonsOptions);
                let myCancelButton: jqwidgets.jqxButton = jqwidgets.createInstance(buttons[3], 'jqxButton', otherButtonsOptions);
                let myUpdateButton: jqwidgets.jqxButton = jqwidgets.createInstance(buttons[4], 'jqxButton', otherButtonsOptions);

                let addTooltopOptions: jqwidgets.TooltipOptions =
                    {
                        position: 'bottom', content: "Add"
                    }
                let editTooltopOptions: jqwidgets.TooltipOptions =
                    {
                        position: 'bottom', content: "Edit"
                    }
                let deleteTooltopOptions: jqwidgets.TooltipOptions =
                    {
                        position: 'bottom', content: "Delete"
                    }
                let updateTooltopOptions: jqwidgets.TooltipOptions =
                    {
                        position: 'bottom', content: "Save Changes"
                    }
                let cancelTooltopOptions: jqwidgets.TooltipOptions =
                    {
                        position: 'bottom', content: "Cancel"
                    }

                let myAddToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[0], 'jqxTooltip', addTooltopOptions);
                let myEditToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[1], 'jqxTooltip', editTooltopOptions);
                let myDeleteToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[2], 'jqxTooltip', deleteTooltopOptions);
                let myCancelToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[3], 'jqxTooltip', cancelTooltopOptions);
                let myUpdateToolTip: jqwidgets.jqxTooltip = jqwidgets.createInstance(buttons[4], 'jqxTooltip', updateTooltopOptions);


                let updateButtons = function (action) {
                    switch (action) {
                        case "Select":
                            myAddButton.setOptions({ disabled: false });
                            myDeleteButton.setOptions({ disabled: false });
                            myEditButton.setOptions({ disabled: false });
                            myCancelButton.setOptions({ disabled: true });
                            myUpdateButton.setOptions({ disabled: true });
                            break;
                        case "Unselect":
                            myAddButton.setOptions({ disabled: false });
                            myDeleteButton.setOptions({ disabled: true });
                            myEditButton.setOptions({ disabled: true });
                            myCancelButton.setOptions({ disabled: true });
                            myUpdateButton.setOptions({ disabled: true });
                            break;
                        case "Edit":
                            myAddButton.setOptions({ disabled: true });
                            myDeleteButton.setOptions({ disabled: true });
                            myEditButton.setOptions({ disabled: true });
                            myCancelButton.setOptions({ disabled: false });
                            myUpdateButton.setOptions({ disabled: false });
                            break;
                        case "End Edit":
                            myAddButton.setOptions({ disabled: false });
                            myDeleteButton.setOptions({ disabled: false });
                            myEditButton.setOptions({ disabled: false });
                            myCancelButton.setOptions({ disabled: true });
                            myUpdateButton.setOptions({ disabled: true });
                            break;
                    }
                }
                let rowIndex = null;
                self.myDataTable.widgetObject.addEventHandler('rowSelect', function (event) {
                    let args = event.args;
                    rowIndex = args.index;
                    updateButtons('Select');
                });
                self.myDataTable.widgetObject.addEventHandler('rowUnselect', function (event) {
                    updateButtons('Unselect');
                });
                self.myDataTable.widgetObject.addEventHandler('rowEndEdit', function (event) {
                    updateButtons('End Edit');
                });
                self.myDataTable.widgetObject.addEventHandler('rowBeginEdit', function (event) {
                    updateButtons('Edit');
                });
                myAddButton.addEventHandler('click', function (event) {
                    if (!myAddButton.disabled) {
                        // add new empty row.
                        self.myDataTable.addRow(null, {}, 'first')
                        // select the first row and clear the selection.
                        self.myDataTable.clearSelection;
                        self.myDataTable.selectRow(0);
                        // edit the new row.
                        self.myDataTable.beginRowEdit(0);
                        updateButtons('add');
                    }
                });
                myCancelButton.addEventHandler('click', function (event) {
                    if (!myCancelButton.disabled) {
                        // cancel changes.
                        self.myDataTable.endRowEdit(rowIndex, true);
                    }
                });
                myUpdateButton.addEventHandler('click', function (event) {
                    if (!myUpdateButton.disabled) {
                        // save changes.
                        self.myDataTable.endRowEdit(rowIndex, false);
                    }
                });
                myEditButton.addEventHandler('click', function () {
                    if (!myEditButton.disabled) {
                        self.myDataTable.beginRowEdit(rowIndex);
                        updateButtons('edit');
                    }
                });
                myDeleteButton.addEventHandler('click', function () {
                    if (!myDeleteButton.disabled) {
                        self.myDataTable.deleteRow(rowIndex);
                        updateButtons('delete');
                    }
                });
            },
            columns: [
                { text: 'Order ID', editable: false, dataField: 'OrderID', width: 200 },
                { text: 'Freight', dataField: 'Freight', cellsFormat: 'f', cellsAlign: 'right', align: 'right', width: 200 },
                {
                    text: 'Ship Country', dataField: 'ShipCountry', width: 250,
                    columnType: 'custom',
                    createEditor: function (row, cellValue, editor, width, height) {
                        // create jqxInput editor.
                        let inputContainer = document.createElement('input');
                        inputContainer.style.paddingLeft = '4px';
                        inputContainer.style.boxSizing = 'border-box';
                        inputContainer.style.border = 'none';
                        inputContainer.id = 'jqxInput';
                        editor[0].appendChild(inputContainer);
                        let countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
                        let InputSelector = '#jqxInput';
                        let InputOptions: jqwidgets.InputOptions = {
                            source: countries, width: '100%', height: '100%'
                        }
                        let myInput: jqwidgets.jqxInput = jqwidgets.createInstance(InputSelector, 'jqxInput', InputOptions)
                        myInput.val(cellValue);
                    },
                    initEditor: function (row, cellValue, editor) {
                        // set jqxInput editor's initial value.
                        if (cellValue === undefined) {
                            cellValue = '';
                        }
                        (<HTMLInputElement>document.getElementById('jqxInput')).value = cellValue
                    },
                    getEditorValue: function (index, value, editor) {
                        // get jqxInput editor's value.
                        return (<HTMLInputElement>document.getElementById('jqxInput')).value

                    }
                },
                { text: 'Shipped Date', dataField: 'ShippedDate', cellsAlign: 'right', align: 'right', cellsFormat: 'dd/MM/yyyy' }
            ]   
        }
        this.settings.ready() 
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
