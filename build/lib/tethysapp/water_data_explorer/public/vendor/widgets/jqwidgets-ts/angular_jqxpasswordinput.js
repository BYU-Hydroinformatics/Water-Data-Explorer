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
    var jqxPasswordInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxPasswordInputComponent = (function () {
                function jqxPasswordInputComponent(containerElement) {
                    // jqxPasswordInputComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxPasswordInputComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxPasswordInputComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPasswordInput', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxPasswordInputComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxPasswordInputComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxPasswordInputComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxPasswordInput(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxPasswordInputComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxPasswordInputComponent.prototype.setOptions = function (options) {
                    this.host.jqxPasswordInput('setOptions', options);
                };
                // jqxPasswordInputComponent functions
                jqxPasswordInputComponent.prototype.render = function () {
                    this.host.jqxPasswordInput('render');
                };
                jqxPasswordInputComponent.prototype.refresh = function () {
                    this.host.jqxPasswordInput('refresh');
                };
                jqxPasswordInputComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxPasswordInput('val', value);
                    }
                    else {
                        return this.host.jqxPasswordInput('val');
                    }
                };
                jqxPasswordInputComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxPasswordInputComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxPasswordInputComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxPasswordInputComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('localization'), 
                    __metadata('design:type', Object)
                ], jqxPasswordInputComponent.prototype, "localization", void 0);
                __decorate([
                    core_1.Input('maxLength'), 
                    __metadata('design:type', Object)
                ], jqxPasswordInputComponent.prototype, "maxLength", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', Object)
                ], jqxPasswordInputComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('passwordStrength'), 
                    __metadata('design:type', Function)
                ], jqxPasswordInputComponent.prototype, "passwordStrength", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxPasswordInputComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('strengthColors'), 
                    __metadata('design:type', Object)
                ], jqxPasswordInputComponent.prototype, "strengthColors", void 0);
                __decorate([
                    core_1.Input('showStrength'), 
                    __metadata('design:type', Boolean)
                ], jqxPasswordInputComponent.prototype, "showStrength", void 0);
                __decorate([
                    core_1.Input('showStrengthPosition'), 
                    __metadata('design:type', String)
                ], jqxPasswordInputComponent.prototype, "showStrengthPosition", void 0);
                __decorate([
                    core_1.Input('strengthTypeRenderer'), 
                    __metadata('design:type', Function)
                ], jqxPasswordInputComponent.prototype, "strengthTypeRenderer", void 0);
                __decorate([
                    core_1.Input('showPasswordIcon'), 
                    __metadata('design:type', Boolean)
                ], jqxPasswordInputComponent.prototype, "showPasswordIcon", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxPasswordInputComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxPasswordInputComponent.prototype, "OnChange", void 0);
                jqxPasswordInputComponent = __decorate([
                    core_1.Component({
                        selector: 'angularPasswordInput',
                        template: '<input type="password" />'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxPasswordInputComponent);
                return jqxPasswordInputComponent;
                var _a;
            }());
            exports_1("jqxPasswordInputComponent", jqxPasswordInputComponent); //jqxPasswordInputComponent
        }
    }
});
//# sourceMappingURL=angular_jqxpasswordinput.js.map