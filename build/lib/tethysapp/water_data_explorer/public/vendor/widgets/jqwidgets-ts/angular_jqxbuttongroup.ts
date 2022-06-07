/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularButtonGroup',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxButtonGroupComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxButtonGroup;

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
       this.host[0].style.marginLeft = "1px";
       if (this.isHostReady())
       {
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxButtonGroup', options );
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
                   this.host.jqxButtonGroup(i, changes[i].currentValue);
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
      this.host.jqxButtonGroup('setOptions', options);
   }

   // jqxButtonGroupComponent properties
   @Input('disabled') disabled : boolean;
   @Input('enableHover') enableHover : boolean;
   @Input('mode') mode : string;
   @Input('rtl') rtl : boolean;
   @Input('template') template : string;
   @Input('theme') theme : string;

   // jqxButtonGroupComponent functions
   disableAt(index: number): void {
      this.host.jqxButtonGroup('disableAt', index);
   }
   disable(): void {
      this.host.jqxButtonGroup('disable');
   }
   destroy(): void {
      this.host.jqxButtonGroup('destroy');
   }
   enable(): void {
      this.host.jqxButtonGroup('enable');
   }
   enableAt(index: number): void {
      this.host.jqxButtonGroup('enableAt', index);
   }
   focus(): void {
      this.host.jqxButtonGroup('focus');
   }
   getSelection(): any {
      return this.host.jqxButtonGroup('getSelection');
   }
   render(): void {
      this.host.jqxButtonGroup('render');
   }
   setSelection(index: number): void {
      this.host.jqxButtonGroup('setSelection', index);
   }

   // jqxButtonGroupComponent events
   @Output() OnButtonClick = new EventEmitter();
   @Output() OnSelected = new EventEmitter();
   @Output() OnUnselected = new EventEmitter();

   __wireEvents__(): void {
       var self = this;
       this.host.bind('buttonclick', function (eventData) { if (self.OnButtonclick)  self.OnButtonclick.next(eventData); });
       this.host.bind('selected', function(eventData) { if (self.OnSelected)    self.OnSelected.next(eventData); });
       this.host.bind('unselected', function(eventData) { if (self.OnUnselected)    self.OnUnselected.next(eventData); });
   }

} //jqxButtonGroupComponent
