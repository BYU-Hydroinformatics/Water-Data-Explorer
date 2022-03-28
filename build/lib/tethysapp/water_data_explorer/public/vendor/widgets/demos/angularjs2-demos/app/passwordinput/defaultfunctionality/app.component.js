/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxpasswordinput', '../../../../../jqwidgets-ts/angular_jqxexpander', '../../../../../jqwidgets-ts/angular_jqxbutton', '../../../../../jqwidgets-ts/angular_jqxvalidator', '../../../../../jqwidgets-ts/angular_jqxinput', '../../../../../jqwidgets-ts/angular_jqxdropdownlist'], function(exports_1, context_1) {
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
    var core_1, angular_jqxpasswordinput_1, angular_jqxexpander_1, angular_jqxbutton_1, angular_jqxvalidator_1, angular_jqxinput_1, angular_jqxdropdownlist_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxpasswordinput_1_1) {
                angular_jqxpasswordinput_1 = angular_jqxpasswordinput_1_1;
            },
            function (angular_jqxexpander_1_1) {
                angular_jqxexpander_1 = angular_jqxexpander_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            },
            function (angular_jqxvalidator_1_1) {
                angular_jqxvalidator_1 = angular_jqxvalidator_1_1;
            },
            function (angular_jqxinput_1_1) {
                angular_jqxinput_1 = angular_jqxinput_1_1;
            },
            function (angular_jqxdropdownlist_1_1) {
                angular_jqxdropdownlist_1 = angular_jqxdropdownlist_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        self.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    var that = this;
                    this.expander.createWidget({
                        toggleMode: 'none',
                        width: '350px',
                        showArrow: false, initContent: function () {
                            var inputSettings = { width: '300px', height: '20px' };
                            var passwordInputSettings = { width: '300px', height: '20px', showStrength: true, showStrengthPosition: "right" };
                            var passwordConfirmInputSettings = { width: '300px', height: '20px' };
                            that.firstNameInput.createWidget(inputSettings);
                            that.lastNameInput.createWidget(inputSettings);
                            that.userNameInput.createWidget(inputSettings);
                            that.passwordInput.createWidget(passwordInputSettings);
                            that.passwordConfirmInput.createWidget(passwordConfirmInputSettings);
                            that.submit.createWidget({});
                        }
                    });
                };
                AppComponent.prototype.ButtonClicked = function () {
                    alert("Submitting Data");
                };
                __decorate([
                    core_1.ViewChild('expanderAng'), 
                    __metadata('design:type', angular_jqxexpander_1.jqxExpanderComponent)
                ], AppComponent.prototype, "expander", void 0);
                __decorate([
                    core_1.ViewChild('firstName'), 
                    __metadata('design:type', angular_jqxinput_1.jqxInputComponent)
                ], AppComponent.prototype, "firstNameInput", void 0);
                __decorate([
                    core_1.ViewChild('lastName'), 
                    __metadata('design:type', angular_jqxinput_1.jqxInputComponent)
                ], AppComponent.prototype, "lastNameInput", void 0);
                __decorate([
                    core_1.ViewChild('userName'), 
                    __metadata('design:type', angular_jqxinput_1.jqxInputComponent)
                ], AppComponent.prototype, "userNameInput", void 0);
                __decorate([
                    core_1.ViewChild('password'), 
                    __metadata('design:type', angular_jqxpasswordinput_1.jqxPasswordInputComponent)
                ], AppComponent.prototype, "passwordInput", void 0);
                __decorate([
                    core_1.ViewChild('passwordConfirm'), 
                    __metadata('design:type', angular_jqxpasswordinput_1.jqxPasswordInputComponent)
                ], AppComponent.prototype, "passwordConfirmInput", void 0);
                __decorate([
                    core_1.ViewChild('submit'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "submit", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/passwordinput/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxpasswordinput_1.jqxPasswordInputComponent, angular_jqxexpander_1.jqxExpanderComponent, angular_jqxbutton_1.jqxButtonComponent, angular_jqxvalidator_1.jqxValidatorComponent, angular_jqxinput_1.jqxInputComponent, angular_jqxdropdownlist_1.jqxDropDownListComponent]
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