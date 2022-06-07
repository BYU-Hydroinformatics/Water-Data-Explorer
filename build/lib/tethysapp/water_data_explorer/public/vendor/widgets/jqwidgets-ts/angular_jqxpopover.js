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
    var jqxPopoverComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxPopoverComponent = (function () {
                function jqxPopoverComponent(containerElement) {
                    // jqxPopoverComponent events
                    this.OnClose = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxPopoverComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxPopoverComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPopover', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxPopoverComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxPopoverComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxPopoverComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxPopover(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxPopoverComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxPopoverComponent.prototype.setOptions = function (options) {
                    this.host.jqxPopover('setOptions', options);
                };
                // jqxPopoverComponent functions
                jqxPopoverComponent.prototype.close = function () {
                    this.host.jqxPopover('close');
                };
                jqxPopoverComponent.prototype.destroy = function () {
                    this.host.jqxPopover('destroy');
                };
                jqxPopoverComponent.prototype.open = function () {
                    this.host.jqxPopover('open');
                };
                jqxPopoverComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxPopoverComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxPopoverComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('arrowOffsetValue'), 
                    __metadata('design:type', Number)
                ], jqxPopoverComponent.prototype, "arrowOffsetValue", void 0);
                __decorate([
                    core_1.Input('animationOpenDelay'), 
                    __metadata('design:type', String)
                ], jqxPopoverComponent.prototype, "animationOpenDelay", void 0);
                __decorate([
                    core_1.Input('animationCloseDelay'), 
                    __metadata('design:type', Object)
                ], jqxPopoverComponent.prototype, "animationCloseDelay", void 0);
                __decorate([
                    core_1.Input('autoClose'), 
                    __metadata('design:type', Boolean)
                ], jqxPopoverComponent.prototype, "autoClose", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxPopoverComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('initContent'), 
                    __metadata('design:type', Function)
                ], jqxPopoverComponent.prototype, "initContent", void 0);
                __decorate([
                    core_1.Input('isModal'), 
                    __metadata('design:type', Boolean)
                ], jqxPopoverComponent.prototype, "isModal", void 0);
                __decorate([
                    core_1.Input('offset'), 
                    __metadata('design:type', Object)
                ], jqxPopoverComponent.prototype, "offset", void 0);
                __decorate([
                    core_1.Input('position'), 
                    __metadata('design:type', String)
                ], jqxPopoverComponent.prototype, "position", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxPopoverComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('selector'), 
                    __metadata('design:type', String)
                ], jqxPopoverComponent.prototype, "selector", void 0);
                __decorate([
                    core_1.Input('showArrow'), 
                    __metadata('design:type', Boolean)
                ], jqxPopoverComponent.prototype, "showArrow", void 0);
                __decorate([
                    core_1.Input('showCloseButton'), 
                    __metadata('design:type', Boolean)
                ], jqxPopoverComponent.prototype, "showCloseButton", void 0);
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', Object)
                ], jqxPopoverComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxPopoverComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxPopoverComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxPopoverComponent.prototype, "OnOpen", void 0);
                jqxPopoverComponent = __decorate([
                    core_1.Component({
                        selector: 'angularPopover',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxPopoverComponent);
                return jqxPopoverComponent;
                var _a;
            }());
            exports_1("jqxPopoverComponent", jqxPopoverComponent); //jqxPopoverComponent
        }
    }
});
//# sourceMappingURL=angular_jqxpopover.js.map