System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxtoolbar', '../../../../../jqwidgets-ts/angular_jqxbutton', '../../../../../jqwidgets-ts/angular_jqxdropdownlist', '../../../../../jqwidgets-ts/angular_jqxcombobox', '../../../../../jqwidgets-ts/angular_jqxinput'], function(exports_1, context_1) {
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
    var core_1, angular_jqxtoolbar_1, angular_jqxbutton_1, angular_jqxdropdownlist_1, angular_jqxcombobox_1, angular_jqxinput_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxtoolbar_1_1) {
                angular_jqxtoolbar_1 = angular_jqxtoolbar_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            },
            function (angular_jqxdropdownlist_1_1) {
                angular_jqxdropdownlist_1 = angular_jqxdropdownlist_1_1;
            },
            function (angular_jqxcombobox_1_1) {
                angular_jqxcombobox_1 = angular_jqxcombobox_1_1;
            },
            function (angular_jqxinput_1_1) {
                angular_jqxinput_1 = angular_jqxinput_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.theme = 'arctic';
                    var self = this;
                    this.toolBarSettings = {
                        width: 700,
                        height: 35,
                        tools: 'toggleButton toggleButton toggleButton | toggleButton | dropdownlist combobox',
                        initTools: function (type, index, tool, menuToolIninitialization) {
                            if (type == "toggleButton") {
                                var icon = document.createElement('div');
                                icon.className = 'jqx-editor-toolbar-icon jqx-editor-toolbar-icon-' + this.theme + ' buttonIcon ';
                            }
                            switch (index) {
                                case 0:
                                    icon.className += "jqx-editor-toolbar-icon-bold jqx-editor-toolbar-icon-bold-" + this.theme;
                                    icon.setAttribute("title", "Bold");
                                    tool[0].appendChild(icon);
                                    break;
                                case 1:
                                    icon.className += "jqx-editor-toolbar-icon-italic jqx-editor-toolbar-icon-italic-" + this.theme;
                                    icon.setAttribute("title", "Italic");
                                    tool[0].appendChild(icon);
                                    break;
                                case 2:
                                    icon.className += "jqx-editor-toolbar-icon-underline jqx-editor-toolbar-icon-underline-" + this.theme;
                                    icon.setAttribute("title", "Underline");
                                    tool[0].appendChild(icon);
                                    break;
                                case 3:
                                    tool[0].innerText = 'Enabled';
                                    break;
                                case 4:
                                    jqxDropDownList(tool[0], {
                                        source: ["Item 1", "Item 2", "Item 3"]
                                    });
                                    break;
                                case 5:
                                    jqxComboBox(tool[0], {
                                        source: ["Item 1", "Item 2", "Item 3"]
                                    });
                                    break;
                            }
                        }
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    var classes = 'jqx-editor-toolbar-icon jqx-editor-toolbar-icon-' + this.theme + ' buttonIcon ';
                    if (this.flag === false) {
                        var wrapper = (document.getElementsByTagName('angularButton'))[0];
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.addIcons = function (classes, type, buttonIndex) {
                    var icon = document.createElement('div');
                    icon.className = classes;
                    icon.setAttribute("title", type);
                    document.getElementsByClassName('jqx-button')[buttonIndex].appendChild(icon);
                };
                AppComponent.prototype.Initialize = function () {
                    var self = this;
                    self.toolBar.createWidget(self.toolBarSettings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxtoolbar_1.jqxToolBarComponent), 
                    __metadata('design:type', angular_jqxtoolbar_1.jqxToolBarComponent)
                ], AppComponent.prototype, "toolBar", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<angularToolbar></angularToolbar>",
                        styles: ["\n        .buttonIcon\n        {\n            margin: -5px 0 0 -3px;\n            width: 16px;\n            height: 17px;\n        }\n    "],
                        directives: [angular_jqxtoolbar_1.jqxToolBarComponent, angular_jqxbutton_1.jqxButtonComponent, angular_jqxdropdownlist_1.jqxDropDownListComponent, angular_jqxcombobox_1.jqxComboBoxComponent, angular_jqxinput_1.jqxInputComponent],
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