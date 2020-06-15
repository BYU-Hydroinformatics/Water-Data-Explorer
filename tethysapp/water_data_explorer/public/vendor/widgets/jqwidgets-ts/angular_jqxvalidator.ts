/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularValidator',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxValidatorComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxValidator;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxValidator', options);
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
                   this.host.jqxValidator(i, changes[i].currentValue);
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
      this.host.jqxValidator('setOptions', options);
   }

   // jqxValidatorComponent properties
   @Input('arrow') arrow : boolean;
   @Input('animation') animation : string;
   @Input('animationDuration') animationDuration : number;
   @Input('closeOnClick') closeOnClick : boolean;
   @Input('focus') focus : boolean;
   @Input('hintType') hintType : string;
   @Input('onError') onError : () => void;
   @Input('onSuccess') onSuccess : () => void;
   @Input('position') position : string;
   @Input('rules') rules : Array<jqwidgets.ValidatorRule>;
   @Input('rtl') rtl : boolean;

   // jqxValidatorComponent functions
   hideHint(id: string): void {
      this.host.jqxValidator('hideHint', id);
   }
   hide(): void {
      this.host.jqxValidator('hide');
   }
   updatePosition(): void {
      this.host.jqxValidator('updatePosition');
   }
   validate(htmlElement: any): void {
      this.host.jqxValidator('validate', htmlElement);
   }
   validateInput(id: string): void {
      this.host.jqxValidator('validateInput', id);
   }

   // jqxValidatorComponent events
   @Output() OnValidationError = new EventEmitter();
   @Output() OnValidationSuccess = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('validationError', function(eventData) { if (self.OnValidationError)    self.OnValidationError.next(eventData); });
      this.host.bind('validationSuccess', function(eventData) { if (self.OnValidationSuccess)    self.OnValidationSuccess.next(eventData); });
   }

} //jqxValidatorComponent
