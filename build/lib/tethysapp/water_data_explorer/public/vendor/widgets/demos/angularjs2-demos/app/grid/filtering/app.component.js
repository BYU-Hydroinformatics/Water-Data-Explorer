/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxgrid', '../../../../../jqwidgets-ts/angular_jqxbutton', '../../../../../jqwidgets-ts/angular_jqxpanel', '../../../../../jqwidgets-ts/angular_jqxcheckbox'], function(exports_1, context_1) {
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
    var core_1, angular_jqxgrid_1, angular_jqxbutton_1, angular_jqxpanel_1, angular_jqxcheckbox_1;
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
            },
            function (angular_jqxpanel_1_1) {
                angular_jqxpanel_1 = angular_jqxpanel_1_1;
            },
            function (angular_jqxcheckbox_1_1) {
                angular_jqxcheckbox_1 = angular_jqxcheckbox_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    var data = generatedata(500);
                    var source = {
                        localdata: data,
                        datafields: [
                            { name: 'firstname', type: 'string' },
                            { name: 'lastname', type: 'string' },
                            { name: 'productname', type: 'string' },
                            { name: 'date', type: 'date' },
                            { name: 'quantity', type: 'number' },
                            { name: 'price', type: 'number' }
                        ],
                        datatype: "array"
                    };
                    var self = this;
                    var addfilter = function () {
                        var filtergroup = new $.jqx.filter();
                        var filter_or_operator = 1;
                        var filtervalue = 'Beate';
                        var filtercondition = 'contains';
                        var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                        filtervalue = 'Andrew';
                        filtercondition = 'starts_with';
                        var filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                        filtergroup.addfilter(filter_or_operator, filter1);
                        filtergroup.addfilter(filter_or_operator, filter2);
                        // add the filters.
                        self.myGrid.addfilter('firstname', filtergroup);
                        // apply the filters.
                        self.myGrid.applyfilters();
                    };
                    var adapter = new $.jqx.dataAdapter(source);
                    this.settings = {
                        width: 850,
                        source: adapter,
                        filterable: true,
                        sortable: true,
                        ready: function () {
                            addfilter();
                        },
                        autoshowfiltericon: true,
                        columns: [
                            { text: 'First Name', datafield: 'firstname', width: 160 },
                            { text: 'Last Name', datafield: 'lastname', width: 160 },
                            { text: 'Product', datafield: 'productname', width: 170 },
                            { text: 'Order Date', datafield: 'date', filtertype: 'date', width: 160, cellsformat: 'dd-MMMM-yyyy' },
                            { text: 'Quantity', datafield: 'quantity', width: 80, cellsalign: 'right' },
                            { text: 'Unit Price', datafield: 'price', cellsalign: 'right', cellsformat: 'c2' }
                        ]
                    };
                    this.eventLogPanelSettings = { width: 300, height: 80 };
                    this.clearFilteringButtonSettings = { width: 120 };
                    this.filterBackgroundCheckBoxSettings = { checked: true, height: 25 };
                    this.filterIconsCheckBoxSettings = { checked: false, height: 25 };
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
                    this.clearFilteringButton.createWidget(this.clearFilteringButtonSettings);
                    this.filterBackgroundCheckBox.createWidget(this.filterBackgroundCheckBoxSettings);
                    this.filterIconsCheckBox.createWidget(this.filterIconsCheckBoxSettings);
                    this.eventLogPanel.createWidget(this.eventLogPanelSettings);
                };
                AppComponent.prototype.OnFilter = function (event) {
                    this.eventLogPanel.clearcontent();
                    var filterinfo = this.myGrid.getfilterinformation();
                    var eventData = "Triggered 'filter' event";
                    for (var i = 0; i < filterinfo.length; i += 1) {
                        var eventData = "Filter Column: " + filterinfo[i].filtercolumntext;
                        this.eventLogPanel.prepend('<div style="margin-top: 5px;">' + eventData + '</div>');
                    }
                };
                AppComponent.prototype.ClearFiltering = function () {
                    this.myGrid.clearfilters();
                };
                AppComponent.prototype.OnFilterBackground = function (event) {
                    this.myGrid.setOptions({ showfiltercolumnbackground: event.args.checked });
                };
                AppComponent.prototype.OnFilterIcon = function (event) {
                    this.myGrid.setOptions({ autoshowfiltericon: !event.args.checked });
                };
                __decorate([
                    core_1.ViewChild(angular_jqxgrid_1.jqxGridComponent), 
                    __metadata('design:type', angular_jqxgrid_1.jqxGridComponent)
                ], AppComponent.prototype, "myGrid", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxbutton_1.jqxButtonComponent), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "clearFilteringButton", void 0);
                __decorate([
                    core_1.ViewChild('filterBackground'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "filterBackgroundCheckBox", void 0);
                __decorate([
                    core_1.ViewChild('filterIcons'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "filterIconsCheckBox", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxpanel_1.jqxPanelComponent), 
                    __metadata('design:type', angular_jqxpanel_1.jqxPanelComponent)
                ], AppComponent.prototype, "eventLogPanel", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<div id='jqxWidget' style=\"font-size: 13px; font-family: Verdana; float: left;\">\n                        <angularGrid (OnFilter)=\"OnFilter($event)\"></angularGrid>\n                        <div id=\"eventslog\" style=\"margin-top: 30px;\">\n                            <div style=\"width: 200px; float: left; margin-right: 10px;\">\n                                <angularButton (OnClick)=\"ClearFiltering()\">Remove Filter</angularButton>\n                                <angularCheckBox #filterBackground (OnChange)=\"OnFilterBackground($event)\">Filter Background</angularCheckBox>\n                                <angularCheckBox #filterIcons (OnChange)=\"OnFilterIcon($event)\">Show All Filter Icons</angularCheckBox>                                \n                            </div>\n                            <div style=\"float: left;\">\n                                Event Log:\n                                <angularPanel></angularPanel>\n                            </div>\n                        </div>\n                    </div>",
                        directives: [angular_jqxgrid_1.jqxGridComponent, angular_jqxbutton_1.jqxButtonComponent, angular_jqxcheckbox_1.jqxCheckBoxComponent, angular_jqxpanel_1.jqxPanelComponent]
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