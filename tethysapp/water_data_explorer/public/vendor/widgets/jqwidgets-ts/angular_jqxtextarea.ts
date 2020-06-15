/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularTextArea',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTextAreaComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxTextArea;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTextArea', options);
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
                   this.host.jqxTextArea(i, changes[i].currentValue);
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
      this.host.jqxTextArea('setOptions', options);
   }

   // jqxTextAreaComponent properties
   @Input('disabled') disabled : boolean;
   @Input('displayMember') displayMember : string;
   @Input('dropDownWidth') dropDownWidth : String | Number;
   @Input('items') items : number;
   @Input('maxLength') maxLength : number;
   @Input('minLength') minLength : number;
   @Input('opened') opened : boolean;
   @Input('placeHolder') placeHolder : string;
   @Input('popupZIndex') popupZIndex : number;
   @Input('query') query : string;
   @Input('renderer') renderer : (itemValue: any, inputValue: any) => any;
   @Input('roundedCorners') roundedCorners : boolean;
   @Input('rtl') rtl : boolean;
   @Input('scrollBarSize') scrollBarSize : number;
   @Input('searchMode') searchMode : string;
   @Input('source') source : any;
   @Input('theme') theme : string;
   @Input('valueMember') valueMember : number | string;

   // jqxTextAreaComponent functions
   destroy(): void {
      this.host.jqxTextArea('destroy');
   }
   focus(): void {
      this.host.jqxTextArea('focus');
   }
   refresh(): void {
      this.host.jqxTextArea('refresh');
   }
   render(): void {
      this.host.jqxTextArea('render');
   }
   selectAll(): void {
      this.host.jqxTextArea('selectAll');
   }
   val(value?: string): string {
      return this.host.jqxTextArea('val', value);
   }

   // jqxTextAreaComponent events
   @Output() OnChange = new EventEmitter();
   @Output() OnClose = new EventEmitter();
   @Output() OnOpen = new EventEmitter();
   @Output() OnSelect = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
      this.host.bind('select', function(eventData) { if (self.OnSelect)    self.OnSelect.next(eventData); });
   }

} //jqxTextAreaComponent
