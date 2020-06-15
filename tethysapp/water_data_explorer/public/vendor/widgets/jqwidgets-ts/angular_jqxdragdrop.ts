/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDragDrop',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDragDropComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDragDrop;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDragDrop', options );
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
                   this.host.jqxDragDrop(i, changes[i].currentValue);
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
      this.host.jqxDragDrop('setOptions', options);
   }

   // jqxDragDropComponent properties
   @Input('appendTo') appendTo : string;
   @Input('disabled') disabled : boolean;
   @Input('distance') distance : number;
   @Input('data') data : any;
   @Input('dropAction') dropAction : string;
   @Input('dropTarget') dropTarget : any;
   @Input('dragZIndex') dragZIndex : number;
   @Input('feedback') feedback : string;
   @Input('initFeedback') initFeedback : (feedback?:any) => void;
   @Input('opacity') opacity : number;
   @Input('onDragEnd') onDragEnd : () => void;
   @Input('onDrag') onDrag : (data?: any, position?: any) => void;
   @Input('onDragStart') onDragStart : (position?: any) => void;
   @Input('onTargetDrop') onTargetDrop : (data?: any) => void;
   @Input('onDropTargetEnter') onDropTargetEnter : () => void;
   @Input('onDropTargetLeave') onDropTargetLeave : (data?: any) => void;
   @Input('restricter') restricter : any;
   @Input('revert') revert : boolean;
   @Input('revertDuration') revertDuration : number;
   @Input('tolerance') tolerance : string;

   // jqxDragDropComponent functions


   // jqxDragDropComponent events
   @Output() OnDragStart = new EventEmitter();
   @Output() OnDragEnd = new EventEmitter();
   @Output() OnDragging = new EventEmitter();
   @Output() OnDropTargetEnter = new EventEmitter();
   @Output() OnDropTargetLeave = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('dragStart', function(eventData) { if (self.OnDragStart)    self.OnDragStart.next(eventData); });
      this.host.bind('dragEnd', function(eventData) { if (self.OnDragEnd)    self.OnDragEnd.next(eventData); });
      this.host.bind('dragging', function(eventData) { if (self.OnDragging)    self.OnDragging.next(eventData); });
      this.host.bind('dropTargetEnter', function(eventData) { if (self.OnDropTargetEnter)    self.OnDropTargetEnter.next(eventData); });
      this.host.bind('dropTargetLeave', function(eventData) { if (self.OnDropTargetLeave)    self.OnDropTargetLeave.next(eventData); });
   }

} //jqxDragDropComponent
