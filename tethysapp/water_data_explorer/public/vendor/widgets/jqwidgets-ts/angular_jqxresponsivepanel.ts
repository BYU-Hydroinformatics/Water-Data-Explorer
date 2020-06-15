/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularResponsivePanel',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxResponsivePanelComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxResponsivePanel;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxResponsivePanel', options);
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
                   this.host.jqxResponsivePanel(i, changes[i].currentValue);
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
      this.host.jqxResponsivePanel('setOptions', options);
   }

   // jqxResponsivePanelComponent properties
   @Input('animationDirection') animationDirection : string;
   @Input('animationHideDelay') animationHideDelay : String | Number;
   @Input('animationShowDelay') animationShowDelay : String | Number;
   @Input('animationType') animationType : string;
   @Input('autoClose') autoClose : boolean;
   @Input('collapseBreakpoint') collapseBreakpoint : number;
   @Input('collapseWidth') collapseWidth : number;
   @Input('initContent') initContent : () => void;
   @Input('theme') theme : string;
   @Input('toggleButton') toggleButton : String | any;
   @Input('toggleButtonSize') toggleButtonSize : String | Number;

   // jqxResponsivePanelComponent functions
   close(): void {
      this.host.jqxResponsivePanel('close');
   }
   destroy(): void {
      this.host.jqxResponsivePanel('destroy');
   }
   isCollapsed(): boolean {
      return this.host.jqxResponsivePanel('isCollapsed');
   }
   isOpened(): boolean {
      return this.host.jqxResponsivePanel('isOpened');
   }
   open(): void {
      this.host.jqxResponsivePanel('open');
   }
   refresh(): void {
      this.host.jqxResponsivePanel('refresh');
   }
   render(): void {
      this.host.jqxResponsivePanel('render');
   }

   // jqxResponsivePanelComponent events
   @Output() OnClose = new EventEmitter();
   @Output() OnCollapse = new EventEmitter();
   @Output() OnExpand = new EventEmitter();
   @Output() OnOpen = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('collapse', function(eventData) { if (self.OnCollapse)    self.OnCollapse.next(eventData); });
      this.host.bind('expand', function(eventData) { if (self.OnExpand)    self.OnExpand.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
   }

} //jqxResponsivePanelComponent
