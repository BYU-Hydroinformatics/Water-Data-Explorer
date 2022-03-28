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
    var jqxBulletChartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxBulletChartComponent = (function () {
                function jqxBulletChartComponent(containerElement) {
                    // jqxBulletChartComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxBulletChartComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxBulletChartComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxBulletChart', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxBulletChartComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxBulletChartComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxBulletChartComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxBulletChart(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxBulletChartComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxBulletChartComponent.prototype.setOptions = function (options) {
                    this.host.jqxBulletChart('setOptions', options);
                };
                // jqxBulletChartComponent functions
                jqxBulletChartComponent.prototype.destroy = function () {
                    this.host.jqxBulletChart('destroy');
                };
                jqxBulletChartComponent.prototype.render = function () {
                    this.host.jqxBulletChart('render');
                };
                jqxBulletChartComponent.prototype.refresh = function () {
                    this.host.jqxBulletChart('refresh');
                };
                jqxBulletChartComponent.prototype.val = function (value) {
                    if (value !== undefined) {
                        return this.host.jqxBulletChart('val', value);
                    }
                    else {
                        return this.host.jqxBulletChart('val');
                    }
                };
                jqxBulletChartComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxBulletChartComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxBulletChartComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Number)
                ], jqxBulletChartComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('barSize'), 
                    __metadata('design:type', Object)
                ], jqxBulletChartComponent.prototype, "barSize", void 0);
                __decorate([
                    core_1.Input('description'), 
                    __metadata('design:type', String)
                ], jqxBulletChartComponent.prototype, "description", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxBulletChartComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('labelsFormat'), 
                    __metadata('design:type', String)
                ], jqxBulletChartComponent.prototype, "labelsFormat", void 0);
                __decorate([
                    core_1.Input('labelsFormatFunction'), 
                    __metadata('design:type', Function)
                ], jqxBulletChartComponent.prototype, "labelsFormatFunction", void 0);
                __decorate([
                    core_1.Input('orientation'), 
                    __metadata('design:type', String)
                ], jqxBulletChartComponent.prototype, "orientation", void 0);
                __decorate([
                    core_1.Input('pointer'), 
                    __metadata('design:type', Object)
                ], jqxBulletChartComponent.prototype, "pointer", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxBulletChartComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('ranges'), 
                    __metadata('design:type', Array)
                ], jqxBulletChartComponent.prototype, "ranges", void 0);
                __decorate([
                    core_1.Input('showTooltip'), 
                    __metadata('design:type', Boolean)
                ], jqxBulletChartComponent.prototype, "showTooltip", void 0);
                __decorate([
                    core_1.Input('target'), 
                    __metadata('design:type', Object)
                ], jqxBulletChartComponent.prototype, "target", void 0);
                __decorate([
                    core_1.Input('ticks'), 
                    __metadata('design:type', Object)
                ], jqxBulletChartComponent.prototype, "ticks", void 0);
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', String)
                ], jqxBulletChartComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input('tooltipFormatFunction'), 
                    __metadata('design:type', Function)
                ], jqxBulletChartComponent.prototype, "tooltipFormatFunction", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxBulletChartComponent.prototype, "OnChange", void 0);
                jqxBulletChartComponent = __decorate([
                    core_1.Component({
                        selector: 'angularBulletChart',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxBulletChartComponent);
                return jqxBulletChartComponent;
                var _a;
            }());
            exports_1("jqxBulletChartComponent", jqxBulletChartComponent); //jqxBulletChartComponent
        }
    }
});
//# sourceMappingURL=angular_jqxbulletchart.js.map