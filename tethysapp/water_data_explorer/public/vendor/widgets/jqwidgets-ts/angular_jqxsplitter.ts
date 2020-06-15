/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularSplitter',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxSplitterComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxSplitter;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSplitter', options);
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
                   this.host.jqxSplitter(i, changes[i].currentValue);
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
      this.host.jqxSplitter('setOptions', options);
   }

   // jqxSplitterComponent properties
   @Input('disabled') disabled : boolean;
   @Input('orientation') orientation : string;
   @Input('panels') panels : Array<jqwidgets.SplitterPanel>;
   @Input('resizable') resizable: boolean;
   @Input('splitBarSize') splitBarSize: number | string;
   @Input('showSplitBar') showSplitBar : boolean;
   @Input('theme') theme : string;

   // jqxSplitterComponent functions
   collapse(): void {
      this.host.jqxSplitter('collapse');
   }
   destroy(): void {
      this.host.jqxSplitter('destroy');
   }
   disable(): void {
      this.host.jqxSplitter('disable');
   }
   enable(): void {
      this.host.jqxSplitter('enable');
   }
   expand(): void {
      this.host.jqxSplitter('expand');
   }
   render(): void {
      this.host.jqxSplitter('render');
   }
   refresh(): void {
      this.host.jqxSplitter('refresh');
   }

   // jqxSplitterComponent events
   @Output() OnCollapsed = new EventEmitter();
   @Output() OnExpanded = new EventEmitter();
   @Output() OnResize = new EventEmitter();
   @Output() OnResizeStart = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('collapsed', function(eventData) { if (self.OnCollapsed)    self.OnCollapsed.next(eventData); });
      this.host.bind('expanded', function(eventData) { if (self.OnExpanded)    self.OnExpanded.next(eventData); });
      this.host.bind('resize', function(eventData) { if (self.OnResize)    self.OnResize.next(eventData); });
      this.host.bind('resizeStart', function(eventData) { if (self.OnResizeStart)    self.OnResizeStart.next(eventData); });
   }

} //jqxSplitterComponent
