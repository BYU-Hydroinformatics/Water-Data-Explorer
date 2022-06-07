/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularRibbon',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxRibbonComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxRibbon;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRibbon', options);
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
                   this.host.jqxRibbon(i, changes[i].currentValue);
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
      this.host.jqxRibbon('setOptions', options);
   }

   // jqxRibbonComponent properties
   @Input('animationType') animationType : string;
   @Input('animationDelay') animationDelay : String | Number;
   @Input('disabled') disabled : boolean;
   @Input('initContent') initContent : (index: any) => void;
   @Input('mode') mode : string;
   @Input('popupCloseMode') popupCloseMode : string;
   @Input('position') position : string;
   @Input('rtl') rtl : boolean;
   @Input('selectedIndex') selectedIndex : number;
   @Input('selectionMode') selectionMode : string;
   @Input('scrollPosition') scrollPosition : string;
   @Input('scrollStep') scrollStep : number;
   @Input('scrollDelay') scrollDelay : number;
   @Input('theme') theme : string;

   // jqxRibbonComponent functions
   addAt(index: number, item: jqwidgets.RibbonItem): void {
      this.host.jqxRibbon('addAt', index, item);
   }
   clearSelection(): void {
      this.host.jqxRibbon('clearSelection');
   }
   disableAt(index: number): void {
      this.host.jqxRibbon('disableAt', index);
   }
   destroy(): void {
      this.host.jqxRibbon('destroy');
   }
   enableAt(index: number): void {
      this.host.jqxRibbon('enableAt', index);
   }
   hideAt(index: number): void {
      this.host.jqxRibbon('hideAt', index);
   }
   removeAt(index: number): void {
      this.host.jqxRibbon('removeAt', index);
   }
   render(): void {
      this.host.jqxRibbon('render');
   }
   refresh(): void {
      this.host.jqxRibbon('refresh');
   }
   selectAt(index: number): void {
      this.host.jqxRibbon('selectAt', index);
   }
   showAt(index: number): void {
      this.host.jqxRibbon('showAt', index);
   }
   setPopupLayout(index: number, layout: string, width: String | Number, height: String | Number): void {
      this.host.jqxRibbon('setPopupLayout', index, layout, width, height);
   }
   updateAt(index: number, item: jqwidgets.RibbonItem): void {
      this.host.jqxRibbon('updateAt', index, item);
   }
   val(value?: string): string {
      return this.host.jqxRibbon('val', value);
   }

   // jqxRibbonComponent events
   @Output() OnChange = new EventEmitter();
   @Output() OnReorder = new EventEmitter();
   @Output() OnSelect = new EventEmitter();
   @Output() OnUnselect = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('reorder', function(eventData) { if (self.OnReorder)    self.OnReorder.next(eventData); });
      this.host.bind('select', function(eventData) { if (self.OnSelect)    self.OnSelect.next(eventData); });
      this.host.bind('unselect', function(eventData) { if (self.OnUnselect)    self.OnUnselect.next(eventData); });
   }

} //jqxRibbonComponent
