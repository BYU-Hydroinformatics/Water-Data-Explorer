/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxgrid', '../../../../../jqwidgets-ts/angular_jqxpanel'], function(exports_1, context_1) {
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
    var core_1, angular_jqxgrid_1, angular_jqxpanel_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxgrid_1_1) {
                angular_jqxgrid_1 = angular_jqxgrid_1_1;
            },
            function (angular_jqxpanel_1_1) {
                angular_jqxpanel_1 = angular_jqxpanel_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.url = "../sampledata/orders.xml";
                    this.source = {
                        datatype: "xml",
                        datafields: [
                            { name: 'ShippedDate', map: 'm\\:properties>d\\:ShippedDate', type: 'date' },
                            { name: 'Freight', map: 'm\\:properties>d\\:Freight', type: 'float' },
                            { name: 'ShipName', map: 'm\\:properties>d\\:ShipName' },
                            { name: 'ShipAddress', map: 'm\\:properties>d\\:ShipAddress' },
                            { name: 'ShipCity', map: 'm\\:properties>d\\:ShipCity' },
                            { name: 'ShipCountry', map: 'm\\:properties>d\\:ShipCountry' }
                        ],
                        root: "entry",
                        record: "content",
                        id: 'm\\:properties>d\\:OrderID',
                        url: this.url,
                        pager: function (pagenum, pagesize, oldpagenum) {
                            // callback called when a page or page size is changed.
                        }
                    };
                    this.dataAdapter = new $.jqx.dataAdapter(this.source);
                    this.settings = {
                        width: 850,
                        source: this.dataAdapter,
                        selectionmode: 'multiplerowsextended',
                        sortable: true,
                        pageable: true,
                        autoheight: true,
                        columnsresize: true,
                        columns: [
                            { text: 'Ship Name', datafield: 'ShipName', width: 250 },
                            { text: 'Shipped Date', datafield: 'ShippedDate', width: 230, cellsformat: 'D' },
                            { text: 'Freight', datafield: 'Freight', width: 130, cellsformat: 'F2', cellsalign: 'right' },
                            { text: 'Ship Address', datafield: 'ShipAddress', width: 350 },
                            { text: 'Ship City', datafield: 'ShipCity', width: 100 },
                            { text: 'Ship Country', datafield: 'ShipCountry', width: 101 }
                        ]
                    };
                    this.panelSettings = { width: 300, height: 300 };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        self.Initialize();
                        // Set style on the Panel
                        var panel = document.getElementsByTagName('angularPanel')[0].firstElementChild;
                        panel.style.border = 'none';
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myGrid.createWidget(this.settings);
                    this.eventsLogPanel.createWidget(this.panelSettings);
                };
                AppComponent.prototype.Pagechanged = function (event) {
                    document.getElementById('eventslog').style.display = 'block';
                    ;
                    var loggedElements = document.getElementsByClassName('logged');
                    if (loggedElements.length >= 5) {
                        this.eventsLogPanel.clearcontent();
                    }
                    var args = event.args;
                    var eventData = "pagechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + "</div>";
                    this.eventsLogPanel.prepend('<div class="logged" style="margin-top: 5px;">' + eventData + '</div>');
                    // get page information.
                    var paginginformation = this.myGrid.getpaginginformation();
                    var paginginfoDom = document.getElementById('paginginfo');
                    paginginfoDom.innerHTML = "<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>";
                };
                AppComponent.prototype.Pagesizechanged = function (event) {
                    document.getElementById('eventslog').style.display = 'block';
                    this.eventsLogPanel.clearcontent();
                    var args = event.args;
                    var eventData = "pagesizechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + ", Old Page Size: " + args.oldpagesize + "</div>";
                    this.eventsLogPanel.prepend('<div style="margin-top: 5px;">' + eventData + '</div>');
                    // get page information.
                    var paginginformation = this.myGrid.getpaginginformation();
                    var paginginfoDom = document.getElementById('paginginfo');
                    paginginfoDom.innerHTML = "<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>";
                };
                __decorate([
                    core_1.ViewChild(angular_jqxgrid_1.jqxGridComponent), 
                    __metadata('design:type', angular_jqxgrid_1.jqxGridComponent)
                ], AppComponent.prototype, "myGrid", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxpanel_1.jqxPanelComponent), 
                    __metadata('design:type', angular_jqxpanel_1.jqxPanelComponent)
                ], AppComponent.prototype, "eventsLogPanel", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n<angularGrid (OnPagechanged)=\"Pagechanged($event)\" (OnPagesizechanged)=\"Pagesizechanged($event)\"></angularGrid>\n<div id=\"eventslog\" style=\"display: none; margin-top: 30px;\">\n    <div style=\"float: left;\">\n        Event Log:\n        <angularPanel></angularPanel>\n        <div style=\"border: none;\" id=\"events\">\n        </div>\n    </div>\n    <div style=\"float: left;\">\n        Paging Details:\n        <div id=\"paginginfo\">\n        </div>\n    </div>\n</div>\n",
                        directives: [angular_jqxgrid_1.jqxGridComponent, angular_jqxpanel_1.jqxPanelComponent]
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