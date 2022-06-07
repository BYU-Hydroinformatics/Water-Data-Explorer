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
    var jqxColorPickerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxColorPickerComponent = (function () {
                function jqxColorPickerComponent(containerElement) {
                    // jqxColorPickerComponent events
                    this.OnColorchange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxColorPickerComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxColorPickerComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxColorPicker', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxColorPickerComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxColorPickerComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxColorPickerComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxColorPicker(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxColorPickerComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxColorPickerComponent.prototype.setOptions = function (options) {
                    this.host.jqxColorPicker('setOptions', options);
                };
                // jqxColorPickerComponent functions
                jqxColorPickerComponent.prototype.getColor = function () {
                    return this.host.jqxColorPicker('getColor');
                };
                jqxColorPickerComponent.prototype.setColor = function (color) {
                    this.host.jqxColorPicker('setColor', color);
                };
                jqxColorPickerComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('colorchange', function (eventData) { if (self.OnColorchange)
                        self.OnColorchange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxColorPickerComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxColorPickerComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('color'), 
                    __metadata('design:type', Object)
                ], jqxColorPickerComponent.prototype, "color", void 0);
                __decorate([
                    core_1.Input('colorMode'), 
                    __metadata('design:type', String)
                ], jqxColorPickerComponent.prototype, "colorMode", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxColorPickerComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('showTransparent'), 
                    __metadata('design:type', Boolean)
                ], jqxColorPickerComponent.prototype, "showTransparent", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxColorPickerComponent.prototype, "OnColorchange", void 0);
                jqxColorPickerComponent = __decorate([
                    core_1.Component({
                        selector: 'angularColorPicker',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxColorPickerComponent);
                return jqxColorPickerComponent;
                var _a;
            }());
            exports_1("jqxColorPickerComponent", jqxColorPickerComponent); //jqxColorPickerComponent
        }
    }
});
//# sourceMappingURL=angular_jqxcolorpicker.js.map