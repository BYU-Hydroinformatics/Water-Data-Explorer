System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxnavbar'], function(exports_1, context_1) {
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
    var core_1, angular_jqxnavbar_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxnavbar_1_1) {
                angular_jqxnavbar_1 = angular_jqxnavbar_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        height: 40, selectedItem: 0
                    };
                    this.fifthNavBarSettings = {
                        height: 160, selectedItem: 0
                    };
                    this.sixthNavBarSettings = {
                        height: 40, columns: ['30%', '50%', '20%'], selectedItem: 0
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
                    this.navbar1.createWidget(this.settings);
                    this.navbar2.createWidget(this.settings);
                    this.navbar3.createWidget(this.settings);
                    this.navbar4.createWidget(this.settings);
                    this.navbar5.createWidget(this.fifthNavBarSettings);
                    this.navbar6.createWidget(this.sixthNavBarSettings);
                };
                __decorate([
                    core_1.ViewChild('firstNavBar'), 
                    __metadata('design:type', angular_jqxnavbar_1.jqxNavBarComponent)
                ], AppComponent.prototype, "navbar1", void 0);
                __decorate([
                    core_1.ViewChild('secondNavBar'), 
                    __metadata('design:type', angular_jqxnavbar_1.jqxNavBarComponent)
                ], AppComponent.prototype, "navbar2", void 0);
                __decorate([
                    core_1.ViewChild('thirdNavBar'), 
                    __metadata('design:type', angular_jqxnavbar_1.jqxNavBarComponent)
                ], AppComponent.prototype, "navbar3", void 0);
                __decorate([
                    core_1.ViewChild('fourthNavBar'), 
                    __metadata('design:type', angular_jqxnavbar_1.jqxNavBarComponent)
                ], AppComponent.prototype, "navbar4", void 0);
                __decorate([
                    core_1.ViewChild('fifthNavBar'), 
                    __metadata('design:type', angular_jqxnavbar_1.jqxNavBarComponent)
                ], AppComponent.prototype, "navbar5", void 0);
                __decorate([
                    core_1.ViewChild('sixthNavBar'), 
                    __metadata('design:type', angular_jqxnavbar_1.jqxNavBarComponent)
                ], AppComponent.prototype, "navbar6", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/navbar/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxnavbar_1.jqxNavBarComponent]
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