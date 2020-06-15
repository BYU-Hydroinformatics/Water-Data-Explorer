/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularScrollBar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxScrollBarComponent implements OnChanges {
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxScrollBar;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxScrollBar', options);
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
                   this.host.jqxScrollBar(i, changes[i].currentValue);
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
      this.host.jqxScrollBar('setOptions', options);
   }

   // jqxScrollBarComponent properties
   @Input('disabled') disabled : boolean;
   @Input('largestep') largestep : number;
   @Input('min') min : number;
   @Input('max') max : number;
   @Input('rtl') rtl : boolean;
   @Input('step') step : number;
   @Input('showButtons') showButtons : boolean;
   @Input('thumbMinSize') thumbMinSize : number;
   @Input('theme') theme : string;
   @Input('vertical') vertical : boolean;
   @Input('value') value : number;

   // jqxScrollBarComponent functions
   destroy(): void {
      this.host.jqxScrollBar('destroy');
   }
   isScrolling(): boolean {
      return this.host.jqxScrollBar('isScrolling');
   }
   setPosition(index: number): void {
      this.host.jqxScrollBar('setPosition', index);
   }

   // jqxScrollBarComponent events
   @Output() OnValueChanged = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('valueChanged', function(eventData) { if (self.OnValueChanged)    self.OnValueChanged.next(eventData); });
   }

} //jqxScrollBarComponent
