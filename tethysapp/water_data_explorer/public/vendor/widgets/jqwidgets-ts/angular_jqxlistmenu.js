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
    var jqxListMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxListMenuComponent = (function () {
                function jqxListMenuComponent(containerElement) {
                    this.elementRef = containerElement;
                }
                jqxListMenuComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxListMenuComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxListMenu', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxListMenuComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxListMenuComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxListMenuComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxListMenu(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxListMenuComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxListMenuComponent.prototype.setOptions = function (options) {
                    this.host.jqxListMenu('setOptions', options);
                };
                // jqxListMenuComponent functions
                jqxListMenuComponent.prototype.back = function () {
                    this.host.jqxListMenu('back');
                };
                jqxListMenuComponent.prototype.changePage = function (Item) {
                    this.host.jqxListMenu('changePage', Item);
                };
                jqxListMenuComponent.prototype.destroy = function () {
                    this.host.jqxListMenu('destroy');
                };
                // jqxListMenuComponent events
                jqxListMenuComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxListMenuComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxListMenuComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('alwaysShowNavigationArrows'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "alwaysShowNavigationArrows", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxListMenuComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Object)
                ], jqxListMenuComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('autoSeparators'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "autoSeparators", void 0);
                __decorate([
                    core_1.Input('backLabel'), 
                    __metadata('design:type', Object)
                ], jqxListMenuComponent.prototype, "backLabel", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enableScrolling'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "enableScrolling", void 0);
                __decorate([
                    core_1.Input('filterCallback'), 
                    __metadata('design:type', Function)
                ], jqxListMenuComponent.prototype, "filterCallback", void 0);
                __decorate([
                    core_1.Input('headerAnimationDuration'), 
                    __metadata('design:type', Object)
                ], jqxListMenuComponent.prototype, "headerAnimationDuration", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', Object)
                ], jqxListMenuComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('readOnly'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "readOnly", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('roundedCorners'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "roundedCorners", void 0);
                __decorate([
                    core_1.Input('showNavigationArrows'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "showNavigationArrows", void 0);
                __decorate([
                    core_1.Input('showFilter'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "showFilter", void 0);
                __decorate([
                    core_1.Input('showHeader'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "showHeader", void 0);
                __decorate([
                    core_1.Input('showBackButton'), 
                    __metadata('design:type', Boolean)
                ], jqxListMenuComponent.prototype, "showBackButton", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxListMenuComponent.prototype, "theme", void 0);
                jqxListMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'angularListMenu',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxListMenuComponent);
                return jqxListMenuComponent;
                var _a;
            }());
            exports_1("jqxListMenuComponent", jqxListMenuComponent); //jqxListMenuComponent
        }
    }
});
//# sourceMappingURL=angular_jqxlistmenu.js.map