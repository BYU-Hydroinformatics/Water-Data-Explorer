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
    var jqxNavigationBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxNavigationBarComponent = (function () {
                function jqxNavigationBarComponent(containerElement) {
                    // jqxNavigationBarComponent events
                    this.OnCollapsingItem = new core_1.EventEmitter();
                    this.OnCollapsedItem = new core_1.EventEmitter();
                    this.OnExpandingItem = new core_1.EventEmitter();
                    this.OnExpandedItem = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxNavigationBarComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxNavigationBarComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNavigationBar', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxNavigationBarComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxNavigationBarComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxNavigationBarComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxNavigationBar(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxNavigationBarComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxNavigationBarComponent.prototype.setOptions = function (options) {
                    this.host.jqxNavigationBar('setOptions', options);
                };
                // jqxNavigationBarComponent functions
                jqxNavigationBarComponent.prototype.add = function (header, content) {
                    this.host.jqxNavigationBar('add', header, content);
                };
                jqxNavigationBarComponent.prototype.collapseAt = function (index) {
                    this.host.jqxNavigationBar('collapseAt', index);
                };
                jqxNavigationBarComponent.prototype.disableAt = function (index) {
                    this.host.jqxNavigationBar('disableAt', index);
                };
                jqxNavigationBarComponent.prototype.disable = function () {
                    this.host.jqxNavigationBar('disable');
                };
                jqxNavigationBarComponent.prototype.destroy = function () {
                    this.host.jqxNavigationBar('destroy');
                };
                jqxNavigationBarComponent.prototype.expandAt = function (index) {
                    this.host.jqxNavigationBar('expandAt', index);
                };
                jqxNavigationBarComponent.prototype.enableAt = function (index) {
                    this.host.jqxNavigationBar('enableAt', index);
                };
                jqxNavigationBarComponent.prototype.enable = function () {
                    this.host.jqxNavigationBar('enable');
                };
                jqxNavigationBarComponent.prototype.focus = function () {
                    this.host.jqxNavigationBar('focus');
                };
                jqxNavigationBarComponent.prototype.getHeaderContentAt = function (index) {
                    this.host.jqxNavigationBar('getHeaderContentAt', index);
                };
                jqxNavigationBarComponent.prototype.getContentAt = function (index) {
                    this.host.jqxNavigationBar('getContentAt', index);
                };
                jqxNavigationBarComponent.prototype.hideArrowAt = function (index) {
                    this.host.jqxNavigationBar('hideArrowAt', index);
                };
                jqxNavigationBarComponent.prototype.invalidate = function () {
                    this.host.jqxNavigationBar('invalidate');
                };
                jqxNavigationBarComponent.prototype.insert = function (Index, header, content) {
                    this.host.jqxNavigationBar('insert', Index, header, content);
                };
                jqxNavigationBarComponent.prototype.refresh = function () {
                    this.host.jqxNavigationBar('refresh');
                };
                jqxNavigationBarComponent.prototype.render = function () {
                    this.host.jqxNavigationBar('render');
                };
                jqxNavigationBarComponent.prototype.remove = function (index) {
                    this.host.jqxNavigationBar('remove', index);
                };
                jqxNavigationBarComponent.prototype.setContentAt = function (index, item) {
                    this.host.jqxNavigationBar('setContentAt', index, item);
                };
                jqxNavigationBarComponent.prototype.setHeaderContentAt = function (index, item) {
                    this.host.jqxNavigationBar('setHeaderContentAt', index, item);
                };
                jqxNavigationBarComponent.prototype.showArrowAt = function (index) {
                    this.host.jqxNavigationBar('showArrowAt', index);
                };
                jqxNavigationBarComponent.prototype.update = function (index, header, content) {
                    this.host.jqxNavigationBar('update', index, header, content);
                };
                jqxNavigationBarComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxNavigationBar('val', value);
                    }
                    else {
                        return this.host.jqxNavigationBar('val');
                    }
                };
                jqxNavigationBarComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('collapsingItem', function (eventData) { if (self.OnCollapsingItem)
                        self.OnCollapsingItem.next(eventData); });
                    this.host.bind('collapsedItem', function (eventData) { if (self.OnCollapsedItem)
                        self.OnCollapsedItem.next(eventData); });
                    this.host.bind('expandingItem', function (eventData) { if (self.OnExpandingItem)
                        self.OnExpandingItem.next(eventData); });
                    this.host.bind('expandedItem', function (eventData) { if (self.OnExpandedItem)
                        self.OnExpandedItem.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxNavigationBarComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxNavigationBarComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxNavigationBarComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('arrowPosition'), 
                    __metadata('design:type', String)
                ], jqxNavigationBarComponent.prototype, "arrowPosition", void 0);
                __decorate([
                    core_1.Input('collapseAnimationDuration'), 
                    __metadata('design:type', Number)
                ], jqxNavigationBarComponent.prototype, "collapseAnimationDuration", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxNavigationBarComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('expandAnimationDuration'), 
                    __metadata('design:type', Number)
                ], jqxNavigationBarComponent.prototype, "expandAnimationDuration", void 0);
                __decorate([
                    core_1.Input('expandMode'), 
                    __metadata('design:type', String)
                ], jqxNavigationBarComponent.prototype, "expandMode", void 0);
                __decorate([
                    core_1.Input('expandedIndexes'), 
                    __metadata('design:type', Array)
                ], jqxNavigationBarComponent.prototype, "expandedIndexes", void 0);
                __decorate([
                    core_1.Input('initContent'), 
                    __metadata('design:type', Function)
                ], jqxNavigationBarComponent.prototype, "initContent", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxNavigationBarComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('showArrow'), 
                    __metadata('design:type', Boolean)
                ], jqxNavigationBarComponent.prototype, "showArrow", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxNavigationBarComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('toggleMode'), 
                    __metadata('design:type', String)
                ], jqxNavigationBarComponent.prototype, "toggleMode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNavigationBarComponent.prototype, "OnCollapsingItem", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNavigationBarComponent.prototype, "OnCollapsedItem", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNavigationBarComponent.prototype, "OnExpandingItem", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNavigationBarComponent.prototype, "OnExpandedItem", void 0);
                jqxNavigationBarComponent = __decorate([
                    core_1.Component({
                        selector: 'angularNavigationBar',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxNavigationBarComponent);
                return jqxNavigationBarComponent;
                var _a;
            }());
            exports_1("jqxNavigationBarComponent", jqxNavigationBarComponent); //jqxNavigationBarComponent
        }
    }
});
//# sourceMappingURL=angular_jqxnavigationbar.js.map