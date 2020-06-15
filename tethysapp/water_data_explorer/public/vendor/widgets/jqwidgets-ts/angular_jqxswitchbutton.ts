/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularSwitchButton',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxSwitchButtonComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxSwitchButton;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSwitchButton', options);
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
                   this.host.jqxSwitchButton(i, changes[i].currentValue);
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
      this.host.jqxSwitchButton('setOptions', options);
   }

   // jqxSwitchButtonComponent properties
   @Input('checked') checked : boolean;
   @Input('disabled') disabled : boolean;
   @Input('orientation') orientation : string;
   @Input('onLabel') onLabel : string;
   @Input('offLabel') offLabel : string;
   @Input('thumbSize') thumbSize : string;

   // jqxSwitchButtonComponent functions
   check(): void {
      this.host.jqxSwitchButton('check');
   }
   disable(): void {
      this.host.jqxSwitchButton('disable');
   }
   enable(): void {
      this.host.jqxSwitchButton('enable');
   }
   toggle(): void {
      this.host.jqxSwitchButton('toggle');
   }
   uncheck(): void {
      this.host.jqxSwitchButton('uncheck');
   }
   val(value?: boolean): boolean {
      return this.host.jqxSwitchButton('val', value);
   }

   // jqxSwitchButtonComponent events
   @Output() OnChecked = new EventEmitter();
   @Output() OnChange = new EventEmitter();
   @Output() OnUnchecked = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('checked', function(eventData) { if (self.OnChecked)    self.OnChecked.next(eventData); });
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('unchecked', function(eventData) { if (self.OnUnchecked)    self.OnUnchecked.next(eventData); });
   }

} //jqxSwitchButtonComponent
