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
    var jqxExpanderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxExpanderComponent = (function () {
                function jqxExpanderComponent(containerElement) {
                    // jqxExpanderComponent events
                    this.OnCollapsing = new core_1.EventEmitter();
                    this.OnCollapsed = new core_1.EventEmitter();
                    this.OnExpanding = new core_1.EventEmitter();
                    this.OnExpanded = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxExpanderComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxExpanderComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxExpander', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxExpanderComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxExpanderComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxExpanderComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxExpander(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxExpanderComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxExpanderComponent.prototype.setOptions = function (options) {
                    this.host.jqxExpander('setOptions', options);
                };
                // jqxExpanderComponent functions
                jqxExpanderComponent.prototype.collapse = function () {
                    this.host.jqxExpander('collapse');
                };
                jqxExpanderComponent.prototype.disable = function () {
                    this.host.jqxExpander('disable');
                };
                jqxExpanderComponent.prototype.destroy = function () {
                    this.host.jqxExpander('destroy');
                };
                jqxExpanderComponent.prototype.enable = function () {
                    this.host.jqxExpander('enable');
                };
                jqxExpanderComponent.prototype.expand = function () {
                    this.host.jqxExpander('expand');
                };
                jqxExpanderComponent.prototype.focus = function () {
                    this.host.jqxExpander('focus');
                };
                jqxExpanderComponent.prototype.getContent = function () {
                    return this.host.jqxExpander('getContent');
                };
                jqxExpanderComponent.prototype.getHeaderContent = function () {
                    return this.host.jqxExpander('getHeaderContent');
                };
                jqxExpanderComponent.prototype.invalidate = function () {
                    this.host.jqxExpander('invalidate');
                };
                jqxExpanderComponent.prototype.refresh = function () {
                    this.host.jqxExpander('refresh');
                };
                jqxExpanderComponent.prototype.render = function () {
                    this.host.jqxExpander('render');
                };
                jqxExpanderComponent.prototype.setHeaderContent = function (headerContent) {
                    this.host.jqxExpander('setHeaderContent', headerContent);
                };
                jqxExpanderComponent.prototype.setContent = function (content) {
                    this.host.jqxExpander('setContent', content);
                };
                jqxExpanderComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('collapsing', function (eventData) { if (self.OnCollapsing)
                        self.OnCollapsing.next(eventData); });
                    this.host.bind('collapsed', function (eventData) { if (self.OnCollapsed)
                        self.OnCollapsed.next(eventData); });
                    this.host.bind('expanding', function (eventData) { if (self.OnExpanding)
                        self.OnExpanding.next(eventData); });
                    this.host.bind('expanded', function (eventData) { if (self.OnExpanded)
                        self.OnExpanded.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxExpanderComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxExpanderComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxExpanderComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('arrowPosition'), 
                    __metadata('design:type', String)
                ], jqxExpanderComponent.prototype, "arrowPosition", void 0);
                __decorate([
                    core_1.Input('collapseAnimationDuration'), 
                    __metadata('design:type', Number)
                ], jqxExpanderComponent.prototype, "collapseAnimationDuration", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxExpanderComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('expanded'), 
                    __metadata('design:type', Boolean)
                ], jqxExpanderComponent.prototype, "expanded", void 0);
                __decorate([
                    core_1.Input('expandAnimationDuration'), 
                    __metadata('design:type', Number)
                ], jqxExpanderComponent.prototype, "expandAnimationDuration", void 0);
                __decorate([
                    core_1.Input('headerPosition'), 
                    __metadata('design:type', String)
                ], jqxExpanderComponent.prototype, "headerPosition", void 0);
                __decorate([
                    core_1.Input('initContent'), 
                    __metadata('design:type', Function)
                ], jqxExpanderComponent.prototype, "initContent", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxExpanderComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('showArrow'), 
                    __metadata('design:type', Boolean)
                ], jqxExpanderComponent.prototype, "showArrow", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxExpanderComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('toggleMode'), 
                    __metadata('design:type', String)
                ], jqxExpanderComponent.prototype, "toggleMode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxExpanderComponent.prototype, "OnCollapsing", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxExpanderComponent.prototype, "OnCollapsed", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxExpanderComponent.prototype, "OnExpanding", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxExpanderComponent.prototype, "OnExpanded", void 0);
                jqxExpanderComponent = __decorate([
                    core_1.Component({
                        selector: 'angularExpander',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxExpanderComponent);
                return jqxExpanderComponent;
                var _a;
            }());
            exports_1("jqxExpanderComponent", jqxExpanderComponent); //jqxExpanderComponent
        }
    }
});
//# sourceMappingURL=angular_jqxexpander.js.map