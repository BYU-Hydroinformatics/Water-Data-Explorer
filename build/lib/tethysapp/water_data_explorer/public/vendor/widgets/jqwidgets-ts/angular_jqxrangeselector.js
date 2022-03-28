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
    var jqxRangeSelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxRangeSelectorComponent = (function () {
                function jqxRangeSelectorComponent(containerElement) {
                    // jqxRangeSelectorComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxRangeSelectorComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxRangeSelectorComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRangeSelector', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxRangeSelectorComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxRangeSelectorComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxRangeSelectorComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxRangeSelector(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxRangeSelectorComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxRangeSelectorComponent.prototype.setOptions = function (options) {
                    this.host.jqxRangeSelector('setOptions', options);
                };
                // jqxRangeSelectorComponent functions
                jqxRangeSelectorComponent.prototype.destroy = function () {
                    this.host.jqxRangeSelector('destroy');
                };
                jqxRangeSelectorComponent.prototype.getRange = function () {
                    return this.host.jqxRangeSelector('getRange');
                };
                jqxRangeSelectorComponent.prototype.render = function () {
                    this.host.jqxRangeSelector('render');
                };
                jqxRangeSelectorComponent.prototype.refresh = function () {
                    this.host.jqxRangeSelector('refresh');
                };
                jqxRangeSelectorComponent.prototype.setRange = function (from, to) {
                    this.host.jqxRangeSelector('setRange', from, to);
                };
                jqxRangeSelectorComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxRangeSelectorComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxRangeSelectorComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxRangeSelectorComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('labelFormat'), 
                    __metadata('design:type', String)
                ], jqxRangeSelectorComponent.prototype, "labelFormat", void 0);
                __decorate([
                    core_1.Input('labelsFormatFunction'), 
                    __metadata('design:type', Function)
                ], jqxRangeSelectorComponent.prototype, "labelsFormatFunction", void 0);
                __decorate([
                    core_1.Input('labelPrecision'), 
                    __metadata('design:type', Number)
                ], jqxRangeSelectorComponent.prototype, "labelPrecision", void 0);
                __decorate([
                    core_1.Input('moveOnClick'), 
                    __metadata('design:type', Boolean)
                ], jqxRangeSelectorComponent.prototype, "moveOnClick", void 0);
                __decorate([
                    core_1.Input('markerRenderer'), 
                    __metadata('design:type', Function)
                ], jqxRangeSelectorComponent.prototype, "markerRenderer", void 0);
                __decorate([
                    core_1.Input('markerPrecision'), 
                    __metadata('design:type', Number)
                ], jqxRangeSelectorComponent.prototype, "markerPrecision", void 0);
                __decorate([
                    core_1.Input('majorLabelRenderer'), 
                    __metadata('design:type', Function)
                ], jqxRangeSelectorComponent.prototype, "majorLabelRenderer", void 0);
                __decorate([
                    core_1.Input('markerFormat'), 
                    __metadata('design:type', String)
                ], jqxRangeSelectorComponent.prototype, "markerFormat", void 0);
                __decorate([
                    core_1.Input('majorTicksInterval'), 
                    __metadata('design:type', Object)
                ], jqxRangeSelectorComponent.prototype, "majorTicksInterval", void 0);
                __decorate([
                    core_1.Input('minorTicksInterval'), 
                    __metadata('design:type', Number)
                ], jqxRangeSelectorComponent.prototype, "minorTicksInterval", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Object)
                ], jqxRangeSelectorComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Object)
                ], jqxRangeSelectorComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('padding'), 
                    __metadata('design:type', Object)
                ], jqxRangeSelectorComponent.prototype, "padding", void 0);
                __decorate([
                    core_1.Input('range'), 
                    __metadata('design:type', Object)
                ], jqxRangeSelectorComponent.prototype, "range", void 0);
                __decorate([
                    core_1.Input('resizable'), 
                    __metadata('design:type', Boolean)
                ], jqxRangeSelectorComponent.prototype, "resizable", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxRangeSelectorComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('showMinorTicks'), 
                    __metadata('design:type', Boolean)
                ], jqxRangeSelectorComponent.prototype, "showMinorTicks", void 0);
                __decorate([
                    core_1.Input('snapToTicks'), 
                    __metadata('design:type', Boolean)
                ], jqxRangeSelectorComponent.prototype, "snapToTicks", void 0);
                __decorate([
                    core_1.Input('showMajorLabels'), 
                    __metadata('design:type', Boolean)
                ], jqxRangeSelectorComponent.prototype, "showMajorLabels", void 0);
                __decorate([
                    core_1.Input('showMarkers'), 
                    __metadata('design:type', Boolean)
                ], jqxRangeSelectorComponent.prototype, "showMarkers", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxRangeSelectorComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRangeSelectorComponent.prototype, "OnChange", void 0);
                jqxRangeSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'angularRangeSelector',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxRangeSelectorComponent);
                return jqxRangeSelectorComponent;
                var _a;
            }());
            exports_1("jqxRangeSelectorComponent", jqxRangeSelectorComponent); //jqxRangeSelectorComponent
        }
    }
});
//# sourceMappingURL=angular_jqxrangeselector.js.map