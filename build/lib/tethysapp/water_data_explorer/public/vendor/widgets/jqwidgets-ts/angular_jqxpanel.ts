/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularPanel',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxPanelComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxPanel;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPanel',options);
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
                   this.host.jqxPanel(i, changes[i].currentValue);
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
      this.host.jqxPanel('setOptions', options);
   }

   // jqxPanelComponent properties
   @Input('autoUpdate') autoUpdate : boolean;
   @Input('disabled') disabled : boolean;
   @Input('rtl') rtl : boolean;
   @Input('sizeMode') sizeMode : string;
   @Input('scrollBarSize') scrollBarSize : String | Number;
   @Input('theme') theme : string;

   // jqxPanelComponent functions
   append(HTMLElement: any): void {
      this.host.jqxPanel('append', HTMLElement);
   }
   clearcontent(): void {
      this.host.jqxPanel('clearcontent');
   }
   destroy(): void {
      this.host.jqxPanel('destroy');
   }
   focus(): void {
      this.host.jqxPanel('focus');
   }
   getScrollHeight(): number {
      return this.host.jqxPanel('getScrollHeight');
   }
   getVScrollPosition(): number {
      return this.host.jqxPanel('getVScrollPosition');
   }
   getScrollWidth(): number {
      return this.host.jqxPanel('getScrollWidth');
   }
   getHScrollPosition(): number {
      return this.host.jqxPanel('getHScrollPosition');
   }
   prepend(HTMLElement: any): void {
      this.host.jqxPanel('prepend', HTMLElement);
   }
   remove(HTMLElement: any): void {
      this.host.jqxPanel('remove', HTMLElement);
   }
   scrollTo(top: String | Number, left: String | Number): void {
      this.host.jqxPanel('scrollTo', top, left);
   }

   // jqxPanelComponent events


   __wireEvents__(): void {
   var self = this;

   }

} //jqxPanelComponent
