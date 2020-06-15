/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDocking',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDockingComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDocking;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDocking', options );
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
                   this.host.jqxDocking(i, changes[i].currentValue);
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
      this.host.jqxDocking('setOptions', options);
   }

   // jqxDockingComponent properties
   @Input('cookies') cookies : boolean;
   @Input('cookieOptions') cookieOptions : jqwidgets.DockingCookieOptions;
   @Input('disabled') disabled : boolean;
   @Input('floatingWindowOpacity') floatingWindowOpacity : number;
   @Input('keyboardNavigation') keyboardNavigation : boolean;
   @Input('mode') mode : string;
   @Input('orientation') orientation : string;
   @Input('rtl') rtl : boolean;
   @Input('theme') theme : string;
   @Input('windowsMode') windowsMode : jqwidgets.DockingWindowsMode;
   @Input('windowsOffset') windowsOffset : number;

   // jqxDockingComponent functions
   addWindow(windowId: string, mode: string, panel: number, position: any) : void {
      this.host.jqxDocking('addWindow', windowId, mode, panel, position);
   }
   closeWindow(windowId: string): void {
      this.host.jqxDocking('closeWindow', windowId);
   }
   collapseWindow(windowId: string): void {
      this.host.jqxDocking('collapseWindow', windowId);
   }
   destroy(): void {
      this.host.jqxDocking('destroy');
   }
   disableWindowResize(windowId: string): void {
      this.host.jqxDocking('disableWindowResize', windowId);
   }
   disable(): void {
      this.host.jqxDocking('disable');
   }
   exportLayout(): string {
      return this.host.jqxDocking('exportLayout');
   }
   enable(): void {
      this.host.jqxDocking('enable');
   }
   expandWindow(windowId: string): void {
      this.host.jqxDocking('expandWindow', windowId);
   }
   enableWindowResize(windowId: string): void {
      this.host.jqxDocking('enableWindowResize', windowId);
   }
   focus(): void {
      this.host.jqxDocking('focus');
   }
   hideAllCloseButtons(): void {
      this.host.jqxDocking('hideAllCloseButtons');
   }
   hideAllCollapseButtons(): void {
      this.host.jqxDocking('hideAllCollapseButtons');
   }
   hideCollapseButton(windowId: string): void {
      this.host.jqxDocking('hideCollapseButton', windowId);
   }
   hideCloseButton(windowId: string): void {
      this.host.jqxDocking('hideCloseButton', windowId);
   }
   importLayout(Json: string): void {
      this.host.jqxDocking('importLayout', Json);
   }
   move(windowId: string, panel: number, position: number): void {
      this.host.jqxDocking('move', windowId, panel, position);
   }
   pinWindow(windowId: string): void {
      this.host.jqxDocking('pinWindow', windowId);
   }
   setWindowMode(windowId: string, mode: string): void {
      this.host.jqxDocking('setWindowMode', windowId, mode);
   }
   showCloseButton(windowId: string): void {
      this.host.jqxDocking('showCloseButton', windowId);
   }
   showCollapseButton(windowId: string): void {
      this.host.jqxDocking('showCollapseButton', windowId);
   }
   setWindowPosition(windowId: string, top: any, left: number): void {
      this.host.jqxDocking('setWindowPosition', windowId, top, left);
   }
   showAllCloseButtons(): void {
      this.host.jqxDocking('showAllCloseButtons');
   }
   showAllCollapseButtons(): void {
      this.host.jqxDocking('showAllCollapseButtons');
   }
   unpinWindow(windowId: string): void {
      this.host.jqxDocking('unpinWindow', windowId);
   }

   // jqxDockingComponent events
   @Output() OnDragStart = new EventEmitter();
   @Output() OnDragEnd = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('dragStart', function(eventData) { if (self.OnDragStart)    self.OnDragStart.next(eventData); });
      this.host.bind('dragEnd', function(eventData) { if (self.OnDragEnd)    self.OnDragEnd.next(eventData); });
   }

} //jqxDockingComponent
