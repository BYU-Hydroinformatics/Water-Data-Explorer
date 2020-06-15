/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularCalendar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxCalendarComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxCalendar;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxCalendar', options );
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
                   this.host.jqxCalendar(i, changes[i].currentValue);
               }
               catch(e)
               {
                   console.log(e);
               }
           }
       }
       this.__updateRect__();
   }

   createWidget(options: any): void
   {
       if (!this.isHostReady())
           this.initHost(options);
   }

   setOptions(options: any) : void {
      this.host.jqxCalendar('setOptions', options);
   }

   // jqxCalendarComponent properties
   @Input('backText') backText : string;
   @Input('columnHeaderHeight') columnHeaderHeight : number;
   @Input('clearString') clearString : string;
   @Input('culture') culture : string;
   @Input('dayNameFormat') dayNameFormat : string;
   @Input('disabled') disabled : boolean;
   @Input('enableWeekend') enableWeekend : boolean;
   @Input('enableViews') enableViews : boolean;
   @Input('enableOtherMonthDays') enableOtherMonthDays : boolean;
   @Input('enableFastNavigation') enableFastNavigation : boolean;
   @Input('enableHover') enableHover : boolean;
   @Input('enableAutoNavigation') enableAutoNavigation : boolean;
   @Input('enableTooltips') enableTooltips : boolean;
   @Input('forwardText') forwardText : string;
   @Input('firstDayOfWeek') firstDayOfWeek : number;
   @Input('min') min : any;
   @Input('max') max : any;
   @Input('navigationDelay') navigationDelay : number;
   @Input('rowHeaderWidth') rowHeaderWidth : jqwidgets.Size;
   @Input('readOnly') readOnly : boolean;
   @Input('restrictedDates') restrictedDates : Array<any>;
   @Input('rtl') rtl : boolean;
   @Input('stepMonths') stepMonths : number;
   @Input('showWeekNumbers') showWeekNumbers : boolean;
   @Input('showDayNames') showDayNames : boolean;
   @Input('showOtherMonthDays') showOtherMonthDays : boolean;
   @Input('showFooter') showFooter : boolean;
   @Input('selectionMode') selectionMode : string;
   @Input('specialDates') specialDates : Array<any>;
   @Input('theme') theme : string;
   @Input('titleHeight') titleHeight : number;
   @Input('titleFormat') titleFormat : string;
   @Input('todayString') todayString : string;
   @Input('value') value : any;

   // jqxCalendarComponent functions
   clear(): void {
      this.host.jqxCalendar('clear');
   }
   destroy(): void {
      this.host.jqxCalendar('destroy');
   }
   focus(): void {
      this.host.jqxCalendar('focus');
   }
   getMinDate(): any {
      return this.host.jqxCalendar('getMinDate');
   }
   getMaxDate(): void {
      this.host.jqxCalendar('getMaxDate');
   }
   getDate(): any {
      return this.host.jqxCalendar('getDate');
   }
   getRange(): any {
      return this.host.jqxCalendar('getRange');
   }
   navigateForward(months: number): void {
      this.host.jqxCalendar('navigateForward', months);
   }
   navigateBackward(months: number): void {
      this.host.jqxCalendar('navigateBackward', months);
   }
   render(): void {
      this.host.jqxCalendar('render');
   }
   refresh(): void {
      this.host.jqxCalendar('refresh');
   }
   setMinDate(date: any): void {
      this.host.jqxCalendar('setMinDate', date);
   }
   setMaxDate(date: any): void {
      this.host.jqxCalendar('setMaxDate', date);
   }
   setDate(date: any): void {
      this.host.jqxCalendar('setDate', date);
   }
   setRange(date: any, date2: any): void {
      this.host.jqxCalendar('setRange', date, date2);
   }
   today(): void {
      this.host.jqxCalendar('today');
   }
   val(date?: any, date2?: any): any {
       if (date !== undefined || date2 !== undefined)
       {
           return this.host.jqxCalendar('val', date, date2);
       } else
       {
           return this.host.jqxCalendar('val');
       }
   }

   // jqxCalendarComponent events
   @Output() OnBackButtonClick = new EventEmitter();
   @Output() OnChange = new EventEmitter();
   @Output() OnNextButtonClick = new EventEmitter();
   @Output() OnViewChange = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('backButtonClick', function(eventData) { if (self.OnBackButtonClick)    self.OnBackButtonClick.next(eventData); });
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('nextButtonClick', function(eventData) { if (self.OnNextButtonClick)    self.OnNextButtonClick.next(eventData); });
      this.host.bind('viewChange', function(eventData) { if (self.OnViewChange)    self.OnViewChange.next(eventData); });
   }

} //jqxCalendarComponent
