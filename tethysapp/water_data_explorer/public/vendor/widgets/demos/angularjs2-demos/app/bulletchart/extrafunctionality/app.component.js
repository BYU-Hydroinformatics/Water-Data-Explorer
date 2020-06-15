System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxbulletchart'], function(exports_1, context_1) {
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
    var core_1, angular_jqxbulletchart_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxbulletchart_1_1) {
                angular_jqxbulletchart_1 = angular_jqxbulletchart_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        width: 500,
                        height: 80,
                        barSize: "40%",
                        title: "Revenue 2014 YTD",
                        description: "(U.S. $ in thousands)",
                        ranges: [
                            { startValue: 0, endValue: 200, color: "#000000", opacity: 0.5 },
                            { startValue: 200, endValue: 250, color: "#000000", opacity: 0.3 },
                            { startValue: 250, endValue: 300, color: "#000000", opacity: 0.1 }
                        ],
                        pointer: { value: 270, label: "Revenue 2014 YTD", size: "25%", color: "Black" },
                        target: { value: 260, label: "Revenue 2013 YTD", size: 4, color: "Black" },
                        ticks: { position: "both", interval: 50, size: 10 },
                        labelsFormat: "c",
                        showTooltip: true
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myBulletChart.createWidget(this.settings);
                };
                AppComponent.prototype.doUpdate = function () {
                    var updatedSettings = {
                        ranges: [
                            { startValue: 0, endValue: 200, color: "#CC0000", opacity: 1 },
                            { startValue: 200, endValue: 250, color: "#FFD633", opacity: 1 },
                            { startValue: 250, endValue: 300, color: "#00CC00", opacity: 1 }
                        ],
                        pointer: { value: 270, label: "Revenue 2014 YTD", size: "25%", color: "" },
                        target: { value: 260, label: "Revenue 2013 YTD", size: 4, color: "" }
                    };
                    this.myBulletChart.setOptions(updatedSettings);
                    this.myBulletChart.val(150);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxbulletchart_1.jqxBulletChartComponent), 
                    __metadata('design:type', angular_jqxbulletchart_1.jqxBulletChartComponent)
                ], AppComponent.prototype, "myBulletChart", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<angularBulletChart></angularBulletChart>\n               <button (click)=\"doUpdate()\">update settings</button>",
                        directives: [angular_jqxbulletchart_1.jqxBulletChartComponent]
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