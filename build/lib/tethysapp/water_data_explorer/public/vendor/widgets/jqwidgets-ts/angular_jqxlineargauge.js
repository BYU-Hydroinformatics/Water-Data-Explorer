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
    var jqxLinearGaugeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxLinearGaugeComponent = (function () {
                function jqxLinearGaugeComponent(containerElement) {
                    // jqxLinearGaugeComponent events
                    this.OnValueChanging = new core_1.EventEmitter();
                    this.OnValueChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxLinearGaugeComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxLinearGaugeComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLinearGauge', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxLinearGaugeComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost({});
                };
                jqxLinearGaugeComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxLinearGaugeComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxLinearGauge(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxLinearGaugeComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxLinearGaugeComponent.prototype.setOptions = function (options) {
                    this.host.jqxLinearGauge('setOptions', options);
                };
                // jqxLinearGaugeComponent functions
                jqxLinearGaugeComponent.prototype.disable = function () {
                    return this.host.jqxLinearGauge('disable');
                };
                jqxLinearGaugeComponent.prototype.enable = function () {
                    return this.host.jqxLinearGauge('enable');
                };
                jqxLinearGaugeComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxLinearGauge('val', value);
                    }
                    else {
                        return this.host.jqxLinearGauge('val');
                    }
                };
                jqxLinearGaugeComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('valueChanging', function (eventData) { if (self.OnValueChanging)
                        self.OnValueChanging.next(eventData); });
                    this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged)
                        self.OnValueChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Number)
                ], jqxLinearGaugeComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('background'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "background", void 0);
                __decorate([
                    core_1.Input('colorScheme'), 
                    __metadata('design:type', String)
                ], jqxLinearGaugeComponent.prototype, "colorScheme", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxLinearGaugeComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('easing'), 
                    __metadata('design:type', String)
                ], jqxLinearGaugeComponent.prototype, "easing", void 0);
                __decorate([
                    core_1.Input('int64'), 
                    __metadata('design:type', Boolean)
                ], jqxLinearGaugeComponent.prototype, "int64", void 0);
                __decorate([
                    core_1.Input('labels'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "labels", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Number)
                ], jqxLinearGaugeComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Number)
                ], jqxLinearGaugeComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('orientation'), 
                    __metadata('design:type', String)
                ], jqxLinearGaugeComponent.prototype, "orientation", void 0);
                __decorate([
                    core_1.Input('pointer'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "pointer", void 0);
                __decorate([
                    core_1.Input('rangesOffset'), 
                    __metadata('design:type', Number)
                ], jqxLinearGaugeComponent.prototype, "rangesOffset", void 0);
                __decorate([
                    core_1.Input('rangeSize'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "rangeSize", void 0);
                __decorate([
                    core_1.Input('ranges'), 
                    __metadata('design:type', Array)
                ], jqxLinearGaugeComponent.prototype, "ranges", void 0);
                __decorate([
                    core_1.Input('showRanges'), 
                    __metadata('design:type', Boolean)
                ], jqxLinearGaugeComponent.prototype, "showRanges", void 0);
                __decorate([
                    core_1.Input('scaleStyle'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "scaleStyle", void 0);
                __decorate([
                    core_1.Input('scaleLength'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "scaleLength", void 0);
                __decorate([
                    core_1.Input('ticksOffset'), 
                    __metadata('design:type', Array)
                ], jqxLinearGaugeComponent.prototype, "ticksOffset", void 0);
                __decorate([
                    core_1.Input('ticksPosition'), 
                    __metadata('design:type', String)
                ], jqxLinearGaugeComponent.prototype, "ticksPosition", void 0);
                __decorate([
                    core_1.Input('ticksMinor'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "ticksMinor", void 0);
                __decorate([
                    core_1.Input('ticksMajor'), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "ticksMajor", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Number)
                ], jqxLinearGaugeComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "OnValueChanging", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxLinearGaugeComponent.prototype, "OnValueChanged", void 0);
                jqxLinearGaugeComponent = __decorate([
                    core_1.Component({
                        selector: 'angularLinearGauge',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxLinearGaugeComponent);
                return jqxLinearGaugeComponent;
                var _a;
            }());
            exports_1("jqxLinearGaugeComponent", jqxLinearGaugeComponent); //jqxLinearGaugeComponent
        }
    }
});
//# sourceMappingURL=angular_jqxlineargauge.js.map