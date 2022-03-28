/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxgrid'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, angular_jqxgrid_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxgrid_1_1) {
                angular_jqxgrid_1 = angular_jqxgrid_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    var data = generatedata(500);
                    var source = {
                        localdata: data,
                        datatype: "array",
                        updaterow: function (rowid, rowdata, commit) {
                            // synchronize with the server - send update command
                            // call commit with parameter true if the synchronization with the server is successful 
                            // and with parameter false if the synchronization failder.
                            commit(true);
                        },
                        datafields: [
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
                                validation: function (cell, value) {
                                    if (value == "")
                                        return true;
                                    var year = value.getFullYear();
                                    if (year >= 2017) {
                                        return { result: false, message: "Ship Date should be before 1/1/2017" };
                                    }
                                    return true;
                                }
                            },
                            {
                                text: 'Quantity', datafield: 'quantity', width: 70, align: 'right', cellsalign: 'right', columntype: 'numberinput',
                                validation: function (cell, value) {
                                    if (value < 0 || value > 150) {
                                        return { result: false, message: "Quantity should be in the 0-150 interval" };
                                    }
                                    return true;
                                },
                                createeditor: function (row, cellvalue, editor) {
                                    editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
                                }
                            },
                            {
                                text: 'Price', datafield: 'price', align: 'right', cellsalign: 'right', cellsformat: 'c2', columntype: 'numberinput',
                                validation: function (cell, value) {
                                    if (value < 0 || value > 15) {
                                        return { result: false, message: "Price should be in the 0-15 interval" };
                                    }
                                    return true;
                                },
                                createeditor: function (row, cellvalue, editor) {
                                    editor.jqxNumberInput({ digits: 3 });
                                }
                            }
                        ]
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        self.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myGrid.createWidget(this.settings);
                };
                AppComponent.prototype.Cellbeginedit = function (event) {
                    var args = event.args;
                    var begineditLog = document.getElementById('cellbegineditevent');
                    begineditLog.innerText = "Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value;
                };
                AppComponent.prototype.Cellendedit = function (event) {
                    var args = event.args;
                    var endeditLog = document.getElementById('cellendeditevent');
                    endeditLog.innerText = "Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value;
                };
                __decorate([
                    core_1.ViewChild(angular_jqxgrid_1.jqxGridComponent), 
                    __metadata('design:type', angular_jqxgrid_1.jqxGridComponent)
                ], AppComponent.prototype, "myGrid", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<div id='jqxWidgets'>\n                        <angularGrid (OnCellbeginedit)=\"Cellbeginedit($event)\" (OnCellendedit)=\"Cellendedit($event)\"></angularGrid>\n                        <div style=\"font-size: 12px; font-family: Verdana, Geneva, 'DejaVu Sans', sans-serif; margin-top: 30px;\">\n                            <div id=\"cellbegineditevent\"></div>\n                            <div style=\"margin-top: 10px;\" id=\"cellendeditevent\"></div>\n                        </div>\n                    </div>",
                        directives: [angular_jqxgrid_1.jqxGridComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map