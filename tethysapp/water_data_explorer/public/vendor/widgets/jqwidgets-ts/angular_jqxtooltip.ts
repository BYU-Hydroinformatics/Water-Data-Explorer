/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularTooltip',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTooltipComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxTooltip;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTooltip', options);
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
                   this.host.jqxTooltip(i, changes[i].currentValue);
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
      this.host.jqxTooltip('setOptions', options);
   }

   // jqxTooltipComponent properties
   @Input('absolutePositionX') absolutePositionX : number;
   @Input('absolutePositionY') absolutePositionY : number;
   @Input('autoHide') autoHide : boolean;
   @Input('autoHideDelay') autoHideDelay: number;
   @Input('animationShowDelay') animationShowDelay: string | number;
   @Input('animationHideDelay') animationHideDelay: string | number;
   @Input('content') content : string;
   @Input('closeOnClick') closeOnClick : boolean;
   @Input('disabled') disabled : boolean;
   @Input('enableBrowserBoundsDetection') enableBrowserBoundsDetection: boolean;
   @Input('left') left: number | string;
   @Input('name') name : string;
   @Input('opacity') opacity : number;
   @Input('position') position : string;
   @Input('rtl') rtl : boolean;
   @Input('showDelay') showDelay : number;
   @Input('showArrow') showArrow: boolean;
   @Input('top') top: string | number;
   @Input('trigger') trigger : string;
   @Input('theme') theme : string;

   // jqxTooltipComponent functions
   close(index: number): void {
      this.host.jqxTooltip('close', index);
   }
   destroy(): void {
      this.host.jqxTooltip('destroy');
   }
   open(): void {
      this.host.jqxTooltip('open');
   }
   refresh(): void {
      this.host.jqxTooltip('refresh');
   }

   // jqxTooltipComponent events
   @Output() OnClose = new EventEmitter();
   @Output() OnClosing = new EventEmitter();
   @Output() OnOpen = new EventEmitter();
   @Output() OnOpening = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('closing', function(eventData) { if (self.OnClosing)    self.OnClosing.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
      this.host.bind('opening', function(eventData) { if (self.OnOpening)    self.OnOpening.next(eventData); });
   }

} //jqxTooltipComponent
