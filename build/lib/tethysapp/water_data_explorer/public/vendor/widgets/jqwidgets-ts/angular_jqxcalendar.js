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
    var jqxCalendarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxCalendarComponent = (function () {
                function jqxCalendarComponent(containerElement) {
                    // jqxCalendarComponent events
                    this.OnBackButtonClick = new core_1.EventEmitter();
                    this.OnChange = new core_1.EventEmitter();
                    this.OnNextButtonClick = new core_1.EventEmitter();
                    this.OnViewChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxCalendarComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxCalendarComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxCalendar', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxCalendarComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxCalendarComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxCalendarComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxCalendar(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxCalendarComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxCalendarComponent.prototype.setOptions = function (options) {
                    this.host.jqxCalendar('setOptions', options);
                };
                // jqxCalendarComponent functions
                jqxCalendarComponent.prototype.clear = function () {
                    this.host.jqxCalendar('clear');
                };
                jqxCalendarComponent.prototype.destroy = function () {
                    this.host.jqxCalendar('destroy');
                };
                jqxCalendarComponent.prototype.focus = function () {
                    this.host.jqxCalendar('focus');
                };
                jqxCalendarComponent.prototype.getMinDate = function () {
                    return this.host.jqxCalendar('getMinDate');
                };
                jqxCalendarComponent.prototype.getMaxDate = function () {
                    this.host.jqxCalendar('getMaxDate');
                };
                jqxCalendarComponent.prototype.getDate = function () {
                    return this.host.jqxCalendar('getDate');
                };
                jqxCalendarComponent.prototype.getRange = function () {
                    return this.host.jqxCalendar('getRange');
                };
                jqxCalendarComponent.prototype.navigateForward = function (months) {
                    this.host.jqxCalendar('navigateForward', months);
                };
                jqxCalendarComponent.prototype.navigateBackward = function (months) {
                    this.host.jqxCalendar('navigateBackward', months);
                };
                jqxCalendarComponent.prototype.render = function () {
                    this.host.jqxCalendar('render');
                };
                jqxCalendarComponent.prototype.refresh = function () {
                    this.host.jqxCalendar('refresh');
                };
                jqxCalendarComponent.prototype.setMinDate = function (date) {
                    this.host.jqxCalendar('setMinDate', date);
                };
                jqxCalendarComponent.prototype.setMaxDate = function (date) {
                    this.host.jqxCalendar('setMaxDate', date);
                };
                jqxCalendarComponent.prototype.setDate = function (date) {
                    this.host.jqxCalendar('setDate', date);
                };
                jqxCalendarComponent.prototype.setRange = function (date, date2) {
                    this.host.jqxCalendar('setRange', date, date2);
                };
                jqxCalendarComponent.prototype.today = function () {
                    this.host.jqxCalendar('today');
                };
                jqxCalendarComponent.prototype.val = function (date, date2) {
                    if (date !== undefined || date2 !== undefined) {
                        return this.host.jqxCalendar('val', date, date2);
                    }
                    else {
                        return this.host.jqxCalendar('val');
                    }
                };
                jqxCalendarComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('backButtonClick', function (eventData) { if (self.OnBackButtonClick)
                        self.OnBackButtonClick.next(eventData); });
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('nextButtonClick', function (eventData) { if (self.OnNextButtonClick)
                        self.OnNextButtonClick.next(eventData); });
                    this.host.bind('viewChange', function (eventData) { if (self.OnViewChange)
                        self.OnViewChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('backText'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "backText", void 0);
                __decorate([
                    core_1.Input('columnHeaderHeight'), 
                    __metadata('design:type', Number)
                ], jqxCalendarComponent.prototype, "columnHeaderHeight", void 0);
                __decorate([
                    core_1.Input('clearString'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "clearString", void 0);
                __decorate([
                    core_1.Input('culture'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "culture", void 0);
                __decorate([
                    core_1.Input('dayNameFormat'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "dayNameFormat", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enableWeekend'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "enableWeekend", void 0);
                __decorate([
                    core_1.Input('enableViews'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "enableViews", void 0);
                __decorate([
                    core_1.Input('enableOtherMonthDays'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "enableOtherMonthDays", void 0);
                __decorate([
                    core_1.Input('enableFastNavigation'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "enableFastNavigation", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('enableAutoNavigation'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "enableAutoNavigation", void 0);
                __decorate([
                    core_1.Input('enableTooltips'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "enableTooltips", void 0);
                __decorate([
                    core_1.Input('forwardText'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "forwardText", void 0);
                __decorate([
                    core_1.Input('firstDayOfWeek'), 
                    __metadata('design:type', Number)
                ], jqxCalendarComponent.prototype, "firstDayOfWeek", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('navigationDelay'), 
                    __metadata('design:type', Number)
                ], jqxCalendarComponent.prototype, "navigationDelay", void 0);
                __decorate([
                    core_1.Input('rowHeaderWidth'), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "rowHeaderWidth", void 0);
                __decorate([
                    core_1.Input('readOnly'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "readOnly", void 0);
                __decorate([
                    core_1.Input('restrictedDates'), 
                    __metadata('design:type', Array)
                ], jqxCalendarComponent.prototype, "restrictedDates", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('stepMonths'), 
                    __metadata('design:type', Number)
                ], jqxCalendarComponent.prototype, "stepMonths", void 0);
                __decorate([
                    core_1.Input('showWeekNumbers'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "showWeekNumbers", void 0);
                __decorate([
                    core_1.Input('showDayNames'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "showDayNames", void 0);
                __decorate([
                    core_1.Input('showOtherMonthDays'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "showOtherMonthDays", void 0);
                __decorate([
                    core_1.Input('showFooter'), 
                    __metadata('design:type', Boolean)
                ], jqxCalendarComponent.prototype, "showFooter", void 0);
                __decorate([
                    core_1.Input('selectionMode'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "selectionMode", void 0);
                __decorate([
                    core_1.Input('specialDates'), 
                    __metadata('design:type', Array)
                ], jqxCalendarComponent.prototype, "specialDates", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('titleHeight'), 
                    __metadata('design:type', Number)
                ], jqxCalendarComponent.prototype, "titleHeight", void 0);
                __decorate([
                    core_1.Input('titleFormat'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "titleFormat", void 0);
                __decorate([
                    core_1.Input('todayString'), 
                    __metadata('design:type', String)
                ], jqxCalendarComponent.prototype, "todayString", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "OnBackButtonClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "OnNextButtonClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxCalendarComponent.prototype, "OnViewChange", void 0);
                jqxCalendarComponent = __decorate([
                    core_1.Component({
                        selector: 'angularCalendar',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxCalendarComponent);
                return jqxCalendarComponent;
                var _a;
            }());
            exports_1("jqxCalendarComponent", jqxCalendarComponent); //jqxCalendarComponent
        }
    }
});
//# sourceMappingURL=angular_jqxcalendar.js.map