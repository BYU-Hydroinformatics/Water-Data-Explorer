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
    var jqxToggleButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxToggleButtonComponent = (function () {
                function jqxToggleButtonComponent(containerElement) {
                    // jqxToggleButtonComponent events
                    this.OnClick = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxToggleButtonComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxToggleButtonComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxToggleButton', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxToggleButtonComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxToggleButtonComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxToggleButtonComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxButton(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxToggleButtonComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxToggleButtonComponent.prototype.setOptions = function (options) {
                    this.host.jqxButton('setOptions', options);
                };
                // jqxToggleButtonComponent functions
                jqxToggleButtonComponent.prototype.check = function () {
                    this.host.jqxButton('check');
                };
                jqxToggleButtonComponent.prototype.destroy = function () {
                    this.host.jqxButton('destroy');
                };
                jqxToggleButtonComponent.prototype.focus = function () {
                    this.host.jqxButton('focus');
                };
                jqxToggleButtonComponent.prototype.render = function () {
                    this.host.jqxButton('render');
                };
                jqxToggleButtonComponent.prototype.toggle = function () {
                    this.host.jqxButton('toggle');
                };
                jqxToggleButtonComponent.prototype.unCheck = function () {
                    this.host.jqxButton('unCheck');
                };
                jqxToggleButtonComponent.prototype.val = function (value) {
                    if (value !== undefined) {
                        return this.host.jqxButton('val', value);
                    }
                    else {
                        return this.host.jqxButton('val');
                    }
                };
                jqxToggleButtonComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('click', function (eventData) { if (self.OnClick)
                        self.OnClick.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxToggleButtonComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxToggleButtonComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('delay'), 
                    __metadata('design:type', Number)
                ], jqxToggleButtonComponent.prototype, "delay", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxToggleButtonComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('imgSrc'), 
                    __metadata('design:type', String)
                ], jqxToggleButtonComponent.prototype, "imgSrc", void 0);
                __decorate([
                    core_1.Input('imgWidth'), 
                    __metadata('design:type', Object)
                ], jqxToggleButtonComponent.prototype, "imgWidth", void 0);
                __decorate([
                    core_1.Input('imgHeight'), 
                    __metadata('design:type', Object)
                ], jqxToggleButtonComponent.prototype, "imgHeight", void 0);
                __decorate([
                    core_1.Input('imgPosition'), 
                    __metadata('design:type', String)
                ], jqxToggleButtonComponent.prototype, "imgPosition", void 0);
                __decorate([
                    core_1.Input('roundedCorners'), 
                    __metadata('design:type', String)
                ], jqxToggleButtonComponent.prototype, "roundedCorners", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxToggleButtonComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('textPosition'), 
                    __metadata('design:type', String)
                ], jqxToggleButtonComponent.prototype, "textPosition", void 0);
                __decorate([
                    core_1.Input('textImageRelation'), 
                    __metadata('design:type', String)
                ], jqxToggleButtonComponent.prototype, "textImageRelation", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxToggleButtonComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxToggleButtonComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('toggled'), 
                    __metadata('design:type', Boolean)
                ], jqxToggleButtonComponent.prototype, "toggled", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', String)
                ], jqxToggleButtonComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxToggleButtonComponent.prototype, "OnClick", void 0);
                jqxToggleButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'angularToggleButton',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxToggleButtonComponent);
                return jqxToggleButtonComponent;
                var _a;
            }());
            exports_1("jqxToggleButtonComponent", jqxToggleButtonComponent); //jqxToggleButtonComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtogglebutton.js.map