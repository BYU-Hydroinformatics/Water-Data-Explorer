/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularRating',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxRatingComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxRating;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRating', options);
          this.__wireEvents__();
          this.__updateRect__();

          return true;
       }
       return false;
   }

   ngAfterViewInit() {
     // if (!this.isHostReady())
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
                   this.host.jqxRating(i, changes[i].currentValue);
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
      this.host.jqxRating('setOptions', options);
   }

   // jqxRatingComponent properties
   @Input('count') count : number;
   @Input('disabled') disabled : boolean;
   @Input('itemHeight') itemHeight : number;
   @Input('itemWidth') itemWidth : number;
   @Input('precision') precision : number;
   @Input('singleVote') singleVote : boolean;
   @Input('value') value : number;

   // jqxRatingComponent functions
   disable(): void {
      this.host.jqxRating('disable');
   }
   enable(): void {
      this.host.jqxRating('enable');
   }
   getValue(): number {
      return this.host.jqxRating('getValue');
   }
   setValue(value: number): void {
      this.host.jqxRating('setValue', value);
   }
   val(value?: number): number {
      return this.host.jqxRating('val', value);
   }

   // jqxRatingComponent events
   @Output() OnChange = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
   }

} //jqxRatingComponent
