/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxloader', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxloader_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxloader_1_1) {
                angular_jqxloader_1 = angular_jqxloader_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        width: 100,
                        height: 60,
                        imagePosition: 'top'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myLoader.createWidget(this.settings);
                    this.closeButton.createWidget({ width: 100 });
                    this.openButton.createWidget({ width: 150 });
                };
                AppComponent.prototype.Open = function (event) {
                    this.myLoader.open();
                };
                AppComponent.prototype.Close = function (event) {
                    this.myLoader.close();
                };
                __decorate([
                    core_1.ViewChild(angular_jqxloader_1.jqxLoaderComponent), 
                    __metadata('design:type', angular_jqxloader_1.jqxLoaderComponent)
                ], AppComponent.prototype, "myLoader", void 0);
                __decorate([
                    core_1.ViewChild('OpenButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "openButton", void 0);
                __decorate([
                    core_1.ViewChild('CloseButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "closeButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<div id='jqxWidgets'>\n                        <angularLoader></angularLoader>\n                        <angularButton style=\"float: left;\" #OpenButton (OnClick) = \"Open($event)\">Open Loader</angularButton>\n                        <angularButton style=\"float: left; margin-left: 10px;\" #CloseButton (OnClick) = \"Close($event)\">Close</angularButton>\n                    </div>",
                        directives: [angular_jqxloader_1.jqxLoaderComponent, angular_jqxbutton_1.jqxButtonComponent]
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