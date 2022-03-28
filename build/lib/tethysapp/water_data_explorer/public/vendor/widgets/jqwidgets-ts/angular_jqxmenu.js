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
    var jqxMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxMenuComponent = (function () {
                function jqxMenuComponent(containerElement) {
                    // jqxMenuComponent events
                    this.OnClosed = new core_1.EventEmitter();
                    this.OnItemclick = new core_1.EventEmitter();
                    this.OnInitialized = new core_1.EventEmitter();
                    this.OnShown = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxMenuComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxMenuComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxMenu', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxMenuComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxMenuComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxMenuComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxMenu(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxMenuComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxMenuComponent.prototype.setOptions = function (options) {
                    this.host.jqxMenu('setOptions', options);
                };
                // jqxMenuComponent functions
                jqxMenuComponent.prototype.closeItem = function (itemID) {
                    this.host.jqxMenu('closeItem', itemID);
                };
                jqxMenuComponent.prototype.close = function () {
                    this.host.jqxMenu('close');
                };
                jqxMenuComponent.prototype.disable = function (itemID, value) {
                    this.host.jqxMenu('disable', itemID, value);
                };
                jqxMenuComponent.prototype.destroy = function () {
                    this.host.jqxMenu('destroy');
                };
                jqxMenuComponent.prototype.focus = function () {
                    this.host.jqxMenu('focus');
                };
                jqxMenuComponent.prototype.minimize = function () {
                    this.host.jqxMenu('minimize');
                };
                jqxMenuComponent.prototype.open = function (left, top) {
                    this.host.jqxMenu('open', left, top);
                };
                jqxMenuComponent.prototype.openItem = function (itemID) {
                    this.host.jqxMenu('openItem', itemID);
                };
                jqxMenuComponent.prototype.restore = function () {
                    this.host.jqxMenu('restore');
                };
                jqxMenuComponent.prototype.setItemOpenDirection = function (item, horizontaldirection, verticaldirection) {
                    this.host.jqxMenu('setItemOpenDirection', item, horizontaldirection, verticaldirection);
                };
                jqxMenuComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('closed', function (eventData) { if (self.OnClosed)
                        self.OnClosed.next(eventData); });
                    this.host.bind('itemclick', function (eventData) { if (self.OnItemclick)
                        self.OnItemclick.next(eventData); });
                    this.host.bind('initialized', function (eventData) { if (self.OnInitialized)
                        self.OnInitialized.next(eventData); });
                    this.host.bind('shown', function (eventData) { if (self.OnShown)
                        self.OnShown.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationShowDuration'), 
                    __metadata('design:type', Number)
                ], jqxMenuComponent.prototype, "animationShowDuration", void 0);
                __decorate([
                    core_1.Input('animationHideDuration'), 
                    __metadata('design:type', Number)
                ], jqxMenuComponent.prototype, "animationHideDuration", void 0);
                __decorate([
                    core_1.Input('animationHideDelay'), 
                    __metadata('design:type', Number)
                ], jqxMenuComponent.prototype, "animationHideDelay", void 0);
                __decorate([
                    core_1.Input('animationShowDelay'), 
                    __metadata('design:type', Number)
                ], jqxMenuComponent.prototype, "animationShowDelay", void 0);
                __decorate([
                    core_1.Input('autoCloseInterval'), 
                    __metadata('design:type', Number)
                ], jqxMenuComponent.prototype, "autoCloseInterval", void 0);
                __decorate([
                    core_1.Input('autoSizeMainItems'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "autoSizeMainItems", void 0);
                __decorate([
                    core_1.Input('autoCloseOnClick'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "autoCloseOnClick", void 0);
                __decorate([
                    core_1.Input('autoOpenPopup'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "autoOpenPopup", void 0);
                __decorate([
                    core_1.Input('autoOpen'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "autoOpen", void 0);
                __decorate([
                    core_1.Input('clickToOpen'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "clickToOpen", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('easing'), 
                    __metadata('design:type', String)
                ], jqxMenuComponent.prototype, "easing", void 0);
                __decorate([
                    core_1.Input('keyboardNavigation'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "keyboardNavigation", void 0);
                __decorate([
                    core_1.Input('minimizeWidth'), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "minimizeWidth", void 0);
                __decorate([
                    core_1.Input('mode'), 
                    __metadata('design:type', String)
                ], jqxMenuComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.Input('popupZIndex'), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "popupZIndex", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('showTopLevelArrows'), 
                    __metadata('design:type', Boolean)
                ], jqxMenuComponent.prototype, "showTopLevelArrows", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxMenuComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "OnClosed", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "OnItemclick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "OnInitialized", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxMenuComponent.prototype, "OnShown", void 0);
                jqxMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'angularMenu',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxMenuComponent);
                return jqxMenuComponent;
                var _a;
            }());
            exports_1("jqxMenuComponent", jqxMenuComponent); //jqxMenuComponent
        }
    }
});
//# sourceMappingURL=angular_jqxmenu.js.map