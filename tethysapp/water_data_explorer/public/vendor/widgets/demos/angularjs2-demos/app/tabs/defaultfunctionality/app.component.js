System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxtabs', '../../../../../jqwidgets-ts/angular_jqxcheckbox'], function(exports_1, context_1) {
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
    var core_1, angular_jqxtabs_1, angular_jqxcheckbox_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxtabs_1_1) {
                angular_jqxtabs_1 = angular_jqxtabs_1_1;
            },
            function (angular_jqxcheckbox_1_1) {
                angular_jqxcheckbox_1 = angular_jqxcheckbox_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.tabsSettings = {
                        width: '90%',
                        height: 200,
                        position: 'top',
                        selectionTracker: false,
                        animationType: 'none'
                    };
                    this.checkBoxSettings = {};
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        document.getElementById('animation').firstElementChild.style.marginTop = '10px';
                        document.getElementById('contentAnimation').firstElementChild.style.marginTop = '10px';
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnChangeAnimation = function (event) {
                    var checked = event.args.checked;
                    if (checked) {
                        this.tabsSettings['selectionTracker'] = checked;
                        this.tabs.setOptions(this.tabsSettings);
                    }
                    else {
                        this.tabsSettings['selectionTracker'] = checked;
                        this.tabs.setOptions(this.tabsSettings);
                    }
                };
                AppComponent.prototype.OnChangeContentAnimation = function (event) {
                    var checked = event.args.checked;
                    if (checked) {
                        this.tabs.setOptions({ animationType: 'fade' });
                    }
                    else {
                        this.tabs.setOptions({ animationType: 'none' });
                    }
                };
                AppComponent.prototype.Initialize = function () {
                    this.tabs.createWidget(this.tabsSettings);
                    this.checkBox.createWidget(this.checkBoxSettings);
                    this.checkBox2.createWidget(this.checkBoxSettings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxtabs_1.jqxTabsComponent), 
                    __metadata('design:type', angular_jqxtabs_1.jqxTabsComponent)
                ], AppComponent.prototype, "tabs", void 0);
                __decorate([
                    core_1.ViewChild('animation'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "checkBox", void 0);
                __decorate([
                    core_1.ViewChild('contentAnimation'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "checkBox2", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/tabs/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxtabs_1.jqxTabsComponent, angular_jqxcheckbox_1.jqxCheckBoxComponent]
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