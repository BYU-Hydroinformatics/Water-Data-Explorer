/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularBarGauge',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxBarGaugeComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxBarGauge;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxBarGauge', options );
          this.__wireEvents__();
          this.__updateRect__();

          return true;
       }
       return false;
   }

   ngAfterViewInit()
   {
       //   if (!this.isHostReady())
       //      this.initHost();
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
                   this.host.jqxBarGauge(i, changes[i].currentValue);
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
      this.host.jqxBarGauge('setOptions', options);
   }

   // jqxBarGaugeComponent properties
   @Input('animationDuration') animationDuration : number;
   @Input('backgroundColor') backgroundColor : string;
   @Input('barSpacing') barSpacing : number;
   @Input('baseValue') baseValue : number;
   @Input('colorScheme') colorScheme : string;
   @Input('customColorScheme') customColorScheme : jqwidgets.BarGaugeCustomColorScheme;
   @Input('disabled') disabled : boolean;
   @Input('endAngle') endAngle : number;
   @Input('formatFunction') formatFunction : jqwidgets.BarGaugeFormatFunction;
   @Input('labels') labels : jqwidgets.BarGaugeLabels;
   @Input('max') max : number;
   @Input('min') min : number;
   @Input('relativeInnerRadius') relativeInnerRadius : number;
   @Input('rendered') rendered : () => void;
   @Input('startAngle') startAngle : number;
   @Input('title') title : jqwidgets.BarGaugeTitle;
   @Input('tooltip') tooltip : jqwidgets.BarGaugeTooltip;
   @Input('useGradient') useGradient : boolean;
   @Input('values') values : Array<Number>;

   // jqxBarGaugeComponent functions
   refresh(): void {
      this.host.jqxBarGauge('refresh');
   }
   render(): void {
      this.host.jqxBarGauge('render');
   }
   val(Array?: Array<Number>): Array<Number> {
       if (Array !== undefined)
       {
           return this.host.jqxBarGauge('val', Array);
       } else
       {
           return this.host.jqxBarGauge('val');
       }
   }

   // jqxBarGaugeComponent events
   @Output() OnDrawEnd = new EventEmitter();
   @Output() OnDrawStart = new EventEmitter();
   @Output() OnInitialized = new EventEmitter();
   @Output() OnTooltipClose = new EventEmitter();
   @Output() OnTooltipOpen = new EventEmitter();
   @Output() OnValueChanged = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('drawEnd', function(eventData) { if (self.OnDrawEnd)    self.OnDrawEnd.next(eventData); });
      this.host.bind('drawStart', function(eventData) { if (self.OnDrawStart)    self.OnDrawStart.next(eventData); });
      this.host.bind('initialized', function(eventData) { if (self.OnInitialized)    self.OnInitialized.next(eventData); });
      this.host.bind('tooltipClose', function(eventData) { if (self.OnTooltipClose)    self.OnTooltipClose.next(eventData); });
      this.host.bind('tooltipOpen', function(eventData) { if (self.OnTooltipOpen)    self.OnTooltipOpen.next(eventData); });
      this.host.bind('valueChanged', function(eventData) { if (self.OnValueChanged)    self.OnValueChanged.next(eventData); });
   }

} //jqxBarGaugeComponent
