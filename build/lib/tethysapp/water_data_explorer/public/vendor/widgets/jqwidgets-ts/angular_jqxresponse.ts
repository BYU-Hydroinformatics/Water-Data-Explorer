/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularResponse',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxResponseComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxResponse;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxResponse', options);
          this.__wireEvents__();
          this.__updateRect__();

          return true;
       }
       return false;
   }

   ngAfterViewInit() {
      //if (!this.isHostReady())
         // this.initHost({});
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
                   this.host.jqxResponse(i, changes[i].currentValue);
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
      this.host.jqxResponse('setOptions', options);
   }

   // jqxResponseComponent properties
   @Input('browser') browser : jqwidgets.ResponseBrowser;
   @Input('device') device : jqwidgets.ResponseDevice;
   @Input('document') document : jqwidgets.ResponseDocument;
   @Input('destroy') destroy : () => void;
   @Input('resize') resize : any;
   @Input('isHidden') isHidden : (id: any) => Boolean;
   @Input('inViewPort') inViewPort : (id: any) => Boolean;
   @Input('os') os : jqwidgets.ResponseOs;
   @Input('pointerDown') pointerDown : (id: any, callback: any) => Boolean;
   @Input('pointerMove') pointerMove : (id: any, callback: any) => Boolean;
   @Input('pointerUp') pointerUp : (id: any, callback: any) => Boolean;
   @Input('responsive') responsive: (container: string, colWidths: Array<Number>, colOffsets: Array<Number>, colClass: string, deviceTypes: string, margin: jqwidgets.ResponseOffset, padding: jqwidgets.ResponseOffset, breakpoints: Array<jqwidgets.ResponseBreakpoint>) => void;
   @Input('scroll') scroll: () => Object;
   @Input('viewPort') viewPort: () => Object;
   
   // jqxResponseComponent functions
   refresh(): void {
      this.host.jqxResponse('refresh');
   }

   // jqxResponseComponent events


   __wireEvents__(): void {
   var self = this;

   }

} //jqxResponseComponent
