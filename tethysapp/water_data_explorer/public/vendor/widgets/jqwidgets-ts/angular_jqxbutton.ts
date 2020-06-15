/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularButton',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxButtonComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxButton;

   constructor(containerElement: ElementRef) {
      this.elementRef = containerElement;
   }

   isHostReady()
   {
       return (this.host !== undefined && this.host.length == 1);
   }

   initHost(options: any) {
       if (this.isHostReady())
           return true;
       this.widgetObject = jqwidgets.createInstance($(this.elementRef.nativeElement.firstChild), 'jqxButton', options);
       this.host = this.widgetObject["host"];
       this.__wireEvents__();
       this.__updateRect__();

       return true;
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
                   this.host.jqxButton(i, changes[i].currentValue);
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
      this.host.jqxButton('setOptions', options);
   }

   // jqxButtonComponent properties
   @Input('delay') delay : number;
   @Input('disabled') disabled : boolean;
   @Input('imgSrc') imgSrc : string;
   @Input('imgWidth') imgWidth : jqwidgets.Size;
   @Input('imgHeight') imgHeight : jqwidgets.Size;
   @Input('imgPosition') imgPosition : string;
   @Input('roundedCorners') roundedCorners : string;
   @Input('rtl') rtl : boolean;
   @Input('textPosition') textPosition : string;
   @Input('textImageRelation') textImageRelation : string;
   @Input('theme') theme : string;
   @Input('template') template : string;
   @Input('toggled') toggled : boolean;
   @Input('value') value : string;

   // jqxButtonComponent functions
   check(): void {
      this.host.jqxButton('check');
   }
   destroy(): void {
      this.host.jqxButton('destroy');
   }
   focus(): void {
      this.host.jqxButton('focus');
   }
   render(): void {
      this.host.jqxButton('render');
   }
   toggle(): void {
      this.host.jqxButton('toggle');
   }
   unCheck(): void {
      this.host.jqxButton('unCheck');
   }
   val(value?: string): string {
       if (value !== undefined)
       {
           return this.host.jqxButton('val', value);
       } else
       {
           return this.host.jqxButton('val');
       }
   }

   // jqxButtonComponent events
   @Output() OnClick = new EventEmitter();

   __wireEvents__(): void{
       var self = this;
       this.host.bind('click', function (eventData) { if (self.OnClick) self.OnClick.next(eventData); });
   }

} //jqxButtonComponent
