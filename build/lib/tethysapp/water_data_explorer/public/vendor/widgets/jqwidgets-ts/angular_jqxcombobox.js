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
    var jqxComboBoxComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxComboBoxComponent = (function () {
                function jqxComboBoxComponent(containerElement) {
                    // jqxComboBoxComponent events
                    this.OnBindingComplete = new core_1.EventEmitter();
                    this.OnCheckChange = new core_1.EventEmitter();
                    this.OnClose = new core_1.EventEmitter();
                    this.OnChange = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.OnSelect = new core_1.EventEmitter();
                    this.OnUnselect = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxComboBoxComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxComboBoxComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxComboBox', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxComboBoxComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxComboBoxComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxComboBoxComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxComboBox(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxComboBoxComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxComboBoxComponent.prototype.setOptions = function (options) {
                    this.host.jqxComboBox('setOptions', options);
                };
                // jqxComboBoxComponent functions
                jqxComboBoxComponent.prototype.addItem = function (item) {
                    return this.host.jqxComboBox('addItem', item);
                };
                jqxComboBoxComponent.prototype.clearSelection = function () {
                    this.host.jqxComboBox('clearSelection');
                };
                jqxComboBoxComponent.prototype.clear = function () {
                    this.host.jqxComboBox('clear');
                };
                jqxComboBoxComponent.prototype.close = function () {
                    this.host.jqxComboBox('close');
                };
                jqxComboBoxComponent.prototype.checkIndex = function (index) {
                    this.host.jqxComboBox('checkIndex', index);
                };
                jqxComboBoxComponent.prototype.checkItem = function (item) {
                    this.host.jqxComboBox('checkItem', item);
                };
                jqxComboBoxComponent.prototype.checkAll = function () {
                    this.host.jqxComboBox('checkAll');
                };
                jqxComboBoxComponent.prototype.destroy = function () {
                    this.host.jqxComboBox('destroy');
                };
                jqxComboBoxComponent.prototype.disableItem = function (item) {
                    this.host.jqxComboBox('disableItem', item);
                };
                jqxComboBoxComponent.prototype.disableAt = function (index) {
                    this.host.jqxComboBox('disableAt', index);
                };
                jqxComboBoxComponent.prototype.enableItem = function (item) {
                    this.host.jqxComboBox('enableItem', item);
                };
                jqxComboBoxComponent.prototype.enableAt = function (index) {
                    this.host.jqxComboBox('enableAt', index);
                };
                jqxComboBoxComponent.prototype.ensureVisible = function (index) {
                    this.host.jqxComboBox('ensureVisible', index);
                };
                jqxComboBoxComponent.prototype.focus = function () {
                    this.host.jqxComboBox('focus');
                };
                jqxComboBoxComponent.prototype.getItem = function (index) {
                    return this.host.jqxComboBox('getItem', index);
                };
                jqxComboBoxComponent.prototype.getItemByValue = function (value) {
                    return this.host.jqxComboBox('getItemByValue', value);
                };
                jqxComboBoxComponent.prototype.getVisibleItems = function () {
                    return this.host.jqxComboBox('getVisibleItems');
                };
                jqxComboBoxComponent.prototype.getItems = function () {
                    return this.host.jqxComboBox('getItems');
                };
                jqxComboBoxComponent.prototype.getCheckedItems = function () {
                    return this.host.jqxComboBox('getCheckedItems');
                };
                jqxComboBoxComponent.prototype.getSelectedItem = function () {
                    return this.host.jqxComboBox('getSelectedItem');
                };
                jqxComboBoxComponent.prototype.getSelectedItems = function () {
                    return this.host.jqxComboBox('getSelectedItems');
                };
                jqxComboBoxComponent.prototype.getSelectedIndex = function () {
                    return this.host.jqxComboBox('getSelectedIndex');
                };
                jqxComboBoxComponent.prototype.insertAt = function (item, index) {
                    return this.host.jqxComboBox('insertAt', item, index);
                };
                jqxComboBoxComponent.prototype.isOpened = function () {
                    return this.host.jqxComboBox('isOpened');
                };
                jqxComboBoxComponent.prototype.indeterminateIndex = function (index) {
                    this.host.jqxComboBox('indeterminateIndex', index);
                };
                jqxComboBoxComponent.prototype.indeterminateItem = function (item) {
                    this.host.jqxComboBox('indeterminateItem', item);
                };
                jqxComboBoxComponent.prototype.loadFromSelect = function (selectTagId) {
                    this.host.jqxComboBox('loadFromSelect', selectTagId);
                };
                jqxComboBoxComponent.prototype.open = function () {
                    this.host.jqxComboBox('open');
                };
                jqxComboBoxComponent.prototype.removeItem = function (item) {
                    return this.host.jqxComboBox('removeItem', item);
                };
                jqxComboBoxComponent.prototype.removeAt = function (index) {
                    return this.host.jqxComboBox('removeAt', index);
                };
                jqxComboBoxComponent.prototype.selectIndex = function (index) {
                    this.host.jqxComboBox('selectIndex', index);
                };
                jqxComboBoxComponent.prototype.selectItem = function (item) {
                    this.host.jqxComboBox('selectItem', item);
                };
                jqxComboBoxComponent.prototype.updateItem = function (item, itemValue) {
                    this.host.jqxComboBox('updateItem', item, itemValue);
                };
                jqxComboBoxComponent.prototype.updateAt = function (item, index) {
                    this.host.jqxComboBox('updateAt', item, index);
                };
                jqxComboBoxComponent.prototype.unselectIndex = function (index) {
                    this.host.jqxComboBox('unselectIndex', index);
                };
                jqxComboBoxComponent.prototype.unselectItem = function (item) {
                    this.host.jqxComboBox('unselectItem', item);
                };
                jqxComboBoxComponent.prototype.uncheckIndex = function (index) {
                    this.host.jqxComboBox('uncheckIndex', index);
                };
                jqxComboBoxComponent.prototype.uncheckItem = function (item) {
                    this.host.jqxComboBox('uncheckItem', item);
                };
                jqxComboBoxComponent.prototype.uncheckAll = function () {
                    this.host.jqxComboBox('uncheckAll');
                };
                jqxComboBoxComponent.prototype.val = function (value) {
                    if (value !== undefined) {
                        return this.host.jqxComboBox('val', value);
                    }
                    else {
                        return this.host.jqxComboBox('val');
                    }
                };
                jqxComboBoxComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('bindingComplete', function (eventData) { if (self.OnBindingComplete)
                        self.OnBindingComplete.next(eventData); });
                    this.host.bind('checkChange', function (eventData) { if (self.OnCheckChange)
                        self.OnCheckChange.next(eventData); });
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
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
                ], jqxComboBoxComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('autoComplete'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "autoComplete", void 0);
                __decorate([
                    core_1.Input('autoOpen'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "autoOpen", void 0);
                __decorate([
                    core_1.Input('autoItemsHeight'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "autoItemsHeight", void 0);
                __decorate([
                    core_1.Input('autoDropDownHeight'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "autoDropDownHeight", void 0);
                __decorate([
                    core_1.Input('closeDelay'), 
                    __metadata('design:type', Number)
                ], jqxComboBoxComponent.prototype, "closeDelay", void 0);
                __decorate([
                    core_1.Input('checkboxes'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "checkboxes", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('displayMember'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "displayMember", void 0);
                __decorate([
                    core_1.Input('dropDownHorizontalAlignment'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "dropDownHorizontalAlignment", void 0);
                __decorate([
                    core_1.Input('dropDownVerticalAlignment'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "dropDownVerticalAlignment", void 0);
                __decorate([
                    core_1.Input('dropDownHeight'), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "dropDownHeight", void 0);
                __decorate([
                    core_1.Input('dropDownWidth'), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "dropDownWidth", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('enableSelection'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "enableSelection", void 0);
                __decorate([
                    core_1.Input('enableBrowserBoundsDetection'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "enableBrowserBoundsDetection", void 0);
                __decorate([
                    core_1.Input('itemHeight'), 
                    __metadata('design:type', Number)
                ], jqxComboBoxComponent.prototype, "itemHeight", void 0);
                __decorate([
                    core_1.Input('multiSelect'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "multiSelect", void 0);
                __decorate([
                    core_1.Input('minLength'), 
                    __metadata('design:type', Number)
                ], jqxComboBoxComponent.prototype, "minLength", void 0);
                __decorate([
                    core_1.Input('openDelay'), 
                    __metadata('design:type', Number)
                ], jqxComboBoxComponent.prototype, "openDelay", void 0);
                __decorate([
                    core_1.Input('popupZIndex'), 
                    __metadata('design:type', Number)
                ], jqxComboBoxComponent.prototype, "popupZIndex", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('remoteAutoComplete'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "remoteAutoComplete", void 0);
                __decorate([
                    core_1.Input('remoteAutoCompleteDelay'), 
                    __metadata('design:type', Number)
                ], jqxComboBoxComponent.prototype, "remoteAutoCompleteDelay", void 0);
                __decorate([
                    core_1.Input('renderer'), 
                    __metadata('design:type', Function)
                ], jqxComboBoxComponent.prototype, "renderer", void 0);
                __decorate([
                    core_1.Input('renderSelectedItem'), 
                    __metadata('design:type', Function)
                ], jqxComboBoxComponent.prototype, "renderSelectedItem", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('selectedIndex'), 
                    __metadata('design:type', Number)
                ], jqxComboBoxComponent.prototype, "selectedIndex", void 0);
                __decorate([
                    core_1.Input('showArrow'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "showArrow", void 0);
                __decorate([
                    core_1.Input('showCloseButtons'), 
                    __metadata('design:type', Boolean)
                ], jqxComboBoxComponent.prototype, "showCloseButtons", void 0);
                __decorate([
                    core_1.Input('searchMode'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "searchMode", void 0);
                __decorate([
                    core_1.Input('search'), 
                    __metadata('design:type', Function)
                ], jqxComboBoxComponent.prototype, "search", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Array)
                ], jqxComboBoxComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('scrollBarSize'), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "scrollBarSize", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('validateSelection'), 
                    __metadata('design:type', Function)
                ], jqxComboBoxComponent.prototype, "validateSelection", void 0);
                __decorate([
                    core_1.Input('valueMember'), 
                    __metadata('design:type', String)
                ], jqxComboBoxComponent.prototype, "valueMember", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "OnBindingComplete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "OnCheckChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "OnOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "OnSelect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxComboBoxComponent.prototype, "OnUnselect", void 0);
                jqxComboBoxComponent = __decorate([
                    core_1.Component({
                        selector: 'angularComboBox',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxComboBoxComponent);
                return jqxComboBoxComponent;
                var _a;
            }());
            exports_1("jqxComboBoxComponent", jqxComboBoxComponent); //jqxComboBoxComponent
        }
    }
});
//# sourceMappingURL=angular_jqxcombobox.js.map