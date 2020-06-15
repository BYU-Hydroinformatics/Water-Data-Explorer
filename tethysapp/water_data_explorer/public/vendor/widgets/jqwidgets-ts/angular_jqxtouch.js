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
    var jqxTouchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxTouchComponent = (function () {
                function jqxTouchComponent(containerElement) {
                    // jqxTouchComponent functions
                    // jqxTouchComponent events
                    this.OnOrientationchange = new core_1.EventEmitter();
                    this.OnSwipe = new core_1.EventEmitter();
                    this.OnSwipeleft = new core_1.EventEmitter();
                    this.OnSwiperight = new core_1.EventEmitter();
                    this.OnSwipetop = new core_1.EventEmitter();
                    this.OnSwipebottom = new core_1.EventEmitter();
                    this.OnTap = new core_1.EventEmitter();
                    this.OnTaphold = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxTouchComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxTouchComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTouch', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxTouchComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxTouchComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxTouchComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxTouch(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxTouchComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxTouchComponent.prototype.setOptions = function (options) {
                    this.host.jqxTouch('setOptions', options);
                };
                jqxTouchComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('orientationchange', function (eventData) { if (self.OnOrientationchange)
                        self.OnOrientationchange.next(eventData); });
                    this.host.bind('swipe', function (eventData) { if (self.OnSwipe)
                        self.OnSwipe.next(eventData); });
                    this.host.bind('swipeleft', function (eventData) { if (self.OnSwipeleft)
                        self.OnSwipeleft.next(eventData); });
                    this.host.bind('swiperight', function (eventData) { if (self.OnSwiperight)
                        self.OnSwiperight.next(eventData); });
                    this.host.bind('swipetop', function (eventData) { if (self.OnSwipetop)
                        self.OnSwipetop.next(eventData); });
                    this.host.bind('swipebottom', function (eventData) { if (self.OnSwipebottom)
                        self.OnSwipebottom.next(eventData); });
                    this.host.bind('tap', function (eventData) { if (self.OnTap)
                        self.OnTap.next(eventData); });
                    this.host.bind('taphold', function (eventData) { if (self.OnTaphold)
                        self.OnTaphold.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('orientationChangeEnabled'), 
                    __metadata('design:type', Boolean)
                ], jqxTouchComponent.prototype, "orientationChangeEnabled", void 0);
                __decorate([
                    core_1.Input('swipeMin'), 
                    __metadata('design:type', Number)
                ], jqxTouchComponent.prototype, "swipeMin", void 0);
                __decorate([
                    core_1.Input('swipeMax'), 
                    __metadata('design:type', Number)
                ], jqxTouchComponent.prototype, "swipeMax", void 0);
                __decorate([
                    core_1.Input('swipeDelay'), 
                    __metadata('design:type', Number)
                ], jqxTouchComponent.prototype, "swipeDelay", void 0);
                __decorate([
                    core_1.Input('tapHoldDelay'), 
                    __metadata('design:type', Number)
                ], jqxTouchComponent.prototype, "tapHoldDelay", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "OnOrientationchange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "OnSwipe", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "OnSwipeleft", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "OnSwiperight", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "OnSwipetop", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "OnSwipebottom", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "OnTap", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTouchComponent.prototype, "OnTaphold", void 0);
                jqxTouchComponent = __decorate([
                    core_1.Component({
                        selector: 'angularTouch',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxTouchComponent);
                return jqxTouchComponent;
                var _a;
            }());
            exports_1("jqxTouchComponent", jqxTouchComponent); //jqxTouchComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtouch.js.map