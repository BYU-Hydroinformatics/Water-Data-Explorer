System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxcomplexinput', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxcomplexinput_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxcomplexinput_1_1) {
                angular_jqxcomplexinput_1 = angular_jqxcomplexinput_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.complexInputSettings = {
                        width: 250,
                        height: 25,
                        value: "15 + 7.2i"
                    };
                    this.ButtonsSettings = {
                        width: 150
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myComplexInput.createWidget(this.complexInputSettings);
                    this.getRealButton.createWidget(this.ButtonsSettings);
                    this.getImaginaryButton.createWidget(this.ButtonsSettings);
                };
                AppComponent.prototype.GetReal = function () {
                    var realPart = this.myComplexInput.getReal();
                    alert("Real part is " + realPart);
                };
                ;
                AppComponent.prototype.GetImaginary = function () {
                    var imaginaryPart = this.myComplexInput.getImaginary();
                    alert("Imaginary part is " + imaginaryPart);
                };
                ;
                __decorate([
                    core_1.ViewChild(angular_jqxcomplexinput_1.jqxComplexInputComponent), 
                    __metadata('design:type', angular_jqxcomplexinput_1.jqxComplexInputComponent)
                ], AppComponent.prototype, "myComplexInput", void 0);
                __decorate([
                    core_1.ViewChild('getReal'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "getRealButton", void 0);
                __decorate([
                    core_1.ViewChild('getImaginary'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "getImaginaryButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<angularComplexInput></angularComplexInput>\n               <div style=\"margin-top: 20px;\">\n                   <angularButton #getReal (OnClick)=\"GetReal($event)\" style=\"display:inline-block\">Get real part</angularButton>\n                   <angularButton #getImaginary (OnClick)=\"GetImaginary($event)\" style=\"display:inline-block\">Get imaginary part</angularButton>\n               </div>",
                        directives: [angular_jqxcomplexinput_1.jqxComplexInputComponent, angular_jqxbutton_1.jqxButtonComponent]
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