/*
jQWidgets v4.2.0 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/

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
    var jqxResponseComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxResponseComponent = (function () {
                function jqxResponseComponent(containerElement) {
                    this.elementRef = containerElement;
                }
                jqxResponseComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxResponseComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxResponse', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxResponseComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    // this.initHost({});
                };
                jqxResponseComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxResponseComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxResponse(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxResponseComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxResponseComponent.prototype.setOptions = function (options) {
                    this.host.jqxResponse('setOptions', options);
                };
                // jqxResponseComponent functions
                jqxResponseComponent.prototype.refresh = function () {
                    this.host.jqxResponse('refresh');
                };
                // jqxResponseComponent events
                jqxResponseComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxResponseComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxResponseComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('browser'), 
                    __metadata('design:type', Object)
                ], jqxResponseComponent.prototype, "browser", void 0);
                __decorate([
                    core_1.Input('device'), 
                    __metadata('design:type', Object)
                ], jqxResponseComponent.prototype, "device", void 0);
                __decorate([
                    core_1.Input('document'), 
                    __metadata('design:type', Object)
                ], jqxResponseComponent.prototype, "document", void 0);
                __decorate([
                    core_1.Input('destroy'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "destroy", void 0);
                __decorate([
                    core_1.Input('resize'), 
                    __metadata('design:type', Object)
                ], jqxResponseComponent.prototype, "resize", void 0);
                __decorate([
                    core_1.Input('isHidden'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "isHidden", void 0);
                __decorate([
                    core_1.Input('inViewPort'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "inViewPort", void 0);
                __decorate([
                    core_1.Input('os'), 
                    __metadata('design:type', Object)
                ], jqxResponseComponent.prototype, "os", void 0);
                __decorate([
                    core_1.Input('pointerDown'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "pointerDown", void 0);
                __decorate([
                    core_1.Input('pointerMove'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "pointerMove", void 0);
                __decorate([
                    core_1.Input('pointerUp'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "pointerUp", void 0);
                __decorate([
                    core_1.Input('responsive'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "responsive", void 0);
                __decorate([
                    core_1.Input('scroll'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "scroll", void 0);
                __decorate([
                    core_1.Input('viewPort'), 
                    __metadata('design:type', Function)
                ], jqxResponseComponent.prototype, "viewPort", void 0);
                jqxResponseComponent = __decorate([
                    core_1.Component({
                        selector: 'angularResponse',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxResponseComponent);
                return jqxResponseComponent;
                var _a;
            }());
            exports_1("jqxResponseComponent", jqxResponseComponent); //jqxResponseComponent
        }
    }
});
//# sourceMappingURL=angular_jqxresponse.js.map