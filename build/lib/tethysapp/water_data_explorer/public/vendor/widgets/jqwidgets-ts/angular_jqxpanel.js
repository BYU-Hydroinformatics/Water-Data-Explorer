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
    var jqxPanelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxPanelComponent = (function () {
                function jqxPanelComponent(containerElement) {
                    this.elementRef = containerElement;
                }
                jqxPanelComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxPanelComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPanel', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxPanelComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxPanelComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxPanelComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxPanel(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxPanelComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxPanelComponent.prototype.setOptions = function (options) {
                    this.host.jqxPanel('setOptions', options);
                };
                // jqxPanelComponent functions
                jqxPanelComponent.prototype.append = function (HTMLElement) {
                    this.host.jqxPanel('append', HTMLElement);
                };
                jqxPanelComponent.prototype.clearcontent = function () {
                    this.host.jqxPanel('clearcontent');
                };
                jqxPanelComponent.prototype.destroy = function () {
                    this.host.jqxPanel('destroy');
                };
                jqxPanelComponent.prototype.focus = function () {
                    this.host.jqxPanel('focus');
                };
                jqxPanelComponent.prototype.getScrollHeight = function () {
                    return this.host.jqxPanel('getScrollHeight');
                };
                jqxPanelComponent.prototype.getVScrollPosition = function () {
                    return this.host.jqxPanel('getVScrollPosition');
                };
                jqxPanelComponent.prototype.getScrollWidth = function () {
                    return this.host.jqxPanel('getScrollWidth');
                };
                jqxPanelComponent.prototype.getHScrollPosition = function () {
                    return this.host.jqxPanel('getHScrollPosition');
                };
                jqxPanelComponent.prototype.prepend = function (HTMLElement) {
                    this.host.jqxPanel('prepend', HTMLElement);
                };
                jqxPanelComponent.prototype.remove = function (HTMLElement) {
                    this.host.jqxPanel('remove', HTMLElement);
                };
                jqxPanelComponent.prototype.scrollTo = function (top, left) {
                    this.host.jqxPanel('scrollTo', top, left);
                };
                // jqxPanelComponent events
                jqxPanelComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxPanelComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxPanelComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('autoUpdate'), 
                    __metadata('design:type', Boolean)
                ], jqxPanelComponent.prototype, "autoUpdate", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxPanelComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxPanelComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('sizeMode'), 
                    __metadata('design:type', String)
                ], jqxPanelComponent.prototype, "sizeMode", void 0);
                __decorate([
                    core_1.Input('scrollBarSize'), 
                    __metadata('design:type', Object)
                ], jqxPanelComponent.prototype, "scrollBarSize", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxPanelComponent.prototype, "theme", void 0);
                jqxPanelComponent = __decorate([
                    core_1.Component({
                        selector: 'angularPanel',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxPanelComponent);
                return jqxPanelComponent;
                var _a;
            }());
            exports_1("jqxPanelComponent", jqxPanelComponent); //jqxPanelComponent
        }
    }
});
//# sourceMappingURL=angular_jqxpanel.js.map