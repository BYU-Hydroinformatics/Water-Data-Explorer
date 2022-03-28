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
    var jqxDrawComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDrawComponent = (function () {
                function jqxDrawComponent(containerElement) {
                    this.elementRef = containerElement;
                }
                jqxDrawComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDrawComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    this.host.css('width', '100%');
                    this.host.css('height', '100%');
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDraw', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDrawComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDrawComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                    this.host.css('width', '100%');
                    this.host.css('height', '100%');
                };
                jqxDrawComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDraw(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDrawComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDrawComponent.prototype.setOptions = function (options) {
                    this.host.jqxDraw('setOptions', options);
                };
                // jqxDrawComponent functions
                jqxDrawComponent.prototype.attr = function (element, attributes) {
                    this.widgetObject.attr(element, attributes);
                };
                jqxDrawComponent.prototype.circle = function (cx, cy, r, attributes) {
                    this.widgetObject.circle(cx, cy, r, attributes);
                };
                jqxDrawComponent.prototype.clear = function () {
                    this.widgetObject['clear']();
                };
                jqxDrawComponent.prototype.getAttr = function (element, attributes) {
                    return this.widgetObject.getAttr(element, attributes);
                };
                jqxDrawComponent.prototype.line = function (x1, y1, x2, y2, attributes) {
                    this.widgetObject.line(x1, y1, x2, y2, attributes);
                };
                jqxDrawComponent.prototype.measureText = function (text, angle, attributes) {
                    return this.widgetObject.measureText(text, angle, attributes);
                };
                jqxDrawComponent.prototype.on = function (element, event, func) {
                    this.widgetObject.on(element, event, func);
                };
                jqxDrawComponent.prototype.off = function (element, event, func) {
                    this.widgetObject.off(element, event, func);
                };
                jqxDrawComponent.prototype.path = function (path, attributes) {
                    var renderer = this.host.jqxDraw('getInstance');
                    this.widgetObject.path(path, attributes);
                };
                jqxDrawComponent.prototype.pieslice = function (cx, xy, innerRadius, outerRadius, fromAngle, endAngle, centerOffset, attributes) {
                    this.widgetObject.pieslice(cx, xy, innerRadius, outerRadius, fromAngle, endAngle, centerOffset, attributes);
                    return null;
                };
                jqxDrawComponent.prototype.refresh = function () {
                    this.widgetObject.refresh();
                };
                jqxDrawComponent.prototype.rect = function (x, y, width, height, attributes) {
                    var renderer = this.host.jqxDraw('getInstance');
                    renderer.rect(x, y, width, height, attributes);
                    return null;
                };
                jqxDrawComponent.prototype.saveAsJPEG = function (image, url) {
                    this.widgetObject.saveAsJPEG(image, url);
                };
                jqxDrawComponent.prototype.saveAsPNG = function (image, url) {
                    this.widgetObject.saveAsPNG(image, url);
                };
                jqxDrawComponent.prototype.text = function (x, y, width, height, angle, attributes, clip, halign, valign, rotateAround) {
                    return this.widgetObject.text(x, y, width, height, angle, attributes, clip, halign, valign, rotateAround);
                };
                // jqxDrawComponent events
                jqxDrawComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDrawComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDrawComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('renderEngine'), 
                    __metadata('design:type', String)
                ], jqxDrawComponent.prototype, "renderEngine", void 0);
                jqxDrawComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDraw',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDrawComponent);
                return jqxDrawComponent;
                var _a;
            }());
            exports_1("jqxDrawComponent", jqxDrawComponent); //jqxDrawComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdraw.js.map