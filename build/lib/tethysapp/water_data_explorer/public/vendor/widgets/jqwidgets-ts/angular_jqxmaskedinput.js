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
    var jqxMaskedInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxMaskedInputComponent = (function () {
                function jqxMaskedInputComponent(containerElement) {
                    // jqxMaskedInputComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.OnValueChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxMaskedInputComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxMaskedInputComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxMaskedInput', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxMaskedInputComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxMaskedInputComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxMaskedInputComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxMaskedInput(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxMaskedInputComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxMaskedInputComponent.prototype.setOptions = function (options) {
                    this.host.jqxMaskedInput('setOptions', options);
                };
                // jqxMaskedInputComponent functions
                jqxMaskedInputComponent.prototype.clear = function () {
                    this.host.jqxMaskedInput('clear');
                };
                jqxMaskedInputComponent.prototype.destroy = function () {
                    this.host.jqxMaskedInput('destroy');
                };
                jqxMaskedInputComponent.prototype.focus = function () {
                    this.host.jqxMaskedInput('focus');
                };
                jqxMaskedInputComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxMaskedInput('val', value);
                    }
                    else {
                        return this.host.jqxMaskedInput('val');
                    }
                };
                jqxMaskedInputComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged)
                        self.OnValueChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxMaskedInputComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxMaskedInputComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxMaskedInputComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('mask'), 
                    __metadata('design:type', String)
                ], jqxMaskedInputComponent.prototype, "mask", void 0);
                __decorate([
                    core_1.Input('promptChar'), 
                    __metadata('design:type', Object)
                ], jqxMaskedInputComponent.prototype, "promptChar", void 0);
                __decorate([
                    core_1.Input('readOnly'), 
                    __metadata('design:type', Boolean)
                ], jqxMaskedInputComponent.prototype, "readOnly", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxMaskedInputComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxMaskedInputComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('textAlign'), 
                    __metadata('design:type', String)
                ], jqxMaskedInputComponent.prototype, "textAlign", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Object)
                ], jqxMaskedInputComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxMaskedInputComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxMaskedInputComponent.prototype, "OnValueChanged", void 0);
                jqxMaskedInputComponent = __decorate([
                    core_1.Component({
                        selector: 'angularMaskedInput',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxMaskedInputComponent);
                return jqxMaskedInputComponent;
                var _a;
            }());
            exports_1("jqxMaskedInputComponent", jqxMaskedInputComponent); //jqxMaskedInputComponent
        }
    }
});
//# sourceMappingURL=angular_jqxmaskedinput.js.map