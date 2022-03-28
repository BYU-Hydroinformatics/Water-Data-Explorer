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
    var jqxValidatorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxValidatorComponent = (function () {
                function jqxValidatorComponent(containerElement) {
                    // jqxValidatorComponent events
                    this.OnValidationError = new core_1.EventEmitter();
                    this.OnValidationSuccess = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxValidatorComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxValidatorComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxValidator', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxValidatorComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxValidatorComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxValidatorComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxValidator(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxValidatorComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxValidatorComponent.prototype.setOptions = function (options) {
                    this.host.jqxValidator('setOptions', options);
                };
                // jqxValidatorComponent functions
                jqxValidatorComponent.prototype.hideHint = function (id) {
                    this.host.jqxValidator('hideHint', id);
                };
                jqxValidatorComponent.prototype.hide = function () {
                    this.host.jqxValidator('hide');
                };
                jqxValidatorComponent.prototype.updatePosition = function () {
                    this.host.jqxValidator('updatePosition');
                };
                jqxValidatorComponent.prototype.validate = function (htmlElement) {
                    this.host.jqxValidator('validate', htmlElement);
                };
                jqxValidatorComponent.prototype.validateInput = function (id) {
                    this.host.jqxValidator('validateInput', id);
                };
                jqxValidatorComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('validationError', function (eventData) { if (self.OnValidationError)
                        self.OnValidationError.next(eventData); });
                    this.host.bind('validationSuccess', function (eventData) { if (self.OnValidationSuccess)
                        self.OnValidationSuccess.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxValidatorComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxValidatorComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('arrow'), 
                    __metadata('design:type', Boolean)
                ], jqxValidatorComponent.prototype, "arrow", void 0);
                __decorate([
                    core_1.Input('animation'), 
                    __metadata('design:type', String)
                ], jqxValidatorComponent.prototype, "animation", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Number)
                ], jqxValidatorComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('closeOnClick'), 
                    __metadata('design:type', Boolean)
                ], jqxValidatorComponent.prototype, "closeOnClick", void 0);
                __decorate([
                    core_1.Input('focus'), 
                    __metadata('design:type', Boolean)
                ], jqxValidatorComponent.prototype, "focus", void 0);
                __decorate([
                    core_1.Input('hintType'), 
                    __metadata('design:type', String)
                ], jqxValidatorComponent.prototype, "hintType", void 0);
                __decorate([
                    core_1.Input('onError'), 
                    __metadata('design:type', Function)
                ], jqxValidatorComponent.prototype, "onError", void 0);
                __decorate([
                    core_1.Input('onSuccess'), 
                    __metadata('design:type', Function)
                ], jqxValidatorComponent.prototype, "onSuccess", void 0);
                __decorate([
                    core_1.Input('position'), 
                    __metadata('design:type', String)
                ], jqxValidatorComponent.prototype, "position", void 0);
                __decorate([
                    core_1.Input('rules'), 
                    __metadata('design:type', Array)
                ], jqxValidatorComponent.prototype, "rules", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxValidatorComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxValidatorComponent.prototype, "OnValidationError", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxValidatorComponent.prototype, "OnValidationSuccess", void 0);
                jqxValidatorComponent = __decorate([
                    core_1.Component({
                        selector: 'angularValidator',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxValidatorComponent);
                return jqxValidatorComponent;
                var _a;
            }());
            exports_1("jqxValidatorComponent", jqxValidatorComponent); //jqxValidatorComponent
        }
    }
});
//# sourceMappingURL=angular_jqxvalidator.js.map