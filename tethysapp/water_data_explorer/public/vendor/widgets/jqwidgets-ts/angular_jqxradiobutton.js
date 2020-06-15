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
    var jqxRadioButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxRadioButtonComponent = (function () {
                function jqxRadioButtonComponent(containerElement) {
                    // jqxRadioButtonComponent events
                    this.OnChecked = new core_1.EventEmitter();
                    this.OnChange = new core_1.EventEmitter();
                    this.OnUnchecked = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxRadioButtonComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxRadioButtonComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRadioButton', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxRadioButtonComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxRadioButtonComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxRadioButtonComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxRadioButton(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxRadioButtonComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxRadioButtonComponent.prototype.setOptions = function (options) {
                    this.host.jqxRadioButton('setOptions', options);
                };
                // jqxRadioButtonComponent functions
                jqxRadioButtonComponent.prototype.check = function () {
                    this.host.jqxRadioButton('check');
                };
                jqxRadioButtonComponent.prototype.disable = function () {
                    this.host.jqxRadioButton('disable');
                };
                jqxRadioButtonComponent.prototype.destroy = function () {
                    this.host.jqxRadioButton('destroy');
                };
                jqxRadioButtonComponent.prototype.enable = function () {
                    this.host.jqxRadioButton('enable');
                };
                jqxRadioButtonComponent.prototype.focus = function () {
                    this.host.jqxRadioButton('focus');
                };
                jqxRadioButtonComponent.prototype.render = function () {
                    this.host.jqxRadioButton('render');
                };
                jqxRadioButtonComponent.prototype.uncheck = function () {
                    this.host.jqxRadioButton('uncheck');
                };
                jqxRadioButtonComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxRadioButton('val', value);
                    }
                    else {
                        return this.host.jqxRadioButton('val');
                    }
                };
                jqxRadioButtonComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('checked', function (eventData) { if (self.OnChecked)
                        self.OnChecked.next(eventData); });
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('unchecked', function (eventData) { if (self.OnUnchecked)
                        self.OnUnchecked.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxRadioButtonComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxRadioButtonComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationShowDelay'), 
                    __metadata('design:type', Number)
                ], jqxRadioButtonComponent.prototype, "animationShowDelay", void 0);
                __decorate([
                    core_1.Input('animationHideDelay'), 
                    __metadata('design:type', Number)
                ], jqxRadioButtonComponent.prototype, "animationHideDelay", void 0);
                __decorate([
                    core_1.Input('boxSize'), 
                    __metadata('design:type', Object)
                ], jqxRadioButtonComponent.prototype, "boxSize", void 0);
                __decorate([
                    core_1.Input('checked'), 
                    __metadata('design:type', Boolean)
                ], jqxRadioButtonComponent.prototype, "checked", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxRadioButtonComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enableContainerClick'), 
                    __metadata('design:type', Boolean)
                ], jqxRadioButtonComponent.prototype, "enableContainerClick", void 0);
                __decorate([
                    core_1.Input('groupName'), 
                    __metadata('design:type', String)
                ], jqxRadioButtonComponent.prototype, "groupName", void 0);
                __decorate([
                    core_1.Input('hasThreeStates'), 
                    __metadata('design:type', Boolean)
                ], jqxRadioButtonComponent.prototype, "hasThreeStates", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxRadioButtonComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxRadioButtonComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRadioButtonComponent.prototype, "OnChecked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRadioButtonComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRadioButtonComponent.prototype, "OnUnchecked", void 0);
                jqxRadioButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'angularRadioButton',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxRadioButtonComponent);
                return jqxRadioButtonComponent;
                var _a;
            }());
            exports_1("jqxRadioButtonComponent", jqxRadioButtonComponent); //jqxRadioButtonComponent
        }
    }
});
//# sourceMappingURL=angular_jqxradiobutton.js.map