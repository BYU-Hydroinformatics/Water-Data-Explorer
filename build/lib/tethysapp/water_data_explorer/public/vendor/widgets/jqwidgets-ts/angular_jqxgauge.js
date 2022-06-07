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
    var jqxGaugeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxGaugeComponent = (function () {
                function jqxGaugeComponent(containerElement) {
                    // jqxGaugeComponent events
                    this.OnValueChanging = new core_1.EventEmitter();
                    this.OnValueChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxGaugeComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxGaugeComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxGauge', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxGaugeComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxGaugeComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxGaugeComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxGauge(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxGaugeComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxGaugeComponent.prototype.setOptions = function (options) {
                    this.host.jqxGauge('setOptions', options);
                };
                // jqxGaugeComponent functions
                jqxGaugeComponent.prototype.disable = function () {
                    this.host.jqxGauge('disable');
                };
                jqxGaugeComponent.prototype.enable = function () {
                    this.host.jqxGauge('enable');
                };
                jqxGaugeComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxGauge('val', value);
                    }
                    else {
                        return this.host.jqxGauge('val');
                    }
                };
                jqxGaugeComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('valueChanging', function (eventData) { if (self.OnValueChanging)
                        self.OnValueChanging.next(eventData); });
                    this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged)
                        self.OnValueChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('border'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "border", void 0);
                __decorate([
                    core_1.Input('caption'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "caption", void 0);
                __decorate([
                    core_1.Input('cap'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "cap", void 0);
                __decorate([
                    core_1.Input('colorScheme'), 
                    __metadata('design:type', String)
                ], jqxGaugeComponent.prototype, "colorScheme", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxGaugeComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('easing'), 
                    __metadata('design:type', String)
                ], jqxGaugeComponent.prototype, "easing", void 0);
                __decorate([
                    core_1.Input('endAngle'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "endAngle", void 0);
                __decorate([
                    core_1.Input('int64'), 
                    __metadata('design:type', Boolean)
                ], jqxGaugeComponent.prototype, "int64", void 0);
                __decorate([
                    core_1.Input('labels'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "labels", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Number)
                ], jqxGaugeComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('pointer'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "pointer", void 0);
                __decorate([
                    core_1.Input('radius'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "radius", void 0);
                __decorate([
                    core_1.Input('ranges'), 
                    __metadata('design:type', Array)
                ], jqxGaugeComponent.prototype, "ranges", void 0);
                __decorate([
                    core_1.Input('startAngle'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "startAngle", void 0);
                __decorate([
                    core_1.Input('showRanges'), 
                    __metadata('design:type', Boolean)
                ], jqxGaugeComponent.prototype, "showRanges", void 0);
                __decorate([
                    core_1.Input('style'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "style", void 0);
                __decorate([
                    core_1.Input('ticksMajor'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "ticksMajor", void 0);
                __decorate([
                    core_1.Input('ticksMinor'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "ticksMinor", void 0);
                __decorate([
                    core_1.Input('ticksDistance'), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "ticksDistance", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Number)
                ], jqxGaugeComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "OnValueChanging", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGaugeComponent.prototype, "OnValueChanged", void 0);
                jqxGaugeComponent = __decorate([
                    core_1.Component({
                        selector: 'angularGauge',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxGaugeComponent);
                return jqxGaugeComponent;
                var _a;
            }());
            exports_1("jqxGaugeComponent", jqxGaugeComponent); //jqxGaugeComponent
        }
    }
});
//# sourceMappingURL=angular_jqxgauge.js.map