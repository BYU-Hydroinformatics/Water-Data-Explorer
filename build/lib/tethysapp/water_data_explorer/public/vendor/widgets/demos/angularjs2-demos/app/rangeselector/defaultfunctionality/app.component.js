/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxrangeselector', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxrangeselector_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxrangeselector_1_1) {
                angular_jqxrangeselector_1 = angular_jqxrangeselector_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        width: 750,
                        height: 100,
                        min: 0,
                        max: 200,
                        range: { from: 10, to: 50 },
                        majorTicksInterval: 10,
                        minorTicksInterval: 1
                    };
                    this.setButtonSettings = {};
                    this.getButtonSettings = this.setButtonSettings;
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        self.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myRangeSelector.createWidget(this.settings);
                    this.setButton.createWidget(this.setButtonSettings);
                    this.getButton.createWidget(this.getButtonSettings);
                };
                AppComponent.prototype.OnClickGet = function () {
                    var range = this.myRangeSelector.getRange();
                    alert("The selected range is from " + range.from + " to " + range.to);
                };
                AppComponent.prototype.OnClickSet = function () {
                    this.myRangeSelector.setRange(30, 70);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxrangeselector_1.jqxRangeSelectorComponent), 
                    __metadata('design:type', angular_jqxrangeselector_1.jqxRangeSelectorComponent)
                ], AppComponent.prototype, "myRangeSelector", void 0);
                __decorate([
                    core_1.ViewChild('getButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "getButton", void 0);
                __decorate([
                    core_1.ViewChild('setButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "setButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/rangeselector/defaultfunctionality/app.component.htm',
                        styles: [
                            "angularButton {\n            float: left;            \n        }",
                            "angularButton:last-child {\n            margin-left: 10px;           \n        }"
                        ],
                        directives: [angular_jqxrangeselector_1.jqxRangeSelectorComponent, angular_jqxbutton_1.jqxButtonComponent]
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