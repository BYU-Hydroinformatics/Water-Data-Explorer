/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularTouch',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTouchComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxTouch;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTouch', options);
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
                   this.host.jqxTouch(i, changes[i].currentValue);
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
      this.host.jqxTouch('setOptions', options);
   }

   // jqxTouchComponent properties
   @Input('orientationChangeEnabled') orientationChangeEnabled : boolean;
   @Input('swipeMin') swipeMin : number;
   @Input('swipeMax') swipeMax : number;
   @Input('swipeDelay') swipeDelay : number;
   @Input('tapHoldDelay') tapHoldDelay : number;

   // jqxTouchComponent functions


   // jqxTouchComponent events
   @Output() OnOrientationchange = new EventEmitter();
   @Output() OnSwipe = new EventEmitter();
   @Output() OnSwipeleft = new EventEmitter();
   @Output() OnSwiperight = new EventEmitter();
   @Output() OnSwipetop = new EventEmitter();
   @Output() OnSwipebottom = new EventEmitter();
   @Output() OnTap = new EventEmitter();
   @Output() OnTaphold = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('orientationchange', function(eventData) { if (self.OnOrientationchange)    self.OnOrientationchange.next(eventData); });
      this.host.bind('swipe', function(eventData) { if (self.OnSwipe)    self.OnSwipe.next(eventData); });
      this.host.bind('swipeleft', function(eventData) { if (self.OnSwipeleft)    self.OnSwipeleft.next(eventData); });
      this.host.bind('swiperight', function(eventData) { if (self.OnSwiperight)    self.OnSwiperight.next(eventData); });
      this.host.bind('swipetop', function(eventData) { if (self.OnSwipetop)    self.OnSwipetop.next(eventData); });
      this.host.bind('swipebottom', function(eventData) { if (self.OnSwipebottom)    self.OnSwipebottom.next(eventData); });
      this.host.bind('tap', function(eventData) { if (self.OnTap)    self.OnTap.next(eventData); });
      this.host.bind('taphold', function(eventData) { if (self.OnTaphold)    self.OnTaphold.next(eventData); });
   }

} //jqxTouchComponent
