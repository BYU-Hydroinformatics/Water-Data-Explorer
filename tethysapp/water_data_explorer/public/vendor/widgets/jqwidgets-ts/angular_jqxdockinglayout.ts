/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDockingLayout',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDockingLayoutComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDockingLayout;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDockingLayout', options );
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
                   this.host.jqxDockingLayout(i, changes[i].currentValue);
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
      this.host.jqxDockingLayout('setOptions', options);
   }

   // jqxDockingLayoutComponent properties
   @Input('contextMenu') contextMenu : boolean;
   @Input('layout') layout : Array<jqwidgets.DockingLayoutLayout>;
   @Input('minGroupHeight') minGroupHeight : jqwidgets.Size;
   @Input('minGroupWidth') minGroupWidth : jqwidgets.Size;
   @Input('resizable') resizable : boolean;
   @Input('rtl') rtl : boolean;
   @Input('theme') theme : string;

   // jqxDockingLayoutComponent functions
   addFloatGroup(width: jqwidgets.Size, height: jqwidgets.Size, position: jqwidgets.DockingLayoutLayoutPosition, panelType: string, title: string, content: string, initContent: any): void {
      this.host.jqxDockingLayout('addFloatGroup', width, height, position, panelType, title, content, initContent);
   }
   destroy(): void {
      this.host.jqxDockingLayout('destroy');
   }
   loadLayout(layout: any): void {
      this.host.jqxDockingLayout('loadLayout', layout);
   }
   refresh(): void {
      this.host.jqxDockingLayout('refresh');
   }
   render(): void {
      this.host.jqxDockingLayout('render');
   }
   saveLayout(): any {
      return this.host.jqxDockingLayout('saveLayout');
   }

   // jqxDockingLayoutComponent events
   @Output() OnCreate = new EventEmitter();
   @Output() OnDock = new EventEmitter();
   @Output() OnFloat = new EventEmitter();
   @Output() OnPin = new EventEmitter();
   @Output() OnResize = new EventEmitter();
   @Output() OnUnpin = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('create', function(eventData) { if (self.OnCreate)    self.OnCreate.next(eventData); });
      this.host.bind('dock', function(eventData) { if (self.OnDock)    self.OnDock.next(eventData); });
      this.host.bind('float', function(eventData) { if (self.OnFloat)    self.OnFloat.next(eventData); });
      this.host.bind('pin', function(eventData) { if (self.OnPin)    self.OnPin.next(eventData); });
      this.host.bind('resize', function(eventData) { if (self.OnResize)    self.OnResize.next(eventData); });
      this.host.bind('unpin', function(eventData) { if (self.OnUnpin)    self.OnUnpin.next(eventData); });
   }

} //jqxDockingLayoutComponent
