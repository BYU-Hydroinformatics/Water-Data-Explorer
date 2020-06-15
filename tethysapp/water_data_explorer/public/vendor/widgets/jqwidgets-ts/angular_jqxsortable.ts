/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularSortable',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxSortableComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxSortable;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSortable', options);
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
                   this.host.jqxSortable(i, changes[i].currentValue);
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
      this.host.jqxSortable('setOptions', options);
   }

   // jqxSortableComponent properties
   @Input('appendTo') appendTo : string;
   @Input('axis') axis : String | Number;
   @Input('cancel') cancel : string;
   @Input('connectWith') connectWith : String | Boolean;
   @Input('containment') containment : String | Boolean;
   @Input('cursor') cursor : string;
   @Input('cursorAt') cursorAt : jqwidgets.SortableCursorAt;
   @Input('delay') delay : number;
   @Input('disabled') disabled : boolean;
   @Input('distance') distance : number;
   @Input('dropOnEmpty') dropOnEmpty : boolean;
   @Input('forceHelperSize') forceHelperSize : boolean;
   @Input('forcePlaceholderSize') forcePlaceholderSize : boolean;
   @Input('grid') grid : Array<Number>;
   @Input('handle') handle : String | Boolean;
   @Input('helper') helper : string;
   @Input('items') items : string;
   @Input('opacity') opacity : Number | Boolean;
   @Input('placeholderShow') placeholderShow : String | Boolean;
   @Input('revert') revert : Number | Boolean;
   @Input('scroll') scroll : boolean;
   @Input('scrollSensitivity') scrollSensitivity : number;
   @Input('scrollSpeed') scrollSpeed : number;
   @Input('tolerance') tolerance : string;
   @Input('zIndex') zIndex : number;

   // jqxSortableComponent functions
   cancelMethod(): void {
      this.host.jqxSortable('cancelMethod');
   }
   destroy(): void {
      this.host.jqxSortable('destroy');
   }
   disable(): void {
      this.host.jqxSortable('disable');
   }
   enable(): void {
      this.host.jqxSortable('enable');
   }
   refresh(): void {
      this.host.jqxSortable('refresh');
   }
   refreshPositions(): void {
      this.host.jqxSortable('refreshPositions');
   }
   serialize(): void {
      this.host.jqxSortable('serialize');
   }
   toArray(): void {
      this.host.jqxSortable('toArray');
   }

   // jqxSortableComponent events
   @Output() OnActivate = new EventEmitter();
   @Output() OnBeforeStop = new EventEmitter();
   @Output() OnChange = new EventEmitter();
   @Output() OnCreate = new EventEmitter();
   @Output() OnDeactivate = new EventEmitter();
   @Output() OnOut = new EventEmitter();
   @Output() OnOver = new EventEmitter();
   @Output() OnReceive = new EventEmitter();
   @Output() OnRemove = new EventEmitter();
   @Output() OnSort = new EventEmitter();
   @Output() OnStart = new EventEmitter();
   @Output() OnStop = new EventEmitter();
   @Output() OnUpdate = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('activate', function(eventData) { if (self.OnActivate)    self.OnActivate.next(eventData); });
      this.host.bind('beforeStop', function(eventData) { if (self.OnBeforeStop)    self.OnBeforeStop.next(eventData); });
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('create', function(eventData) { if (self.OnCreate)    self.OnCreate.next(eventData); });
      this.host.bind('deactivate', function(eventData) { if (self.OnDeactivate)    self.OnDeactivate.next(eventData); });
      this.host.bind('out', function(eventData) { if (self.OnOut)    self.OnOut.next(eventData); });
      this.host.bind('over', function(eventData) { if (self.OnOver)    self.OnOver.next(eventData); });
      this.host.bind('receive', function(eventData) { if (self.OnReceive)    self.OnReceive.next(eventData); });
      this.host.bind('remove', function(eventData) { if (self.OnRemove)    self.OnRemove.next(eventData); });
      this.host.bind('sort', function(eventData) { if (self.OnSort)    self.OnSort.next(eventData); });
      this.host.bind('start', function(eventData) { if (self.OnStart)    self.OnStart.next(eventData); });
      this.host.bind('stop', function(eventData) { if (self.OnStop)    self.OnStop.next(eventData); });
      this.host.bind('update', function(eventData) { if (self.OnUpdate)    self.OnUpdate.next(eventData); });
   }

} //jqxSortableComponent
