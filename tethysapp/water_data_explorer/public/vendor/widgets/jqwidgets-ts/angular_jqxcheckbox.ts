/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularCheckBox',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxCheckBoxComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxCheckBox;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxCheckBox', options );
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
                   this.host.jqxCheckBox(i, changes[i].currentValue);
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
      this.host.jqxCheckBox('setOptions', options);
   }

   // jqxCheckBoxComponent properties
   @Input('animationShowDelay') animationShowDelay : number;
   @Input('animationHideDelay') animationHideDelay : number;
   @Input('boxSize') boxSize : jqwidgets.Size;
   @Input('checked') checked : boolean;
   @Input('disabled') disabled : boolean;
   @Input('enableContainerClick') enableContainerClick : boolean;
   @Input('groupName') groupName : string;
   @Input('hasThreeStates') hasThreeStates : boolean;
   @Input('locked') locked : boolean;
   @Input('rtl') rtl : boolean;
   @Input('theme') theme : string;

   // jqxCheckBoxComponent functions
   check(): void {
      this.host.jqxCheckBox('check');
   }
   disable(): void {
      this.host.jqxCheckBox('disable');
   }
   destroy(): void {
      this.host.jqxCheckBox('destroy');
   }
   enable(): void {
      this.host.jqxCheckBox('enable');
   }
   focus(): void {
      this.host.jqxCheckBox('focus');
   }
   indeterminate(): void {
      this.host.jqxCheckBox('indeterminate');
   }
   render(): void {
      this.host.jqxCheckBox('render');
   }
   toggle(): void {
      this.host.jqxCheckBox('toggle');
   }
   uncheck(): void {
      this.host.jqxCheckBox('uncheck');
   }
   val(value?: boolean): boolean {
       if (value !== undefined)
       {
           return this.host.jqxCheckBox('val', value);
       } else
       {
           return this.host.jqxCheckBox('val');
       }
   }

   // jqxCheckBoxComponent events
   @Output() OnChecked = new EventEmitter();
   @Output() OnChange = new EventEmitter();
   @Output() OnIndeterminate = new EventEmitter();
   @Output() OnUnchecked = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('checked', function(eventData) { if (self.OnChecked)    self.OnChecked.next(eventData); });
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('indeterminate', function(eventData) { if (self.OnIndeterminate)    self.OnIndeterminate.next(eventData); });
      this.host.bind('unchecked', function(eventData) { if (self.OnUnchecked)    self.OnUnchecked.next(eventData); });
   }

} //jqxCheckBoxComponent
