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
                    this.url = "../sampledata/customers.xml";
                    this.source = {
                        datatype: "xml",
                        datafields: [
                            { name: 'CompanyName', map: 'm\\:properties>d\\:CompanyName', type: 'string' },
                            { name: 'ContactName', map: 'm\\:properties>d\\:ContactName', type: 'string' },
                            { name: 'ContactTitle', map: 'm\\:properties>d\\:ContactTitle', type: 'string' },
                            { name: 'City', map: 'm\\:properties>d\\:City', type: 'string' },
                            { name: 'PostalCode', map: 'm\\:properties>d\\:PostalCode', type: 'string' },
                            { name: 'Country', map: 'm\\:properties>d\\:Country', type: 'string' }
                        ],
                        root: "entry",
                        record: "content",
                        id: 'm\\:properties>d\\:CustomerID',
                        url: this.url
                    };
                    this.dataAdapter = new $.jqx.dataAdapter(this.source);
                    this.settings = {
                        width: 850,
                        groupable: true,
                        columns: [
                            { text: 'Company Name', datafield: 'CompanyName', width: 250 },
                            { text: 'City', datafield: 'City', width: 120 },
                            { text: 'Country', datafield: 'Country' }
                        ],
                        source: this.dataAdapter,
                        groups: ['City']
                    };
                    this.buttonsSettings = {};
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
                    this.ExpandGroupButton.createWidget(this.buttonsSettings);
                    this.CollapseGroupButton.createWidget(this.buttonsSettings);
                    this.ExpandAllGroupButton.createWidget(this.buttonsSettings);
                    this.CollapseAllGroupButton.createWidget(this.buttonsSettings);
                };
                AppComponent.prototype.OnExpandGroup = function () {
                    var inputDom = document.getElementById('groupnum');
                    var groupnum = inputDom.value;
                    if (!isNaN(groupnum)) {
                        this.myGrid.expandgroup(groupnum);
                    }
                };
                AppComponent.prototype.OnCollapseGroup = function () {
                    var inputDom = document.getElementById('groupnum');
                    var groupnum = inputDom.value;
                    if (!isNaN(groupnum)) {
                        this.myGrid.collapsegroup(groupnum);
                    }
                };
                AppComponent.prototype.OnExpandAllGroup = function () {
                    this.myGrid.expandallgroups();
                };
                AppComponent.prototype.OnCollapseAllGroup = function () {
                    this.myGrid.collapseallgroups();
                };
                AppComponent.prototype.OnGroupexpand = function (event) {
                    var args = event.args;
                    var expandedgroupLog = document.getElementById('expandedgroup');
                    expandedgroupLog.innerText = "Group: " + args.group + ", Level: " + args.level;
                };
                AppComponent.prototype.OnGroupcollapse = function (event) {
                    var args = event.args;
                    var collapsedgroupLog = document.getElementById('collapsedgroup');
                    collapsedgroupLog.innerText = "Group: " + args.group + ", Level: " + args.level;
                };
                __decorate([
                    core_1.ViewChild(angular_jqxgrid_1.jqxGridComponent), 
                    __metadata('design:type', angular_jqxgrid_1.jqxGridComponent)
                ], AppComponent.prototype, "myGrid", void 0);
                __decorate([
                    core_1.ViewChild('ExpandGroup'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "ExpandGroupButton", void 0);
                __decorate([
                    core_1.ViewChild('CollapseGroup'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "CollapseGroupButton", void 0);
                __decorate([
                    core_1.ViewChild('ExpandAllGroup'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "ExpandAllGroupButton", void 0);
                __decorate([
                    core_1.ViewChild('CollapseAllGroup'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "CollapseAllGroupButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/grid/grouping/app.component.htm',
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