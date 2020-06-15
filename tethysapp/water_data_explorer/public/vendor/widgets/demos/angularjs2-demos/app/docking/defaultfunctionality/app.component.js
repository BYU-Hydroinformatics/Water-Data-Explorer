System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdocking', '../../../../../jqwidgets-ts/angular_jqxcalendar', '../../../../../jqwidgets-ts/angular_jqxtabs', '../../../../../jqwidgets-ts/angular_jqxlistbox', '../../../../../jqwidgets-ts/angular_jqxpanel'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdocking_1, angular_jqxcalendar_1, angular_jqxtabs_1, angular_jqxlistbox_1, angular_jqxpanel_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdocking_1_1) {
                angular_jqxdocking_1 = angular_jqxdocking_1_1;
            },
            function (angular_jqxcalendar_1_1) {
                angular_jqxcalendar_1 = angular_jqxcalendar_1_1;
            },
            function (angular_jqxtabs_1_1) {
                angular_jqxtabs_1 = angular_jqxtabs_1_1;
            },
            function (angular_jqxlistbox_1_1) {
                angular_jqxlistbox_1 = angular_jqxlistbox_1_1;
            },
            function (angular_jqxpanel_1_1) {
                angular_jqxpanel_1 = angular_jqxpanel_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.source = [
                        'JavaScript Certification - Welcome to our network',
                        'Business Challenges via Web take a part',
                        'jQWidgets better web, less time. Take a tour',
                        'Facebook - you have 7 new notifications',
                        'Twitter - John Doe is following you. Look at his profile',
                        'New videos, take a look at YouTube.com'
                    ];
                    this.flag = false;
                    this.DockingSettings = {
                        orientation: 'horizontal', width: 800, mode: 'docked'
                    };
                    this.CalendarSettings = {
                        width: 180, height: 180
                    };
                    this.TabsSettings = {
                        width: 375, height: 181, selectedItem: 1
                    };
                    this.ListBoxSettings = {
                        source: this.source, width: 375, height: 181
                    };
                    this.PanelSettings = {
                        width: 375, height: 180
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myDocking.createWidget(this.DockingSettings);
                    this.myCalendar.createWidget(this.CalendarSettings);
                    this.myTabs.createWidget(this.TabsSettings);
                    this.myListBox.createWidget(this.ListBoxSettings);
                    this.myPanel.createWidget(this.PanelSettings);
                    this.myDocking.disableWindowResize('window1');
                    this.myDocking.disableWindowResize('window2');
                    this.myDocking.disableWindowResize('window3');
                    this.myDocking.disableWindowResize('window4');
                };
                __decorate([
                    core_1.ViewChild(angular_jqxdocking_1.jqxDockingComponent), 
                    __metadata('design:type', angular_jqxdocking_1.jqxDockingComponent)
                ], AppComponent.prototype, "myDocking", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxcalendar_1.jqxCalendarComponent), 
                    __metadata('design:type', angular_jqxcalendar_1.jqxCalendarComponent)
                ], AppComponent.prototype, "myCalendar", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxtabs_1.jqxTabsComponent), 
                    __metadata('design:type', angular_jqxtabs_1.jqxTabsComponent)
                ], AppComponent.prototype, "myTabs", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxlistbox_1.jqxListBoxComponent), 
                    __metadata('design:type', angular_jqxlistbox_1.jqxListBoxComponent)
                ], AppComponent.prototype, "myListBox", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxpanel_1.jqxPanelComponent), 
                    __metadata('design:type', angular_jqxpanel_1.jqxPanelComponent)
                ], AppComponent.prototype, "myPanel", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: "app/docking/defaultfunctionality/app.component.htm",
                        directives: [angular_jqxdocking_1.jqxDockingComponent, angular_jqxcalendar_1.jqxCalendarComponent, angular_jqxtabs_1.jqxTabsComponent, angular_jqxlistbox_1.jqxListBoxComponent, angular_jqxpanel_1.jqxPanelComponent]
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