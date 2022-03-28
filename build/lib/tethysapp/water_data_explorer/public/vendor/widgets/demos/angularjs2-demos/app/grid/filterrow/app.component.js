/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxgrid', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxgrid_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxgrid_1_1) {
                angular_jqxgrid_1 = angular_jqxgrid_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    var data = generatedata(500);
                    var source = {
                        localdata: data,
                        datafields: [
                            { name: 'name', type: 'string' },
                            { name: 'productname', type: 'string' },
                            { name: 'available', type: 'bool' },
                            { name: 'date', type: 'date' },
                            { name: 'quantity', type: 'number' }
                        ],
                        datatype: "array"
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    this.settings = {
                        width: 850,
                        source: dataAdapter,
                        showfilterrow: true,
                        filterable: true,
                        selectionmode: 'multiplecellsextended',
                        columns: [
                            { text: 'Name', columntype: 'textbox', filtertype: 'input', datafield: 'name', width: 215 },
                            {
                                text: 'Product', filtertype: 'checkedlist', datafield: 'productname', width: 220
                            },
                            { text: 'Available', datafield: 'available', columntype: 'checkbox', filtertype: 'bool', width: 67 },
                            { text: 'Ship Date', datafield: 'date', filtertype: 'range', width: 210, cellsalign: 'right', cellsformat: 'd' },
                            { text: 'Qty.', datafield: 'quantity', filtertype: 'number', cellsalign: 'right' }
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
                    this.clearFilteringButton.createWidget({ width: 100, height: 20 });
                };
                AppComponent.prototype.ClearFiltering = function () {
                    this.myGrid.clearfilters();
                };
                __decorate([
                    core_1.ViewChild(angular_jqxgrid_1.jqxGridComponent), 
                    __metadata('design:type', angular_jqxgrid_1.jqxGridComponent)
                ], AppComponent.prototype, "myGrid", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxbutton_1.jqxButtonComponent), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "clearFilteringButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<div id='jqxWidgets'>\n                        <angularGrid></angularGrid><br />\n                        <angularButton (OnClick) = \"ClearFiltering()\">Remove Filter</angularButton>\n                    </div>",
                        directives: [angular_jqxgrid_1.jqxGridComponent, angular_jqxbutton_1.jqxButtonComponent]
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