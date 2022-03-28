/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularComplexInput',
    template: '<div><input/><ng-content></ng-content></div>'
})

export class jqxComplexInputComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxComplexInput;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxComplexInput', options );
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
                   this.host.jqxComplexInput(i, changes[i].currentValue);
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
      this.host.jqxComplexInput('setOptions', options);
   }

   // jqxComplexInputComponent properties
   @Input('decimalNotation') decimalNotation : string;
   @Input('disabled') disabled : boolean;
   @Input('placeHolder') placeHolder : string;
   @Input('roundedCorners') roundedCorners : boolean;
   @Input('rtl') rtl : boolean;
   @Input('spinButtons') spinButtons : boolean;
   @Input('spinButtonsStep') spinButtonsStep : number;
   @Input('template') template : string;
   @Input('theme') theme : string;
   @Input('value') value : string;

   // jqxComplexInputComponent functions
   destroy(): void {
      this.host.jqxComplexInput('destroy');
   }
   getReal(complexNumber?: number): void {
      return this.host.jqxComplexInput('getReal', complexNumber);
   }
   getImaginary(complexNumber?: number): number {
      return this.host.jqxComplexInput('getImaginary', complexNumber);
   }
   render(): void {
      this.host.jqxComplexInput('render');
   }
   refresh(): void {
      this.host.jqxComplexInput('refresh');
   }
   val(value?: any): string {
       if (value !== undefined)
       {
           return this.host.jqxComplexInput('val', value);
       } else
       {
           return this.host.jqxComplexInput('val');
       }
   }

   // jqxComplexInputComponent events
   @Output() OnChange = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
   }

} //jqxComplexInputComponent
