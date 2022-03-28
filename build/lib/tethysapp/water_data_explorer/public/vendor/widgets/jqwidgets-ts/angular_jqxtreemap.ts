/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularTreeMap',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTreeMapComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxTreeMap;

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
       this.host.css('margin-left', '1px');
       if (this.isHostReady())
       {
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTreeMap', options);
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
                   this.host.jqxTreeMap(i, changes[i].currentValue);
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
      this.host.jqxTreeMap('setOptions', options);
   }

   // jqxTreeMapComponent properties
   @Input('baseColor') baseColor : string;
   @Input('colorRanges') colorRanges : Array<jqwidgets.TreeMapColorRanges>;
   @Input('colorRange') colorRange : number;
   @Input('colorMode') colorMode : string;
   @Input('displayMember') displayMember : string;
   @Input('hoverEnabled') hoverEnabled : boolean;
   @Input('headerHeight') headerHeight : number;
   @Input('legendLabel') legendLabel : string;
   @Input('legendPosition') legendPosition : jqwidgets.TreeMapLegendPosition;
   @Input('legendScaleCallback') legendScaleCallback : (value: Number) => Number;
   @Input('renderCallbacks') renderCallbacks : any;
   @Input('selectionEnabled') selectionEnabled : boolean;
   @Input('showLegend') showLegend : boolean;
   @Input('source') source : any;
   @Input('theme') theme : string;
   @Input('valueMember') valueMember : string;

   // jqxTreeMapComponent functions
   destroy(): void {
      this.host.jqxTreeMap('destroy');
   }
   render(): void {
      this.host.jqxTreeMap('render');
   }

   // jqxTreeMapComponent events
   @Output() OnBindingComplete = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('bindingComplete', function(eventData) { if (self.OnBindingComplete)    self.OnBindingComplete.next(eventData); });
   }

} //jqxTreeMapComponent
