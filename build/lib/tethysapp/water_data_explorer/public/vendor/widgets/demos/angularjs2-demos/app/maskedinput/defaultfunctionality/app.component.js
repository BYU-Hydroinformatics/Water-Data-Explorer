/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxmaskedinput', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxmaskedinput_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxmaskedinput_1_1) {
                angular_jqxmaskedinput_1 = angular_jqxmaskedinput_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.numericInputSettings = { width: '250px', height: '25px' };
                    this.zipCodeInputSettings = { width: 250, height: 25, mask: '#####-####' };
                    this.ssnInputSettings = { width: 250, height: 25, mask: '###-##-####' };
                    this.phoneInputSettings = { width: 250, height: 25, mask: '(###)###-####' };
                    this.regexInputSettings = { width: 250, height: 25, mask: '[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5]' };
                    this.disabledInputSettings = { width: 250, height: 25, disabled: true };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myNumericInput.createWidget(this.numericInputSettings);
                    this.myZipCodeInput.createWidget(this.zipCodeInputSettings);
                    this.mySsnInput.createWidget(this.ssnInputSettings);
                    this.myPhoneInput.createWidget(this.phoneInputSettings);
                    this.myRegexInput.createWidget(this.regexInputSettings);
                    this.myDisabledInput.createWidget(this.disabledInputSettings);
                    this.clear.createWidget({});
                };
                AppComponent.prototype.Clear = function (event) {
                    this.myNumericInput.clear();
                    this.myZipCodeInput.clear();
                    this.mySsnInput.clear();
                    this.myPhoneInput.clear();
                    this.myRegexInput.clear();
                    this.myDisabledInput.clear();
                };
                __decorate([
                    core_1.ViewChild('numericInput'), 
                    __metadata('design:type', angular_jqxmaskedinput_1.jqxMaskedInputComponent)
                ], AppComponent.prototype, "myNumericInput", void 0);
                __decorate([
                    core_1.ViewChild('zipCodeInput'), 
                    __metadata('design:type', angular_jqxmaskedinput_1.jqxMaskedInputComponent)
                ], AppComponent.prototype, "myZipCodeInput", void 0);
                __decorate([
                    core_1.ViewChild('ssnInput'), 
                    __metadata('design:type', angular_jqxmaskedinput_1.jqxMaskedInputComponent)
                ], AppComponent.prototype, "mySsnInput", void 0);
                __decorate([
                    core_1.ViewChild('phoneInput'), 
                    __metadata('design:type', angular_jqxmaskedinput_1.jqxMaskedInputComponent)
                ], AppComponent.prototype, "myPhoneInput", void 0);
                __decorate([
                    core_1.ViewChild('regexInput'), 
                    __metadata('design:type', angular_jqxmaskedinput_1.jqxMaskedInputComponent)
                ], AppComponent.prototype, "myRegexInput", void 0);
                __decorate([
                    core_1.ViewChild('disabledInput'), 
                    __metadata('design:type', angular_jqxmaskedinput_1.jqxMaskedInputComponent)
                ], AppComponent.prototype, "myDisabledInput", void 0);
                __decorate([
                    core_1.ViewChild('clearButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "clear", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<div id='jqxWidgets'>\n                        <div style='margin-top: 10px;'>Numeric</div>\n                        <angularMaskedInput #numericInput></angularMaskedInput>\n                        <div style='margin-top: 10px;'>Zip Code</div>\n                        <angularMaskedInput #zipCodeInput></angularMaskedInput>\n                        <div style='margin-top: 10px;'>SSN</div>\n                        <angularMaskedInput #ssnInput></angularMaskedInput>\n                        <div style='margin-top: 10px;'>Phone Number</div>\n                        <angularMaskedInput #phoneInput></angularMaskedInput>\n                        <div style='margin-top: 10px;'>IP Address (ex: 255.255.255.255)</div>\n                        <angularMaskedInput #regexInput></angularMaskedInput>\n                        <div style='margin-top: 10px;'>Disabled</div>\n                        <angularMaskedInput #disabledInput></angularMaskedInput>\n                        <angularButton style=\"display: inline-block;\" #clearButton (OnClick) = \"Clear($event)\">Clear</angularButton>\n                    </div>",
                        directives: [angular_jqxmaskedinput_1.jqxMaskedInputComponent, angular_jqxbutton_1.jqxButtonComponent]
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