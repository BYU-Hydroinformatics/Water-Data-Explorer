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
    var jqxBarGaugeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxBarGaugeComponent = (function () {
                function jqxBarGaugeComponent(containerElement) {
                    // jqxBarGaugeComponent events
                    this.OnDrawEnd = new core_1.EventEmitter();
                    this.OnDrawStart = new core_1.EventEmitter();
                    this.OnInitialized = new core_1.EventEmitter();
                    this.OnTooltipClose = new core_1.EventEmitter();
                    this.OnTooltipOpen = new core_1.EventEmitter();
                    this.OnValueChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxBarGaugeComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxBarGaugeComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxBarGauge', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxBarGaugeComponent.prototype.ngAfterViewInit = function () {
                    //   if (!this.isHostReady())
                    //      this.initHost();
                };
                jqxBarGaugeComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxBarGaugeComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxBarGauge(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxBarGaugeComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxBarGaugeComponent.prototype.setOptions = function (options) {
                    this.host.jqxBarGauge('setOptions', options);
                };
                // jqxBarGaugeComponent functions
                jqxBarGaugeComponent.prototype.refresh = function () {
                    this.host.jqxBarGauge('refresh');
                };
                jqxBarGaugeComponent.prototype.render = function () {
                    this.host.jqxBarGauge('render');
                };
                jqxBarGaugeComponent.prototype.val = function (Array) {
                    if (Array !== undefined) {
                        return this.host.jqxBarGauge('val', Array);
                    }
                    else {
                        return this.host.jqxBarGauge('val');
                    }
                };
                jqxBarGaugeComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('drawEnd', function (eventData) { if (self.OnDrawEnd)
                        self.OnDrawEnd.next(eventData); });
                    this.host.bind('drawStart', function (eventData) { if (self.OnDrawStart)
                        self.OnDrawStart.next(eventData); });
                    this.host.bind('initialized', function (eventData) { if (self.OnInitialized)
                        self.OnInitialized.next(eventData); });
                    this.host.bind('tooltipClose', function (eventData) { if (self.OnTooltipClose)
                        self.OnTooltipClose.next(eventData); });
                    this.host.bind('tooltipOpen', function (eventData) { if (self.OnTooltipOpen)
                        self.OnTooltipOpen.next(eventData); });
                    this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged)
                        self.OnValueChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Number)
                ], jqxBarGaugeComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('backgroundColor'), 
                    __metadata('design:type', String)
                ], jqxBarGaugeComponent.prototype, "backgroundColor", void 0);
                __decorate([
                    core_1.Input('barSpacing'), 
                    __metadata('design:type', Number)
                ], jqxBarGaugeComponent.prototype, "barSpacing", void 0);
                __decorate([
                    core_1.Input('baseValue'), 
                    __metadata('design:type', Number)
                ], jqxBarGaugeComponent.prototype, "baseValue", void 0);
                __decorate([
                    core_1.Input('colorScheme'), 
                    __metadata('design:type', String)
                ], jqxBarGaugeComponent.prototype, "colorScheme", void 0);
                __decorate([
                    core_1.Input('customColorScheme'), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "customColorScheme", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxBarGaugeComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('endAngle'), 
                    __metadata('design:type', Number)
                ], jqxBarGaugeComponent.prototype, "endAngle", void 0);
                __decorate([
                    core_1.Input('formatFunction'), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "formatFunction", void 0);
                __decorate([
                    core_1.Input('labels'), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "labels", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Number)
                ], jqxBarGaugeComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Number)
                ], jqxBarGaugeComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('relativeInnerRadius'), 
                    __metadata('design:type', Number)
                ], jqxBarGaugeComponent.prototype, "relativeInnerRadius", void 0);
                __decorate([
                    core_1.Input('rendered'), 
                    __metadata('design:type', Function)
                ], jqxBarGaugeComponent.prototype, "rendered", void 0);
                __decorate([
                    core_1.Input('startAngle'), 
                    __metadata('design:type', Number)
                ], jqxBarGaugeComponent.prototype, "startAngle", void 0);
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input('tooltip'), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "tooltip", void 0);
                __decorate([
                    core_1.Input('useGradient'), 
                    __metadata('design:type', Boolean)
                ], jqxBarGaugeComponent.prototype, "useGradient", void 0);
                __decorate([
                    core_1.Input('values'), 
                    __metadata('design:type', Array)
                ], jqxBarGaugeComponent.prototype, "values", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "OnDrawEnd", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "OnDrawStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "OnInitialized", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "OnTooltipClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "OnTooltipOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxBarGaugeComponent.prototype, "OnValueChanged", void 0);
                jqxBarGaugeComponent = __decorate([
                    core_1.Component({
                        selector: 'angularBarGauge',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxBarGaugeComponent);
                return jqxBarGaugeComponent;
                var _a;
            }());
            exports_1("jqxBarGaugeComponent", jqxBarGaugeComponent); //jqxBarGaugeComponent
        }
    }
});
//# sourceMappingURL=angular_jqxbargauge.js.map