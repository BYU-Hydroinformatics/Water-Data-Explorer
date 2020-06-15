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
    var jqxButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxButtonComponent = (function () {
                function jqxButtonComponent(containerElement) {
                    // jqxButtonComponent events
                    this.OnClick = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxButtonComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxButtonComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.widgetObject = jqwidgets.createInstance($(this.elementRef.nativeElement.firstChild), 'jqxButton', options);
                    this.host = this.widgetObject["host"];
                    this.__wireEvents__();
                    this.__updateRect__();
                    return true;
                };
                jqxButtonComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxButtonComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxButtonComponent.prototype.ngOnChanges = function (changes) {
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
                jqxButtonComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxButtonComponent.prototype.setOptions = function (options) {
                    this.host.jqxButton('setOptions', options);
                };
                // jqxButtonComponent functions
                jqxButtonComponent.prototype.check = function () {
                    this.host.jqxButton('check');
                };
                jqxButtonComponent.prototype.destroy = function () {
                    this.host.jqxButton('destroy');
                };
                jqxButtonComponent.prototype.focus = function () {
                    this.host.jqxButton('focus');
                };
                jqxButtonComponent.prototype.render = function () {
                    this.host.jqxButton('render');
                };
                jqxButtonComponent.prototype.toggle = function () {
                    this.host.jqxButton('toggle');
                };
                jqxButtonComponent.prototype.unCheck = function () {
                    this.host.jqxButton('unCheck');
                };
                jqxButtonComponent.prototype.val = function (value) {
                    if (value !== undefined) {
                        return this.host.jqxButton('val', value);
                    }
                    else {
                        return this.host.jqxButton('val');
                    }
                };
                jqxButtonComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('click', function (eventData) { if (self.OnClick)
                        self.OnClick.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxButtonComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxButtonComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('delay'), 
                    __metadata('design:type', Number)
                ], jqxButtonComponent.prototype, "delay", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxButtonComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('imgSrc'), 
                    __metadata('design:type', String)
                ], jqxButtonComponent.prototype, "imgSrc", void 0);
                __decorate([
                    core_1.Input('imgWidth'), 
                    __metadata('design:type', Object)
                ], jqxButtonComponent.prototype, "imgWidth", void 0);
                __decorate([
                    core_1.Input('imgHeight'), 
                    __metadata('design:type', Object)
                ], jqxButtonComponent.prototype, "imgHeight", void 0);
                __decorate([
                    core_1.Input('imgPosition'), 
                    __metadata('design:type', String)
                ], jqxButtonComponent.prototype, "imgPosition", void 0);
                __decorate([
                    core_1.Input('roundedCorners'), 
                    __metadata('design:type', String)
                ], jqxButtonComponent.prototype, "roundedCorners", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxButtonComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('textPosition'), 
                    __metadata('design:type', String)
                ], jqxButtonComponent.prototype, "textPosition", void 0);
                __decorate([
                    core_1.Input('textImageRelation'), 
                    __metadata('design:type', String)
                ], jqxButtonComponent.prototype, "textImageRelation", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxButtonComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxButtonComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('toggled'), 
                    __metadata('design:type', Boolean)
                ], jqxButtonComponent.prototype, "toggled", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', String)
                ], jqxButtonComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxButtonComponent.prototype, "OnClick", void 0);
                jqxButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'angularButton',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxButtonComponent);
                return jqxButtonComponent;
                var _a;
            }());
            exports_1("jqxButtonComponent", jqxButtonComponent); //jqxButtonComponent
        }
    }
});
//# sourceMappingURL=angular_jqxbutton.js.map