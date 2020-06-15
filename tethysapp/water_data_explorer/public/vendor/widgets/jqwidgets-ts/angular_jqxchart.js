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
    var jqxChartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxChartComponent = (function () {
                function jqxChartComponent(containerElement) {
                    // jqxChartComponent events
                    this.OnToggle = new core_1.EventEmitter();
                    this.OnClick = new core_1.EventEmitter();
                    this.OnMouseOver = new core_1.EventEmitter();
                    this.OnMouseOut = new core_1.EventEmitter();
                    this.OnRefreshBegin = new core_1.EventEmitter();
                    this.OnRefreshEnd = new core_1.EventEmitter();
                    this.OnRangeSelectionChanging = new core_1.EventEmitter();
                    this.OnRangeSelectionChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxChartComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxChartComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxChart', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxChartComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxChartComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                    this.refresh();
                };
                jqxChartComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxChart(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxChartComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxChartComponent.prototype.setOptions = function (options) {
                    this.host.jqxChart('setOptions', options);
                };
                // jqxChartComponent functions
                jqxChartComponent.prototype.refresh = function () {
                    this.host.jqxChart('refresh');
                };
                jqxChartComponent.prototype.update = function () {
                    this.host.jqxChart('update');
                };
                jqxChartComponent.prototype.destroy = function () {
                    this.host.jqxChart('destroy');
                };
                jqxChartComponent.prototype.addColorScheme = function (schemeName, colors) {
                    this.host.jqxChart('addColorScheme', schemeName, colors);
                };
                jqxChartComponent.prototype.removeColorScheme = function (schemeName) {
                    this.host.jqxChart('removeColorScheme', schemeName);
                };
                jqxChartComponent.prototype.getItemsCount = function (groupIndex, serieIndex) {
                    return this.host.jqxChart('getItemsCount', groupIndex, serieIndex);
                };
                jqxChartComponent.prototype.getItemCoord = function (groupIndex, serieIndex, itemIndex) {
                    return this.host.jqxChart('getItemCoord', groupIndex, serieIndex, itemIndex);
                };
                jqxChartComponent.prototype.getXAxisRect = function (groupIndex) {
                    return this.host.jqxChart('getXAxisRect', groupIndex);
                };
                jqxChartComponent.prototype.getXAxisLabels = function (groupIndex) {
                    return this.host.jqxChart('getXAxisLabels', groupIndex);
                };
                jqxChartComponent.prototype.getValueAxisRect = function (groupIndex) {
                    return this.host.jqxChart('getValueAxisRect', groupIndex);
                };
                jqxChartComponent.prototype.getValueAxisLabels = function (groupIndex) {
                    return this.host.jqxChart('getValueAxisLabels', groupIndex);
                };
                jqxChartComponent.prototype.getColorScheme = function (colorScheme) {
                    return this.host.jqxChart('getColorScheme', colorScheme);
                };
                jqxChartComponent.prototype.hideSerie = function (groupIndex, serieIndex, itemIndex) {
                    this.host.jqxChart('hideSerie', groupIndex, serieIndex, itemIndex);
                };
                jqxChartComponent.prototype.showSerie = function (groupIndex, serieIndex, itemIndex) {
                    this.host.jqxChart('showSerie', groupIndex, serieIndex, itemIndex);
                };
                jqxChartComponent.prototype.hideToolTip = function (hideDelay) {
                    this.host.jqxChart('hideToolTip', hideDelay);
                };
                jqxChartComponent.prototype.showToolTip = function (groupIndex, serieIndex, itemIndex, showDelay, hideDelay) {
                    this.host.jqxChart('showToolTip', groupIndex, serieIndex, itemIndex, showDelay, hideDelay);
                };
                jqxChartComponent.prototype.saveAsJPEG = function (fileName, exportServerUrl) {
                    this.host.jqxChart('saveAsJPEG', fileName, exportServerUrl);
                };
                jqxChartComponent.prototype.saveAsPDF = function (fileName, exportServerUrl) {
                    this.host.jqxChart('saveAsPDF', fileName, exportServerUrl);
                };
                jqxChartComponent.prototype.getXAxisValue = function (offset, groupIndex) {
                    return this.host.jqxChart('getXAxisValue', offset, groupIndex);
                };
                jqxChartComponent.prototype.getValueAxisValue = function (offset, groupIndex) {
                    return this.host.jqxChart('getValueAxisValue', offset, groupIndex);
                };
                jqxChartComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('toggle', function (eventData) { if (self.OnToggle)
                        self.OnToggle.next(eventData); });
                    this.host.bind('click', function (eventData) { if (self.OnClick)
                        self.OnClick.next(eventData); });
                    this.host.bind('mouseOver', function (eventData) { if (self.OnMouseOver)
                        self.OnMouseOver.next(eventData); });
                    this.host.bind('mouseOut', function (eventData) { if (self.OnMouseOut)
                        self.OnMouseOut.next(eventData); });
                    this.host.bind('refreshBegin', function (eventData) { if (self.OnRefreshBegin)
                        self.OnRefreshBegin.next(eventData); });
                    this.host.bind('refreshEnd', function (eventData) { if (self.OnRefreshEnd)
                        self.OnRefreshEnd.next(eventData); });
                    this.host.bind('rangeSelectionChanging', function (eventData) { if (self.OnRangeSelectionChanging)
                        self.OnRangeSelectionChanging.next(eventData); });
                    this.host.bind('rangeSelectionChanged', function (eventData) { if (self.OnRangeSelectionChanged)
                        self.OnRangeSelectionChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input('description'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "description", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('showBorderLine'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "showBorderLine", void 0);
                __decorate([
                    core_1.Input('borderLineColor'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "borderLineColor", void 0);
                __decorate([
                    core_1.Input('borderLineWidth'), 
                    __metadata('design:type', Number)
                ], jqxChartComponent.prototype, "borderLineWidth", void 0);
                __decorate([
                    core_1.Input('backgroundColor'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "backgroundColor", void 0);
                __decorate([
                    core_1.Input('backgroundImage'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "backgroundImage", void 0);
                __decorate([
                    core_1.Input('showLegend'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "showLegend", void 0);
                __decorate([
                    core_1.Input('legendLayout'), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "legendLayout", void 0);
                __decorate([
                    core_1.Input('padding'), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "padding", void 0);
                __decorate([
                    core_1.Input('titlePadding'), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "titlePadding", void 0);
                __decorate([
                    core_1.Input('colorScheme'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "colorScheme", void 0);
                __decorate([
                    core_1.Input('greyScale'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "greyScale", void 0);
                __decorate([
                    core_1.Input('showToolTips'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "showToolTips", void 0);
                __decorate([
                    core_1.Input('toolTipShowDelay'), 
                    __metadata('design:type', Number)
                ], jqxChartComponent.prototype, "toolTipShowDelay", void 0);
                __decorate([
                    core_1.Input('toolTipHideDelay'), 
                    __metadata('design:type', Number)
                ], jqxChartComponent.prototype, "toolTipHideDelay", void 0);
                __decorate([
                    core_1.Input('toolTipMoveDuration'), 
                    __metadata('design:type', Number)
                ], jqxChartComponent.prototype, "toolTipMoveDuration", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('enableCrosshairs'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "enableCrosshairs", void 0);
                __decorate([
                    core_1.Input('crosshairsColor'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "crosshairsColor", void 0);
                __decorate([
                    core_1.Input('crosshairsDashStyle'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "crosshairsDashStyle", void 0);
                __decorate([
                    core_1.Input('crosshairsLineWidth'), 
                    __metadata('design:type', Number)
                ], jqxChartComponent.prototype, "crosshairsLineWidth", void 0);
                __decorate([
                    core_1.Input('columnSeriesOverlap'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "columnSeriesOverlap", void 0);
                __decorate([
                    core_1.Input('enabled'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "enabled", void 0);
                __decorate([
                    core_1.Input('enableAnimations'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "enableAnimations", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Number)
                ], jqxChartComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('enableAxisTextAnimation'), 
                    __metadata('design:type', Boolean)
                ], jqxChartComponent.prototype, "enableAxisTextAnimation", void 0);
                __decorate([
                    core_1.Input('renderEngine'), 
                    __metadata('design:type', String)
                ], jqxChartComponent.prototype, "renderEngine", void 0);
                __decorate([
                    core_1.Input('xAxis'), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "xAxis", void 0);
                __decorate([
                    core_1.Input('valueAxis'), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "valueAxis", void 0);
                __decorate([
                    core_1.Input('seriesGroups'), 
                    __metadata('design:type', Array)
                ], jqxChartComponent.prototype, "seriesGroups", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "OnToggle", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "OnClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "OnMouseOver", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "OnMouseOut", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "OnRefreshBegin", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "OnRefreshEnd", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "OnRangeSelectionChanging", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxChartComponent.prototype, "OnRangeSelectionChanged", void 0);
                jqxChartComponent = __decorate([
                    core_1.Component({
                        selector: 'angularChart',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxChartComponent);
                return jqxChartComponent;
                var _a;
            }());
            exports_1("jqxChartComponent", jqxChartComponent); //jqxChartComponent
        }
    }
});
//# sourceMappingURL=angular_jqxChart.js.map