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
    var jqxScrollViewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxScrollViewComponent = (function () {
                function jqxScrollViewComponent(containerElement) {
                    // jqxScrollViewComponent events
                    this.OnPageChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxScrollViewComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxScrollViewComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxScrollView', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxScrollViewComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxScrollViewComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxScrollViewComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxScrollView(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxScrollViewComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxScrollViewComponent.prototype.setOptions = function (options) {
                    this.host.jqxScrollView('setOptions', options);
                };
                // jqxScrollViewComponent functions
                jqxScrollViewComponent.prototype.back = function () {
                    this.host.jqxScrollView('back');
                };
                jqxScrollViewComponent.prototype.changePage = function (index) {
                    this.host.jqxScrollView('changePage', index);
                };
                jqxScrollViewComponent.prototype.forward = function () {
                    this.host.jqxScrollView('forward');
                };
                jqxScrollViewComponent.prototype.refresh = function () {
                    this.host.jqxScrollView('refresh');
                };
                jqxScrollViewComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('pageChanged', function (eventData) { if (self.OnPageChanged)
                        self.OnPageChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxScrollViewComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxScrollViewComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Number)
                ], jqxScrollViewComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('bounceEnabled'), 
                    __metadata('design:type', Boolean)
                ], jqxScrollViewComponent.prototype, "bounceEnabled", void 0);
                __decorate([
                    core_1.Input('buttonsOffset'), 
                    __metadata('design:type', Array)
                ], jqxScrollViewComponent.prototype, "buttonsOffset", void 0);
                __decorate([
                    core_1.Input('currentPage'), 
                    __metadata('design:type', Number)
                ], jqxScrollViewComponent.prototype, "currentPage", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxScrollViewComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('moveThreshold'), 
                    __metadata('design:type', Number)
                ], jqxScrollViewComponent.prototype, "moveThreshold", void 0);
                __decorate([
                    core_1.Input('showButtons'), 
                    __metadata('design:type', Boolean)
                ], jqxScrollViewComponent.prototype, "showButtons", void 0);
                __decorate([
                    core_1.Input('slideShow'), 
                    __metadata('design:type', Boolean)
                ], jqxScrollViewComponent.prototype, "slideShow", void 0);
                __decorate([
                    core_1.Input('slideDuration'), 
                    __metadata('design:type', Number)
                ], jqxScrollViewComponent.prototype, "slideDuration", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxScrollViewComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxScrollViewComponent.prototype, "OnPageChanged", void 0);
                jqxScrollViewComponent = __decorate([
                    core_1.Component({
                        selector: 'angularScrollView',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxScrollViewComponent);
                return jqxScrollViewComponent;
                var _a;
            }());
            exports_1("jqxScrollViewComponent", jqxScrollViewComponent); //jqxScrollViewComponent
        }
    }
});
//# sourceMappingURL=angular_jqxscrollview.js.map