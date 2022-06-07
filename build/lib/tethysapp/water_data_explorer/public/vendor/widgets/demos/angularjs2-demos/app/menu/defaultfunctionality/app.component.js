System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxmenu', '../../../../../jqwidgets-ts/angular_jqxcheckbox'], function(exports_1, context_1) {
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
    var core_1, angular_jqxmenu_1, angular_jqxcheckbox_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxmenu_1_1) {
                angular_jqxmenu_1 = angular_jqxmenu_1_1;
            },
            function (angular_jqxcheckbox_1_1) {
                angular_jqxcheckbox_1 = angular_jqxcheckbox_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        width: '670', height: '30px'
                    };
                    this.checkBoxSettings = {
                        width: '150px', height: '20px'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        self.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myMenu.createWidget(this.settings);
                    this.checkBoxSettings.checked = true;
                    this.myAnimationCheckBox.createWidget(this.checkBoxSettings);
                    this.myHoverCheckBox.createWidget(this.checkBoxSettings);
                    this.myOpenCheckBox.createWidget(this.checkBoxSettings);
                    this.checkBoxSettings.checked = false;
                    this.myDisabledCheckBox.createWidget(this.checkBoxSettings);
                    this.checkBoxSettings = { width: '200px', height: '20px' };
                    this.myTopLevelArrowsCheckBox.createWidget(this.checkBoxSettings);
                };
                AppComponent.prototype.AnimationOnChange = function (event) {
                    var value = event.args.checked;
                    // enable or disable the menu's animation.
                    if (!value) {
                        this.settings = {
                            animationShowDuration: 0,
                            animationHideDuration: 0,
                            animationShowDelay: 0
                        };
                        this.myMenu.setOptions(this.settings);
                    }
                    else {
                        this.settings = {
                            animationShowDuration: 300,
                            animationHideDuration: 200,
                            animationShowDelay: 200
                        };
                        this.myMenu.setOptions(this.settings);
                    }
                };
                AppComponent.prototype.DisabledOnChange = function (event) {
                    var value = event.args.checked;
                    // enable or disable the menu
                    if (!value) {
                        this.settings = { disabled: false };
                        this.myMenu.setOptions(this.settings);
                    }
                    else {
                        this.settings = { disabled: true };
                        this.myMenu.setOptions(this.settings);
                    }
                };
                AppComponent.prototype.HoverOnChange = function (event) {
                    var value = event.args.checked;
                    // enable or disable the menu's hover effect.
                    if (!value) {
                        this.settings = { enableHover: false };
                        this.myMenu.setOptions(this.settings);
                    }
                    else {
                        this.settings = { enableHover: true };
                        this.myMenu.setOptions(this.settings);
                    }
                };
                AppComponent.prototype.OpenOnChange = function (event) {
                    var value = event.args.checked;
                    // enable or disable the opening of the top level menu items when the user hovers them.
                    if (!value) {
                        this.settings = { autoOpen: false };
                        this.myMenu.setOptions(this.settings);
                    }
                    else {
                        this.settings = { autoOpen: true };
                        this.myMenu.setOptions(this.settings);
                    }
                };
                AppComponent.prototype.TopLevelArrowsOnChange = function (event) {
                    var value = event.args.checked;
                    // enable or disable the top level arrows.
                    if (!value) {
                        this.settings = { showTopLevelArrows: false };
                        this.myMenu.setOptions(this.settings);
                    }
                    else {
                        this.settings = { showTopLevelArrows: true };
                        this.myMenu.setOptions(this.settings);
                    }
                };
                __decorate([
                    core_1.ViewChild(angular_jqxmenu_1.jqxMenuComponent), 
                    __metadata('design:type', angular_jqxmenu_1.jqxMenuComponent)
                ], AppComponent.prototype, "myMenu", void 0);
                __decorate([
                    core_1.ViewChild('animation'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "myAnimationCheckBox", void 0);
                __decorate([
                    core_1.ViewChild('disabled'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "myDisabledCheckBox", void 0);
                __decorate([
                    core_1.ViewChild('hover'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "myHoverCheckBox", void 0);
                __decorate([
                    core_1.ViewChild('open'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "myOpenCheckBox", void 0);
                __decorate([
                    core_1.ViewChild('topLevelArrows'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "myTopLevelArrowsCheckBox", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/menu/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxmenu_1.jqxMenuComponent, angular_jqxcheckbox_1.jqxCheckBoxComponent],
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