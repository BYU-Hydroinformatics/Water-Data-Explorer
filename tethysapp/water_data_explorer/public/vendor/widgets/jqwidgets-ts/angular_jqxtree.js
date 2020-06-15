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
    var jqxTreeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxTreeComponent = (function () {
                function jqxTreeComponent(containerElement) {
                    // jqxTreeComponent events
                    this.OnAdded = new core_1.EventEmitter();
                    this.OnCheckChange = new core_1.EventEmitter();
                    this.OnCollapse = new core_1.EventEmitter();
                    this.OnDragStart = new core_1.EventEmitter();
                    this.OnDragEnd = new core_1.EventEmitter();
                    this.OnExpand = new core_1.EventEmitter();
                    this.OnInitialized = new core_1.EventEmitter();
                    this.OnItemClick = new core_1.EventEmitter();
                    this.OnRemoved = new core_1.EventEmitter();
                    this.OnSelect = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxTreeComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxTreeComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTree', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxTreeComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxTreeComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxTreeComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxTree(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxTreeComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxTreeComponent.prototype.setOptions = function (options) {
                    this.host.jqxTree('setOptions', options);
                };
                // jqxTreeComponent functions
                jqxTreeComponent.prototype.addBefore = function (item, id) {
                    this.host.jqxTree('addBefore', item, id);
                };
                jqxTreeComponent.prototype.addAfter = function (item, id) {
                    this.host.jqxTree('addAfter', item, id);
                };
                jqxTreeComponent.prototype.addTo = function (item, id) {
                    this.host.jqxTree('addTo', item, id);
                };
                jqxTreeComponent.prototype.clear = function () {
                    this.host.jqxTree('clear');
                };
                jqxTreeComponent.prototype.checkAll = function () {
                    this.host.jqxTree('checkAll');
                };
                jqxTreeComponent.prototype.checkItem = function (item, checked) {
                    this.host.jqxTree('checkItem', item, checked);
                };
                jqxTreeComponent.prototype.collapseAll = function () {
                    this.host.jqxTree('collapseAll');
                };
                jqxTreeComponent.prototype.collapseItem = function (item) {
                    this.host.jqxTree('collapseItem', item);
                };
                jqxTreeComponent.prototype.destroy = function () {
                    this.host.jqxTree('destroy');
                };
                jqxTreeComponent.prototype.disableItem = function (item) {
                    this.host.jqxTree('disableItem', item);
                };
                jqxTreeComponent.prototype.ensureVisible = function (item) {
                    this.host.jqxTree('ensureVisible', item);
                };
                jqxTreeComponent.prototype.enableItem = function (item) {
                    this.host.jqxTree('enableItem', item);
                };
                jqxTreeComponent.prototype.expandAll = function () {
                    this.host.jqxTree('expandAll');
                };
                jqxTreeComponent.prototype.expandItem = function (item) {
                    this.host.jqxTree('expandItem', item);
                };
                jqxTreeComponent.prototype.focus = function () {
                    this.host.jqxTree('focus');
                };
                jqxTreeComponent.prototype.getCheckedItems = function () {
                    return this.host.jqxTree('getCheckedItems');
                };
                jqxTreeComponent.prototype.getUncheckedItems = function () {
                    return this.host.jqxTree('getUncheckedItems');
                };
                jqxTreeComponent.prototype.getItems = function () {
                    return this.host.jqxTree('getItems');
                };
                jqxTreeComponent.prototype.getItem = function (element) {
                    return this.host.jqxTree('getItem', element);
                };
                jqxTreeComponent.prototype.getSelectedItem = function () {
                    return this.host.jqxTree('getSelectedItem');
                };
                jqxTreeComponent.prototype.getPrevItem = function () {
                    return this.host.jqxTree('getPrevItem');
                };
                jqxTreeComponent.prototype.getNextItem = function () {
                    return this.host.jqxTree('getNextItem');
                };
                jqxTreeComponent.prototype.hitTest = function (left, top) {
                    return this.host.jqxTree('hitTest', left, top);
                };
                jqxTreeComponent.prototype.removeItem = function (item) {
                    this.host.jqxTree('removeItem', item);
                };
                jqxTreeComponent.prototype.render = function () {
                    this.host.jqxTree('render');
                };
                jqxTreeComponent.prototype.refresh = function () {
                    this.host.jqxTree('refresh');
                };
                jqxTreeComponent.prototype.selectItem = function (item) {
                    this.host.jqxTree('selectItem', item);
                };
                jqxTreeComponent.prototype.uncheckAll = function () {
                    this.host.jqxTree('uncheckAll');
                };
                jqxTreeComponent.prototype.uncheckItem = function (item) {
                    this.host.jqxTree('uncheckItem', item);
                };
                jqxTreeComponent.prototype.updateItem = function (item, newItem) {
                    this.host.jqxTree('updateItem', item, newItem);
                };
                jqxTreeComponent.prototype.val = function (value) {
                    return this.host.jqxTree('val', value);
                };
                jqxTreeComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('added', function (eventData) { if (self.OnAdded)
                        self.OnAdded.next(eventData); });
                    this.host.bind('checkChange', function (eventData) { if (self.OnCheckChange)
                        self.OnCheckChange.next(eventData); });
                    this.host.bind('collapse', function (eventData) { if (self.OnCollapse)
                        self.OnCollapse.next(eventData); });
                    this.host.bind('dragStart', function (eventData) { if (self.OnDragStart)
                        self.OnDragStart.next(eventData); });
                    this.host.bind('dragEnd', function (eventData) { if (self.OnDragEnd)
                        self.OnDragEnd.next(eventData); });
                    this.host.bind('expand', function (eventData) { if (self.OnExpand)
                        self.OnExpand.next(eventData); });
                    this.host.bind('initialized', function (eventData) { if (self.OnInitialized)
                        self.OnInitialized.next(eventData); });
                    this.host.bind('itemClick', function (eventData) { if (self.OnItemClick)
                        self.OnItemClick.next(eventData); });
                    this.host.bind('removed', function (eventData) { if (self.OnRemoved)
                        self.OnRemoved.next(eventData); });
                    this.host.bind('select', function (eventData) { if (self.OnSelect)
                        self.OnSelect.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationShowDuration'), 
                    __metadata('design:type', Number)
                ], jqxTreeComponent.prototype, "animationShowDuration", void 0);
                __decorate([
                    core_1.Input('animationHideDuration'), 
                    __metadata('design:type', Number)
                ], jqxTreeComponent.prototype, "animationHideDuration", void 0);
                __decorate([
                    core_1.Input('allowDrag'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "allowDrag", void 0);
                __decorate([
                    core_1.Input('allowDrop'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "allowDrop", void 0);
                __decorate([
                    core_1.Input('checkboxes'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "checkboxes", void 0);
                __decorate([
                    core_1.Input('dragStart'), 
                    __metadata('design:type', Function)
                ], jqxTreeComponent.prototype, "dragStart", void 0);
                __decorate([
                    core_1.Input('dragEnd'), 
                    __metadata('design:type', Function)
                ], jqxTreeComponent.prototype, "dragEnd", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('easing'), 
                    __metadata('design:type', String)
                ], jqxTreeComponent.prototype, "easing", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('hasThreeStates'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "hasThreeStates", void 0);
                __decorate([
                    core_1.Input('incrementalSearch'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "incrementalSearch", void 0);
                __decorate([
                    core_1.Input('keyboardNavigation'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "keyboardNavigation", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('toggleIndicatorSize'), 
                    __metadata('design:type', Number)
                ], jqxTreeComponent.prototype, "toggleIndicatorSize", void 0);
                __decorate([
                    core_1.Input('toggleMode'), 
                    __metadata('design:type', String)
                ], jqxTreeComponent.prototype, "toggleMode", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxTreeComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnAdded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnCheckChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnCollapse", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnDragStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnDragEnd", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnExpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnInitialized", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnItemClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnRemoved", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeComponent.prototype, "OnSelect", void 0);
                jqxTreeComponent = __decorate([
                    core_1.Component({
                        selector: 'angularTree',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxTreeComponent);
                return jqxTreeComponent;
                var _a;
            }());
            exports_1("jqxTreeComponent", jqxTreeComponent); //jqxTreeComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtree.js.map