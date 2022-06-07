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
    var jqxWindowComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxWindowComponent = (function () {
                function jqxWindowComponent(containerElement) {
                    // jqxWindowComponent events
                    this.OnClose = new core_1.EventEmitter();
                    this.OnCollapse = new core_1.EventEmitter();
                    this.OnCreated = new core_1.EventEmitter();
                    this.OnExpand = new core_1.EventEmitter();
                    this.OnMoving = new core_1.EventEmitter();
                    this.OnMoved = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.OnResizing = new core_1.EventEmitter();
                    this.OnResized = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxWindowComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxWindowComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxWindow', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxWindowComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxWindowComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxWindowComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxWindow(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxWindowComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxWindowComponent.prototype.setOptions = function (options) {
                    this.host.jqxWindow('setOptions', options);
                };
                // jqxWindowComponent functions
                jqxWindowComponent.prototype.bringToFront = function () {
                    this.host.jqxWindow('bringToFront');
                };
                jqxWindowComponent.prototype.close = function () {
                    this.host.jqxWindow('close');
                };
                jqxWindowComponent.prototype.collapse = function () {
                    this.host.jqxWindow('collapse');
                };
                jqxWindowComponent.prototype.closeAll = function () {
                    this.host.jqxWindow('closeAll');
                };
                jqxWindowComponent.prototype.disable = function () {
                    this.host.jqxWindow('disable');
                };
                jqxWindowComponent.prototype.destroy = function () {
                    this.host.jqxWindow('destroy');
                };
                jqxWindowComponent.prototype.enable = function () {
                    this.host.jqxWindow('enable');
                };
                jqxWindowComponent.prototype.expand = function () {
                    this.host.jqxWindow('expand');
                };
                jqxWindowComponent.prototype.focus = function () {
                    this.host.jqxWindow('focus');
                };
                jqxWindowComponent.prototype.isOpen = function () {
                    return this.host.jqxWindow('isOpen');
                };
                jqxWindowComponent.prototype.move = function (top, left) {
                    this.host.jqxWindow('move', top, left);
                };
                jqxWindowComponent.prototype.open = function () {
                    this.host.jqxWindow('open');
                };
                jqxWindowComponent.prototype.resize = function (top, left) {
                    this.host.jqxWindow('resize', top, left);
                };
                jqxWindowComponent.prototype.setTitle = function (title) {
                    this.host.jqxWindow('setTitle', title);
                };
                jqxWindowComponent.prototype.setContent = function (content) {
                    this.host.jqxWindow('setContent', content);
                };
                jqxWindowComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('collapse', function (eventData) { if (self.OnCollapse)
                        self.OnCollapse.next(eventData); });
                    this.host.bind('created', function (eventData) { if (self.OnCreated)
                        self.OnCreated.next(eventData); });
                    this.host.bind('expand', function (eventData) { if (self.OnExpand)
                        self.OnExpand.next(eventData); });
                    this.host.bind('moving', function (eventData) { if (self.OnMoving)
                        self.OnMoving.next(eventData); });
                    this.host.bind('moved', function (eventData) { if (self.OnMoved)
                        self.OnMoved.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                    this.host.bind('resizing', function (eventData) { if (self.OnResizing)
                        self.OnResizing.next(eventData); });
                    this.host.bind('resized', function (eventData) { if (self.OnResized)
                        self.OnResized.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('autoOpen'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "autoOpen", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxWindowComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('collapsed'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "collapsed", void 0);
                __decorate([
                    core_1.Input('collapseAnimationDuration'), 
                    __metadata('design:type', Number)
                ], jqxWindowComponent.prototype, "collapseAnimationDuration", void 0);
                __decorate([
                    core_1.Input('content'), 
                    __metadata('design:type', String)
                ], jqxWindowComponent.prototype, "content", void 0);
                __decorate([
                    core_1.Input('closeAnimationDuration'), 
                    __metadata('design:type', Number)
                ], jqxWindowComponent.prototype, "closeAnimationDuration", void 0);
                __decorate([
                    core_1.Input('closeButtonSize'), 
                    __metadata('design:type', Number)
                ], jqxWindowComponent.prototype, "closeButtonSize", void 0);
                __decorate([
                    core_1.Input('closeButtonAction'), 
                    __metadata('design:type', String)
                ], jqxWindowComponent.prototype, "closeButtonAction", void 0);
                __decorate([
                    core_1.Input('cancelButton'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "cancelButton", void 0);
                __decorate([
                    core_1.Input('dragArea'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "dragArea", void 0);
                __decorate([
                    core_1.Input('draggable'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "draggable", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('initContent'), 
                    __metadata('design:type', Function)
                ], jqxWindowComponent.prototype, "initContent", void 0);
                __decorate([
                    core_1.Input('isModal'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "isModal", void 0);
                __decorate([
                    core_1.Input('keyboardCloseKey'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "keyboardCloseKey", void 0);
                __decorate([
                    core_1.Input('keyboardNavigation'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "keyboardNavigation", void 0);
                __decorate([
                    core_1.Input('minHeight'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "minHeight", void 0);
                __decorate([
                    core_1.Input('maxHeight'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "maxHeight", void 0);
                __decorate([
                    core_1.Input('minWidth'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "minWidth", void 0);
                __decorate([
                    core_1.Input('maxWidth'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "maxWidth", void 0);
                __decorate([
                    core_1.Input('modalOpacity'), 
                    __metadata('design:type', Number)
                ], jqxWindowComponent.prototype, "modalOpacity", void 0);
                __decorate([
                    core_1.Input('modalZIndex'), 
                    __metadata('design:type', Number)
                ], jqxWindowComponent.prototype, "modalZIndex", void 0);
                __decorate([
                    core_1.Input('modalBackgroundZIndex'), 
                    __metadata('design:type', Number)
                ], jqxWindowComponent.prototype, "modalBackgroundZIndex", void 0);
                __decorate([
                    core_1.Input('okButton'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "okButton", void 0);
                __decorate([
                    core_1.Input('position'), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "position", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('resizable'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "resizable", void 0);
                __decorate([
                    core_1.Input('showAnimationDuration'), 
                    __metadata('design:type', Number)
                ], jqxWindowComponent.prototype, "showAnimationDuration", void 0);
                __decorate([
                    core_1.Input('showCloseButton'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "showCloseButton", void 0);
                __decorate([
                    core_1.Input('showCollapseButton'), 
                    __metadata('design:type', Boolean)
                ], jqxWindowComponent.prototype, "showCollapseButton", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxWindowComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', String)
                ], jqxWindowComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input('zIndex'), 
                    __metadata('design:type', Number)
                ], jqxWindowComponent.prototype, "zIndex", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnCollapse", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnCreated", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnExpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnMoving", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnMoved", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnResizing", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxWindowComponent.prototype, "OnResized", void 0);
                jqxWindowComponent = __decorate([
                    core_1.Component({
                        selector: 'angularWindow',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxWindowComponent);
                return jqxWindowComponent;
                var _a;
            }());
            exports_1("jqxWindowComponent", jqxWindowComponent); //jqxWindowComponent
        }
    }
});
//# sourceMappingURL=angular_jqxwindow.js.map