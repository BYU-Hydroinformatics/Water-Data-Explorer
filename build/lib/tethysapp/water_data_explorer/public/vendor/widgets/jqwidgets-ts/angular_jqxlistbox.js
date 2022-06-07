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
    var jqxListBoxComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxListBoxComponent = (function () {
                function jqxListBoxComponent(containerElement) {
                    // jqxListBoxComponent events
                    this.OnBindingComplete = new core_1.EventEmitter();
                    this.OnChange = new core_1.EventEmitter();
                    this.OnCheckChange = new core_1.EventEmitter();
                    this.OnDragStart = new core_1.EventEmitter();
                    this.OnDragEnd = new core_1.EventEmitter();
                    this.OnSelect = new core_1.EventEmitter();
                    this.OnUnselect = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxListBoxComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxListBoxComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxListBox', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxListBoxComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost({});
                };
                jqxListBoxComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxListBoxComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxListBox(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxListBoxComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxListBoxComponent.prototype.setOptions = function (options) {
                    this.host.jqxListBox('setOptions', options);
                };
                // jqxListBoxComponent functions
                jqxListBoxComponent.prototype.addItem = function (Item) {
                    return this.host.jqxListBox('addItem', Item);
                };
                jqxListBoxComponent.prototype.beginUpdate = function () {
                    this.host.jqxListBox('beginUpdate');
                };
                jqxListBoxComponent.prototype.clear = function () {
                    this.host.jqxListBox('clear');
                };
                jqxListBoxComponent.prototype.clearSelection = function () {
                    this.host.jqxListBox('clearSelection');
                };
                jqxListBoxComponent.prototype.checkIndex = function (Index) {
                    this.host.jqxListBox('checkIndex', Index);
                };
                jqxListBoxComponent.prototype.checkItem = function (Item) {
                    this.host.jqxListBox('checkItem', Item);
                };
                jqxListBoxComponent.prototype.checkAll = function () {
                    this.host.jqxListBox('checkAll');
                };
                jqxListBoxComponent.prototype.clearFilter = function () {
                    this.host.jqxListBox('clearFilter');
                };
                jqxListBoxComponent.prototype.destroy = function () {
                    this.host.jqxListBox('destroy');
                };
                jqxListBoxComponent.prototype.disableItem = function (Item) {
                    this.host.jqxListBox('disableItem', Item);
                };
                jqxListBoxComponent.prototype.disableAt = function (Index) {
                    this.host.jqxListBox('disableAt', Index);
                };
                jqxListBoxComponent.prototype.enableItem = function (Item) {
                    this.host.jqxListBox('enableItem', Item);
                };
                jqxListBoxComponent.prototype.enableAt = function (Index) {
                    this.host.jqxListBox('enableAt', Index);
                };
                jqxListBoxComponent.prototype.ensureVisible = function (item) {
                    this.host.jqxListBox('ensureVisible', item);
                };
                jqxListBoxComponent.prototype.endUpdate = function () {
                    this.host.jqxListBox('endUpdate');
                };
                jqxListBoxComponent.prototype.focus = function () {
                    this.host.jqxListBox('focus');
                };
                jqxListBoxComponent.prototype.getItems = function () {
                    return this.host.jqxListBox('getItems');
                };
                jqxListBoxComponent.prototype.getSelectedItems = function () {
                    return this.host.jqxListBox('getSelectedItems');
                };
                jqxListBoxComponent.prototype.getCheckedItems = function () {
                    return this.host.jqxListBox('getCheckedItems');
                };
                jqxListBoxComponent.prototype.getItem = function (Index) {
                    return this.host.jqxListBox('getItem', Index);
                };
                jqxListBoxComponent.prototype.getItemByValue = function (Item) {
                    return this.host.jqxListBox('getItemByValue', Item);
                };
                jqxListBoxComponent.prototype.getSelectedItem = function () {
                    return this.host.jqxListBox('getSelectedItem');
                };
                jqxListBoxComponent.prototype.getSelectedIndex = function () {
                    return this.host.jqxListBox('getSelectedIndex');
                };
                jqxListBoxComponent.prototype.insertAt = function (Item, Index) {
                    this.host.jqxListBox('insertAt', Item, Index);
                };
                jqxListBoxComponent.prototype.invalidate = function () {
                    this.host.jqxListBox('invalidate');
                };
                jqxListBoxComponent.prototype.indeterminateItem = function (Item) {
                    this.host.jqxListBox('indeterminateItem', Item);
                };
                jqxListBoxComponent.prototype.indeterminateIndex = function (Index) {
                    this.host.jqxListBox('indeterminateIndex', Index);
                };
                jqxListBoxComponent.prototype.removeItem = function (Item) {
                    this.host.jqxListBox('removeItem', Item);
                };
                jqxListBoxComponent.prototype.removeAt = function (Index) {
                    this.host.jqxListBox('removeAt', Index);
                };
                jqxListBoxComponent.prototype.render = function () {
                    this.host.jqxListBox('render');
                };
                jqxListBoxComponent.prototype.refresh = function () {
                    this.host.jqxListBox('refresh');
                };
                jqxListBoxComponent.prototype.selectItem = function (Item) {
                    this.host.jqxListBox('selectItem', Item);
                };
                jqxListBoxComponent.prototype.selectIndex = function (Index) {
                    this.host.jqxListBox('selectIndex', Index);
                };
                jqxListBoxComponent.prototype.updateItem = function (Item, Value) {
                    this.host.jqxListBox('updateItem', Item, Value);
                };
                jqxListBoxComponent.prototype.updateAt = function (item, index) {
                    this.host.jqxListBox('updateAt', item, index);
                };
                jqxListBoxComponent.prototype.unselectIndex = function (index) {
                    this.host.jqxListBox('unselectIndex', index);
                };
                jqxListBoxComponent.prototype.unselectItem = function (item) {
                    this.host.jqxListBox('unselectItem', item);
                };
                jqxListBoxComponent.prototype.uncheckIndex = function (index) {
                    this.host.jqxListBox('uncheckIndex', index);
                };
                jqxListBoxComponent.prototype.uncheckItem = function (item) {
                    this.host.jqxListBox('uncheckItem', item);
                };
                jqxListBoxComponent.prototype.uncheckAll = function () {
                    this.host.jqxListBox('uncheckAll');
                };
                jqxListBoxComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxListBox('val', value);
                    }
                    else {
                        return this.host.jqxListBox('val');
                    }
                };
                jqxListBoxComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('bindingComplete', function (eventData) { if (self.OnBindingComplete)
                        self.OnBindingComplete.next(eventData); });
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('checkChange', function (eventData) { if (self.OnCheckChange)
                        self.OnCheckChange.next(eventData); });
                    this.host.bind('dragStart', function (eventData) { if (self.OnDragStart)
                        self.OnDragStart.next(eventData); });
                    this.host.bind('dragEnd', function (eventData) { if (self.OnDragEnd)
                        self.OnDragEnd.next(eventData); });
                    this.host.bind('select', function (eventData) { if (self.OnSelect)
                        self.OnSelect.next(eventData); });
                    this.host.bind('unselect', function (eventData) { if (self.OnUnselect)
                        self.OnUnselect.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('autoHeight'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "autoHeight", void 0);
                __decorate([
                    core_1.Input('allowDrag'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "allowDrag", void 0);
                __decorate([
                    core_1.Input('allowDrop'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "allowDrop", void 0);
                __decorate([
                    core_1.Input('checkboxes'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "checkboxes", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('displayMember'), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "displayMember", void 0);
                __decorate([
                    core_1.Input('dropAction'), 
                    __metadata('design:type', String)
                ], jqxListBoxComponent.prototype, "dropAction", void 0);
                __decorate([
                    core_1.Input('dragStart'), 
                    __metadata('design:type', Function)
                ], jqxListBoxComponent.prototype, "dragStart", void 0);
                __decorate([
                    core_1.Input('dragEnd'), 
                    __metadata('design:type', Function)
                ], jqxListBoxComponent.prototype, "dragEnd", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('enableSelection'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "enableSelection", void 0);
                __decorate([
                    core_1.Input('equalItemsWidth'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "equalItemsWidth", void 0);
                __decorate([
                    core_1.Input('filterable'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "filterable", void 0);
                __decorate([
                    core_1.Input('filterHeight'), 
                    __metadata('design:type', Number)
                ], jqxListBoxComponent.prototype, "filterHeight", void 0);
                __decorate([
                    core_1.Input('filterDelay'), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "filterDelay", void 0);
                __decorate([
                    core_1.Input('filterPlaceHolder'), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "filterPlaceHolder", void 0);
                __decorate([
                    core_1.Input('hasThreeStates'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "hasThreeStates", void 0);
                __decorate([
                    core_1.Input('itemHeight'), 
                    __metadata('design:type', Number)
                ], jqxListBoxComponent.prototype, "itemHeight", void 0);
                __decorate([
                    core_1.Input('incrementalSearch'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "incrementalSearch", void 0);
                __decorate([
                    core_1.Input('incrementalSearchDelay'), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "incrementalSearchDelay", void 0);
                __decorate([
                    core_1.Input('multiple'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "multiple", void 0);
                __decorate([
                    core_1.Input('multipleextended'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "multipleextended", void 0);
                __decorate([
                    core_1.Input('renderer'), 
                    __metadata('design:type', Function)
                ], jqxListBoxComponent.prototype, "renderer", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxListBoxComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('selectedIndex'), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "selectedIndex", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Array)
                ], jqxListBoxComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('scrollBarSize'), 
                    __metadata('design:type', Number)
                ], jqxListBoxComponent.prototype, "scrollBarSize", void 0);
                __decorate([
                    core_1.Input('searchMode'), 
                    __metadata('design:type', String)
                ], jqxListBoxComponent.prototype, "searchMode", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxListBoxComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('valueMember'), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "valueMember", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "OnBindingComplete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "OnCheckChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "OnDragStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "OnDragEnd", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "OnSelect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxListBoxComponent.prototype, "OnUnselect", void 0);
                jqxListBoxComponent = __decorate([
                    core_1.Component({
                        selector: 'angularListBox',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxListBoxComponent);
                return jqxListBoxComponent;
                var _a;
            }());
            exports_1("jqxListBoxComponent", jqxListBoxComponent); //jqxListBoxComponent
        }
    }
});
//# sourceMappingURL=angular_jqxlistbox.js.map