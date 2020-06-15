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
    var jqxNumberInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxNumberInputComponent = (function () {
                function jqxNumberInputComponent(containerElement) {
                    // jqxNumberInputComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.OnTextchanged = new core_1.EventEmitter();
                    this.OnValueChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxNumberInputComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxNumberInputComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNumberInput', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxNumberInputComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxNumberInputComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxNumberInputComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxNumberInput(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxNumberInputComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxNumberInputComponent.prototype.setOptions = function (options) {
                    this.host.jqxNumberInput('setOptions', options);
                };
                // jqxNumberInputComponent functions
                jqxNumberInputComponent.prototype.clear = function () {
                    this.host.jqxNumberInput('clear');
                };
                jqxNumberInputComponent.prototype.destroy = function () {
                    this.host.jqxNumberInput('destroy');
                };
                jqxNumberInputComponent.prototype.focus = function () {
                    this.host.jqxNumberInput('focus');
                };
                jqxNumberInputComponent.prototype.getDecimal = function () {
                    return this.host.jqxNumberInput('getDecimal');
                };
                jqxNumberInputComponent.prototype.setDecimal = function (index) {
                    this.host.jqxNumberInput('setDecimal', index);
                };
                jqxNumberInputComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxNumberInput('val', value);
                    }
                    else {
                        return this.host.jqxNumberInput('val');
                    }
                };
                jqxNumberInputComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('textchanged', function (eventData) { if (self.OnTextchanged)
                        self.OnTextchanged.next(eventData); });
                    this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged)
                        self.OnValueChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('allowNull'), 
                    __metadata('design:type', Boolean)
                ], jqxNumberInputComponent.prototype, "allowNull", void 0);
                __decorate([
                    core_1.Input('decimal'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "decimal", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxNumberInputComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('decimalDigits'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "decimalDigits", void 0);
                __decorate([
                    core_1.Input('decimalSeparator'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "decimalSeparator", void 0);
                __decorate([
                    core_1.Input('digits'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "digits", void 0);
                __decorate([
                    core_1.Input('groupSeparator'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "groupSeparator", void 0);
                __decorate([
                    core_1.Input('groupSize'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "groupSize", void 0);
                __decorate([
                    core_1.Input('inputMode'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "inputMode", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('negativeSymbol'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "negativeSymbol", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('promptChar'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "promptChar", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxNumberInputComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('readOnly'), 
                    __metadata('design:type', Boolean)
                ], jqxNumberInputComponent.prototype, "readOnly", void 0);
                __decorate([
                    core_1.Input('spinMode'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "spinMode", void 0);
                __decorate([
                    core_1.Input('spinButtons'), 
                    __metadata('design:type', Boolean)
                ], jqxNumberInputComponent.prototype, "spinButtons", void 0);
                __decorate([
                    core_1.Input('spinButtonsWidth'), 
                    __metadata('design:type', Number)
                ], jqxNumberInputComponent.prototype, "spinButtonsWidth", void 0);
                __decorate([
                    core_1.Input('spinButtonsStep'), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "spinButtonsStep", void 0);
                __decorate([
                    core_1.Input('symbol'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "symbol", void 0);
                __decorate([
                    core_1.Input('symbolPosition'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "symbolPosition", void 0);
                __decorate([
                    core_1.Input('textAlign'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "textAlign", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxNumberInputComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "OnTextchanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNumberInputComponent.prototype, "OnValueChanged", void 0);
                jqxNumberInputComponent = __decorate([
                    core_1.Component({
                        selector: 'angularNumberInput',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxNumberInputComponent);
                return jqxNumberInputComponent;
                var _a;
            }());
            exports_1("jqxNumberInputComponent", jqxNumberInputComponent); //jqxNumberInputComponent
        }
    }
});
//# sourceMappingURL=angular_jqxnumberinput.js.map