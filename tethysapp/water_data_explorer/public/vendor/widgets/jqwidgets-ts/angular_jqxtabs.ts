/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularTabs',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTabsComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxTabs;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTabs', options );
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
                   this.host.jqxTabs(i, changes[i].currentValue);
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
      this.host.jqxTabs('setOptions', options);
   }

   // jqxTabsComponent properties
   @Input('animationType') animationType : string;
   @Input('autoHeight') autoHeight : boolean;
   @Input('closeButtonSize') closeButtonSize : number;
   @Input('collapsible') collapsible : boolean;
   @Input('contentTransitionDuration') contentTransitionDuration : number;
   @Input('disabled') disabled : boolean;
   @Input('enabledHover') enabledHover : boolean;
   @Input('enableScrollAnimation') enableScrollAnimation : boolean;
   @Input('initTabContent') initTabContent : (tab?: Number) => void;
   @Input('keyboardNavigation') keyboardNavigation : boolean;
   @Input('position') position : string;
   @Input('reorder') reorder : boolean;
   @Input('rtl') rtl : boolean;
   @Input('scrollAnimationDuration') scrollAnimationDuration : number;
   @Input('selectedItem') selectedItem : number;
   @Input('selectionTracker') selectionTracker : boolean;
   @Input('scrollable') scrollable : boolean;
   @Input('scrollPosition') scrollPosition : string;
   @Input('scrollStep') scrollStep : number;
   @Input('showCloseButtons') showCloseButtons : boolean;
   @Input('toggleMode') toggleMode : string;
   @Input('theme') theme : string;

   // jqxTabsComponent functions
   addAt(index: number, title: string, content: string): void {
      this.host.jqxTabs('addAt', index, title, content);
   }
   addFirst(htmlElement: any): void {
      this.host.jqxTabs('addFirst', htmlElement);
   }
   addLast(htmlElement: any): void {
      this.host.jqxTabs('addLast', htmlElement);
   }
   collapse(): void {
      this.host.jqxTabs('collapse');
   }
   disable(): void {
      this.host.jqxTabs('disable');
   }
   disableAt(index: number): void {
      this.host.jqxTabs('disableAt', index);
   }
   destroy(): void {
      this.host.jqxTabs('destroy');
   }
   ensureVisible(index: number): void {
      this.host.jqxTabs('ensureVisible', index);
   }
   enableAt(index: number): void {
      this.host.jqxTabs('enableAt', index);
   }
   expand(): void {
      this.host.jqxTabs('expand');
   }
   enable(): void {
      this.host.jqxTabs('enable');
   }
   focus(): void {
      this.host.jqxTabs('focus');
   }
   getTitleAt(index: number): string {
      return this.host.jqxTabs('getTitleAt', index);
   }
   getContentAt(index: number): any {
      return this.host.jqxTabs('getContentAt', index);
   }
   hideCloseButtonAt(index: number): void {
      this.host.jqxTabs('hideCloseButtonAt', index);
   }
   hideAllCloseButtons(): void {
      this.host.jqxTabs('hideAllCloseButtons');
   }
   length(): number {
      return this.host.jqxTabs('length');
   }
   removeAt(index: number): void {
      this.host.jqxTabs('removeAt', index);
   }
   removeFirst(): void {
      this.host.jqxTabs('removeFirst');
   }
   removeLast(): void {
      this.host.jqxTabs('removeLast');
   }
   select(index: number): void {
      this.host.jqxTabs('select', index);
   }
   setContentAt(index: number, htmlElement: string): void {
      this.host.jqxTabs('setContentAt', index, htmlElement);
   }
   setTitleAt(index: number, htmlElement: string): void {
      this.host.jqxTabs('setTitleAt', index, htmlElement);
   }
   showCloseButtonAt(index: number): void {
      this.host.jqxTabs('showCloseButtonAt', index);
   }
   showAllCloseButtons(): void {
      this.host.jqxTabs('showAllCloseButtons');
   }
   val(value?: string): string {
      return this.host.jqxTabs('val', value);
   }

   // jqxTabsComponent events
   @Output() OnAdd = new EventEmitter();
   @Output() OnCreated = new EventEmitter();
   @Output() OnCollapsed = new EventEmitter();
   @Output() OnDragStart = new EventEmitter();
   @Output() OnDragEnd = new EventEmitter();
   @Output() OnExpanded = new EventEmitter();
   @Output() OnRemoved = new EventEmitter();
   @Output() OnSelecting = new EventEmitter();
   @Output() OnSelected = new EventEmitter();
   @Output() OnTabclick = new EventEmitter();
   @Output() OnUnselecting = new EventEmitter();
   @Output() OnUnselected = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('add', function(eventData) { if (self.OnAdd)    self.OnAdd.next(eventData); });
      this.host.bind('created', function(eventData) { if (self.OnCreated)    self.OnCreated.next(eventData); });
      this.host.bind('collapsed', function(eventData) { if (self.OnCollapsed)    self.OnCollapsed.next(eventData); });
      this.host.bind('dragStart', function(eventData) { if (self.OnDragStart)    self.OnDragStart.next(eventData); });
      this.host.bind('dragEnd', function(eventData) { if (self.OnDragEnd)    self.OnDragEnd.next(eventData); });
      this.host.bind('expanded', function(eventData) { if (self.OnExpanded)    self.OnExpanded.next(eventData); });
      this.host.bind('removed', function(eventData) { if (self.OnRemoved)    self.OnRemoved.next(eventData); });
      this.host.bind('selecting', function(eventData) { if (self.OnSelecting)    self.OnSelecting.next(eventData); });
      this.host.bind('selected', function(eventData) { if (self.OnSelected)    self.OnSelected.next(eventData); });
      this.host.bind('tabclick', function(eventData) { if (self.OnTabclick)    self.OnTabclick.next(eventData); });
      this.host.bind('unselecting', function(eventData) { if (self.OnUnselecting)    self.OnUnselecting.next(eventData); });
      this.host.bind('unselected', function(eventData) { if (self.OnUnselected)    self.OnUnselected.next(eventData); });
   }

} //jqxTabsComponent
