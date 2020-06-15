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
    var jqxRibbonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxRibbonComponent = (function () {
                function jqxRibbonComponent(containerElement) {
                    // jqxRibbonComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.OnReorder = new core_1.EventEmitter();
                    this.OnSelect = new core_1.EventEmitter();
                    this.OnUnselect = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxRibbonComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxRibbonComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRibbon', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxRibbonComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxRibbonComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxRibbonComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxRibbon(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxRibbonComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxRibbonComponent.prototype.setOptions = function (options) {
                    this.host.jqxRibbon('setOptions', options);
                };
                // jqxRibbonComponent functions
                jqxRibbonComponent.prototype.addAt = function (index, item) {
                    this.host.jqxRibbon('addAt', index, item);
                };
                jqxRibbonComponent.prototype.clearSelection = function () {
                    this.host.jqxRibbon('clearSelection');
                };
                jqxRibbonComponent.prototype.disableAt = function (index) {
                    this.host.jqxRibbon('disableAt', index);
                };
                jqxRibbonComponent.prototype.destroy = function () {
                    this.host.jqxRibbon('destroy');
                };
                jqxRibbonComponent.prototype.enableAt = function (index) {
                    this.host.jqxRibbon('enableAt', index);
                };
                jqxRibbonComponent.prototype.hideAt = function (index) {
                    this.host.jqxRibbon('hideAt', index);
                };
                jqxRibbonComponent.prototype.removeAt = function (index) {
                    this.host.jqxRibbon('removeAt', index);
                };
                jqxRibbonComponent.prototype.render = function () {
                    this.host.jqxRibbon('render');
                };
                jqxRibbonComponent.prototype.refresh = function () {
                    this.host.jqxRibbon('refresh');
                };
                jqxRibbonComponent.prototype.selectAt = function (index) {
                    this.host.jqxRibbon('selectAt', index);
                };
                jqxRibbonComponent.prototype.showAt = function (index) {
                    this.host.jqxRibbon('showAt', index);
                };
                jqxRibbonComponent.prototype.setPopupLayout = function (index, layout, width, height) {
                    this.host.jqxRibbon('setPopupLayout', index, layout, width, height);
                };
                jqxRibbonComponent.prototype.updateAt = function (index, item) {
                    this.host.jqxRibbon('updateAt', index, item);
                };
                jqxRibbonComponent.prototype.val = function (value) {
                    return this.host.jqxRibbon('val', value);
                };
                jqxRibbonComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('reorder', function (eventData) { if (self.OnReorder)
                        self.OnReorder.next(eventData); });
                    this.host.bind('select', function (eventData) { if (self.OnSelect)
                        self.OnSelect.next(eventData); });
                    this.host.bind('unselect', function (eventData) { if (self.OnUnselect)
                        self.OnUnselect.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxRibbonComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxRibbonComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxRibbonComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('animationDelay'), 
                    __metadata('design:type', Object)
                ], jqxRibbonComponent.prototype, "animationDelay", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxRibbonComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('initContent'), 
                    __metadata('design:type', Function)
                ], jqxRibbonComponent.prototype, "initContent", void 0);
                __decorate([
                    core_1.Input('mode'), 
                    __metadata('design:type', String)
                ], jqxRibbonComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.Input('popupCloseMode'), 
                    __metadata('design:type', String)
                ], jqxRibbonComponent.prototype, "popupCloseMode", void 0);
                __decorate([
                    core_1.Input('position'), 
                    __metadata('design:type', String)
                ], jqxRibbonComponent.prototype, "position", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxRibbonComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('selectedIndex'), 
                    __metadata('design:type', Number)
                ], jqxRibbonComponent.prototype, "selectedIndex", void 0);
                __decorate([
                    core_1.Input('selectionMode'), 
                    __metadata('design:type', String)
                ], jqxRibbonComponent.prototype, "selectionMode", void 0);
                __decorate([
                    core_1.Input('scrollPosition'), 
                    __metadata('design:type', String)
                ], jqxRibbonComponent.prototype, "scrollPosition", void 0);
                __decorate([
                    core_1.Input('scrollStep'), 
                    __metadata('design:type', Number)
                ], jqxRibbonComponent.prototype, "scrollStep", void 0);
                __decorate([
                    core_1.Input('scrollDelay'), 
                    __metadata('design:type', Number)
                ], jqxRibbonComponent.prototype, "scrollDelay", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxRibbonComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRibbonComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRibbonComponent.prototype, "OnReorder", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRibbonComponent.prototype, "OnSelect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRibbonComponent.prototype, "OnUnselect", void 0);
                jqxRibbonComponent = __decorate([
                    core_1.Component({
                        selector: 'angularRibbon',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxRibbonComponent);
                return jqxRibbonComponent;
                var _a;
            }());
            exports_1("jqxRibbonComponent", jqxRibbonComponent); //jqxRibbonComponent
        }
    }
});
//# sourceMappingURL=angular_jqxribbon.js.map