System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var jqxResponsivePanelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxResponsivePanelComponent = (function () {
                function jqxResponsivePanelComponent(containerElement) {
                    // jqxResponsivePanelComponent events
                    this.OnClose = new core_1.EventEmitter();
                    this.OnCollapse = new core_1.EventEmitter();
                    this.OnExpand = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxResponsivePanelComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxResponsivePanelComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxResponsivePanel', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxResponsivePanelComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxResponsivePanelComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxResponsivePanelComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxResponsivePanel(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxResponsivePanelComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxResponsivePanelComponent.prototype.setOptions = function (options) {
                    this.host.jqxResponsivePanel('setOptions', options);
                };
                // jqxResponsivePanelComponent functions
                jqxResponsivePanelComponent.prototype.close = function () {
                    this.host.jqxResponsivePanel('close');
                };
                jqxResponsivePanelComponent.prototype.destroy = function () {
                    this.host.jqxResponsivePanel('destroy');
                };
                jqxResponsivePanelComponent.prototype.isCollapsed = function () {
                    return this.host.jqxResponsivePanel('isCollapsed');
                };
                jqxResponsivePanelComponent.prototype.isOpened = function () {
                    return this.host.jqxResponsivePanel('isOpened');
                };
                jqxResponsivePanelComponent.prototype.open = function () {
                    this.host.jqxResponsivePanel('open');
                };
                jqxResponsivePanelComponent.prototype.refresh = function () {
                    this.host.jqxResponsivePanel('refresh');
                };
                jqxResponsivePanelComponent.prototype.render = function () {
                    this.host.jqxResponsivePanel('render');
                };
                jqxResponsivePanelComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('collapse', function (eventData) { if (self.OnCollapse)
                        self.OnCollapse.next(eventData); });
                    this.host.bind('expand', function (eventData) { if (self.OnExpand)
                        self.OnExpand.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationDirection'), 
                    __metadata('design:type', String)
                ], jqxResponsivePanelComponent.prototype, "animationDirection", void 0);
                __decorate([
                    core_1.Input('animationHideDelay'), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "animationHideDelay", void 0);
                __decorate([
                    core_1.Input('animationShowDelay'), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "animationShowDelay", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxResponsivePanelComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('autoClose'), 
                    __metadata('design:type', Boolean)
                ], jqxResponsivePanelComponent.prototype, "autoClose", void 0);
                __decorate([
                    core_1.Input('collapseBreakpoint'), 
                    __metadata('design:type', Number)
                ], jqxResponsivePanelComponent.prototype, "collapseBreakpoint", void 0);
                __decorate([
                    core_1.Input('collapseWidth'), 
                    __metadata('design:type', Number)
                ], jqxResponsivePanelComponent.prototype, "collapseWidth", void 0);
                __decorate([
                    core_1.Input('initContent'), 
                    __metadata('design:type', Function)
                ], jqxResponsivePanelComponent.prototype, "initContent", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxResponsivePanelComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('toggleButton'), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "toggleButton", void 0);
                __decorate([
                    core_1.Input('toggleButtonSize'), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "toggleButtonSize", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "OnCollapse", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "OnExpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxResponsivePanelComponent.prototype, "OnOpen", void 0);
                jqxResponsivePanelComponent = __decorate([
                    core_1.Component({
                        selector: 'angularResponsivePanel',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxResponsivePanelComponent);
                return jqxResponsivePanelComponent;
                var _a;
            }());
            exports_1("jqxResponsivePanelComponent", jqxResponsivePanelComponent); //jqxResponsivePanelComponent
        }
    }
});
//# sourceMappingURL=angular_jqxresponsivepanel.js.map