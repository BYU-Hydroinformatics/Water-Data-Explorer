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
    var jqxDropDownButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDropDownButtonComponent = (function () {
                function jqxDropDownButtonComponent(containerElement) {
                    // jqxDropDownButtonComponent events
                    this.OnClose = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxDropDownButtonComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDropDownButtonComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    ;
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDropDownButton', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDropDownButtonComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDropDownButtonComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDropDownButtonComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDropDownButton(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDropDownButtonComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDropDownButtonComponent.prototype.setOptions = function (options) {
                    this.host.jqxDropDownButton('setOptions', options);
                };
                // jqxDropDownButtonComponent functions
                jqxDropDownButtonComponent.prototype.close = function () {
                    this.host.jqxDropDownButton('close');
                };
                jqxDropDownButtonComponent.prototype.destroy = function () {
                    this.host.jqxDropDownButton('destroy');
                };
                jqxDropDownButtonComponent.prototype.focus = function () {
                    this.host.jqxDropDownButton('focus');
                };
                jqxDropDownButtonComponent.prototype.getContent = function () {
                    return this.host.jqxDropDownButton('getContent');
                };
                jqxDropDownButtonComponent.prototype.isOpened = function () {
                    return this.host.jqxDropDownButton('isOpened');
                };
                jqxDropDownButtonComponent.prototype.open = function () {
                    this.host.jqxDropDownButton('open');
                };
                jqxDropDownButtonComponent.prototype.setContent = function (content) {
                    this.host.jqxDropDownButton('setContent', content);
                };
                jqxDropDownButtonComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDropDownButtonComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDropDownButtonComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxDropDownButtonComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('arrowSize'), 
                    __metadata('design:type', Number)
                ], jqxDropDownButtonComponent.prototype, "arrowSize", void 0);
                __decorate([
                    core_1.Input('autoOpen'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownButtonComponent.prototype, "autoOpen", void 0);
                __decorate([
                    core_1.Input('closeDelay'), 
                    __metadata('design:type', Number)
                ], jqxDropDownButtonComponent.prototype, "closeDelay", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownButtonComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('dropDownHorizontalAlignment'), 
                    __metadata('design:type', String)
                ], jqxDropDownButtonComponent.prototype, "dropDownHorizontalAlignment", void 0);
                __decorate([
                    core_1.Input('dropDownVerticalAlignment'), 
                    __metadata('design:type', String)
                ], jqxDropDownButtonComponent.prototype, "dropDownVerticalAlignment", void 0);
                __decorate([
                    core_1.Input('dropDownWidth'), 
                    __metadata('design:type', Object)
                ], jqxDropDownButtonComponent.prototype, "dropDownWidth", void 0);
                __decorate([
                    core_1.Input('enableBrowserBoundsDetection'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownButtonComponent.prototype, "enableBrowserBoundsDetection", void 0);
                __decorate([
                    core_1.Input('initContent'), 
                    __metadata('design:type', Function)
                ], jqxDropDownButtonComponent.prototype, "initContent", void 0);
                __decorate([
                    core_1.Input('openDelay'), 
                    __metadata('design:type', Number)
                ], jqxDropDownButtonComponent.prototype, "openDelay", void 0);
                __decorate([
                    core_1.Input('popupZIndex'), 
                    __metadata('design:type', Number)
                ], jqxDropDownButtonComponent.prototype, "popupZIndex", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownButtonComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxDropDownButtonComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxDropDownButtonComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownButtonComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownButtonComponent.prototype, "OnOpen", void 0);
                jqxDropDownButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDropDownButton',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDropDownButtonComponent);
                return jqxDropDownButtonComponent;
                var _a;
            }());
            exports_1("jqxDropDownButtonComponent", jqxDropDownButtonComponent); //jqxDropDownButtonComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdropdownbutton.js.map