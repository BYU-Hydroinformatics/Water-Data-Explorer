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
    var jqxTabsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxTabsComponent = (function () {
                function jqxTabsComponent(containerElement) {
                    // jqxTabsComponent events
                    this.OnAdd = new core_1.EventEmitter();
                    this.OnCreated = new core_1.EventEmitter();
                    this.OnCollapsed = new core_1.EventEmitter();
                    this.OnDragStart = new core_1.EventEmitter();
                    this.OnDragEnd = new core_1.EventEmitter();
                    this.OnExpanded = new core_1.EventEmitter();
                    this.OnRemoved = new core_1.EventEmitter();
                    this.OnSelecting = new core_1.EventEmitter();
                    this.OnSelected = new core_1.EventEmitter();
                    this.OnTabclick = new core_1.EventEmitter();
                    this.OnUnselecting = new core_1.EventEmitter();
                    this.OnUnselected = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxTabsComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxTabsComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTabs', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxTabsComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxTabsComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxTabsComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxTabs(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxTabsComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxTabsComponent.prototype.setOptions = function (options) {
                    this.host.jqxTabs('setOptions', options);
                };
                // jqxTabsComponent functions
                jqxTabsComponent.prototype.addAt = function (index, title, content) {
                    this.host.jqxTabs('addAt', index, title, content);
                };
                jqxTabsComponent.prototype.addFirst = function (htmlElement) {
                    this.host.jqxTabs('addFirst', htmlElement);
                };
                jqxTabsComponent.prototype.addLast = function (htmlElement) {
                    this.host.jqxTabs('addLast', htmlElement);
                };
                jqxTabsComponent.prototype.collapse = function () {
                    this.host.jqxTabs('collapse');
                };
                jqxTabsComponent.prototype.disable = function () {
                    this.host.jqxTabs('disable');
                };
                jqxTabsComponent.prototype.disableAt = function (index) {
                    this.host.jqxTabs('disableAt', index);
                };
                jqxTabsComponent.prototype.destroy = function () {
                    this.host.jqxTabs('destroy');
                };
                jqxTabsComponent.prototype.ensureVisible = function (index) {
                    this.host.jqxTabs('ensureVisible', index);
                };
                jqxTabsComponent.prototype.enableAt = function (index) {
                    this.host.jqxTabs('enableAt', index);
                };
                jqxTabsComponent.prototype.expand = function () {
                    this.host.jqxTabs('expand');
                };
                jqxTabsComponent.prototype.enable = function () {
                    this.host.jqxTabs('enable');
                };
                jqxTabsComponent.prototype.focus = function () {
                    this.host.jqxTabs('focus');
                };
                jqxTabsComponent.prototype.getTitleAt = function (index) {
                    return this.host.jqxTabs('getTitleAt', index);
                };
                jqxTabsComponent.prototype.getContentAt = function (index) {
                    return this.host.jqxTabs('getContentAt', index);
                };
                jqxTabsComponent.prototype.hideCloseButtonAt = function (index) {
                    this.host.jqxTabs('hideCloseButtonAt', index);
                };
                jqxTabsComponent.prototype.hideAllCloseButtons = function () {
                    this.host.jqxTabs('hideAllCloseButtons');
                };
                jqxTabsComponent.prototype.length = function () {
                    return this.host.jqxTabs('length');
                };
                jqxTabsComponent.prototype.removeAt = function (index) {
                    this.host.jqxTabs('removeAt', index);
                };
                jqxTabsComponent.prototype.removeFirst = function () {
                    this.host.jqxTabs('removeFirst');
                };
                jqxTabsComponent.prototype.removeLast = function () {
                    this.host.jqxTabs('removeLast');
                };
                jqxTabsComponent.prototype.select = function (index) {
                    this.host.jqxTabs('select', index);
                };
                jqxTabsComponent.prototype.setContentAt = function (index, htmlElement) {
                    this.host.jqxTabs('setContentAt', index, htmlElement);
                };
                jqxTabsComponent.prototype.setTitleAt = function (index, htmlElement) {
                    this.host.jqxTabs('setTitleAt', index, htmlElement);
                };
                jqxTabsComponent.prototype.showCloseButtonAt = function (index) {
                    this.host.jqxTabs('showCloseButtonAt', index);
                };
                jqxTabsComponent.prototype.showAllCloseButtons = function () {
                    this.host.jqxTabs('showAllCloseButtons');
                };
                jqxTabsComponent.prototype.val = function (value) {
                    return this.host.jqxTabs('val', value);
                };
                jqxTabsComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('add', function (eventData) { if (self.OnAdd)
                        self.OnAdd.next(eventData); });
                    this.host.bind('created', function (eventData) { if (self.OnCreated)
                        self.OnCreated.next(eventData); });
                    this.host.bind('collapsed', function (eventData) { if (self.OnCollapsed)
                        self.OnCollapsed.next(eventData); });
                    this.host.bind('dragStart', function (eventData) { if (self.OnDragStart)
                        self.OnDragStart.next(eventData); });
                    this.host.bind('dragEnd', function (eventData) { if (self.OnDragEnd)
                        self.OnDragEnd.next(eventData); });
                    this.host.bind('expanded', function (eventData) { if (self.OnExpanded)
                        self.OnExpanded.next(eventData); });
                    this.host.bind('removed', function (eventData) { if (self.OnRemoved)
                        self.OnRemoved.next(eventData); });
                    this.host.bind('selecting', function (eventData) { if (self.OnSelecting)
                        self.OnSelecting.next(eventData); });
                    this.host.bind('selected', function (eventData) { if (self.OnSelected)
                        self.OnSelected.next(eventData); });
                    this.host.bind('tabclick', function (eventData) { if (self.OnTabclick)
                        self.OnTabclick.next(eventData); });
                    this.host.bind('unselecting', function (eventData) { if (self.OnUnselecting)
                        self.OnUnselecting.next(eventData); });
                    this.host.bind('unselected', function (eventData) { if (self.OnUnselected)
                        self.OnUnselected.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxTabsComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('autoHeight'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "autoHeight", void 0);
                __decorate([
                    core_1.Input('closeButtonSize'), 
                    __metadata('design:type', Number)
                ], jqxTabsComponent.prototype, "closeButtonSize", void 0);
                __decorate([
                    core_1.Input('collapsible'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "collapsible", void 0);
                __decorate([
                    core_1.Input('contentTransitionDuration'), 
                    __metadata('design:type', Number)
                ], jqxTabsComponent.prototype, "contentTransitionDuration", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enabledHover'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "enabledHover", void 0);
                __decorate([
                    core_1.Input('enableScrollAnimation'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "enableScrollAnimation", void 0);
                __decorate([
                    core_1.Input('initTabContent'), 
                    __metadata('design:type', Function)
                ], jqxTabsComponent.prototype, "initTabContent", void 0);
                __decorate([
                    core_1.Input('keyboardNavigation'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "keyboardNavigation", void 0);
                __decorate([
                    core_1.Input('position'), 
                    __metadata('design:type', String)
                ], jqxTabsComponent.prototype, "position", void 0);
                __decorate([
                    core_1.Input('reorder'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "reorder", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('scrollAnimationDuration'), 
                    __metadata('design:type', Number)
                ], jqxTabsComponent.prototype, "scrollAnimationDuration", void 0);
                __decorate([
                    core_1.Input('selectedItem'), 
                    __metadata('design:type', Number)
                ], jqxTabsComponent.prototype, "selectedItem", void 0);
                __decorate([
                    core_1.Input('selectionTracker'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "selectionTracker", void 0);
                __decorate([
                    core_1.Input('scrollable'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "scrollable", void 0);
                __decorate([
                    core_1.Input('scrollPosition'), 
                    __metadata('design:type', String)
                ], jqxTabsComponent.prototype, "scrollPosition", void 0);
                __decorate([
                    core_1.Input('scrollStep'), 
                    __metadata('design:type', Number)
                ], jqxTabsComponent.prototype, "scrollStep", void 0);
                __decorate([
                    core_1.Input('showCloseButtons'), 
                    __metadata('design:type', Boolean)
                ], jqxTabsComponent.prototype, "showCloseButtons", void 0);
                __decorate([
                    core_1.Input('toggleMode'), 
                    __metadata('design:type', String)
                ], jqxTabsComponent.prototype, "toggleMode", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxTabsComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnAdd", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnCreated", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnCollapsed", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnDragStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnDragEnd", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnExpanded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnRemoved", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnSelecting", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnTabclick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnUnselecting", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTabsComponent.prototype, "OnUnselected", void 0);
                jqxTabsComponent = __decorate([
                    core_1.Component({
                        selector: 'angularTabs',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxTabsComponent);
                return jqxTabsComponent;
                var _a;
            }());
            exports_1("jqxTabsComponent", jqxTabsComponent); //jqxTabsComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtabs.js.map