System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxscrollview', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxscrollview_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxscrollview_1_1) {
                angular_jqxscrollview_1 = angular_jqxscrollview_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.theme = 'arctic';
                    this.flag = false;
                    this.scrollViewSettings = {
                        width: 600,
                        height: 450,
                        buttonsOffset: [0, 0],
                        slideShow: false
                    };
                    this.buttonSettings = {
                        width: '110px',
                        height: '15px',
                        theme: this.theme
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnStartClicked = function () {
                    this.scrollView.setOptions({ slideShow: true });
                };
                AppComponent.prototype.OnStopClicked = function () {
                    this.scrollView.setOptions({ slideShow: false });
                };
                AppComponent.prototype.Initialize = function () {
                    this.scrollView.createWidget(this.scrollViewSettings);
                    this.startButton.createWidget(this.buttonSettings);
                    this.stopButton.createWidget(this.buttonSettings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxscrollview_1.jqxScrollViewComponent), 
                    __metadata('design:type', angular_jqxscrollview_1.jqxScrollViewComponent)
                ], AppComponent.prototype, "scrollView", void 0);
                __decorate([
                    core_1.ViewChild('StartBtn'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "startButton", void 0);
                __decorate([
                    core_1.ViewChild('StopBtn'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "stopButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/scrollview/defaultfunctionality/app.component.htm',
                        styleUrls: ['app/scrollview/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxscrollview_1.jqxScrollViewComponent, angular_jqxbutton_1.jqxButtonComponent],
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