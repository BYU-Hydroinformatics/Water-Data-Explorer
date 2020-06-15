System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxbutton', '../../../../../jqwidgets-ts/angular_jqxinput', '../../../../../jqwidgets-ts/angular_jqxvalidator'], function(exports_1, context_1) {
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
    var core_1, angular_jqxbutton_1, angular_jqxinput_1, angular_jqxvalidator_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            },
            function (angular_jqxinput_1_1) {
                angular_jqxinput_1 = angular_jqxinput_1_1;
            },
            function (angular_jqxvalidator_1_1) {
                angular_jqxvalidator_1 = angular_jqxvalidator_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.validatorSettings = {
                        rules: [
                            {
                                input: '#userInput',
                                message: 'Username is required!',
                                action: 'keyup, blur, change',
                                rule: 'required'
                            },
                            {
                                input: '#emailInput',
                                message: 'E-mail is required!',
                                action: 'keyup, blur, change',
                                rule: 'required'
                            }
                        ]
                    };
                }
                AppComponent.prototype.OnSend = function () {
                    this.validator.validate(document.getElementById('testForm'));
                };
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.button.createWidget({});
                    this.userInput.createWidget(this.inputSettings);
                    this.emailInput.createWidget(this.inputSettings);
                    this.validator.createWidget(this.validatorSettings);
                };
                __decorate([
                    core_1.ViewChild('userInput'), 
                    __metadata('design:type', angular_jqxinput_1.jqxInputComponent)
                ], AppComponent.prototype, "userInput", void 0);
                __decorate([
                    core_1.ViewChild('emailInput'), 
                    __metadata('design:type', angular_jqxinput_1.jqxInputComponent)
                ], AppComponent.prototype, "emailInput", void 0);
                __decorate([
                    core_1.ViewChild('button'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "button", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxvalidator_1.jqxValidatorComponent), 
                    __metadata('design:type', angular_jqxvalidator_1.jqxValidatorComponent)
                ], AppComponent.prototype, "validator", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/validator/defaultfunctionality/app.component.htm',
                        styleUrls: ['app/validator/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxbutton_1.jqxButtonComponent, angular_jqxvalidator_1.jqxValidatorComponent, angular_jqxinput_1.jqxInputComponent],
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