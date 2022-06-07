System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdatatable'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdatatable_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdatatable_1_1) {
                angular_jqxdatatable_1 = angular_jqxdatatable_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.source = {
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
                    this.dataAdapter = new $.jqx.dataAdapter(this.source, {
                        loadComplete: function () {
                            // data is loaded.
                        }
                    });
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
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myDataTable.createWidget(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxdatatable_1.jqxDataTableComponent), 
                    __metadata('design:type', angular_jqxdatatable_1.jqxDataTableComponent)
                ], AppComponent.prototype, "myDataTable", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: '<angularDataTable></angularDataTable>',
                        directives: [angular_jqxdatatable_1.jqxDataTableComponent]
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