System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxwindow', '../../../../../jqwidgets-ts/angular_jqxbutton', '../../../../../jqwidgets-ts/angular_jqxcheckbox', '../../../../../jqwidgets-ts/angular_jqxtabs'], function(exports_1, context_1) {
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
    var core_1, angular_jqxwindow_1, angular_jqxbutton_1, angular_jqxcheckbox_1, angular_jqxtabs_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxwindow_1_1) {
                angular_jqxwindow_1 = angular_jqxwindow_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            },
            function (angular_jqxcheckbox_1_1) {
                angular_jqxcheckbox_1 = angular_jqxcheckbox_1_1;
            },
            function (angular_jqxtabs_1_1) {
                angular_jqxtabs_1 = angular_jqxtabs_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.offSetLeft = 250;
                    this.offSetTop = 50;
                    this.flag = false;
                    this.showWindowButtonSettings = {
                        width: '70px'
                    };
                    this.hideWindowButtonSettings = {
                        width: '70px'
                    };
                    this.resizeCheckBoxSettings = {
                        width: '185px',
                        checked: true
                    };
                    this.dragCheckBoxSettings = {
                        width: '185px',
                        checked: true
                    };
                    this.tabSettings = {
                        width: '100%',
                        height: '100%'
                    };
                    var self = this;
                    this.windowSettings = {
                        height: 300,
                        width: 500,
                        maxHeight: 400,
                        maxWidth: 700,
                        minHeight: 200,
                        minWidth: 200,
                        position: { x: this.offSetLeft + 50, y: this.offSetTop + 50 },
                        showCollapseButton: true,
                        initContent: function () {
                            self.tab.createWidget(self.tabSettings);
                            self.window.focus();
                        }
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.jqxWidget = document.getElementById('jqxWidget');
                        this.offSetLeft = this.jqxWidget.offsetLeft;
                        this.offSetTop = this.jqxWidget.offsetTop;
                        // Button styles
                        document.getElementById('showWindowButton').firstElementChild.style.display = 'inline-block';
                        document.getElementById('hideWindowButton').firstElementChild.style.display = 'inline-block';
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnResizeCheckBox = function (event) {
                    if (event.args.checked) {
                        this.window.setOptions({ resizable: true });
                    }
                    else {
                        this.window.setOptions({ resizable: false });
                    }
                };
                AppComponent.prototype.OnDragCheckBox = function (event) {
                    if (event.args.checked) {
                        this.window.setOptions({ draggable: true });
                    }
                    else {
                        this.window.setOptions({ draggable: false });
                    }
                };
                AppComponent.prototype.OnShowButton = function (event) {
                    this.window.open();
                };
                AppComponent.prototype.OnHideButton = function (event) {
                    this.window.close();
                };
                AppComponent.prototype.Initialize = function () {
                    var self = this;
                    this.showWindowButton.createWidget(this.showWindowButtonSettings);
                    this.hideWindowButton.createWidget(this.hideWindowButtonSettings);
                    this.resizeCheckBox.createWidget(this.resizeCheckBoxSettings);
                    this.dragCheckBox.createWidget(this.dragCheckBoxSettings);
                    this.window.createWidget(this.windowSettings);
                    this.tab.setOptions(this.tabSettings); // SetTab options again, because they are only accepted if applied from here. Not from within a function !
                };
                __decorate([
                    core_1.ViewChild(angular_jqxwindow_1.jqxWindowComponent), 
                    __metadata('design:type', angular_jqxwindow_1.jqxWindowComponent)
                ], AppComponent.prototype, "window", void 0);
                __decorate([
                    core_1.ViewChild('showWindowButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "showWindowButton", void 0);
                __decorate([
                    core_1.ViewChild('hideWindowButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "hideWindowButton", void 0);
                __decorate([
                    core_1.ViewChild('resizeCheckBox'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "resizeCheckBox", void 0);
                __decorate([
                    core_1.ViewChild('dragCheckBox'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "dragCheckBox", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxtabs_1.jqxTabsComponent), 
                    __metadata('design:type', angular_jqxtabs_1.jqxTabsComponent)
                ], AppComponent.prototype, "tab", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/window/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxwindow_1.jqxWindowComponent, angular_jqxbutton_1.jqxButtonComponent, angular_jqxcheckbox_1.jqxCheckBoxComponent, angular_jqxtabs_1.jqxTabsComponent]
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