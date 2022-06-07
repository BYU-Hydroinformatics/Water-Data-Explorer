/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularToolbar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxToolBarComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxToolBar;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxToolBar', options);
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
                   this.host.jqxToolBar(i, changes[i].currentValue);
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
      this.host.jqxToolBar('setOptions', options);
   }

   // jqxToolBarComponent properties
   @Input('disabled') disabled : boolean;
   @Input('initTools') initTools : (type?: String, index?: Number, tool?: any, menuToolIninitialization?: Boolean) => void;
   @Input('minimizeWidth') minimizeWidth : number;
   @Input('minWidth') minWidth : String | Number;
   @Input('maxWidth') maxWidth : String | Number;
   @Input('rtl') rtl : boolean;
   @Input('tools') tools : string;
   @Input('theme') theme : string;

   // jqxToolBarComponent functions
   addTool(type: string, position: string, separator: boolean, menuToolIninitialization: (type?: String, tool?: any, menuToolIninitialization?: Boolean) => void): void {
      this.host.jqxToolBar('addTool', type, position, separator, menuToolIninitialization);
   }
   disableTool(index: number, disable: boolean): void {
      this.host.jqxToolBar('disableTool', index, disable);
   }
   destroy(): void {
      this.host.jqxToolBar('destroy');
   }
   destroyTool(index: number): void {
      this.host.jqxToolBar('destroyTool', index);
   }
   getTools(): Array<jqwidgets.ToolBarToolItem> {
      return this.host.jqxToolBar('getTools');
   }
   render(): void {
      this.host.jqxToolBar('render');
   }
   refresh(): void {
      this.host.jqxToolBar('refresh');
   }

   // jqxToolBarComponent events
   @Output() OnClose = new EventEmitter();
   @Output() OnOpen = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
   }

} //jqxToolBarComponent
