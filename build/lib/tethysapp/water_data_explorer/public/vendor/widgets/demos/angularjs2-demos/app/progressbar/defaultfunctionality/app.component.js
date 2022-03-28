/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxprogressbar', '../../../../../jqwidgets-ts/angular_jqxbutton', '../../../../../jqwidgets-ts/angular_jqxcheckbox'], function(exports_1, context_1) {
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
    var core_1, angular_jqxprogressbar_1, angular_jqxbutton_1, angular_jqxcheckbox_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxprogressbar_1_1) {
                angular_jqxprogressbar_1 = angular_jqxprogressbar_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            },
            function (angular_jqxcheckbox_1_1) {
                angular_jqxcheckbox_1 = angular_jqxcheckbox_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.isUpdated = false;
                    this.renderText = function (text) {
                        return "<span class='jqx-rc-all' style='background: #ffe8a6; color: #e53d37; font-style: italic;'>" + text + "</span>";
                    };
                    this.getValueInput = function () {
                        return parseInt(document.getElementById('ValueInput').value);
                    };
                    this.horizontalProgressBarSettings = {
                        width: 250,
                        height: 30,
                        value: 50
                    };
                    this.verticalProgressBarSettings = {
                        width: 30,
                        height: 250,
                        value: 50,
                        orientation: 'vertical'
                    };
                    this.buttonsSettings = {};
                    this.checkBoxSettings = {};
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        self.Initialize();
                        document.getElementsByTagName('angularButton')[0].firstElementChild.style.display = 'inline-block';
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myHorizontalProgressBar.createWidget(this.horizontalProgressBarSettings);
                    this.myVerticalProgressBar.createWidget(this.verticalProgressBarSettings);
                    this.button.createWidget(this.buttonsSettings);
                    this.checkbox.createWidget(this.checkBoxSettings);
                    this.customtextcheckbox.createWidget(this.checkBoxSettings);
                };
                AppComponent.prototype.OnClick = function () {
                    var value = this.getValueInput();
                    if (!isNaN(value)) {
                        this.valueInput = value;
                        this.myHorizontalProgressBar.val(value);
                        this.myVerticalProgressBar.val(value);
                        this.isUpdated = true;
                    }
                };
                AppComponent.prototype.OnCheckbox = function (event) {
                    var value = this.getValueInput();
                    if (value != null && this.isUpdated) {
                        this.horizontalProgressBarSettings.value = this.valueInput;
                        this.verticalProgressBarSettings.value = this.valueInput;
                    }
                    var isChecked = event.args.checked;
                    this.horizontalProgressBarSettings.showText = isChecked;
                    this.myHorizontalProgressBar.setOptions(this.horizontalProgressBarSettings);
                    this.verticalProgressBarSettings.showText = isChecked;
                    this.myVerticalProgressBar.setOptions(this.verticalProgressBarSettings);
                };
                AppComponent.prototype.OnCustomtextcheckbox = function (event) {
                    var value = this.getValueInput();
                    if (value != null && this.isUpdated) {
                        this.horizontalProgressBarSettings.value = this.valueInput;
                        this.verticalProgressBarSettings.value = this.valueInput;
                    }
                    if (event.args.checked) {
                        this.horizontalProgressBarSettings.renderText = this.renderText;
                        this.myHorizontalProgressBar.setOptions(this.horizontalProgressBarSettings);
                        this.verticalProgressBarSettings.renderText = this.renderText;
                        this.myVerticalProgressBar.setOptions(this.verticalProgressBarSettings);
                    }
                    else {
                        this.horizontalProgressBarSettings.renderText = null;
                        this.myHorizontalProgressBar.setOptions(this.horizontalProgressBarSettings);
                        this.verticalProgressBarSettings.renderText = null;
                        this.myVerticalProgressBar.setOptions(this.verticalProgressBarSettings);
                    }
                };
                __decorate([
                    core_1.ViewChild('horizontal'), 
                    __metadata('design:type', angular_jqxprogressbar_1.jqxProgressBarComponent)
                ], AppComponent.prototype, "myHorizontalProgressBar", void 0);
                __decorate([
                    core_1.ViewChild('vertical'), 
                    __metadata('design:type', angular_jqxprogressbar_1.jqxProgressBarComponent)
                ], AppComponent.prototype, "myVerticalProgressBar", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxbutton_1.jqxButtonComponent), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "button", void 0);
                __decorate([
                    core_1.ViewChild('checkbox'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "checkbox", void 0);
                __decorate([
                    core_1.ViewChild('customtextcheckbox'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "customtextcheckbox", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/progressbar/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxprogressbar_1.jqxProgressBarComponent, angular_jqxbutton_1.jqxButtonComponent, angular_jqxcheckbox_1.jqxCheckBoxComponent]
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