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
    var jqxDropDownListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDropDownListComponent = (function () {
                function jqxDropDownListComponent(containerElement) {
                    // jqxDropDownListComponent events
                    this.OnBindingComplete = new core_1.EventEmitter();
                    this.OnClose = new core_1.EventEmitter();
                    this.OnCheckChange = new core_1.EventEmitter();
                    this.OnChange = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.OnSelect = new core_1.EventEmitter();
                    this.OnUnselect = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxDropDownListComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDropDownListComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDropDownList', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDropDownListComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDropDownListComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDropDownListComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDropDownList(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDropDownListComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDropDownListComponent.prototype.setOptions = function (options) {
                    this.host.jqxDropDownList('setOptions', options);
                };
                // jqxDropDownListComponent functions
                jqxDropDownListComponent.prototype.addItem = function (item) {
                    return this.host.jqxDropDownList('addItem', item);
                };
                jqxDropDownListComponent.prototype.clearSelection = function () {
                    this.host.jqxDropDownList('clearSelection');
                };
                jqxDropDownListComponent.prototype.clear = function () {
                    this.host.jqxDropDownList('clear');
                };
                jqxDropDownListComponent.prototype.close = function () {
                    this.host.jqxDropDownList('close');
                };
                jqxDropDownListComponent.prototype.checkIndex = function (index) {
                    this.host.jqxDropDownList('checkIndex', index);
                };
                jqxDropDownListComponent.prototype.checkItem = function (item) {
                    this.host.jqxDropDownList('checkItem', item);
                };
                jqxDropDownListComponent.prototype.checkAll = function () {
                    this.host.jqxDropDownList('checkAll');
                };
                jqxDropDownListComponent.prototype.clearFilter = function () {
                    this.host.jqxDropDownList('clearFilter');
                };
                jqxDropDownListComponent.prototype.destroy = function () {
                    this.host.jqxDropDownList('destroy');
                };
                jqxDropDownListComponent.prototype.disableItem = function (item) {
                    this.host.jqxDropDownList('disableItem', item);
                };
                jqxDropDownListComponent.prototype.disableAt = function (index) {
                    this.host.jqxDropDownList('disableAt', index);
                };
                jqxDropDownListComponent.prototype.enableItem = function (item) {
                    this.host.jqxDropDownList('enableItem', item);
                };
                jqxDropDownListComponent.prototype.enableAt = function (index) {
                    this.host.jqxDropDownList('enableAt', index);
                };
                jqxDropDownListComponent.prototype.ensureVisible = function (index) {
                    this.host.jqxDropDownList('ensureVisible', index);
                };
                jqxDropDownListComponent.prototype.focus = function () {
                    this.host.jqxDropDownList('focus');
                };
                jqxDropDownListComponent.prototype.getItem = function (index) {
                    return this.host.jqxDropDownList('getItem', index);
                };
                jqxDropDownListComponent.prototype.getItemByValue = function (itemValue) {
                    return this.host.jqxDropDownList('getItemByValue', itemValue);
                };
                jqxDropDownListComponent.prototype.getItems = function () {
                    return this.host.jqxDropDownList('getItems');
                };
                jqxDropDownListComponent.prototype.getCheckedItems = function () {
                    return this.host.jqxDropDownList('getCheckedItems');
                };
                jqxDropDownListComponent.prototype.getSelectedItem = function () {
                    return this.host.jqxDropDownList('getSelectedItem');
                };
                jqxDropDownListComponent.prototype.getSelectedIndex = function () {
                    return this.host.jqxDropDownList('getSelectedIndex');
                };
                jqxDropDownListComponent.prototype.insertAt = function (item, index) {
                    this.host.jqxDropDownList('insertAt', item, index);
                };
                jqxDropDownListComponent.prototype.isOpened = function () {
                    return this.host.jqxDropDownList('isOpened');
                };
                jqxDropDownListComponent.prototype.indeterminateIndex = function (index) {
                    this.host.jqxDropDownList('indeterminateIndex', index);
                };
                jqxDropDownListComponent.prototype.indeterminateItem = function (item) {
                    this.host.jqxDropDownList('indeterminateItem', item);
                };
                jqxDropDownListComponent.prototype.loadFromSelect = function (id) {
                    this.host.jqxDropDownList('loadFromSelect', id);
                };
                jqxDropDownListComponent.prototype.open = function () {
                    this.host.jqxDropDownList('open');
                };
                jqxDropDownListComponent.prototype.removeItem = function (item) {
                    this.host.jqxDropDownList('removeItem', item);
                };
                jqxDropDownListComponent.prototype.removeAt = function (index) {
                    this.host.jqxDropDownList('removeAt', index);
                };
                jqxDropDownListComponent.prototype.selectIndex = function (index) {
                    this.host.jqxDropDownList('selectIndex', index);
                };
                jqxDropDownListComponent.prototype.selectItem = function (item) {
                    this.host.jqxDropDownList('selectItem', item);
                };
                jqxDropDownListComponent.prototype.setContent = function (content) {
                    this.host.jqxDropDownList('setContent', content);
                };
                jqxDropDownListComponent.prototype.updateItem = function (newItem, item) {
                    this.host.jqxDropDownList('updateItem', newItem, item);
                };
                jqxDropDownListComponent.prototype.updateAt = function (item, index) {
                    this.host.jqxDropDownList('updateAt', item, index);
                };
                jqxDropDownListComponent.prototype.unselectIndex = function (index) {
                    this.host.jqxDropDownList('unselectIndex', index);
                };
                jqxDropDownListComponent.prototype.unselectItem = function (item) {
                    this.host.jqxDropDownList('unselectItem', item);
                };
                jqxDropDownListComponent.prototype.uncheckIndex = function (index) {
                    this.host.jqxDropDownList('uncheckIndex', index);
                };
                jqxDropDownListComponent.prototype.uncheckItem = function (item) {
                    this.host.jqxDropDownList('uncheckItem', item);
                };
                jqxDropDownListComponent.prototype.uncheckAll = function () {
                    this.host.jqxDropDownList('uncheckAll');
                };
                jqxDropDownListComponent.prototype.val = function (value) {
                    if (value !== undefined) {
                        return this.host.jqxDropDownList('val', value);
                    }
                    else {
                        return this.host.jqxDropDownList('val');
                    }
                };
                jqxDropDownListComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('bindingComplete', function (eventData) { if (self.OnBindingComplete)
                        self.OnBindingComplete.next(eventData); });
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('checkChange', function (eventData) { if (self.OnCheckChange)
                        self.OnCheckChange.next(eventData); });
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                    this.host.bind('select', function (eventData) { if (self.OnSelect)
                        self.OnSelect.next(eventData); });
                    this.host.bind('unselect', function (eventData) { if (self.OnUnselect)
                        self.OnUnselect.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('autoOpen'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "autoOpen", void 0);
                __decorate([
                    core_1.Input('autoDropDownHeight'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "autoDropDownHeight", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxDropDownListComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('checkboxes'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "checkboxes", void 0);
                __decorate([
                    core_1.Input('closeDelay'), 
                    __metadata('design:type', Number)
                ], jqxDropDownListComponent.prototype, "closeDelay", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('displayMember'), 
                    __metadata('design:type', String)
                ], jqxDropDownListComponent.prototype, "displayMember", void 0);
                __decorate([
                    core_1.Input('dropDownHorizontalAlignment'), 
                    __metadata('design:type', String)
                ], jqxDropDownListComponent.prototype, "dropDownHorizontalAlignment", void 0);
                __decorate([
                    core_1.Input('dropDownHeight'), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "dropDownHeight", void 0);
                __decorate([
                    core_1.Input('dropDownWidth'), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "dropDownWidth", void 0);
                __decorate([
                    core_1.Input('enableSelection'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "enableSelection", void 0);
                __decorate([
                    core_1.Input('enableBrowserBoundsDetection'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "enableBrowserBoundsDetection", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('filterable'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "filterable", void 0);
                __decorate([
                    core_1.Input('filterHeight'), 
                    __metadata('design:type', Number)
                ], jqxDropDownListComponent.prototype, "filterHeight", void 0);
                __decorate([
                    core_1.Input('filterDelay'), 
                    __metadata('design:type', Number)
                ], jqxDropDownListComponent.prototype, "filterDelay", void 0);
                __decorate([
                    core_1.Input('filterPlaceHolder'), 
                    __metadata('design:type', String)
                ], jqxDropDownListComponent.prototype, "filterPlaceHolder", void 0);
                __decorate([
                    core_1.Input('incrementalSearch'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "incrementalSearch", void 0);
                __decorate([
                    core_1.Input('incrementalSearchDelay'), 
                    __metadata('design:type', Number)
                ], jqxDropDownListComponent.prototype, "incrementalSearchDelay", void 0);
                __decorate([
                    core_1.Input('itemHeight'), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "itemHeight", void 0);
                __decorate([
                    core_1.Input('openDelay'), 
                    __metadata('design:type', Number)
                ], jqxDropDownListComponent.prototype, "openDelay", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', String)
                ], jqxDropDownListComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('popupZIndex'), 
                    __metadata('design:type', Number)
                ], jqxDropDownListComponent.prototype, "popupZIndex", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxDropDownListComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('renderer'), 
                    __metadata('design:type', Function)
                ], jqxDropDownListComponent.prototype, "renderer", void 0);
                __decorate([
                    core_1.Input('selectionRenderer'), 
                    __metadata('design:type', Function)
                ], jqxDropDownListComponent.prototype, "selectionRenderer", void 0);
                __decorate([
                    core_1.Input('searchMode'), 
                    __metadata('design:type', String)
                ], jqxDropDownListComponent.prototype, "searchMode", void 0);
                __decorate([
                    core_1.Input('scrollBarSize'), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "scrollBarSize", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('selectedIndex'), 
                    __metadata('design:type', Number)
                ], jqxDropDownListComponent.prototype, "selectedIndex", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxDropDownListComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('valueMember'), 
                    __metadata('design:type', String)
                ], jqxDropDownListComponent.prototype, "valueMember", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "OnBindingComplete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "OnCheckChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "OnOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "OnSelect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDropDownListComponent.prototype, "OnUnselect", void 0);
                jqxDropDownListComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDropDownList',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDropDownListComponent);
                return jqxDropDownListComponent;
                var _a;
            }());
            exports_1("jqxDropDownListComponent", jqxDropDownListComponent); //jqxDropDownListComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdropdownlist.js.map