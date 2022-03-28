System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxlayout', '../../../../../jqwidgets-ts/angular_jqxtree'], function(exports_1, context_1) {
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
    var core_1, angular_jqxlayout_1, angular_jqxtree_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxlayout_1_1) {
                angular_jqxlayout_1 = angular_jqxlayout_1_1;
            },
            function (angular_jqxtree_1_1) {
                angular_jqxtree_1 = angular_jqxtree_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.source = new Array();
                    this.flag = false;
                    this.tt = {};
                    var self = this;
                    this.source = [{
                            icon: '../../images/earth.png',
                            label: 'Project',
                            expanded: true,
                            items: [{
                                    icon: '../../images/folder.png',
                                    label: 'css',
                                    expanded: true,
                                    items: [{
                                            icon: '../../images/nav1.png',
                                            label: 'jqx.base.css'
                                        }, {
                                            icon: '../../images/nav1.png',
                                            label: 'jqx.energyblue.css'
                                        }, {
                                            icon: '../../images/nav1.png',
                                            label: 'jqx.orange.css'
                                        }]
                                }, {
                                    icon: '../../images/folder.png',
                                    label: 'scripts',
                                    items: [{
                                            icon: '../../images/nav1.png',
                                            label: 'jqxcore.js'
                                        }, {
                                            icon: '../../images/nav1.png',
                                            label: 'jqxdata.js'
                                        }, {
                                            icon: '../../images/nav1.png',
                                            label: 'jqxgrid.js'
                                        }]
                                }, {
                                    icon: '../../images/nav1.png',
                                    label: 'index.htm'
                                }]
                        }];
                    self.treeSettings = {
                        width: '100%',
                        height: '100%',
                        source: self.source
                    };
                    // the 'layout' JSON array defines the internal structure of the layout
                    var layout = [{
                            type: 'layoutGroup',
                            orientation: 'horizontal',
                            items: [{
                                    type: 'autoHideGroup',
                                    alignment: 'left',
                                    width: 80,
                                    unpinnedWidth: 200,
                                    items: [{
                                            type: 'layoutPanel',
                                            title: 'Toolbox',
                                            contentContainer: 'ToolboxPanel'
                                        }, {
                                            type: 'layoutPanel',
                                            title: 'Help',
                                            contentContainer: 'HelpPanel'
                                        }]
                                }, {
                                    type: 'layoutGroup',
                                    orientation: 'vertical',
                                    width: 500,
                                    items: [{
                                            type: 'documentGroup',
                                            height: 400,
                                            minHeight: 200,
                                            items: [{
                                                    type: 'documentPanel',
                                                    title: 'Document 1',
                                                    contentContainer: 'Document1Panel'
                                                }, {
                                                    type: 'documentPanel',
                                                    title: 'Document 2',
                                                    contentContainer: 'Document2Panel'
                                                }]
                                        }, {
                                            type: 'tabbedGroup',
                                            height: 200,
                                            pinnedHeight: 30,
                                            items: [{
                                                    type: 'layoutPanel',
                                                    title: 'Error List',
                                                    contentContainer: 'ErrorListPanel'
                                                }, {
                                                    type: 'layoutPanel',
                                                    title: 'Output',
                                                    contentContainer: 'OutputPanel',
                                                    selected: true
                                                }]
                                        }]
                                }, {
                                    type: 'tabbedGroup',
                                    width: 220,
                                    minWidth: 200,
                                    items: [{
                                            type: 'layoutPanel',
                                            title: 'Solution Explorer',
                                            contentContainer: 'SolutionExplorerPanel',
                                            initContent: function () {
                                                var myTree = new angular_jqxtree_1.jqxTreeComponent(new core_1.ElementRef(document.getElementById("Tree")));
                                                myTree.createWidget(self.treeSettings);
                                            }
                                        },
                                        {
                                            type: 'layoutPanel',
                                            title: 'Properties',
                                            contentContainer: 'PropertiesPanel'
                                        }]
                                }]
                        }];
                    this.settings = {
                        width: 800,
                        height: 600,
                        layout: layout
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myLayout.createWidget(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxlayout_1.jqxLayoutComponent), 
                    __metadata('design:type', angular_jqxlayout_1.jqxLayoutComponent)
                ], AppComponent.prototype, "myLayout", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/layout/defaultfunctionality/app.component.htm',
                        styles: [
                            ".jqx-layout-group-auto-hide-content-vertical\n          {\n              width: 200px;\n          }",
                            // Additional settings because Angular2 make changes by default
                            "div[role=tree]\n         {\n              height: 99% !important;\n         }"
                        ],
                        directives: [angular_jqxlayout_1.jqxLayoutComponent, angular_jqxtree_1.jqxTreeComponent],
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