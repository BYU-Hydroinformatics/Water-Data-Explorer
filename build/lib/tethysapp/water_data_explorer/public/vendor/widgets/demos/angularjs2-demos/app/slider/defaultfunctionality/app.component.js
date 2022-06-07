System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxslider'], function(exports_1, context_1) {
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
    var core_1, angular_jqxslider_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxslider_1_1) {
                angular_jqxslider_1 = angular_jqxslider_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.sliderSettings = {
                        width: 350,
                        height: 60,
                        ticksFrequency: 10,
                        min: 0,
                        max: 100
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnChange = function (event) {
                    document.getElementById('eventLog').innerHTML = '(' + parseInt(event.args.value) + ')';
                };
                AppComponent.prototype.Initialize = function () {
                    this.slider.createWidget(this.sliderSettings);
                };
                __decorate([
                    core_1.ViewChild('slider'), 
                    __metadata('design:type', angular_jqxslider_1.jqxSliderComponent)
                ], AppComponent.prototype, "slider", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n             <angularSlider #slider (OnChange)=\"OnChange($event)\"></angularSlider>\n            <div id=\"eventLog\"></div>\n                ",
                        styles: ["\n\n    "],
                        directives: [angular_jqxslider_1.jqxSliderComponent],
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