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
    var jqxComplexInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxComplexInputComponent = (function () {
                function jqxComplexInputComponent(containerElement) {
                    // jqxComplexInputComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxComplexInputComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxComplexInputComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxComplexInput', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxComplexInputComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxComplexInputComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxComplexInputComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxComplexInput(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxComplexInputComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxComplexInputComponent.prototype.setOptions = function (options) {
                    this.host.jqxComplexInput('setOptions', options);
                };
                // jqxComplexInputComponent functions
                jqxComplexInputComponent.prototype.destroy = function () {
                    this.host.jqxComplexInput('destroy');
                };
                jqxComplexInputComponent.prototype.getReal = function (complexNumber) {
                    return this.host.jqxComplexInput('getReal', complexNumber);
                };
                jqxComplexInputComponent.prototype.getImaginary = function (complexNumber) {
                    return this.host.jqxComplexInput('getImaginary', complexNumber);
                };
                jqxComplexInputComponent.prototype.render = function () {
                    this.host.jqxComplexInput('render');
                };
                jqxComplexInputComponent.prototype.refresh = function () {
                    this.host.jqxComplexInput('refresh');
                };
                jqxComplexInputComponent.prototype.val = function (value) {
                    if (value !== undefined) {
                        return this.host.jqxComplexInput('val', value);
                    }
                    else {
                        return this.host.jqxComplexInput('val');
                    }
                };
                jqxComplexInputComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxComplexInputComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxComplexInputComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('decimalNotation'), 
                    __metadata('design:type', String)
                ], jqxComplexInputComponent.prototype, "decimalNotation", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxComplexInputComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', String)
                ], jqxComplexInputComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('roundedCorners'), 
                    __metadata('design:type', Boolean)
                ], jqxComplexInputComponent.prototype, "roundedCorners", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxComplexInputComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('spinButtons'), 
                    __metadata('design:type', Boolean)
                ], jqxComplexInputComponent.prototype, "spinButtons", void 0);
                __decorate([
                    core_1.Input('spinButtonsStep'), 
                    __metadata('design:type', Number)
                ], jqxComplexInputComponent.prototype, "spinButtonsStep", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxComplexInputComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxComplexInputComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', String)
                ], jqxComplexInputComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxComplexInputComponent.prototype, "OnChange", void 0);
                jqxComplexInputComponent = __decorate([
                    core_1.Component({
                        selector: 'angularComplexInput',
                        template: '<div><input/><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxComplexInputComponent);
                return jqxComplexInputComponent;
                var _a;
            }());
            exports_1("jqxComplexInputComponent", jqxComplexInputComponent); //jqxComplexInputComponent
        }
    }
});
//# sourceMappingURL=angular_jqxcomplexinput.js.map