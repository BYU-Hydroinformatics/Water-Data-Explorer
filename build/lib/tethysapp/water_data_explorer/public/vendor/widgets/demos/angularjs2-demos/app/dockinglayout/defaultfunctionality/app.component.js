System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdockinglayout', '../../../../../jqwidgets-ts/angular_jqxtree'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdockinglayout_1, angular_jqxtree_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdockinglayout_1_1) {
                angular_jqxdockinglayout_1 = angular_jqxdockinglayout_1_1;
            },
            function (angular_jqxtree_1_1) {
                angular_jqxtree_1 = angular_jqxtree_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    var self = this;
                    var layout = [
                        {
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
                                },
                                {
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
                                                },
                                                {
                                                    type: 'documentPanel',
                                                    title: 'Document 2',
                                                    contentContainer: 'Document2Panel'
                                                }]
                                        },
                                        {
                                            type: 'tabbedGroup',
                                            height: 200,
                                            pinnedHeight: 30,
                                            items: [{
                                                    type: 'layoutPanel',
                                                    title: 'Error List',
                                                    contentContainer: 'ErrorListPanel'
                                                }]
                                        }]
                                },
                                {
                                    type: 'tabbedGroup',
                                    width: 220,
                                    minWidth: 200,
                                    items: [
                                        {
                                            type: 'layoutPanel',
                                            title: 'Solution Explorer',
                                            contentContainer: 'SolutionExplorerPanel',
                                            initContent: function () {
                                                // initialize a jqxTree inside the Solution Explorer Panel
                                                var source = [{
                                                        icon: '../../images/earth.png',
                                                        label: 'Project',
                                                        expanded: true,
                                                        items: [
                                                            {
                                                                icon: '../../images/folder.png',
                                                                label: 'css',
                                                                expanded: true,
                                                                items: [{
                                                                        icon: '../../images/nav1.png',
                                                                        label: 'jqx.base.css'
                                                                    },
                                                                    {
                                                                        icon: '../../images/nav1.png',
                                                                        label: 'jqx.energyblue.css'
                                                                    }, {
                                                                        icon: '../../images/nav1.png',
                                                                        label: 'jqx.orange.css'
                                                                    }]
                                                            },
                                                            {
                                                                icon: '../../images/folder.png',
                                                                label: 'scripts',
                                                                items: [{
                                                                        icon: '../../images/nav1.png',
                                                                        label: 'jqxcore.js'
                                                                    },
                                                                    {
                                                                        icon: '../../images/nav1.png',
                                                                        label: 'jqxdata.js'
                                                                    }, {
                                                                        icon: '../../images/nav1.png',
                                                                        label: 'jqxgrid.js'
                                                                    }]
                                                            },
                                                            {
                                                                icon: '../../images/nav1.png',
                                                                label: 'index.htm'
                                                            }]
                                                    }];
                                                var myTree = new angular_jqxtree_1.jqxTreeComponent(new core_1.ElementRef(document.getElementById("Tree")));
                                                myTree.createWidget({ width: 190, source: source });
                                            }
                                        },
                                        {
                                            type: 'layoutPanel',
                                            title: 'Properties',
                                            contentContainer: 'PropertiesPanel'
                                        }]
                                }]
                        },
                        {
                            type: 'floatGroup',
                            width: 500,
                            height: 300,
                            position: {
                                x: 350,
                                y: 250
                            },
                            items: [{
                                    type: 'layoutPanel',
                                    title: 'Output',
                                    contentContainer: 'OutputPanel',
                                    selected: true
                                }]
                        }];
                    this.dockingLayoutSettings = {
                        width: 800, height: 600, layout: layout
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myDockingLayout.createWidget(this.dockingLayoutSettings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxdockinglayout_1.jqxDockingLayoutComponent), 
                    __metadata('design:type', angular_jqxdockinglayout_1.jqxDockingLayoutComponent)
                ], AppComponent.prototype, "myDockingLayout", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: "app/dockinglayout/defaultfunctionality/app.component.htm",
                        styles: ["\n        .jqx-layout-group-auto-hide-content-vertical\n        {\n            width: 200px;\n        }\n    "],
                        directives: [angular_jqxdockinglayout_1.jqxDockingLayoutComponent, angular_jqxtree_1.jqxTreeComponent]
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