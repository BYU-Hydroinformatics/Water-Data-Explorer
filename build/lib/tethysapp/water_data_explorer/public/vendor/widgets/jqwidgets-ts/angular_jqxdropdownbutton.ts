/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDropDownButton',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDropDownButtonComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDropDownButton;

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
       this.host = $(this.elementRef.nativeElement.firstChild);;
       if (this.isHostReady())
       {
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDropDownButton', options );
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
                   this.host.jqxDropDownButton(i, changes[i].currentValue);
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
      this.host.jqxDropDownButton('setOptions', options);
   }

   // jqxDropDownButtonComponent properties
   @Input('animationType') animationType : string;
   @Input('arrowSize') arrowSize : number;
   @Input('autoOpen') autoOpen : boolean;
   @Input('closeDelay') closeDelay : number;
   @Input('disabled') disabled : boolean;
   @Input('dropDownHorizontalAlignment') dropDownHorizontalAlignment : string;
   @Input('dropDownVerticalAlignment') dropDownVerticalAlignment : string;
   @Input('dropDownWidth') dropDownWidth : any;
   @Input('enableBrowserBoundsDetection') enableBrowserBoundsDetection : boolean;
   @Input('initContent') initContent : () => void;
   @Input('openDelay') openDelay : number;
   @Input('popupZIndex') popupZIndex : number;
   @Input('rtl') rtl : boolean;
   @Input('template') template : string;
   @Input('theme') theme : string;

   // jqxDropDownButtonComponent functions
   close(): void {
      this.host.jqxDropDownButton('close');
   }
   destroy(): void {
      this.host.jqxDropDownButton('destroy');
   }
   focus(): void {
      this.host.jqxDropDownButton('focus');
   }
   getContent(): any {
      return this.host.jqxDropDownButton('getContent');
   }
   isOpened(): boolean {
      return this.host.jqxDropDownButton('isOpened');
   }
   open(): void {
      this.host.jqxDropDownButton('open');
   }
   setContent(content: string): void {
      this.host.jqxDropDownButton('setContent', content);
   }

   // jqxDropDownButtonComponent events
   @Output() OnClose = new EventEmitter();
   @Output() OnOpen = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
   }

} //jqxDropDownButtonComponent
