System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxnumberinput', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxnumberinput_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxnumberinput_1_1) {
                angular_jqxnumberinput_1 = angular_jqxnumberinput_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    var self = this;
                    this.numericInputSettings = { width: '250px', height: '25px', spinButtons: true };
                    this.percentageInputSettings = { width: '250px', height: '25px', digits: 3, symbolPosition: 'right', symbol: '%', spinButtons: true };
                    this.currencyInputSettings = { width: '250px', height: '25px', symbol: '$', spinButtons: true };
                    this.disabledInputSettings = { width: 250, height: 25, disabled: true, spinButtons: true };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.numericInput.createWidget(this.numericInputSettings);
                    this.percentageInput.createWidget(this.percentageInputSettings);
                    this.currencyInput.createWidget(this.currencyInputSettings);
                    this.disabledInput.createWidget(this.disabledInputSettings);
                };
                __decorate([
                    core_1.ViewChild('numericInput'), 
                    __metadata('design:type', angular_jqxnumberinput_1.jqxNumberInputComponent)
                ], AppComponent.prototype, "numericInput", void 0);
                __decorate([
                    core_1.ViewChild('percentageInput'), 
                    __metadata('design:type', angular_jqxnumberinput_1.jqxNumberInputComponent)
                ], AppComponent.prototype, "percentageInput", void 0);
                __decorate([
                    core_1.ViewChild('currencyInput'), 
                    __metadata('design:type', angular_jqxnumberinput_1.jqxNumberInputComponent)
                ], AppComponent.prototype, "currencyInput", void 0);
                __decorate([
                    core_1.ViewChild('disabledInput'), 
                    __metadata('design:type', angular_jqxnumberinput_1.jqxNumberInputComponent)
                ], AppComponent.prototype, "disabledInput", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/numberinput/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxnumberinput_1.jqxNumberInputComponent, angular_jqxbutton_1.jqxButtonComponent]
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