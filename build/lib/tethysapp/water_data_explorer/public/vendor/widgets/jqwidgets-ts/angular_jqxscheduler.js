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
    var jqxSchedulerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxSchedulerComponent = (function () {
                function jqxSchedulerComponent(containerElement) {
                    // jqxSchedulerComponent events
                    this.OnAppointmentChange = new core_1.EventEmitter();
                    this.OnAppointmentClick = new core_1.EventEmitter();
                    this.OnAppointmentDoubleClick = new core_1.EventEmitter();
                    this.OnAppointmentDelete = new core_1.EventEmitter();
                    this.OnAppointmentAdd = new core_1.EventEmitter();
                    this.OnBindingComplete = new core_1.EventEmitter();
                    this.OnCellClick = new core_1.EventEmitter();
                    this.OnCellDoubleClick = new core_1.EventEmitter();
                    this.OnContextMenuOpen = new core_1.EventEmitter();
                    this.OnContextMenuClose = new core_1.EventEmitter();
                    this.OnContextMenuItemClick = new core_1.EventEmitter();
                    this.OnContextMenuCreate = new core_1.EventEmitter();
                    this.OnDateChange = new core_1.EventEmitter();
                    this.OnEditRecurrenceDialogOpen = new core_1.EventEmitter();
                    this.OnEditRecurrenceDialogClose = new core_1.EventEmitter();
                    this.OnEditDialogCreate = new core_1.EventEmitter();
                    this.OnEditDialogOpen = new core_1.EventEmitter();
                    this.OnEditDialogClose = new core_1.EventEmitter();
                    this.OnViewChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxSchedulerComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxSchedulerComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxScheduler', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxSchedulerComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxSchedulerComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxSchedulerComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxScheduler(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxSchedulerComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxSchedulerComponent.prototype.setOptions = function (options) {
                    this.host.jqxScheduler('setOptions', options);
                };
                // jqxSchedulerComponent functions
                jqxSchedulerComponent.prototype.addAppointment = function (item) {
                    this.host.jqxScheduler('addAppointment', item);
                };
                jqxSchedulerComponent.prototype.beginAppointmentsUpdate = function () {
                    this.host.jqxScheduler('beginAppointmentsUpdate');
                };
                jqxSchedulerComponent.prototype.clearAppointmentsSelection = function () {
                    this.host.jqxScheduler('clearAppointmentsSelection');
                };
                jqxSchedulerComponent.prototype.clearSelection = function () {
                    this.host.jqxScheduler('clearSelection');
                };
                jqxSchedulerComponent.prototype.closeMenu = function () {
                    this.host.jqxScheduler('closeMenu');
                };
                jqxSchedulerComponent.prototype.closeDialog = function () {
                    this.host.jqxScheduler('closeDialog');
                };
                jqxSchedulerComponent.prototype.deleteAppointment = function (appointmenId) {
                    this.host.jqxScheduler('deleteAppointment', appointmenId);
                };
                jqxSchedulerComponent.prototype.destroy = function () {
                    this.host.jqxScheduler('destroy');
                };
                jqxSchedulerComponent.prototype.endAppointmentsUpdate = function () {
                    this.host.jqxScheduler('endAppointmentsUpdate');
                };
                jqxSchedulerComponent.prototype.ensureAppointmentVisible = function (id) {
                    this.host.jqxScheduler('ensureAppointmentVisible', id);
                };
                jqxSchedulerComponent.prototype.ensureVisible = function (item, resourceId) {
                    this.host.jqxScheduler('ensureVisible', item, resourceId);
                };
                jqxSchedulerComponent.prototype.exportData = function (format) {
                    this.host.jqxScheduler('exportData', format);
                };
                jqxSchedulerComponent.prototype.focus = function () {
                    this.host.jqxScheduler('focus');
                };
                jqxSchedulerComponent.prototype.getAppointmentProperty = function (appointmentId, name) {
                    this.host.jqxScheduler('getAppointmentProperty', appointmentId, name);
                };
                jqxSchedulerComponent.prototype.getSelection = function () {
                    return this.host.jqxScheduler('getSelection');
                };
                jqxSchedulerComponent.prototype.getAppointments = function () {
                    return this.host.jqxScheduler('getAppointments');
                };
                jqxSchedulerComponent.prototype.getDataAppointments = function () {
                    return this.host.jqxScheduler('getDataAppointments');
                };
                jqxSchedulerComponent.prototype.hideAppointmentsByResource = function (resourcesId) {
                    this.host.jqxScheduler('hideAppointmentsByResource', resourcesId);
                };
                jqxSchedulerComponent.prototype.openMenu = function (left, top) {
                    this.host.jqxScheduler('openMenu', left, top);
                };
                jqxSchedulerComponent.prototype.openDialog = function (left, top) {
                    this.host.jqxScheduler('openDialog', left, top);
                };
                jqxSchedulerComponent.prototype.selectAppointment = function (appointmentId) {
                    this.host.jqxScheduler('selectAppointment', appointmentId);
                };
                jqxSchedulerComponent.prototype.setAppointmentProperty = function (appointmentId, name, value) {
                    this.host.jqxScheduler('setAppointmentProperty', appointmentId, name, value);
                };
                jqxSchedulerComponent.prototype.selectCell = function (date, allday, resourceId) {
                    this.host.jqxScheduler('selectCell', date, allday, resourceId);
                };
                jqxSchedulerComponent.prototype.showAppointmentsByResource = function (resourceId) {
                    this.host.jqxScheduler('showAppointmentsByResource', resourceId);
                };
                jqxSchedulerComponent.prototype.scrollWidth = function () {
                    return this.host.jqxScheduler('scrollWidth');
                };
                jqxSchedulerComponent.prototype.scrollHeight = function () {
                    return this.host.jqxScheduler('scrollHeight');
                };
                jqxSchedulerComponent.prototype.scrollLeft = function (left) {
                    this.host.jqxScheduler('scrollLeft', left);
                };
                jqxSchedulerComponent.prototype.scrollTop = function (top) {
                    this.host.jqxScheduler('scrollTop', top);
                };
                jqxSchedulerComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('appointmentChange', function (eventData) { if (self.OnAppointmentChange)
                        self.OnAppointmentChange.next(eventData); });
                    this.host.bind('appointmentClick', function (eventData) { if (self.OnAppointmentClick)
                        self.OnAppointmentClick.next(eventData); });
                    this.host.bind('appointmentDoubleClick', function (eventData) { if (self.OnAppointmentDoubleClick)
                        self.OnAppointmentDoubleClick.next(eventData); });
                    this.host.bind('appointmentDelete', function (eventData) { if (self.OnAppointmentDelete)
                        self.OnAppointmentDelete.next(eventData); });
                    this.host.bind('appointmentAdd', function (eventData) { if (self.OnAppointmentAdd)
                        self.OnAppointmentAdd.next(eventData); });
                    this.host.bind('bindingComplete', function (eventData) { if (self.OnBindingComplete)
                        self.OnBindingComplete.next(eventData); });
                    this.host.bind('cellClick', function (eventData) { if (self.OnCellClick)
                        self.OnCellClick.next(eventData); });
                    this.host.bind('cellDoubleClick', function (eventData) { if (self.OnCellDoubleClick)
                        self.OnCellDoubleClick.next(eventData); });
                    this.host.bind('contextMenuOpen', function (eventData) { if (self.OnContextMenuOpen)
                        self.OnContextMenuOpen.next(eventData); });
                    this.host.bind('contextMenuClose', function (eventData) { if (self.OnContextMenuClose)
                        self.OnContextMenuClose.next(eventData); });
                    this.host.bind('contextMenuItemClick', function (eventData) { if (self.OnContextMenuItemClick)
                        self.OnContextMenuItemClick.next(eventData); });
                    this.host.bind('contextMenuCreate', function (eventData) { if (self.OnContextMenuCreate)
                        self.OnContextMenuCreate.next(eventData); });
                    this.host.bind('dateChange', function (eventData) { if (self.OnDateChange)
                        self.OnDateChange.next(eventData); });
                    this.host.bind('editRecurrenceDialogOpen', function (eventData) { if (self.OnEditRecurrenceDialogOpen)
                        self.OnEditRecurrenceDialogOpen.next(eventData); });
                    this.host.bind('editRecurrenceDialogClose', function (eventData) { if (self.OnEditRecurrenceDialogClose)
                        self.OnEditRecurrenceDialogClose.next(eventData); });
                    this.host.bind('editDialogCreate', function (eventData) { if (self.OnEditDialogCreate)
                        self.OnEditDialogCreate.next(eventData); });
                    this.host.bind('editDialogOpen', function (eventData) { if (self.OnEditDialogOpen)
                        self.OnEditDialogOpen.next(eventData); });
                    this.host.bind('editDialogClose', function (eventData) { if (self.OnEditDialogClose)
                        self.OnEditDialogClose.next(eventData); });
                    this.host.bind('viewChange', function (eventData) { if (self.OnViewChange)
                        self.OnViewChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('appointmentOpacity'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "appointmentOpacity", void 0);
                __decorate([
                    core_1.Input('appointmentsMinHeight'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "appointmentsMinHeight", void 0);
                __decorate([
                    core_1.Input('appointmentDataFields'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "appointmentDataFields", void 0);
                __decorate([
                    core_1.Input('appointmentTooltips'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "appointmentTooltips", void 0);
                __decorate([
                    core_1.Input('columnsHeight'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "columnsHeight", void 0);
                __decorate([
                    core_1.Input('contextMenu'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "contextMenu", void 0);
                __decorate([
                    core_1.Input('contextMenuOpen'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "contextMenuOpen", void 0);
                __decorate([
                    core_1.Input('contextMenuClose'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "contextMenuClose", void 0);
                __decorate([
                    core_1.Input('contextMenuItemClick'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "contextMenuItemClick", void 0);
                __decorate([
                    core_1.Input('contextMenuCreate'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "contextMenuCreate", void 0);
                __decorate([
                    core_1.Input('changedAppointments'), 
                    __metadata('design:type', Array)
                ], jqxSchedulerComponent.prototype, "changedAppointments", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('date'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "date", void 0);
                __decorate([
                    core_1.Input('dayNameFormat'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "dayNameFormat", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('editDialog'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "editDialog", void 0);
                __decorate([
                    core_1.Input('editDialogDateTimeFormatString'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "editDialogDateTimeFormatString", void 0);
                __decorate([
                    core_1.Input('editDialogDateFormatString'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "editDialogDateFormatString", void 0);
                __decorate([
                    core_1.Input('editDialogOpen'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "editDialogOpen", void 0);
                __decorate([
                    core_1.Input('editDialogCreate'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "editDialogCreate", void 0);
                __decorate([
                    core_1.Input('editDialogKeyDown'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "editDialogKeyDown", void 0);
                __decorate([
                    core_1.Input('editDialogClose'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "editDialogClose", void 0);
                __decorate([
                    core_1.Input('exportSettings'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "exportSettings", void 0);
                __decorate([
                    core_1.Input('legendPosition'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "legendPosition", void 0);
                __decorate([
                    core_1.Input('legendHeight'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "legendHeight", void 0);
                __decorate([
                    core_1.Input('localization'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "localization", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('ready'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "ready", void 0);
                __decorate([
                    core_1.Input('renderAppointment'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "renderAppointment", void 0);
                __decorate([
                    core_1.Input('rendering'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "rendering", void 0);
                __decorate([
                    core_1.Input('rendered'), 
                    __metadata('design:type', Function)
                ], jqxSchedulerComponent.prototype, "rendered", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('resources'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "resources", void 0);
                __decorate([
                    core_1.Input('rowsHeight'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "rowsHeight", void 0);
                __decorate([
                    core_1.Input('showToolbar'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "showToolbar", void 0);
                __decorate([
                    core_1.Input('showLegend'), 
                    __metadata('design:type', Boolean)
                ], jqxSchedulerComponent.prototype, "showLegend", void 0);
                __decorate([
                    core_1.Input('scrollBarSize'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "scrollBarSize", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('statuses'), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "statuses", void 0);
                __decorate([
                    core_1.Input('touchRowsHeight'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "touchRowsHeight", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('touchAppointmentsMinHeight'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "touchAppointmentsMinHeight", void 0);
                __decorate([
                    core_1.Input('touchScrollBarSize'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "touchScrollBarSize", void 0);
                __decorate([
                    core_1.Input('timeZone'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "timeZone", void 0);
                __decorate([
                    core_1.Input('touchDayNameFormat'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "touchDayNameFormat", void 0);
                __decorate([
                    core_1.Input('toolBarRangeFormat'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "toolBarRangeFormat", void 0);
                __decorate([
                    core_1.Input('toolBarRangeFormatAbbr'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "toolBarRangeFormatAbbr", void 0);
                __decorate([
                    core_1.Input('toolbarHeight'), 
                    __metadata('design:type', Number)
                ], jqxSchedulerComponent.prototype, "toolbarHeight", void 0);
                __decorate([
                    core_1.Input('views'), 
                    __metadata('design:type', Array)
                ], jqxSchedulerComponent.prototype, "views", void 0);
                __decorate([
                    core_1.Input('view'), 
                    __metadata('design:type', String)
                ], jqxSchedulerComponent.prototype, "view", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnAppointmentChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnAppointmentClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnAppointmentDoubleClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnAppointmentDelete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnAppointmentAdd", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnBindingComplete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnCellClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnCellDoubleClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnContextMenuOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnContextMenuClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnContextMenuItemClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnContextMenuCreate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnDateChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnEditRecurrenceDialogOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnEditRecurrenceDialogClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnEditDialogCreate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnEditDialogOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnEditDialogClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSchedulerComponent.prototype, "OnViewChange", void 0);
                jqxSchedulerComponent = __decorate([
                    core_1.Component({
                        selector: 'angularScheduler',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxSchedulerComponent);
                return jqxSchedulerComponent;
                var _a;
            }());
            exports_1("jqxSchedulerComponent", jqxSchedulerComponent); //jqxSchedulerComponent
        }
    }
});
//# sourceMappingURL=angular_jqxscheduler.js.map