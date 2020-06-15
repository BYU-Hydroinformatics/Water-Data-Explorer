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
    var jqxTooltipComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxTooltipComponent = (function () {
                function jqxTooltipComponent(containerElement) {
                    // jqxTooltipComponent events
                    this.OnClose = new core_1.EventEmitter();
                    this.OnClosing = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.OnOpening = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxTooltipComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxTooltipComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTooltip', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxTooltipComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxTooltipComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxTooltipComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxTooltip(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxTooltipComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxTooltipComponent.prototype.setOptions = function (options) {
                    this.host.jqxTooltip('setOptions', options);
                };
                // jqxTooltipComponent functions
                jqxTooltipComponent.prototype.close = function (index) {
                    this.host.jqxTooltip('close', index);
                };
                jqxTooltipComponent.prototype.destroy = function () {
                    this.host.jqxTooltip('destroy');
                };
                jqxTooltipComponent.prototype.open = function () {
                    this.host.jqxTooltip('open');
                };
                jqxTooltipComponent.prototype.refresh = function () {
                    this.host.jqxTooltip('refresh');
                };
                jqxTooltipComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('closing', function (eventData) { if (self.OnClosing)
                        self.OnClosing.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                    this.host.bind('opening', function (eventData) { if (self.OnOpening)
                        self.OnOpening.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('absolutePositionX'), 
                    __metadata('design:type', Number)
                ], jqxTooltipComponent.prototype, "absolutePositionX", void 0);
                __decorate([
                    core_1.Input('absolutePositionY'), 
                    __metadata('design:type', Number)
                ], jqxTooltipComponent.prototype, "absolutePositionY", void 0);
                __decorate([
                    core_1.Input('autoHide'), 
                    __metadata('design:type', Boolean)
                ], jqxTooltipComponent.prototype, "autoHide", void 0);
                __decorate([
                    core_1.Input('autoHideDelay'), 
                    __metadata('design:type', Number)
                ], jqxTooltipComponent.prototype, "autoHideDelay", void 0);
                __decorate([
                    core_1.Input('animationShowDelay'), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "animationShowDelay", void 0);
                __decorate([
                    core_1.Input('animationHideDelay'), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "animationHideDelay", void 0);
                __decorate([
                    core_1.Input('content'), 
                    __metadata('design:type', String)
                ], jqxTooltipComponent.prototype, "content", void 0);
                __decorate([
                    core_1.Input('closeOnClick'), 
                    __metadata('design:type', Boolean)
                ], jqxTooltipComponent.prototype, "closeOnClick", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxTooltipComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enableBrowserBoundsDetection'), 
                    __metadata('design:type', Boolean)
                ], jqxTooltipComponent.prototype, "enableBrowserBoundsDetection", void 0);
                __decorate([
                    core_1.Input('left'), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "left", void 0);
                __decorate([
                    core_1.Input('name'), 
                    __metadata('design:type', String)
                ], jqxTooltipComponent.prototype, "name", void 0);
                __decorate([
                    core_1.Input('opacity'), 
                    __metadata('design:type', Number)
                ], jqxTooltipComponent.prototype, "opacity", void 0);
                __decorate([
                    core_1.Input('position'), 
                    __metadata('design:type', String)
                ], jqxTooltipComponent.prototype, "position", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxTooltipComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('showDelay'), 
                    __metadata('design:type', Number)
                ], jqxTooltipComponent.prototype, "showDelay", void 0);
                __decorate([
                    core_1.Input('showArrow'), 
                    __metadata('design:type', Boolean)
                ], jqxTooltipComponent.prototype, "showArrow", void 0);
                __decorate([
                    core_1.Input('top'), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "top", void 0);
                __decorate([
                    core_1.Input('trigger'), 
                    __metadata('design:type', String)
                ], jqxTooltipComponent.prototype, "trigger", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxTooltipComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "OnClosing", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "OnOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTooltipComponent.prototype, "OnOpening", void 0);
                jqxTooltipComponent = __decorate([
                    core_1.Component({
                        selector: 'angularTooltip',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxTooltipComponent);
                return jqxTooltipComponent;
                var _a;
            }());
            exports_1("jqxTooltipComponent", jqxTooltipComponent); //jqxTooltipComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtooltip.js.map