System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxtreegrid'], function(exports_1, context_1) {
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
    var core_1, angular_jqxtreegrid_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxtreegrid_1_1) {
                angular_jqxtreegrid_1 = angular_jqxtreegrid_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.source = {
                        dataType: "csv",
                        dataFields: [
                            { name: 'EmployeeKey', type: 'number' },
                            { name: 'ParentEmployeeKey', type: 'number' },
                            { name: 'FirstName', type: 'string' },
                            { name: 'LastName', type: 'string' },
                            { name: 'Title', type: 'string' },
                            { name: 'HireDate', type: 'date' },
                            { name: 'BirthDate', type: 'date' },
                            { name: 'Phone', type: 'string' },
                            { name: 'Gender', type: 'string' },
                            { name: 'DepartmentName', type: 'string' }
                        ],
                        hierarchy: {
                            keyDataField: { name: 'EmployeeKey' },
                            parentDataField: { name: 'ParentEmployeeKey' }
                        },
                        id: 'EmployeeKey',
                        url: '../../demos/sampledata/employeesadv.csv'
                    };
                    var self = this;
                    var dataAdapter = new $.jqx.dataAdapter(this.source);
                    this.treeGridSettings = {
                        height: 'auto',
                        width: 850,
                        source: dataAdapter,
                        pageable: true,
                        columnsResize: true,
                        ready: function () {
                            self.treeGrid.expandRow(32);
                        },
                        columns: [
                            { text: 'FirstName', dataField: 'FirstName', minWidth: 100, width: 200 },
                            { text: 'LastName', dataField: 'LastName', width: 200 },
                            { text: 'Department Name', dataField: 'DepartmentName', width: 150 },
                            { text: 'Title', dataField: 'Title', width: 300 },
                            { text: 'Birth Date', dataField: 'BirthDate', cellsFormat: 'd', width: 120 },
                            { text: 'Hire Date', dataField: 'HireDate', cellsFormat: 'd', width: 120 },
                            { text: 'Phone', dataField: 'Phone', cellsFormat: 'd', width: 120 }
                        ],
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.treeGrid.createWidget(this.treeGridSettings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxtreegrid_1.jqxTreeGridComponent), 
                    __metadata('design:type', angular_jqxtreegrid_1.jqxTreeGridComponent)
                ], AppComponent.prototype, "treeGrid", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: '<angularTreeGrid></angularTreeGrid>',
                        directives: [angular_jqxtreegrid_1.jqxTreeGridComponent]
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