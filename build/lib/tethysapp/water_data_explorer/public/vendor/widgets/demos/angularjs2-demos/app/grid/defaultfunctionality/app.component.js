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
                    this.url = "../sampledata/products.xml";
                    // prepare the data
                    this.source = {
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
                    this.cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                        if (value < 20) {
                            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
                        }
                        else {
                            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
                        }
                    };
                    this.dataAdapter = new $.jqx.dataAdapter(this.source, {
                        downloadComplete: function (data, status, xhr) { },
                        loadComplete: function (data) { },
                        loadError: function (xhr, status, error) { }
                    });
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
                __decorate([
                    core_1.ViewChild(angular_jqxgrid_1.jqxGridComponent), 
                    __metadata('design:type', angular_jqxgrid_1.jqxGridComponent)
                ], AppComponent.prototype, "myGrid", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<angularGrid></angularGrid>",
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