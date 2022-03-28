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
    var jqxNotificationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxNotificationComponent = (function () {
                function jqxNotificationComponent(containerElement) {
                    // jqxNotificationComponent events
                    this.OnClose = new core_1.EventEmitter();
                    this.OnClick = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxNotificationComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxNotificationComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNotification', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxNotificationComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxNotificationComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxNotificationComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxNotification(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxNotificationComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxNotificationComponent.prototype.setOptions = function (options) {
                    this.host.jqxNotification('setOptions', options);
                };
                // jqxNotificationComponent functions
                jqxNotificationComponent.prototype.closeAll = function () {
                    this.host.jqxNotification('closeAll');
                };
                jqxNotificationComponent.prototype.closeLast = function () {
                    this.host.jqxNotification('closeLast');
                };
                jqxNotificationComponent.prototype.destroy = function () {
                    this.host.jqxNotification('destroy');
                };
                jqxNotificationComponent.prototype.open = function () {
                    this.host.jqxNotification('open');
                };
                jqxNotificationComponent.prototype.refresh = function () {
                    this.host.jqxNotification('refresh');
                };
                jqxNotificationComponent.prototype.render = function () {
                    this.host.jqxNotification('render');
                };
                jqxNotificationComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('click', function (eventData) { if (self.OnClick)
                        self.OnClick.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxNotificationComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxNotificationComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('appendContainer'), 
                    __metadata('design:type', String)
                ], jqxNotificationComponent.prototype, "appendContainer", void 0);
                __decorate([
                    core_1.Input('autoOpen'), 
                    __metadata('design:type', Boolean)
                ], jqxNotificationComponent.prototype, "autoOpen", void 0);
                __decorate([
                    core_1.Input('animationOpenDelay'), 
                    __metadata('design:type', Number)
                ], jqxNotificationComponent.prototype, "animationOpenDelay", void 0);
                __decorate([
                    core_1.Input('animationCloseDelay'), 
                    __metadata('design:type', Number)
                ], jqxNotificationComponent.prototype, "animationCloseDelay", void 0);
                __decorate([
                    core_1.Input('autoClose'), 
                    __metadata('design:type', Boolean)
                ], jqxNotificationComponent.prototype, "autoClose", void 0);
                __decorate([
                    core_1.Input('autoCloseDelay'), 
                    __metadata('design:type', Object)
                ], jqxNotificationComponent.prototype, "autoCloseDelay", void 0);
                __decorate([
                    core_1.Input('blink'), 
                    __metadata('design:type', Boolean)
                ], jqxNotificationComponent.prototype, "blink", void 0);
                __decorate([
                    core_1.Input('browserBoundsOffset'), 
                    __metadata('design:type', Number)
                ], jqxNotificationComponent.prototype, "browserBoundsOffset", void 0);
                __decorate([
                    core_1.Input('closeOnClick'), 
                    __metadata('design:type', Boolean)
                ], jqxNotificationComponent.prototype, "closeOnClick", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxNotificationComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('hoverOpacity'), 
                    __metadata('design:type', Number)
                ], jqxNotificationComponent.prototype, "hoverOpacity", void 0);
                __decorate([
                    core_1.Input('icon'), 
                    __metadata('design:type', Object)
                ], jqxNotificationComponent.prototype, "icon", void 0);
                __decorate([
                    core_1.Input('notificationOffset'), 
                    __metadata('design:type', Number)
                ], jqxNotificationComponent.prototype, "notificationOffset", void 0);
                __decorate([
                    core_1.Input('opacity'), 
                    __metadata('design:type', Number)
                ], jqxNotificationComponent.prototype, "opacity", void 0);
                __decorate([
                    core_1.Input('position'), 
                    __metadata('design:type', String)
                ], jqxNotificationComponent.prototype, "position", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxNotificationComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('showCloseButton'), 
                    __metadata('design:type', Boolean)
                ], jqxNotificationComponent.prototype, "showCloseButton", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxNotificationComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxNotificationComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNotificationComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNotificationComponent.prototype, "OnClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNotificationComponent.prototype, "OnOpen", void 0);
                jqxNotificationComponent = __decorate([
                    core_1.Component({
                        selector: 'angularNotification',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxNotificationComponent);
                return jqxNotificationComponent;
                var _a;
            }());
            exports_1("jqxNotificationComponent", jqxNotificationComponent); //jqxNotificationComponent
        }
    }
});
//# sourceMappingURL=angular_jqxnotification.js.map