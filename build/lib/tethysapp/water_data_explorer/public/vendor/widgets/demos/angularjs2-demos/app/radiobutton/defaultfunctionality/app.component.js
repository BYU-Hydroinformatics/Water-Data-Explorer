/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxradiobutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxradiobutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxradiobutton_1_1) {
                angular_jqxradiobutton_1 = angular_jqxradiobutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.clearLog = function () {
                        var log = document.getElementById('events').getElementsByTagName('span');
                        if (log.length >= 2) {
                            document.getElementById('events').innerHTML = '';
                        }
                    };
                    this.firstRadioButtonSettings = {
                        width: 250,
                        height: 25,
                        checked: true
                    };
                    this.secondRadioButtonSettings = { width: 250, height: 25 };
                    this.thirdRadioButtonSettings = this.secondRadioButtonSettings;
                    this.fourthRadioButtonSettings = { width: 250, height: 25, disabled: true };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        self.Initialize();
                        var angularRadioButtonsDom = document.getElementsByTagName('angularRadioButton');
                        for (var i = 0; i < angularRadioButtonsDom.length; i += 1) {
                            (angularRadioButtonsDom[i].firstElementChild).style.marginTop = '10px';
                        }
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.firstRadioButton.createWidget(this.firstRadioButtonSettings);
                    this.secondRadioButton.createWidget(this.secondRadioButtonSettings);
                    this.thirdRadioButton.createWidget(this.thirdRadioButtonSettings);
                    this.fourthRadioButton.createWidget(this.fourthRadioButtonSettings);
                };
                AppComponent.prototype.OnChangeFirst = function (event) {
                    this.clearLog();
                    var log = document.getElementById('events');
                    var checked = event.args.checked;
                    if (checked) {
                        log.innerHTML += '<div><span>Checked: 12 Months Contract</span></div>';
                    }
                    else {
                        log.innerHTML += '<div><span>Unchecked: 12 Months Contract</span></div>';
                    }
                };
                AppComponent.prototype.OnChangeSecond = function (event) {
                    this.clearLog();
                    var log = document.getElementById('events');
                    var checked = event.args.checked;
                    if (checked) {
                        log.innerHTML += '<div><span>Checked: 6 Months Contract</span></div>';
                    }
                    else {
                        log.innerHTML += '<div><span>Unchecked: 6 Months Contract</span></div>';
                    }
                };
                AppComponent.prototype.OnChangeThird = function (event) {
                    this.clearLog();
                    var log = document.getElementById('events');
                    var checked = event.args.checked;
                    if (checked) {
                        log.innerHTML += '<div><span>Checked: 3 Months Contract</span></div>';
                    }
                    else {
                        log.innerHTML += '<div><span>Unchecked: 3 Months Contract</span></div>';
                    }
                };
                __decorate([
                    core_1.ViewChild('firstRadioButton'), 
                    __metadata('design:type', angular_jqxradiobutton_1.jqxRadioButtonComponent)
                ], AppComponent.prototype, "firstRadioButton", void 0);
                __decorate([
                    core_1.ViewChild('secondRadioButton'), 
                    __metadata('design:type', angular_jqxradiobutton_1.jqxRadioButtonComponent)
                ], AppComponent.prototype, "secondRadioButton", void 0);
                __decorate([
                    core_1.ViewChild('thirdRadioButton'), 
                    __metadata('design:type', angular_jqxradiobutton_1.jqxRadioButtonComponent)
                ], AppComponent.prototype, "thirdRadioButton", void 0);
                __decorate([
                    core_1.ViewChild('fourthRadioButton'), 
                    __metadata('design:type', angular_jqxradiobutton_1.jqxRadioButtonComponent)
                ], AppComponent.prototype, "fourthRadioButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/radiobutton/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxradiobutton_1.jqxRadioButtonComponent]
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