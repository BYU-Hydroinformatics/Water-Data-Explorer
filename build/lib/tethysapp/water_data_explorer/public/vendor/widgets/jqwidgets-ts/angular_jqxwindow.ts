/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularWindow',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxWindowComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxWindow;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxWindow', options);
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
                   this.host.jqxWindow(i, changes[i].currentValue);
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
      this.host.jqxWindow('setOptions', options);
   }

   // jqxWindowComponent properties
   @Input('autoOpen') autoOpen : boolean;
   @Input('animationType') animationType : string;
   @Input('collapsed') collapsed : boolean;
   @Input('collapseAnimationDuration') collapseAnimationDuration : number;
   @Input('content') content : string;
   @Input('closeAnimationDuration') closeAnimationDuration : number;
   @Input('closeButtonSize') closeButtonSize : number;
   @Input('closeButtonAction') closeButtonAction : string;
   @Input('cancelButton') cancelButton : any;
   @Input('dragArea') dragArea : jqwidgets.WindowDragArea;
   @Input('draggable') draggable : boolean;
   @Input('disabled') disabled : boolean;
   @Input('initContent') initContent : () => void;
   @Input('isModal') isModal : boolean;
   @Input('keyboardCloseKey') keyboardCloseKey : String | Number;
   @Input('keyboardNavigation') keyboardNavigation : boolean;
   @Input('minHeight') minHeight : String | Number;
   @Input('maxHeight') maxHeight : String | Number;
   @Input('minWidth') minWidth : String | Number;
   @Input('maxWidth') maxWidth : String | Number;
   @Input('modalOpacity') modalOpacity : number;
   @Input('modalZIndex') modalZIndex : number;
   @Input('modalBackgroundZIndex') modalBackgroundZIndex : number;
   @Input('okButton') okButton : any;
   @Input('position') position : String | any;
   @Input('rtl') rtl : boolean;
   @Input('resizable') resizable : boolean;
   @Input('showAnimationDuration') showAnimationDuration : number;
   @Input('showCloseButton') showCloseButton : boolean;
   @Input('showCollapseButton') showCollapseButton : boolean;
   @Input('theme') theme : string;
   @Input('title') title : string;
   @Input('zIndex') zIndex : number;

   // jqxWindowComponent functions
   bringToFront(): void {
      this.host.jqxWindow('bringToFront');
   }
   close(): void {
      this.host.jqxWindow('close');
   }
   collapse(): void {
      this.host.jqxWindow('collapse');
   }
   closeAll(): void {
      this.host.jqxWindow('closeAll');
   }
   disable(): void {
      this.host.jqxWindow('disable');
   }
   destroy(): void {
      this.host.jqxWindow('destroy');
   }
   enable(): void {
      this.host.jqxWindow('enable');
   }
   expand(): void {
      this.host.jqxWindow('expand');
   }
   focus(): void {
      this.host.jqxWindow('focus');
   }
   isOpen(): boolean {
      return this.host.jqxWindow('isOpen');
   }
   move(top: number, left: number): void {
      this.host.jqxWindow('move', top, left);
   }
   open(): void {
      this.host.jqxWindow('open');
   }
   resize(top: number, left: number): void {
      this.host.jqxWindow('resize', top, left);
   }
   setTitle(title: string): void {
      this.host.jqxWindow('setTitle', title);
   }
   setContent(content: string): void {
      this.host.jqxWindow('setContent', content);
   }

   // jqxWindowComponent events
   @Output() OnClose = new EventEmitter();
   @Output() OnCollapse = new EventEmitter();
   @Output() OnCreated = new EventEmitter();
   @Output() OnExpand = new EventEmitter();
   @Output() OnMoving = new EventEmitter();
   @Output() OnMoved = new EventEmitter();
   @Output() OnOpen = new EventEmitter();
   @Output() OnResizing = new EventEmitter();
   @Output() OnResized = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('collapse', function(eventData) { if (self.OnCollapse)    self.OnCollapse.next(eventData); });
      this.host.bind('created', function(eventData) { if (self.OnCreated)    self.OnCreated.next(eventData); });
      this.host.bind('expand', function(eventData) { if (self.OnExpand)    self.OnExpand.next(eventData); });
      this.host.bind('moving', function(eventData) { if (self.OnMoving)    self.OnMoving.next(eventData); });
      this.host.bind('moved', function(eventData) { if (self.OnMoved)    self.OnMoved.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
      this.host.bind('resizing', function(eventData) { if (self.OnResizing)    self.OnResizing.next(eventData); });
      this.host.bind('resized', function(eventData) { if (self.OnResized)    self.OnResized.next(eventData); });
   }

} //jqxWindowComponent
