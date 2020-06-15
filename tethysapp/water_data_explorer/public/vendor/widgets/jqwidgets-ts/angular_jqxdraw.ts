/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDraw',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDrawComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDraw;

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
       this.host.css('width', '100%');
       this.host.css('height', '100%');

       if (this.isHostReady())
       {
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDraw', options );
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
      this.host.css('width', '100%');
      this.host.css('height', '100%');
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
                   this.host.jqxDraw(i, changes[i].currentValue);
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
      this.host.jqxDraw('setOptions', options);
   }

   // jqxDrawComponent properties
   @Input('renderEngine') renderEngine : string;

   // jqxDrawComponent functions
   attr(element: any, attributes: any): any
   {
       this.widgetObject.attr(element, attributes);
   }
   circle(cx: Number, cy: Number, r: Number, attributes?: any): any
   {
       this.widgetObject.circle(cx, cy, r, attributes);
   }
   clear(): void
   {
       this.widgetObject['clear']();
   }
   getAttr(element: any, attributes: any): String
   {
       return this.widgetObject.getAttr(element, attributes);
   }
   line(x1: Number, y1: Number, x2: Number, y2: Number, attributes?: any): any
   {
       this.widgetObject.line(x1, y1, x2, y2, attributes);
   }
   measureText(text: any, angle: any, attributes?: any): any
   {
       return this.widgetObject.measureText(text, angle, attributes);
   }
   on(element: any, event: string, func: any): void
   {
       this.widgetObject.on(element, event, func);
   }
   off(element: any, event: string, func: any): void
   {
       this.widgetObject.off(element, event, func);
   }
   path(path: string, attributes?: any): any
   {
       var renderer = this.host.jqxDraw('getInstance');
       this.widgetObject.path(path, attributes);
   }
   pieslice(cx: number, xy: number, innerRadius: number, outerRadius: number, fromAngle: number, endAngle: number, centerOffset: number, attributes?: any): any
   {
       this.widgetObject.pieslice(cx, xy, innerRadius, outerRadius, fromAngle, endAngle, centerOffset, attributes);
       return null;
   }
   refresh(): void {
       this.widgetObject.refresh();
   }
   rect(x: number, y: number, width: jqwidgets.Size, height: jqwidgets.Size, attributes: any): any {
       var renderer = this.host.jqxDraw('getInstance');
       renderer.rect(x, y, width, height, attributes);
       return null;
   }
   saveAsJPEG(image: string, url: string): void {
       this.widgetObject.saveAsJPEG(image, url);
   }
   saveAsPNG(image: string, url: string): void {
       this.widgetObject.saveAsPNG(image, url);
   }
   text(x: number, y: number, width: jqwidgets.Size, height: jqwidgets.Size, angle: number, attributes: Array<any>, clip: boolean, halign: string, valign: string, rotateAround: string): any {
       return this.widgetObject.text(x, y, width, height, angle, attributes, clip, halign, valign, rotateAround);
   }

   // jqxDrawComponent events


   __wireEvents__(): void {
   var self = this;

   }

} //jqxDrawComponent
