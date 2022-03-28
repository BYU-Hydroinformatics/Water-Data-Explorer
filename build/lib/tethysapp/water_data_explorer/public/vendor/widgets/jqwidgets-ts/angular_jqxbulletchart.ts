/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularBulletChart',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxBulletChartComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxBulletChart;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxBulletChart', options );
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
                   this.host.jqxBulletChart(i, changes[i].currentValue);
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
      this.host.jqxBulletChart('setOptions', options);
   }

   // jqxBulletChartComponent properties
   @Input('animationDuration') animationDuration : number;
   @Input('barSize') barSize : jqwidgets.Size;
   @Input('description') description : string;
   @Input('disabled') disabled : boolean;
   @Input('labelsFormat') labelsFormat : string;
   @Input('labelsFormatFunction') labelsFormatFunction : (value?: number, position?:string ) => any;
   @Input('orientation') orientation : string;
   @Input('pointer') pointer : jqwidgets.BulletChartPointer;
   @Input('rtl') rtl : boolean;
   @Input('ranges') ranges : Array<jqwidgets.BulletChartRanges>;
   @Input('showTooltip') showTooltip : boolean;
   @Input('target') target : jqwidgets.BulletChartPointer;
   @Input('ticks') ticks : jqwidgets.BulletChartTicks;
   @Input('title') title : string;
   @Input('tooltipFormatFunction') tooltipFormatFunction : (pointerValue:number , targetValue:number) => String;

   // jqxBulletChartComponent functions
   destroy(): void {
      this.host.jqxBulletChart('destroy');
   }
   render(): void {
      this.host.jqxBulletChart('render');
   }
   refresh(): void {
      this.host.jqxBulletChart('refresh');
   }
   val(value?: number): number {
       if (value !== undefined)
       {
           return this.host.jqxBulletChart('val', value);
       } else
       {
           return this.host.jqxBulletChart('val');
       }
   }

   // jqxBulletChartComponent events
   @Output() OnChange = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
   }

} //jqxBulletChartComponent
