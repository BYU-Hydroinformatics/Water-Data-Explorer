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
    var jqxSplitterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxSplitterComponent = (function () {
                function jqxSplitterComponent(containerElement) {
                    // jqxSplitterComponent events
                    this.OnCollapsed = new core_1.EventEmitter();
                    this.OnExpanded = new core_1.EventEmitter();
                    this.OnResize = new core_1.EventEmitter();
                    this.OnResizeStart = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxSplitterComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxSplitterComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSplitter', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxSplitterComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxSplitterComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxSplitterComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxSplitter(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxSplitterComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxSplitterComponent.prototype.setOptions = function (options) {
                    this.host.jqxSplitter('setOptions', options);
                };
                // jqxSplitterComponent functions
                jqxSplitterComponent.prototype.collapse = function () {
                    this.host.jqxSplitter('collapse');
                };
                jqxSplitterComponent.prototype.destroy = function () {
                    this.host.jqxSplitter('destroy');
                };
                jqxSplitterComponent.prototype.disable = function () {
                    this.host.jqxSplitter('disable');
                };
                jqxSplitterComponent.prototype.enable = function () {
                    this.host.jqxSplitter('enable');
                };
                jqxSplitterComponent.prototype.expand = function () {
                    this.host.jqxSplitter('expand');
                };
                jqxSplitterComponent.prototype.render = function () {
                    this.host.jqxSplitter('render');
                };
                jqxSplitterComponent.prototype.refresh = function () {
                    this.host.jqxSplitter('refresh');
                };
                jqxSplitterComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('collapsed', function (eventData) { if (self.OnCollapsed)
                        self.OnCollapsed.next(eventData); });
                    this.host.bind('expanded', function (eventData) { if (self.OnExpanded)
                        self.OnExpanded.next(eventData); });
                    this.host.bind('resize', function (eventData) { if (self.OnResize)
                        self.OnResize.next(eventData); });
                    this.host.bind('resizeStart', function (eventData) { if (self.OnResizeStart)
                        self.OnResizeStart.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxSplitterComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxSplitterComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxSplitterComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('orientation'), 
                    __metadata('design:type', String)
                ], jqxSplitterComponent.prototype, "orientation", void 0);
                __decorate([
                    core_1.Input('panels'), 
                    __metadata('design:type', Array)
                ], jqxSplitterComponent.prototype, "panels", void 0);
                __decorate([
                    core_1.Input('resizable'), 
                    __metadata('design:type', Boolean)
                ], jqxSplitterComponent.prototype, "resizable", void 0);
                __decorate([
                    core_1.Input('splitBarSize'), 
                    __metadata('design:type', Object)
                ], jqxSplitterComponent.prototype, "splitBarSize", void 0);
                __decorate([
                    core_1.Input('showSplitBar'), 
                    __metadata('design:type', Boolean)
                ], jqxSplitterComponent.prototype, "showSplitBar", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxSplitterComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSplitterComponent.prototype, "OnCollapsed", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSplitterComponent.prototype, "OnExpanded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSplitterComponent.prototype, "OnResize", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSplitterComponent.prototype, "OnResizeStart", void 0);
                jqxSplitterComponent = __decorate([
                    core_1.Component({
                        selector: 'angularSplitter',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxSplitterComponent);
                return jqxSplitterComponent;
                var _a;
            }());
            exports_1("jqxSplitterComponent", jqxSplitterComponent); //jqxSplitterComponent
        }
    }
});
//# sourceMappingURL=angular_jqxsplitter.js.map