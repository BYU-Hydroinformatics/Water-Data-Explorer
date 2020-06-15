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
    var jqxSliderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxSliderComponent = (function () {
                function jqxSliderComponent(containerElement) {
                    // jqxSliderComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.OnCreated = new core_1.EventEmitter();
                    this.OnSlide = new core_1.EventEmitter();
                    this.OnSlideStart = new core_1.EventEmitter();
                    this.OnSlideEnd = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxSliderComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxSliderComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSlider', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxSliderComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxSliderComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxSliderComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxSlider(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxSliderComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxSliderComponent.prototype.setOptions = function (options) {
                    this.host.jqxSlider('setOptions', options);
                };
                // jqxSliderComponent functions
                jqxSliderComponent.prototype.destroy = function () {
                    this.host.jqxSlider('destroy');
                };
                jqxSliderComponent.prototype.decrementValue = function () {
                    this.host.jqxSlider('decrementValue');
                };
                jqxSliderComponent.prototype.disable = function () {
                    this.host.jqxSlider('disable');
                };
                jqxSliderComponent.prototype.enable = function () {
                    this.host.jqxSlider('enable');
                };
                jqxSliderComponent.prototype.focus = function () {
                    this.host.jqxSlider('focus');
                };
                jqxSliderComponent.prototype.getValue = function () {
                    return this.host.jqxSlider('getValue');
                };
                jqxSliderComponent.prototype.incrementValue = function () {
                    this.host.jqxSlider('incrementValue');
                };
                jqxSliderComponent.prototype.setValue = function (index) {
                    this.host.jqxSlider('setValue', index);
                };
                jqxSliderComponent.prototype.val = function (value) {
                    return this.host.jqxSlider('val', value);
                };
                jqxSliderComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('created', function (eventData) { if (self.OnCreated)
                        self.OnCreated.next(eventData); });
                    this.host.bind('slide', function (eventData) { if (self.OnSlide)
                        self.OnSlide.next(eventData); });
                    this.host.bind('slideStart', function (eventData) { if (self.OnSlideStart)
                        self.OnSlideStart.next(eventData); });
                    this.host.bind('slideEnd', function (eventData) { if (self.OnSlideEnd)
                        self.OnSlideEnd.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxSliderComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxSliderComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('buttonsPosition'), 
                    __metadata('design:type', String)
                ], jqxSliderComponent.prototype, "buttonsPosition", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('layout'), 
                    __metadata('design:type', String)
                ], jqxSliderComponent.prototype, "layout", void 0);
                __decorate([
                    core_1.Input('mode'), 
                    __metadata('design:type', String)
                ], jqxSliderComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.Input('minorTicksFrequency'), 
                    __metadata('design:type', Number)
                ], jqxSliderComponent.prototype, "minorTicksFrequency", void 0);
                __decorate([
                    core_1.Input('minorTickSize'), 
                    __metadata('design:type', Number)
                ], jqxSliderComponent.prototype, "minorTickSize", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Number)
                ], jqxSliderComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Number)
                ], jqxSliderComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('rangeSlider'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "rangeSlider", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('step'), 
                    __metadata('design:type', Number)
                ], jqxSliderComponent.prototype, "step", void 0);
                __decorate([
                    core_1.Input('showTicks'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "showTicks", void 0);
                __decorate([
                    core_1.Input('showMinorTicks'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "showMinorTicks", void 0);
                __decorate([
                    core_1.Input('showTickLabels'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "showTickLabels", void 0);
                __decorate([
                    core_1.Input('showButtons'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "showButtons", void 0);
                __decorate([
                    core_1.Input('showRange'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "showRange", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxSliderComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxSliderComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('ticksPosition'), 
                    __metadata('design:type', String)
                ], jqxSliderComponent.prototype, "ticksPosition", void 0);
                __decorate([
                    core_1.Input('ticksFrequency'), 
                    __metadata('design:type', Number)
                ], jqxSliderComponent.prototype, "ticksFrequency", void 0);
                __decorate([
                    core_1.Input('tickSize'), 
                    __metadata('design:type', Number)
                ], jqxSliderComponent.prototype, "tickSize", void 0);
                __decorate([
                    core_1.Input('tickLabelFormatFunction'), 
                    __metadata('design:type', Function)
                ], jqxSliderComponent.prototype, "tickLabelFormatFunction", void 0);
                __decorate([
                    core_1.Input('tooltip'), 
                    __metadata('design:type', Boolean)
                ], jqxSliderComponent.prototype, "tooltip", void 0);
                __decorate([
                    core_1.Input('tooltipHideDelay'), 
                    __metadata('design:type', Number)
                ], jqxSliderComponent.prototype, "tooltipHideDelay", void 0);
                __decorate([
                    core_1.Input('tooltipPosition'), 
                    __metadata('design:type', String)
                ], jqxSliderComponent.prototype, "tooltipPosition", void 0);
                __decorate([
                    core_1.Input('tooltipFormatFunction'), 
                    __metadata('design:type', Function)
                ], jqxSliderComponent.prototype, "tooltipFormatFunction", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Object)
                ], jqxSliderComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Input('values'), 
                    __metadata('design:type', Array)
                ], jqxSliderComponent.prototype, "values", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSliderComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSliderComponent.prototype, "OnCreated", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSliderComponent.prototype, "OnSlide", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSliderComponent.prototype, "OnSlideStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSliderComponent.prototype, "OnSlideEnd", void 0);
                jqxSliderComponent = __decorate([
                    core_1.Component({
                        selector: 'angularSlider',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxSliderComponent);
                return jqxSliderComponent;
                var _a;
            }());
            exports_1("jqxSliderComponent", jqxSliderComponent); //jqxSliderComponent
        }
    }
});
//# sourceMappingURL=angular_jqxslider.js.map