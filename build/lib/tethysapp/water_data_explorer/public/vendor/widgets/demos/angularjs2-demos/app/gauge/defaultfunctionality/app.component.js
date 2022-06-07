/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxgauge'], function(exports_1, context_1) {
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
    var core_1, angular_jqxgauge_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxgauge_1_1) {
                angular_jqxgauge_1 = angular_jqxgauge_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        ranges: [{ startValue: 0, endValue: 55, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 5, startWidth: 1 },
                            { startValue: 55, endValue: 110, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 10, startWidth: 5 },
                            { startValue: 110, endValue: 165, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 13, startWidth: 10 },
                            { startValue: 165, endValue: 220, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 16, startWidth: 13 }],
                        ticksMinor: { interval: 5, size: '5%' },
                        ticksMajor: { interval: 10, size: '9%' },
                        value: 0,
                        colorScheme: 'scheme05',
                        animationDuration: 1200
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myGauge.createWidget(this.settings);
                    this.myGauge.setOptions({ value: 140 });
                };
                AppComponent.prototype.GaugeOnValueChanging = function (event) {
                    var gaugeValueDom = document.getElementById('gaugeValue');
                    gaugeValueDom.innerText = Math.round(event.args.value) + ' kph';
                };
                __decorate([
                    core_1.ViewChild(angular_jqxgauge_1.jqxGaugeComponent), 
                    __metadata('design:type', angular_jqxgauge_1.jqxGaugeComponent)
                ], AppComponent.prototype, "myGauge", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <angularGauge (OnValueChanging)=\"GaugeOnValueChanging($event)\"></angularGauge>\n        <div id=\"gaugeValue\" style=\"position: absolute; top: 235px; left: 132px; font-family: Sans-Serif; text-align: center; font-size: 17px; width: 70px;\"></div>\n    ",
                        styleUrls: ['app/gauge/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxgauge_1.jqxGaugeComponent]
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