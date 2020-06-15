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
    var jqxSwitchButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxSwitchButtonComponent = (function () {
                function jqxSwitchButtonComponent(containerElement) {
                    // jqxSwitchButtonComponent events
                    this.OnChecked = new core_1.EventEmitter();
                    this.OnChange = new core_1.EventEmitter();
                    this.OnUnchecked = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxSwitchButtonComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxSwitchButtonComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSwitchButton', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxSwitchButtonComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxSwitchButtonComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxSwitchButtonComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxSwitchButton(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxSwitchButtonComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxSwitchButtonComponent.prototype.setOptions = function (options) {
                    this.host.jqxSwitchButton('setOptions', options);
                };
                // jqxSwitchButtonComponent functions
                jqxSwitchButtonComponent.prototype.check = function () {
                    this.host.jqxSwitchButton('check');
                };
                jqxSwitchButtonComponent.prototype.disable = function () {
                    this.host.jqxSwitchButton('disable');
                };
                jqxSwitchButtonComponent.prototype.enable = function () {
                    this.host.jqxSwitchButton('enable');
                };
                jqxSwitchButtonComponent.prototype.toggle = function () {
                    this.host.jqxSwitchButton('toggle');
                };
                jqxSwitchButtonComponent.prototype.uncheck = function () {
                    this.host.jqxSwitchButton('uncheck');
                };
                jqxSwitchButtonComponent.prototype.val = function (value) {
                    return this.host.jqxSwitchButton('val', value);
                };
                jqxSwitchButtonComponent.prototype.__wireEvents__ = function () {
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
                ], jqxSwitchButtonComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxSwitchButtonComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('checked'), 
                    __metadata('design:type', Boolean)
                ], jqxSwitchButtonComponent.prototype, "checked", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxSwitchButtonComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('orientation'), 
                    __metadata('design:type', String)
                ], jqxSwitchButtonComponent.prototype, "orientation", void 0);
                __decorate([
                    core_1.Input('onLabel'), 
                    __metadata('design:type', String)
                ], jqxSwitchButtonComponent.prototype, "onLabel", void 0);
                __decorate([
                    core_1.Input('offLabel'), 
                    __metadata('design:type', String)
                ], jqxSwitchButtonComponent.prototype, "offLabel", void 0);
                __decorate([
                    core_1.Input('thumbSize'), 
                    __metadata('design:type', String)
                ], jqxSwitchButtonComponent.prototype, "thumbSize", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSwitchButtonComponent.prototype, "OnChecked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSwitchButtonComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSwitchButtonComponent.prototype, "OnUnchecked", void 0);
                jqxSwitchButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'angularSwitchButton',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxSwitchButtonComponent);
                return jqxSwitchButtonComponent;
                var _a;
            }());
            exports_1("jqxSwitchButtonComponent", jqxSwitchButtonComponent); //jqxSwitchButtonComponent
        }
    }
});
//# sourceMappingURL=angular_jqxswitchbutton.js.map