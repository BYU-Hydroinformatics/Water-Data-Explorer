System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdockpanel'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdockpanel_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdockpanel_1_1) {
                angular_jqxdockpanel_1 = angular_jqxdockpanel_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        width: 300, height: 210
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        var self = this;
                        var dockpanels = document.getElementsByTagName('angularDockPanel');
                        dockpanels[0].style.color = '#fff';
                        dockpanels[1].style.color = '#fff';
                        this.InitializeSecondDockPanel();
                        for (var i = 0; i < 4; i++) {
                            dockpanels[1].children[0].children[0].children[i].style.width = '20px';
                            dockpanels[1].children[0].children[0].children[i].style.height = '20px';
                        }
                        var LayoutElement = document.getElementById('layout');
                        var firstElement = document.getElementById('first');
                        var secondElement = document.getElementById('second');
                        var thirdElement = document.getElementById('third');
                        var fourthElement = document.getElementById('fourth');
                        LayoutElement.addEventListener('click', function (event) {
                            var position = parseInt(event.clientX) - parseInt(event.target.offsetLeft);
                            for (var i = 0; i < 4; i++) {
                                dockpanels[0].children[0].children[0].children[i].style.width = 'auto';
                                dockpanels[0].children[0].children[0].children[i].style.height = 'auto';
                            }
                            if (position < 55) {
                                firstElement.setAttribute('dock', 'bottom');
                                firstElement.style.height = '105px';
                                secondElement.setAttribute('dock', 'left');
                                secondElement.style.width = '100px';
                                thirdElement.setAttribute('dock', 'left');
                                thirdElement.style.width = '100px';
                                fourthElement.setAttribute('dock', 'left');
                                fourthElement.style.width = '100px';
                            }
                            else if (position < 115) {
                                for (var i = 0; i < 4; i++) {
                                    dockpanels[0].children[0].children[0].children[i].style.width = '100px';
                                }
                                firstElement.setAttribute('dock', 'left');
                                secondElement.setAttribute('dock', 'right');
                                thirdElement.setAttribute('dock', 'bottom');
                                thirdElement.style.height = '140px';
                                fourthElement.setAttribute('dock', 'top');
                                fourthElement.style.height = '70px';
                            }
                            else if (position < 175) {
                                for (var i = 0; i < 4; i++) {
                                    dockpanels[0].children[0].children[0].children[i].style.width = '150px';
                                }
                                firstElement.setAttribute('dock', 'left');
                                secondElement.setAttribute('dock', 'left');
                                thirdElement.setAttribute('dock', 'left');
                                fourthElement.setAttribute('dock', 'left');
                            }
                            else if (position < 235) {
                                for (var i = 0; i < 4; i++) {
                                    dockpanels[0].children[0].children[0].children[i].style.height = '70px';
                                }
                                firstElement.setAttribute('dock', 'top');
                                secondElement.setAttribute('dock', 'top');
                                thirdElement.setAttribute('dock', 'top');
                                fourthElement.setAttribute('dock', 'top');
                            }
                            else {
                                for (var i = 0; i < 4; i++) {
                                    dockpanels[0].children[0].children[0].children[i].style.width = '100px';
                                }
                                firstElement.setAttribute('dock', 'left');
                                secondElement.setAttribute('dock', 'left');
                                thirdElement.setAttribute('dock', 'left');
                                fourthElement.setAttribute('dock', 'left');
                            }
                            self.myjqxDockPanel.widgetObject.refresh();
                        }, true);
                    }
                    this.InitializeFirstDockPanel();
                    this.flag = true;
                };
                AppComponent.prototype.InitializeFirstDockPanel = function () {
                    this.myjqxDockPanel.createWidget(this.settings);
                };
                AppComponent.prototype.InitializeSecondDockPanel = function () {
                    this.myjqxDockPanel2.createWidget(this.settings);
                    this.myjqxDockPanel2.setOptions({ lastchildfill: false });
                };
                __decorate([
                    core_1.ViewChild('jqxDockPanel'), 
                    __metadata('design:type', angular_jqxdockpanel_1.jqxDockPanelComponent)
                ], AppComponent.prototype, "myjqxDockPanel", void 0);
                __decorate([
                    core_1.ViewChild('jqxDockPanel2'), 
                    __metadata('design:type', angular_jqxdockpanel_1.jqxDockPanelComponent)
                ], AppComponent.prototype, "myjqxDockPanel2", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: "app/dockpanel/defaultfunctionality/app.component.htm",
                        styles: ["\n        .jqx-layout-group-auto-hide-content-vertical\n        {\n            width: 200px;\n        }\n    "],
                        directives: [angular_jqxdockpanel_1.jqxDockPanelComponent]
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