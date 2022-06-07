/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularScheduler',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxSchedulerComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxScheduler;

   constructor(containerElement: ElementRef) {
      this.elementRef = containerElement;
   }

   isHostReady()
   {
       return (this.host !== undefined && this.host.length == 1);
   }

   initHost(options: any)
   {
       if (this.isHostReady())
          return true;
       this.host = $(this.elementRef.nativeElement.firstChild);
       if (this.isHostReady())
       {
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxScheduler', options );
          this.__wireEvents__();
          this.__updateRect__();

          return true;
       }
       return false;
   }

   ngAfterViewInit() {
      //if (!this.isHostReady())
      //   this.initHost();
   }

   __updateRect__() : void {
      this.host.css({width: this.width, height: this.height});
   }

   ngOnChanges(changes: {[propName: string]: SimpleChange}) {
      if (!this.isHostReady())
      {
          if (!this.initHost({}))
            return;
      }

       for (var i in changes)
       {
           if (i == 'settings' || i == 'width' || i == 'height')
               continue;

           
           if (changes[i] && changes[i].currentValue !== undefined)
           {
               try
               {
                   this.host.jqxScheduler(i, changes[i].currentValue);
               }
               catch(e)
               {
                   console.log(e);
               }
           }
       }
       this.__updateRect__();
   }

   createWidget(options: any): void {
       if (!this.isHostReady())
           this.initHost(options);
   }

   setOptions(options: any) : void {
      this.host.jqxScheduler('setOptions', options);
   }

   // jqxSchedulerComponent properties
   @Input('appointmentOpacity') appointmentOpacity : boolean;
   @Input('appointmentsMinHeight') appointmentsMinHeight : number;
   @Input('appointmentDataFields') appointmentDataFields : jqwidgets.SchedulerAppointmentDataFields;
   @Input('appointmentTooltips') appointmentTooltips : boolean;
   @Input('columnsHeight') columnsHeight : number;
   @Input('contextMenu') contextMenu : boolean;
   @Input('contextMenuOpen') contextMenuOpen : (menu: any, appointment: any, event: any) => void;
   @Input('contextMenuClose') contextMenuClose : (menu: any, appointment: any, event: any) => void;
   @Input('contextMenuItemClick') contextMenuItemClick : (menu: any, appointment: any, event: any) => Boolean;
   @Input('contextMenuCreate') contextMenuCreate : (menu: any, appointment: any, event: any) => void;
   @Input('changedAppointments') changedAppointments : Array<jqwidgets.SchedulerChangedAppointments>;
   @Input('disabled') disabled : boolean;
   @Input('date') date : any;
   @Input('dayNameFormat') dayNameFormat : string;
   @Input('enableHover') enableHover : boolean;
   @Input('editDialog') editDialog : boolean;
   @Input('editDialogDateTimeFormatString') editDialogDateTimeFormatString : string;
   @Input('editDialogDateFormatString') editDialogDateFormatString : string;
   @Input('editDialogOpen') editDialogOpen : (dialog?: any, fields?: any, editAppointment?: any) => void;
   @Input('editDialogCreate') editDialogCreate : (dialog?: any, fields?: any, editAppointment?: any) => void;
   @Input('editDialogKeyDown') editDialogKeyDown : (dialog?: any, fields?: any, editAppointment?: any, event?: any) => Boolean;
   @Input('editDialogClose') editDialogClose : (dialog?: any, fields?: any, editAppointment?: any) => void;
   @Input('exportSettings') exportSettings : jqwidgets.SchedulerExportSettings;
   @Input('legendPosition') legendPosition : string;
   @Input('legendHeight') legendHeight : number;
   @Input('localization') localization : any;
   @Input('min') min : any;
   @Input('max') max : any;
   @Input('ready') ready : () => void;
   @Input('renderAppointment') renderAppointment: (data: jqwidgets.SchedulerRenderAppointment) => jqwidgets.SchedulerRenderAppointment;
   @Input('rendering') rendering : () => void;
   @Input('rendered') rendered : () => void;
   @Input('rtl') rtl : boolean;
   @Input('resources') resources : jqwidgets.SchedulerResources;
   @Input('rowsHeight') rowsHeight : number;
   @Input('showToolbar') showToolbar : boolean;
   @Input('showLegend') showLegend : boolean;
   @Input('scrollBarSize') scrollBarSize : number;
   @Input('source') source : any;
   @Input('statuses') statuses : jqwidgets.SchedulerStatuses;
   @Input('touchRowsHeight') touchRowsHeight : number;
   @Input('theme') theme : string;
   @Input('touchAppointmentsMinHeight') touchAppointmentsMinHeight : number;
   @Input('touchScrollBarSize') touchScrollBarSize : number;
   @Input('timeZone') timeZone : string;
   @Input('touchDayNameFormat') touchDayNameFormat : string;
   @Input('toolBarRangeFormat') toolBarRangeFormat : string;
   @Input('toolBarRangeFormatAbbr') toolBarRangeFormatAbbr : string;
   @Input('toolbarHeight') toolbarHeight : number;
   @Input('views') views : Array<any>;
   @Input('view') view : string;

   // jqxSchedulerComponent functions
   addAppointment(item: jqwidgets.SchedulerAppointmentDataFields): void {
      this.host.jqxScheduler('addAppointment', item);
   }
   beginAppointmentsUpdate(): void {
      this.host.jqxScheduler('beginAppointmentsUpdate');
   }
   clearAppointmentsSelection(): void {
      this.host.jqxScheduler('clearAppointmentsSelection');
   }
   clearSelection(): void {
      this.host.jqxScheduler('clearSelection');
   }
   closeMenu(): void {
      this.host.jqxScheduler('closeMenu');
   }
   closeDialog(): void {
      this.host.jqxScheduler('closeDialog');
   }
   deleteAppointment(appointmenId: string): void {
      this.host.jqxScheduler('deleteAppointment', appointmenId);
   }
   destroy(): void {
      this.host.jqxScheduler('destroy');
   }
   endAppointmentsUpdate(): void {
      this.host.jqxScheduler('endAppointmentsUpdate');
   }
   ensureAppointmentVisible(id: string): void {
      this.host.jqxScheduler('ensureAppointmentVisible', id);
   }
   ensureVisible(item: any, resourceId: string): void {
      this.host.jqxScheduler('ensureVisible', item, resourceId);
   }
   exportData(format: string): void {
      this.host.jqxScheduler('exportData', format);
   }
   focus(): void {
      this.host.jqxScheduler('focus');
   }
   getAppointmentProperty(appointmentId: string, name: string): void {
      this.host.jqxScheduler('getAppointmentProperty', appointmentId, name);
   }
   getSelection(): jqwidgets.SchedulerGetSelection {
      return this.host.jqxScheduler('getSelection');
   }
   getAppointments(): Array<jqwidgets.SchedulerAppointmentDataFields> {
      return this.host.jqxScheduler('getAppointments');
   }
   getDataAppointments(): Array<any> {
      return this.host.jqxScheduler('getDataAppointments');
   }
   hideAppointmentsByResource(resourcesId: string): void {
      this.host.jqxScheduler('hideAppointmentsByResource', resourcesId);
   }
   openMenu(left: number, top: number): void {
      this.host.jqxScheduler('openMenu', left, top);
   }
   openDialog(left: number, top: number): void {
      this.host.jqxScheduler('openDialog', left, top);
   }
   selectAppointment(appointmentId: string): void {
      this.host.jqxScheduler('selectAppointment', appointmentId);
   }
   setAppointmentProperty(appointmentId: string, name: string, value: any): void {
      this.host.jqxScheduler('setAppointmentProperty', appointmentId, name, value);
   }
   selectCell(date: any, allday: boolean, resourceId: string): void {
      this.host.jqxScheduler('selectCell', date, allday, resourceId);
   }
   showAppointmentsByResource(resourceId: string): void {
      this.host.jqxScheduler('showAppointmentsByResource', resourceId);
   }
   scrollWidth(): number {
      return this.host.jqxScheduler('scrollWidth');
   }
   scrollHeight(): number {
      return this.host.jqxScheduler('scrollHeight');
   }
   scrollLeft(left: number): void {
      this.host.jqxScheduler('scrollLeft', left);
   }
   scrollTop(top: number): void {
      this.host.jqxScheduler('scrollTop', top);
   }

   // jqxSchedulerComponent events
   @Output() OnAppointmentChange = new EventEmitter();
   @Output() OnAppointmentClick = new EventEmitter();
   @Output() OnAppointmentDoubleClick = new EventEmitter();
   @Output() OnAppointmentDelete = new EventEmitter();
   @Output() OnAppointmentAdd = new EventEmitter();
   @Output() OnBindingComplete = new EventEmitter();
   @Output() OnCellClick = new EventEmitter();
   @Output() OnCellDoubleClick = new EventEmitter();
   @Output() OnContextMenuOpen = new EventEmitter();
   @Output() OnContextMenuClose = new EventEmitter();
   @Output() OnContextMenuItemClick = new EventEmitter();
   @Output() OnContextMenuCreate = new EventEmitter();
   @Output() OnDateChange = new EventEmitter();
   @Output() OnEditRecurrenceDialogOpen = new EventEmitter();
   @Output() OnEditRecurrenceDialogClose = new EventEmitter();
   @Output() OnEditDialogCreate = new EventEmitter();
   @Output() OnEditDialogOpen = new EventEmitter();
   @Output() OnEditDialogClose = new EventEmitter();
   @Output() OnViewChange = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('appointmentChange', function(eventData) { if (self.OnAppointmentChange)    self.OnAppointmentChange.next(eventData); });
      this.host.bind('appointmentClick', function(eventData) { if (self.OnAppointmentClick)    self.OnAppointmentClick.next(eventData); });
      this.host.bind('appointmentDoubleClick', function(eventData) { if (self.OnAppointmentDoubleClick)    self.OnAppointmentDoubleClick.next(eventData); });
      this.host.bind('appointmentDelete', function(eventData) { if (self.OnAppointmentDelete)    self.OnAppointmentDelete.next(eventData); });
      this.host.bind('appointmentAdd', function(eventData) { if (self.OnAppointmentAdd)    self.OnAppointmentAdd.next(eventData); });
      this.host.bind('bindingComplete', function(eventData) { if (self.OnBindingComplete)    self.OnBindingComplete.next(eventData); });
      this.host.bind('cellClick', function(eventData) { if (self.OnCellClick)    self.OnCellClick.next(eventData); });
      this.host.bind('cellDoubleClick', function(eventData) { if (self.OnCellDoubleClick)    self.OnCellDoubleClick.next(eventData); });
      this.host.bind('contextMenuOpen', function(eventData) { if (self.OnContextMenuOpen)    self.OnContextMenuOpen.next(eventData); });
      this.host.bind('contextMenuClose', function(eventData) { if (self.OnContextMenuClose)    self.OnContextMenuClose.next(eventData); });
      this.host.bind('contextMenuItemClick', function(eventData) { if (self.OnContextMenuItemClick)    self.OnContextMenuItemClick.next(eventData); });
      this.host.bind('contextMenuCreate', function(eventData) { if (self.OnContextMenuCreate)    self.OnContextMenuCreate.next(eventData); });
      this.host.bind('dateChange', function(eventData) { if (self.OnDateChange)    self.OnDateChange.next(eventData); });
      this.host.bind('editRecurrenceDialogOpen', function(eventData) { if (self.OnEditRecurrenceDialogOpen)    self.OnEditRecurrenceDialogOpen.next(eventData); });
      this.host.bind('editRecurrenceDialogClose', function(eventData) { if (self.OnEditRecurrenceDialogClose)    self.OnEditRecurrenceDialogClose.next(eventData); });
      this.host.bind('editDialogCreate', function(eventData) { if (self.OnEditDialogCreate)    self.OnEditDialogCreate.next(eventData); });
      this.host.bind('editDialogOpen', function(eventData) { if (self.OnEditDialogOpen)    self.OnEditDialogOpen.next(eventData); });
      this.host.bind('editDialogClose', function(eventData) { if (self.OnEditDialogClose)    self.OnEditDialogClose.next(eventData); });
      this.host.bind('viewChange', function(eventData) { if (self.OnViewChange)    self.OnViewChange.next(eventData); });
   }

} //jqxSchedulerComponent
