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
    var jqxDockingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDockingComponent = (function () {
                function jqxDockingComponent(containerElement) {
                    // jqxDockingComponent events
                    this.OnDragStart = new core_1.EventEmitter();
                    this.OnDragEnd = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxDockingComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDockingComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDocking', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDockingComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDockingComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDockingComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDocking(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDockingComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDockingComponent.prototype.setOptions = function (options) {
                    this.host.jqxDocking('setOptions', options);
                };
                // jqxDockingComponent functions
                jqxDockingComponent.prototype.addWindow = function (windowId, mode, panel, position) {
                    this.host.jqxDocking('addWindow', windowId, mode, panel, position);
                };
                jqxDockingComponent.prototype.closeWindow = function (windowId) {
                    this.host.jqxDocking('closeWindow', windowId);
                };
                jqxDockingComponent.prototype.collapseWindow = function (windowId) {
                    this.host.jqxDocking('collapseWindow', windowId);
                };
                jqxDockingComponent.prototype.destroy = function () {
                    this.host.jqxDocking('destroy');
                };
                jqxDockingComponent.prototype.disableWindowResize = function (windowId) {
                    this.host.jqxDocking('disableWindowResize', windowId);
                };
                jqxDockingComponent.prototype.disable = function () {
                    this.host.jqxDocking('disable');
                };
                jqxDockingComponent.prototype.exportLayout = function () {
                    return this.host.jqxDocking('exportLayout');
                };
                jqxDockingComponent.prototype.enable = function () {
                    this.host.jqxDocking('enable');
                };
                jqxDockingComponent.prototype.expandWindow = function (windowId) {
                    this.host.jqxDocking('expandWindow', windowId);
                };
                jqxDockingComponent.prototype.enableWindowResize = function (windowId) {
                    this.host.jqxDocking('enableWindowResize', windowId);
                };
                jqxDockingComponent.prototype.focus = function () {
                    this.host.jqxDocking('focus');
                };
                jqxDockingComponent.prototype.hideAllCloseButtons = function () {
                    this.host.jqxDocking('hideAllCloseButtons');
                };
                jqxDockingComponent.prototype.hideAllCollapseButtons = function () {
                    this.host.jqxDocking('hideAllCollapseButtons');
                };
                jqxDockingComponent.prototype.hideCollapseButton = function (windowId) {
                    this.host.jqxDocking('hideCollapseButton', windowId);
                };
                jqxDockingComponent.prototype.hideCloseButton = function (windowId) {
                    this.host.jqxDocking('hideCloseButton', windowId);
                };
                jqxDockingComponent.prototype.importLayout = function (Json) {
                    this.host.jqxDocking('importLayout', Json);
                };
                jqxDockingComponent.prototype.move = function (windowId, panel, position) {
                    this.host.jqxDocking('move', windowId, panel, position);
                };
                jqxDockingComponent.prototype.pinWindow = function (windowId) {
                    this.host.jqxDocking('pinWindow', windowId);
                };
                jqxDockingComponent.prototype.setWindowMode = function (windowId, mode) {
                    this.host.jqxDocking('setWindowMode', windowId, mode);
                };
                jqxDockingComponent.prototype.showCloseButton = function (windowId) {
                    this.host.jqxDocking('showCloseButton', windowId);
                };
                jqxDockingComponent.prototype.showCollapseButton = function (windowId) {
                    this.host.jqxDocking('showCollapseButton', windowId);
                };
                jqxDockingComponent.prototype.setWindowPosition = function (windowId, top, left) {
                    this.host.jqxDocking('setWindowPosition', windowId, top, left);
                };
                jqxDockingComponent.prototype.showAllCloseButtons = function () {
                    this.host.jqxDocking('showAllCloseButtons');
                };
                jqxDockingComponent.prototype.showAllCollapseButtons = function () {
                    this.host.jqxDocking('showAllCollapseButtons');
                };
                jqxDockingComponent.prototype.unpinWindow = function (windowId) {
                    this.host.jqxDocking('unpinWindow', windowId);
                };
                jqxDockingComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('dragStart', function (eventData) { if (self.OnDragStart)
                        self.OnDragStart.next(eventData); });
                    this.host.bind('dragEnd', function (eventData) { if (self.OnDragEnd)
                        self.OnDragEnd.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDockingComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDockingComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('cookies'), 
                    __metadata('design:type', Boolean)
                ], jqxDockingComponent.prototype, "cookies", void 0);
                __decorate([
                    core_1.Input('cookieOptions'), 
                    __metadata('design:type', Object)
                ], jqxDockingComponent.prototype, "cookieOptions", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxDockingComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('floatingWindowOpacity'), 
                    __metadata('design:type', Number)
                ], jqxDockingComponent.prototype, "floatingWindowOpacity", void 0);
                __decorate([
                    core_1.Input('keyboardNavigation'), 
                    __metadata('design:type', Boolean)
                ], jqxDockingComponent.prototype, "keyboardNavigation", void 0);
                __decorate([
                    core_1.Input('mode'), 
                    __metadata('design:type', String)
                ], jqxDockingComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.Input('orientation'), 
                    __metadata('design:type', String)
                ], jqxDockingComponent.prototype, "orientation", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxDockingComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxDockingComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('windowsMode'), 
                    __metadata('design:type', Object)
                ], jqxDockingComponent.prototype, "windowsMode", void 0);
                __decorate([
                    core_1.Input('windowsOffset'), 
                    __metadata('design:type', Number)
                ], jqxDockingComponent.prototype, "windowsOffset", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockingComponent.prototype, "OnDragStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockingComponent.prototype, "OnDragEnd", void 0);
                jqxDockingComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDocking',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDockingComponent);
                return jqxDockingComponent;
                var _a;
            }());
            exports_1("jqxDockingComponent", jqxDockingComponent); //jqxDockingComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdocking.js.map