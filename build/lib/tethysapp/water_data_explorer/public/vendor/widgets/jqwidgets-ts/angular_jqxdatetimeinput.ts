/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDateTimeInput',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDateTimeInputComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDateTimeInput;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDateTimeInput', options );
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
                   this.host.jqxDateTimeInput(i, changes[i].currentValue);
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
      this.host.jqxDateTimeInput('setOptions', options);
   }

   // jqxDateTimeInputComponent properties
   @Input('animationType') animationType : string;
   @Input('allowNullDate') allowNullDate : boolean;
   @Input('allowKeyboardDelete') allowKeyboardDelete : boolean;
   @Input('clearString') clearString : string;
   @Input('culture') culture : string;
   @Input('closeDelay') closeDelay : number;
   @Input('closeCalendarAfterSelection') closeCalendarAfterSelection : boolean;
   @Input('dropDownHorizontalAlignment') dropDownHorizontalAlignment : string;
   @Input('dropDownVerticalAlignment') dropDownVerticalAlignment : string;
   @Input('disabled') disabled : boolean;
   @Input('enableBrowserBoundsDetection') enableBrowserBoundsDetection : boolean;
   @Input('enableAbsoluteSelection') enableAbsoluteSelection : boolean;
   @Input('firstDayOfWeek') firstDayOfWeek : number;
   @Input('formatString') formatString : string;
   @Input('min') min : any;
   @Input('max') max : any;
   @Input('openDelay') openDelay : number;
   @Input('placeHolder') placeHolder : string;
   @Input('popupZIndex') popupZIndex : number;
   @Input('rtl') rtl : boolean;
   @Input('readonly') readonly : boolean;
   @Input('showFooter') showFooter : boolean;
   @Input('selectionMode') selectionMode : string;
   @Input('showWeekNumbers') showWeekNumbers : boolean;
   @Input('showTimeButton') showTimeButton : boolean;
   @Input('showCalendarButton') showCalendarButton : boolean;
   @Input('theme') theme : string;
   @Input('template') template : string;
   @Input('textAlign') textAlign : string;
   @Input('todayString') todayString : string;
   @Input('value') value : any;

   // jqxDateTimeInputComponent functions
   close(): void {
      this.host.jqxDateTimeInput('close');
   }
   destroy(): void {
      this.host.jqxDateTimeInput('destroy');
   }
   focus(): void {
      this.host.jqxDateTimeInput('focus');
   }
   getRange(date: any): any {
      return this.host.jqxDateTimeInput('getRange', date);
   }
   getText(): string {
      return this.host.jqxDateTimeInput('getText');
   }
   getDate(): any {
      return this.host.jqxDateTimeInput('getDate');
   }
   getMaxDate(): any {
      return this.host.jqxDateTimeInput('getMaxDate');
   }
   getMinDate(): any {
      return this.host.jqxDateTimeInput('getMinDate');
   }
   open(): void {
      this.host.jqxDateTimeInput('open');
   }
   setRange(date: any, date2: any): void {
      this.host.jqxDateTimeInput('setRange', date, date2);
   }
   setMinDate(date: any): void {
      this.host.jqxDateTimeInput('setMinDate', date);
   }
   setMaxDate(date: any): void {
      this.host.jqxDateTimeInput('setMaxDate', date);
   }
   setDate(date: any): void {
      this.host.jqxDateTimeInput('setDate', date);
   }
   val(date?: any, date2?: any): any {
       if (date !== undefined || date2 !== undefined)
       {
           return this.host.jqxDateTimeInput('val', date, date2);
       } else
       {
           return this.host.jqxDateTimeInput('val');
       }
   }

   // jqxDateTimeInputComponent events
   @Output() OnChange = new EventEmitter();
   @Output() OnClose = new EventEmitter();
   @Output() OnOpen = new EventEmitter();
   @Output() OnTextchanged = new EventEmitter();
   @Output() OnValueChanged = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
      this.host.bind('textchanged', function(eventData) { if (self.OnTextchanged)    self.OnTextchanged.next(eventData); });
      this.host.bind('valueChanged', function(eventData) { if (self.OnValueChanged)    self.OnValueChanged.next(eventData); });
   }

} //jqxDateTimeInputComponent
