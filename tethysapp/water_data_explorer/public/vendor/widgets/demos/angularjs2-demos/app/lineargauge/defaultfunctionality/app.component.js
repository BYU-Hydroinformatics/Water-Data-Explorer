System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxlineargauge', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxlineargauge_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxlineargauge_1_1) {
                angular_jqxlineargauge_1 = angular_jqxlineargauge_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.buttonSettings = {};
                    this.flag = false;
                    var majorTicks = { size: '10%', interval: 10 }, minorTicks = { size: '5%', interval: 2.5, style: { 'stroke-width': 1, stroke: '#aaaaaa' } }, labels = { interval: 20 };
                    this.settings = {
                        orientation: 'vertical',
                        width: 100,
                        height: 350,
                        ticksMajor: { size: '10%', interval: 10 },
                        ticksMinor: { size: '5%', interval: 2.5, style: { 'stroke-width': 1, stroke: '#aaaaaa' } },
                        max: 60,
                        pointer: { size: '5%' },
                        colorScheme: 'scheme05',
                        labels: {
                            interval: 20, formatValue: function (value, position) {
                                if (position === 'far') {
                                    value = (9 / 5) * value + 32;
                                    if (value === -76) {
                                        return '°F';
                                    }
                                    return value + '°';
                                }
                                if (value === -60) {
                                    return '°C';
                                }
                                return value + '°';
                            }
                        },
                        ranges: [
                            { startValue: -10, endValue: 10, style: { fill: '#FFF157', stroke: '#FFF157' } },
                            { startValue: 10, endValue: 35, style: { fill: '#FFA200', stroke: '#FFA200' } },
                            { startValue: 35, endValue: 60, style: { fill: '#FF4800', stroke: '#FF4800' } }],
                        animationDuration: 1500
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        self.Initialize();
                        self.myLinearGauge.val(40);
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myLinearGauge.createWidget(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxlineargauge_1.jqxLinearGaugeComponent), 
                    __metadata('design:type', angular_jqxlineargauge_1.jqxLinearGaugeComponent)
                ], AppComponent.prototype, "myLinearGauge", void 0);
                __decorate([
                    core_1.ViewChild('updateButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "myButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<div id='jqxWidgets'> \n                       <angularLinearGauge style=\"margin-left: 60px; float: left;\"></angularLinearGauge>\n                   </div>",
                        directives: [angular_jqxlineargauge_1.jqxLinearGaugeComponent, angular_jqxbutton_1.jqxButtonComponent],
                        encapsulation: core_1.ViewEncapsulation.None
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