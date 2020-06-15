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
    var jqxLoaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxLoaderComponent = (function () {
                function jqxLoaderComponent(containerElement) {
                    // jqxLoaderComponent events
                    this.OnCreate = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxLoaderComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxLoaderComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLoader', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxLoaderComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxLoaderComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxLoaderComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxLoader(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxLoaderComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxLoaderComponent.prototype.setOptions = function (options) {
                    this.host.jqxLoader('setOptions', options);
                };
                // jqxLoaderComponent functions
                jqxLoaderComponent.prototype.close = function () {
                    this.host.jqxLoader('close');
                };
                jqxLoaderComponent.prototype.open = function () {
                    this.host.jqxLoader('open');
                };
                jqxLoaderComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('create', function (eventData) { if (self.OnCreate)
                        self.OnCreate.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxLoaderComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxLoaderComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('autoOpen'), 
                    __metadata('design:type', Boolean)
                ], jqxLoaderComponent.prototype, "autoOpen", void 0);
                __decorate([
                    core_1.Input('html'), 
                    __metadata('design:type', String)
                ], jqxLoaderComponent.prototype, "html", void 0);
                __decorate([
                    core_1.Input('isModal'), 
                    __metadata('design:type', Boolean)
                ], jqxLoaderComponent.prototype, "isModal", void 0);
                __decorate([
                    core_1.Input('imagePosition'), 
                    __metadata('design:type', String)
                ], jqxLoaderComponent.prototype, "imagePosition", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxLoaderComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('text'), 
                    __metadata('design:type', Object)
                ], jqxLoaderComponent.prototype, "text", void 0);
                __decorate([
                    core_1.Input('textPosition'), 
                    __metadata('design:type', String)
                ], jqxLoaderComponent.prototype, "textPosition", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxLoaderComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxLoaderComponent.prototype, "OnCreate", void 0);
                jqxLoaderComponent = __decorate([
                    core_1.Component({
                        selector: 'angularLoader',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxLoaderComponent);
                return jqxLoaderComponent;
                var _a;
            }());
            exports_1("jqxLoaderComponent", jqxLoaderComponent); //jqxLoaderComponent
        }
    }
});
//# sourceMappingURL=angular_jqxloader.js.map