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
    var jqxScrollBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxScrollBarComponent = (function () {
                function jqxScrollBarComponent(containerElement) {
                    // jqxScrollBarComponent events
                    this.OnValueChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxScrollBarComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxScrollBarComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxScrollBar', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxScrollBarComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxScrollBarComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxScrollBarComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxScrollBar(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxScrollBarComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxScrollBarComponent.prototype.setOptions = function (options) {
                    this.host.jqxScrollBar('setOptions', options);
                };
                // jqxScrollBarComponent functions
                jqxScrollBarComponent.prototype.destroy = function () {
                    this.host.jqxScrollBar('destroy');
                };
                jqxScrollBarComponent.prototype.isScrolling = function () {
                    return this.host.jqxScrollBar('isScrolling');
                };
                jqxScrollBarComponent.prototype.setPosition = function (index) {
                    this.host.jqxScrollBar('setPosition', index);
                };
                jqxScrollBarComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged)
                        self.OnValueChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxScrollBarComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxScrollBarComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxScrollBarComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('largestep'), 
                    __metadata('design:type', Number)
                ], jqxScrollBarComponent.prototype, "largestep", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Number)
                ], jqxScrollBarComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Number)
                ], jqxScrollBarComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxScrollBarComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('step'), 
                    __metadata('design:type', Number)
                ], jqxScrollBarComponent.prototype, "step", void 0);
                __decorate([
                    core_1.Input('showButtons'), 
                    __metadata('design:type', Boolean)
                ], jqxScrollBarComponent.prototype, "showButtons", void 0);
                __decorate([
                    core_1.Input('thumbMinSize'), 
                    __metadata('design:type', Number)
                ], jqxScrollBarComponent.prototype, "thumbMinSize", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxScrollBarComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('vertical'), 
                    __metadata('design:type', Boolean)
                ], jqxScrollBarComponent.prototype, "vertical", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Number)
                ], jqxScrollBarComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxScrollBarComponent.prototype, "OnValueChanged", void 0);
                jqxScrollBarComponent = __decorate([
                    core_1.Component({
                        selector: 'angularScrollBar',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxScrollBarComponent);
                return jqxScrollBarComponent;
                var _a;
            }());
            exports_1("jqxScrollBarComponent", jqxScrollBarComponent); //jqxScrollBarComponent
        }
    }
});
//# sourceMappingURL=angular_jqxscrollbar.js.map