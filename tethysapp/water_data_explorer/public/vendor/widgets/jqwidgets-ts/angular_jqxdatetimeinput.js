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
    var jqxDateTimeInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDateTimeInputComponent = (function () {
                function jqxDateTimeInputComponent(containerElement) {
                    // jqxDateTimeInputComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.OnClose = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.OnTextchanged = new core_1.EventEmitter();
                    this.OnValueChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxDateTimeInputComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDateTimeInputComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDateTimeInput', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDateTimeInputComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDateTimeInputComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDateTimeInputComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDateTimeInput(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDateTimeInputComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDateTimeInputComponent.prototype.setOptions = function (options) {
                    this.host.jqxDateTimeInput('setOptions', options);
                };
                // jqxDateTimeInputComponent functions
                jqxDateTimeInputComponent.prototype.close = function () {
                    this.host.jqxDateTimeInput('close');
                };
                jqxDateTimeInputComponent.prototype.destroy = function () {
                    this.host.jqxDateTimeInput('destroy');
                };
                jqxDateTimeInputComponent.prototype.focus = function () {
                    this.host.jqxDateTimeInput('focus');
                };
                jqxDateTimeInputComponent.prototype.getRange = function (date) {
                    return this.host.jqxDateTimeInput('getRange', date);
                };
                jqxDateTimeInputComponent.prototype.getText = function () {
                    return this.host.jqxDateTimeInput('getText');
                };
                jqxDateTimeInputComponent.prototype.getDate = function () {
                    return this.host.jqxDateTimeInput('getDate');
                };
                jqxDateTimeInputComponent.prototype.getMaxDate = function () {
                    return this.host.jqxDateTimeInput('getMaxDate');
                };
                jqxDateTimeInputComponent.prototype.getMinDate = function () {
                    return this.host.jqxDateTimeInput('getMinDate');
                };
                jqxDateTimeInputComponent.prototype.open = function () {
                    this.host.jqxDateTimeInput('open');
                };
                jqxDateTimeInputComponent.prototype.setRange = function (date, date2) {
                    this.host.jqxDateTimeInput('setRange', date, date2);
                };
                jqxDateTimeInputComponent.prototype.setMinDate = function (date) {
                    this.host.jqxDateTimeInput('setMinDate', date);
                };
                jqxDateTimeInputComponent.prototype.setMaxDate = function (date) {
                    this.host.jqxDateTimeInput('setMaxDate', date);
                };
                jqxDateTimeInputComponent.prototype.setDate = function (date) {
                    this.host.jqxDateTimeInput('setDate', date);
                };
                jqxDateTimeInputComponent.prototype.val = function (date, date2) {
                    if (date !== undefined || date2 !== undefined) {
                        return this.host.jqxDateTimeInput('val', date, date2);
                    }
                    else {
                        return this.host.jqxDateTimeInput('val');
                    }
                };
                jqxDateTimeInputComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                    this.host.bind('textchanged', function (eventData) { if (self.OnTextchanged)
                        self.OnTextchanged.next(eventData); });
                    this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged)
                        self.OnValueChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationType'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "animationType", void 0);
                __decorate([
                    core_1.Input('allowNullDate'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "allowNullDate", void 0);
                __decorate([
                    core_1.Input('allowKeyboardDelete'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "allowKeyboardDelete", void 0);
                __decorate([
                    core_1.Input('clearString'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "clearString", void 0);
                __decorate([
                    core_1.Input('culture'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "culture", void 0);
                __decorate([
                    core_1.Input('closeDelay'), 
                    __metadata('design:type', Number)
                ], jqxDateTimeInputComponent.prototype, "closeDelay", void 0);
                __decorate([
                    core_1.Input('closeCalendarAfterSelection'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "closeCalendarAfterSelection", void 0);
                __decorate([
                    core_1.Input('dropDownHorizontalAlignment'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "dropDownHorizontalAlignment", void 0);
                __decorate([
                    core_1.Input('dropDownVerticalAlignment'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "dropDownVerticalAlignment", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enableBrowserBoundsDetection'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "enableBrowserBoundsDetection", void 0);
                __decorate([
                    core_1.Input('enableAbsoluteSelection'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "enableAbsoluteSelection", void 0);
                __decorate([
                    core_1.Input('firstDayOfWeek'), 
                    __metadata('design:type', Number)
                ], jqxDateTimeInputComponent.prototype, "firstDayOfWeek", void 0);
                __decorate([
                    core_1.Input('formatString'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "formatString", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('openDelay'), 
                    __metadata('design:type', Number)
                ], jqxDateTimeInputComponent.prototype, "openDelay", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('popupZIndex'), 
                    __metadata('design:type', Number)
                ], jqxDateTimeInputComponent.prototype, "popupZIndex", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('readonly'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "readonly", void 0);
                __decorate([
                    core_1.Input('showFooter'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "showFooter", void 0);
                __decorate([
                    core_1.Input('selectionMode'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "selectionMode", void 0);
                __decorate([
                    core_1.Input('showWeekNumbers'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "showWeekNumbers", void 0);
                __decorate([
                    core_1.Input('showTimeButton'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "showTimeButton", void 0);
                __decorate([
                    core_1.Input('showCalendarButton'), 
                    __metadata('design:type', Boolean)
                ], jqxDateTimeInputComponent.prototype, "showCalendarButton", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('textAlign'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "textAlign", void 0);
                __decorate([
                    core_1.Input('todayString'), 
                    __metadata('design:type', String)
                ], jqxDateTimeInputComponent.prototype, "todayString", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "OnOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "OnTextchanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDateTimeInputComponent.prototype, "OnValueChanged", void 0);
                jqxDateTimeInputComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDateTimeInput',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDateTimeInputComponent);
                return jqxDateTimeInputComponent;
                var _a;
            }());
            exports_1("jqxDateTimeInputComponent", jqxDateTimeInputComponent); //jqxDateTimeInputComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdatetimeinput.js.map