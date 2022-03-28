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
    var jqxLayoutComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxLayoutComponent = (function () {
                function jqxLayoutComponent(containerElement) {
                    // jqxLayoutComponent events
                    this.OnCreate = new core_1.EventEmitter();
                    this.OnPin = new core_1.EventEmitter();
                    this.OnResize = new core_1.EventEmitter();
                    this.OnUnpin = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxLayoutComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxLayoutComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLayout', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxLayoutComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost({});
                };
                jqxLayoutComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxLayoutComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxLayout(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxLayoutComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxLayoutComponent.prototype.setOptions = function (options) {
                    this.host.jqxLayout('setOptions', options);
                };
                // jqxLayoutComponent functions
                jqxLayoutComponent.prototype.destroy = function () {
                    this.host.jqxLayout('destroy');
                };
                jqxLayoutComponent.prototype.loadLayout = function (Layout) {
                    this.host.jqxLayout('loadLayout', Layout);
                };
                jqxLayoutComponent.prototype.refresh = function () {
                    this.host.jqxLayout('refresh');
                };
                jqxLayoutComponent.prototype.render = function () {
                    this.host.jqxLayout('render');
                };
                jqxLayoutComponent.prototype.saveLayout = function () {
                    return this.host.jqxLayout('saveLayout');
                };
                jqxLayoutComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('create', function (eventData) { if (self.OnCreate)
                        self.OnCreate.next(eventData); });
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
                ], jqxLayoutComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxLayoutComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('contextMenu'), 
                    __metadata('design:type', Boolean)
                ], jqxLayoutComponent.prototype, "contextMenu", void 0);
                __decorate([
                    core_1.Input('layout'), 
                    __metadata('design:type', Array)
                ], jqxLayoutComponent.prototype, "layout", void 0);
                __decorate([
                    core_1.Input('minGroupHeight'), 
                    __metadata('design:type', Object)
                ], jqxLayoutComponent.prototype, "minGroupHeight", void 0);
                __decorate([
                    core_1.Input('minGroupWidth'), 
                    __metadata('design:type', Object)
                ], jqxLayoutComponent.prototype, "minGroupWidth", void 0);
                __decorate([
                    core_1.Input('resizable'), 
                    __metadata('design:type', Boolean)
                ], jqxLayoutComponent.prototype, "resizable", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxLayoutComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxLayoutComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxLayoutComponent.prototype, "OnCreate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxLayoutComponent.prototype, "OnPin", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxLayoutComponent.prototype, "OnResize", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxLayoutComponent.prototype, "OnUnpin", void 0);
                jqxLayoutComponent = __decorate([
                    core_1.Component({
                        selector: 'angularLayout',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxLayoutComponent);
                return jqxLayoutComponent;
                var _a;
            }());
            exports_1("jqxLayoutComponent", jqxLayoutComponent); //jqxLayoutComponent
        }
    }
});
//# sourceMappingURL=angular_jqxlayout.js.map