/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularScrollView',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxScrollViewComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxScrollView;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxScrollView', options);
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
                   this.host.jqxScrollView(i, changes[i].currentValue);
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
      this.host.jqxScrollView('setOptions', options);
   }

   // jqxScrollViewComponent properties
   @Input('animationDuration') animationDuration : number;
   @Input('bounceEnabled') bounceEnabled : boolean;
   @Input('buttonsOffset') buttonsOffset : Array<Number>;
   @Input('currentPage') currentPage : number;
   @Input('disabled') disabled : boolean;
   @Input('moveThreshold') moveThreshold : number;
   @Input('showButtons') showButtons : boolean;
   @Input('slideShow') slideShow : boolean;
   @Input('slideDuration') slideDuration : number;
   @Input('theme') theme : string;

   // jqxScrollViewComponent functions
   back(): void {
      this.host.jqxScrollView('back');
   }
   changePage(index: number): void {
      this.host.jqxScrollView('changePage', index);
   }
   forward(): void {
      this.host.jqxScrollView('forward');
   }
   refresh(): void {
      this.host.jqxScrollView('refresh');
   }

   // jqxScrollViewComponent events
   @Output() OnPageChanged = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('pageChanged', function(eventData) { if (self.OnPageChanged)    self.OnPageChanged.next(eventData); });
   }

} //jqxScrollViewComponent
