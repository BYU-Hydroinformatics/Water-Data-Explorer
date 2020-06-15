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
    var jqxDockingLayoutComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDockingLayoutComponent = (function () {
                function jqxDockingLayoutComponent(containerElement) {
                    // jqxDockingLayoutComponent events
                    this.OnCreate = new core_1.EventEmitter();
                    this.OnDock = new core_1.EventEmitter();
                    this.OnFloat = new core_1.EventEmitter();
                    this.OnPin = new core_1.EventEmitter();
                    this.OnResize = new core_1.EventEmitter();
                    this.OnUnpin = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxDockingLayoutComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDockingLayoutComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDockingLayout', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDockingLayoutComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDockingLayoutComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDockingLayoutComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDockingLayout(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDockingLayoutComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDockingLayoutComponent.prototype.setOptions = function (options) {
                    this.host.jqxDockingLayout('setOptions', options);
                };
                // jqxDockingLayoutComponent functions
                jqxDockingLayoutComponent.prototype.addFloatGroup = function (width, height, position, panelType, title, content, initContent) {
                    this.host.jqxDockingLayout('addFloatGroup', width, height, position, panelType, title, content, initContent);
                };
                jqxDockingLayoutComponent.prototype.destroy = function () {
                    this.host.jqxDockingLayout('destroy');
                };
                jqxDockingLayoutComponent.prototype.loadLayout = function (layout) {
                    this.host.jqxDockingLayout('loadLayout', layout);
                };
                jqxDockingLayoutComponent.prototype.refresh = function () {
                    this.host.jqxDockingLayout('refresh');
                };
                jqxDockingLayoutComponent.prototype.render = function () {
                    this.host.jqxDockingLayout('render');
                };
                jqxDockingLayoutComponent.prototype.saveLayout = function () {
                    return this.host.jqxDockingLayout('saveLayout');
                };
                jqxDockingLayoutComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('create', function (eventData) { if (self.OnCreate)
                        self.OnCreate.next(eventData); });
                    this.host.bind('dock', function (eventData) { if (self.OnDock)
                        self.OnDock.next(eventData); });
                    this.host.bind('float', function (eventData) { if (self.OnFloat)
                        self.OnFloat.next(eventData); });
                    this.host.bind('pin', function (eventData) { if (self.OnPin)
                        self.OnPin.next(eventData); });
                    this.host.bind('resize', function (eventData) { if (self.OnResize)
                        self.OnResize.next(eventData); });
                    this.host.bind('unpin', function (eventData) { if (self.OnUnpin)
                        self.OnUnpin.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('contextMenu'), 
                    __metadata('design:type', Boolean)
                ], jqxDockingLayoutComponent.prototype, "contextMenu", void 0);
                __decorate([
                    core_1.Input('layout'), 
                    __metadata('design:type', Array)
                ], jqxDockingLayoutComponent.prototype, "layout", void 0);
                __decorate([
                    core_1.Input('minGroupHeight'), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "minGroupHeight", void 0);
                __decorate([
                    core_1.Input('minGroupWidth'), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "minGroupWidth", void 0);
                __decorate([
                    core_1.Input('resizable'), 
                    __metadata('design:type', Boolean)
                ], jqxDockingLayoutComponent.prototype, "resizable", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxDockingLayoutComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxDockingLayoutComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "OnCreate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "OnDock", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "OnFloat", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "OnPin", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "OnResize", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockingLayoutComponent.prototype, "OnUnpin", void 0);
                jqxDockingLayoutComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDockingLayout',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDockingLayoutComponent);
                return jqxDockingLayoutComponent;
                var _a;
            }());
            exports_1("jqxDockingLayoutComponent", jqxDockingLayoutComponent); //jqxDockingLayoutComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdockinglayout.js.map