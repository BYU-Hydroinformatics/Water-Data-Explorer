System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxtree', '../../../../../jqwidgets-ts/angular_jqxpanel', '../../../../../jqwidgets-ts/angular_jqxresponsivepanel', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxtree_1, angular_jqxpanel_1, angular_jqxresponsivepanel_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxtree_1_1) {
                angular_jqxtree_1 = angular_jqxtree_1_1;
            },
            function (angular_jqxpanel_1_1) {
                angular_jqxpanel_1 = angular_jqxpanel_1_1;
            },
            function (angular_jqxresponsivepanel_1_1) {
                angular_jqxresponsivepanel_1 = angular_jqxresponsivepanel_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.collapsed = false;
                    this.treeSettings = {
                        height: '100%',
                        width: '100%'
                    };
                    this.respPanelSettings = {
                        width: 220,
                        height: 300,
                        collapseBreakpoint: 200,
                        toggleButton: '#toggleResponsivePanel',
                        animationType: 'none',
                        autoClose: false
                    };
                    this.panelsettings = {
                        width: '65%',
                        height: '100%'
                    };
                    this.buttonsSettings = {
                        width: '150px',
                        height: '15px'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        document.getElementsByTagName("angularButton")[0].firstElementChild.style.width = '15%';
                        document.getElementsByTagName("angularButton")[0].firstElementChild.style.display = 'inline-block';
                        document.getElementsByTagName("angularButton")[1].firstElementChild.style.width = '15%';
                        document.getElementsByTagName("angularButton")[1].firstElementChild.style.display = 'inline-block';
                        document.getElementById("jqxMenu").firstElementChild.style.border = 'none';
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnClose = function (event) {
                    if (event.args.element)
                        return;
                    this.collapsed = this.RespPanel.isCollapsed();
                    var opened = this.RespPanel.isOpened();
                    if (this.collapsed && !opened) {
                        this.panel.setOptions({ width: '65%' });
                    }
                };
                AppComponent.prototype.OnCollapse = function (event) {
                    if (event.args.element)
                        return;
                    this.collapsed = this.RespPanel.isCollapsed();
                    var opened = this.RespPanel.isOpened();
                    if (this.collapsed && !opened)
                        this.panel.setOptions({ width: '100%' }); //this.panel.widgetObject.width = '100%';
                    else if (this.collapsed && opened)
                        this.panel.setOptions({ width: '65%' }); //this.panel.widgetObject.width = '65%';
                    else if (!this.collapsed)
                        this.panel.setOptions({ width: '65%' }); //this.panel.widgetObject.width = '65%';
                };
                AppComponent.prototype.OnExpand = function (event) {
                    if (event.args.element)
                        return;
                    this.collapsed = this.RespPanel.isCollapsed();
                    var opened = this.RespPanel.isOpened();
                    //if (this.collapsed && !this.opened) this.panel.widgetObject.width = '100%';
                    if (this.collapsed && opened)
                        this.panel.widgetObject.width = '65%';
                    else if (!this.collapsed)
                        this.panel.widgetObject.width = '65%';
                };
                AppComponent.prototype.OnOpen = function (event) {
                    if (event.args.element)
                        return;
                    this.collapsed = this.RespPanel.isCollapsed();
                    var opened = true;
                    if (this.collapsed && opened)
                        this.panel.setOptions({ width: '65%' });
                };
                AppComponent.prototype.onClickSmall = function () {
                    this.collapsed = this.RespPanel.isCollapsed();
                    var opened = this.RespPanel.isOpened();
                    var ownerPanel = document.getElementById("ownerPanel");
                    ownerPanel.style.width = '500px';
                    this.RespPanel.setOptions({ width: 150 });
                    if (opened) {
                        this.RespPanel.close();
                    }
                    this.panel.widgetObject.width = '100%';
                    //this.panel.setOptions({ width: '100%' });
                    this.RespPanel.refresh();
                    //}
                    //else if (this.collapsed && this.opened) this.panel.widgetObject.width = '65%';
                    //else if (!this.collapsed) this.panel.widgetObject.width = '65%';
                };
                AppComponent.prototype.onClickBig = function () {
                    //this.opened = true;
                    var opened = this.RespPanel.isOpened();
                    var ownerPanel = document.getElementById("ownerPanel");
                    ownerPanel.style.width = '800px';
                    this.RespPanel.setOptions({ width: 220 });
                    this.panel.setOptions({ width: '65%' });
                    if (!opened) {
                        this.RespPanel.open();
                    }
                    this.RespPanel.refresh();
                };
                AppComponent.prototype.Initialize = function () {
                    this.tree.createWidget(this.treeSettings);
                    document.getElementById("jqxMenu").firstElementChild.style.visibility = "visible";
                    this.RespPanel.createWidget(this.respPanelSettings);
                    this.panel.createWidget(this.panelsettings);
                    this.resizeSmallButton.createWidget(this.buttonsSettings);
                    this.resizeBigButton.createWidget(this.buttonsSettings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxtree_1.jqxTreeComponent), 
                    __metadata('design:type', angular_jqxtree_1.jqxTreeComponent)
                ], AppComponent.prototype, "tree", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxpanel_1.jqxPanelComponent), 
                    __metadata('design:type', angular_jqxpanel_1.jqxPanelComponent)
                ], AppComponent.prototype, "panel", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxresponsivepanel_1.jqxResponsivePanelComponent), 
                    __metadata('design:type', angular_jqxresponsivepanel_1.jqxResponsivePanelComponent)
                ], AppComponent.prototype, "RespPanel", void 0);
                __decorate([
                    core_1.ViewChild('resizeSmall'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "resizeSmallButton", void 0);
                __decorate([
                    core_1.ViewChild('resizeBig'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "resizeBigButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/responsivePanel/defaultfunctionality/app.component.htm',
                        styleUrls: ['app/responsivePanel/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxtree_1.jqxTreeComponent, angular_jqxpanel_1.jqxPanelComponent, angular_jqxresponsivepanel_1.jqxResponsivePanelComponent, angular_jqxbutton_1.jqxButtonComponent]
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