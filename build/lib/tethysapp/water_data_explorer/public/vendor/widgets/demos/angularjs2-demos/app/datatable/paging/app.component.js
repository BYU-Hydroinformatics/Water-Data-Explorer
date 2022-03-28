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
                        localData: generatedata(200),
                        dataType: "array",
                        datafields: [
                            { name: 'firstname', type: 'string' },
                            { name: 'lastname', type: 'string' },
                            { name: 'productname', type: 'string' },
                            { name: 'quantity', type: 'number' },
                            { name: 'price', type: 'number' },
                            { name: 'total', type: 'number' }
                        ]
                    };
                    this.dataAdapter = new $.jqx.dataAdapter(this.source);
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