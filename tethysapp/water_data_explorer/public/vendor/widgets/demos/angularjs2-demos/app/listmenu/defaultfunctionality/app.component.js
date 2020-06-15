/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxlistmenu'], function(exports_1, context_1) {
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
    var core_1, angular_jqxlistmenu_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxlistmenu_1_1) {
                angular_jqxlistmenu_1 = angular_jqxlistmenu_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        autoSeparators: true, enableScrolling: false, showHeader: true, width: '600px', placeHolder: 'Find contact...'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myListMenu.createWidget(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxlistmenu_1.jqxListMenuComponent), 
                    __metadata('design:type', angular_jqxlistmenu_1.jqxListMenuComponent)
                ], AppComponent.prototype, "myListMenu", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        styles: [
                            "#list img\n        {\n            width: 50px;\n            height: 55px;\n        }",
                            "#list div\n        {\n            margin-top: -35px;\n            margin-left: 80px;\n        }",
                            ".jqx-listmenu-item\n        {\n            padding: 0px;\n            min-height: 57px;\n        }"
                        ],
                        templateUrl: 'app/listmenu/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxlistmenu_1.jqxListMenuComponent]
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