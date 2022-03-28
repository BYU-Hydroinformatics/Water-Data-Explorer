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
    var jqxFormattedInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxFormattedInputComponent = (function () {
                function jqxFormattedInputComponent(containerElement) {
                    // jqxFormattedInputComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.OnClose = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.OnRadixChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxFormattedInputComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxFormattedInputComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxFormattedInput', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxFormattedInputComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxFormattedInputComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxFormattedInputComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxFormattedInput(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxFormattedInputComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxFormattedInputComponent.prototype.setOptions = function (options) {
                    this.host.jqxFormattedInput('setOptions', options);
                };
                // jqxFormattedInputComponent functions
                jqxFormattedInputComponent.prototype.close = function () {
                    this.host.jqxFormattedInput('close');
                };
                jqxFormattedInputComponent.prototype.destroy = function () {
                    this.host.jqxFormattedInput('destroy');
                };
                jqxFormattedInputComponent.prototype.focus = function () {
                    this.host.jqxFormattedInput('focus');
                };
                jqxFormattedInputComponent.prototype.open = function () {
                    this.host.jqxFormattedInput('open');
                };
                jqxFormattedInputComponent.prototype.render = function () {
                    this.host.jqxFormattedInput('render');
                };
                jqxFormattedInputComponent.prototype.refresh = function () {
                    this.host.jqxFormattedInput('refresh');
                };
                jqxFormattedInputComponent.prototype.selectAll = function () {
                    this.host.jqxFormattedInput('selectAll');
                };
                jqxFormattedInputComponent.prototype.selectFirst = function () {
                    this.host.jqxFormattedInput('selectFirst');
                };
                jqxFormattedInputComponent.prototype.selectLast = function () {
                    this.host.jqxFormattedInput('selectLast');
                };
                jqxFormattedInputComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxFormattedInput('val', value);
                    }
                    else {
                        return this.host.jqxFormattedInput('val');
                    }
                };
                jqxFormattedInputComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                    this.host.bind('radixChange', function (eventData) { if (self.OnRadixChange)
                        self.OnRadixChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxFormattedInputComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxFormattedInputComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxFormattedInputComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('decimalNotation'), 
                    __metadata('design:type', String)
                ], jqxFormattedInputComponent.prototype, "decimalNotation", void 0);
                __decorate([
                    core_1.Input('dropDown'), 
                    __metadata('design:type', Boolean)
                ], jqxFormattedInputComponent.prototype, "dropDown", void 0);
                __decorate([
                    core_1.Input('dropDownWidth'), 
                    __metadata('design:type', Object)
                ], jqxFormattedInputComponent.prototype, "dropDownWidth", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', String)
                ], jqxFormattedInputComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', String)
                ], jqxFormattedInputComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', String)
                ], jqxFormattedInputComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('popupZIndex'), 
                    __metadata('design:type', Number)
                ], jqxFormattedInputComponent.prototype, "popupZIndex", void 0);
                __decorate([
                    core_1.Input('roundedCorners'), 
                    __metadata('design:type', Boolean)
                ], jqxFormattedInputComponent.prototype, "roundedCorners", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxFormattedInputComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('radix'), 
                    __metadata('design:type', Object)
                ], jqxFormattedInputComponent.prototype, "radix", void 0);
                __decorate([
                    core_1.Input('spinButtons'), 
                    __metadata('design:type', Boolean)
                ], jqxFormattedInputComponent.prototype, "spinButtons", void 0);
                __decorate([
                    core_1.Input('spinButtonsStep'), 
                    __metadata('design:type', Number)
                ], jqxFormattedInputComponent.prototype, "spinButtonsStep", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxFormattedInputComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxFormattedInputComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('upperCase'), 
                    __metadata('design:type', Boolean)
                ], jqxFormattedInputComponent.prototype, "upperCase", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', String)
                ], jqxFormattedInputComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxFormattedInputComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxFormattedInputComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxFormattedInputComponent.prototype, "OnOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxFormattedInputComponent.prototype, "OnRadixChange", void 0);
                jqxFormattedInputComponent = __decorate([
                    core_1.Component({
                        selector: 'angularFormattedInput',
                        template: '<div><input /><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxFormattedInputComponent);
                return jqxFormattedInputComponent;
                var _a;
            }());
            exports_1("jqxFormattedInputComponent", jqxFormattedInputComponent); //jqxFormattedInputComponent
        }
    }
});
//# sourceMappingURL=angular_jqxformattedinput.js.map