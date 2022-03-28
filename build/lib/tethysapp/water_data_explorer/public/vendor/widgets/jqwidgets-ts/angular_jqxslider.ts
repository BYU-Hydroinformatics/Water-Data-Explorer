/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularSlider',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxSliderComponent implements OnChanges {

   @Input('width') width: any;
   @Input('height') height: any;
 
   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxSlider;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSlider', options );
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
                   this.host.jqxSlider(i, changes[i].currentValue);
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
      this.host.jqxSlider('setOptions', options);
   }

   // jqxSliderComponent properties
   @Input('buttonsPosition') buttonsPosition : string;
   @Input('disabled') disabled : boolean;
   @Input('layout') layout : string;
   @Input('mode') mode : string;
   @Input('minorTicksFrequency') minorTicksFrequency : number;
   @Input('minorTickSize') minorTickSize : number;
   @Input('max') max : number;
   @Input('min') min : number;
   @Input('rangeSlider') rangeSlider : boolean;
   @Input('rtl') rtl : boolean;
   @Input('step') step : number;
   @Input('showTicks') showTicks : boolean;
   @Input('showMinorTicks') showMinorTicks : boolean;
   @Input('showTickLabels') showTickLabels : boolean;
   @Input('showButtons') showButtons : boolean;
   @Input('showRange') showRange : boolean;
   @Input('template') template : string;
   @Input('theme') theme : string;
   @Input('ticksPosition') ticksPosition : string;
   @Input('ticksFrequency') ticksFrequency : number;
   @Input('tickSize') tickSize : number;
   @Input('tickLabelFormatFunction') tickLabelFormatFunction : (value: any) => String;
   @Input('tooltip') tooltip : boolean;
   @Input('tooltipHideDelay') tooltipHideDelay : number;
   @Input('tooltipPosition') tooltipPosition : string;
   @Input('tooltipFormatFunction') tooltipFormatFunction : (value: any) => String | Number;
   @Input('value') value : any;
   @Input('values') values : Array<Number>;

   // jqxSliderComponent functions
   destroy(): void {
      this.host.jqxSlider('destroy');
   }
   decrementValue(): void {
      this.host.jqxSlider('decrementValue');
   }
   disable(): void {
      this.host.jqxSlider('disable');
   }
   enable(): void {
      this.host.jqxSlider('enable');
   }
   focus(): void {
      this.host.jqxSlider('focus');
   }
   getValue(): number {
      return this.host.jqxSlider('getValue');
   }
   incrementValue(): void {
      this.host.jqxSlider('incrementValue');
   }
   setValue(index: number): void {
      this.host.jqxSlider('setValue', index);
   }
   val(value?: string): string {
      return this.host.jqxSlider('val', value);
   }

   // jqxSliderComponent events
   @Output() OnChange = new EventEmitter();
   @Output() OnCreated = new EventEmitter();
   @Output() OnSlide = new EventEmitter();
   @Output() OnSlideStart = new EventEmitter();
   @Output() OnSlideEnd = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('created', function(eventData) { if (self.OnCreated)    self.OnCreated.next(eventData); });
      this.host.bind('slide', function(eventData) { if (self.OnSlide)    self.OnSlide.next(eventData); });
      this.host.bind('slideStart', function(eventData) { if (self.OnSlideStart)    self.OnSlideStart.next(eventData); });
      this.host.bind('slideEnd', function(eventData) { if (self.OnSlideEnd)    self.OnSlideEnd.next(eventData); });
   }

} //jqxSliderComponent
