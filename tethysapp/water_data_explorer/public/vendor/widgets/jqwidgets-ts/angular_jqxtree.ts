/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularTree',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTreeComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxTree;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTree', options);
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
                   this.host.jqxTree(i, changes[i].currentValue);
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
      this.host.jqxTree('setOptions', options);
   }

   // jqxTreeComponent properties
   @Input('animationShowDuration') animationShowDuration : number;
   @Input('animationHideDuration') animationHideDuration : number;
   @Input('allowDrag') allowDrag : boolean;
   @Input('allowDrop') allowDrop : boolean;
   @Input('checkboxes') checkboxes : boolean;
   @Input('dragStart') dragStart : (item: any) => Boolean;
   @Input('dragEnd') dragEnd : (dragItem?: any, dropItem?: any, args?: any, dropPosition?: any, tree?: any) => Boolean;
   @Input('disabled') disabled : boolean;
   @Input('easing') easing : string;
   @Input('enableHover') enableHover : boolean;
   @Input('hasThreeStates') hasThreeStates : boolean;
   @Input('incrementalSearch') incrementalSearch : boolean;
   @Input('keyboardNavigation') keyboardNavigation : boolean;
   @Input('rtl') rtl : boolean;
   @Input('source') source : any;
   @Input('toggleIndicatorSize') toggleIndicatorSize : number;
   @Input('toggleMode') toggleMode : string;
   @Input('theme') theme : string;

   // jqxTreeComponent functions
   addBefore(item: any, id: string): void {
      this.host.jqxTree('addBefore', item, id);
   }
   addAfter(item: any, id: string): void {
      this.host.jqxTree('addAfter', item, id);
   }
   addTo(item: any, id: string): void {
      this.host.jqxTree('addTo', item, id);
   }
   clear(): void {
      this.host.jqxTree('clear');
   }
   checkAll(): void {
      this.host.jqxTree('checkAll');
   }
   checkItem(item: any, checked: boolean): void {
      this.host.jqxTree('checkItem', item, checked);
   }
   collapseAll(): void {
      this.host.jqxTree('collapseAll');
   }
   collapseItem(item: any): void {
      this.host.jqxTree('collapseItem', item);
   }
   destroy(): void {
      this.host.jqxTree('destroy');
   }
   disableItem(item: any): void {
      this.host.jqxTree('disableItem', item);
   }
   ensureVisible(item: Object): void {
      this.host.jqxTree('ensureVisible', item);
   }
   enableItem(item: any): void {
      this.host.jqxTree('enableItem', item);
   }
   expandAll(): void {
      this.host.jqxTree('expandAll');
   }
   expandItem(item: any): void {
      this.host.jqxTree('expandItem', item);
   }
   focus(): void {
      this.host.jqxTree('focus');
   }
   getCheckedItems(): Array<jqwidgets.TreeItem> {
      return this.host.jqxTree('getCheckedItems');
   }
   getUncheckedItems(): Array<jqwidgets.TreeItem> {
      return this.host.jqxTree('getUncheckedItems');
   }
   getItems(): Array<jqwidgets.TreeItem> {
      return this.host.jqxTree('getItems');
   }
   getItem(element: any): jqwidgets.TreeItem {
      return this.host.jqxTree('getItem', element);
   }
   getSelectedItem(): Array<jqwidgets.TreeItem> {
      return this.host.jqxTree('getSelectedItem');
   }
   getPrevItem(): Array<jqwidgets.TreeItem> {
      return this.host.jqxTree('getPrevItem');
   }
   getNextItem(): Array<jqwidgets.TreeItem> {
      return this.host.jqxTree('getNextItem');
   }
   hitTest(left: number, top: number): any {
      return this.host.jqxTree('hitTest', left, top);
   }
   removeItem(item: any): void {
      this.host.jqxTree('removeItem', item);
   }
   render(): void {
      this.host.jqxTree('render');
   }
   refresh(): void {
      this.host.jqxTree('refresh');
   }
   selectItem(item: any): void {
      this.host.jqxTree('selectItem', item);
   }
   uncheckAll(): void {
      this.host.jqxTree('uncheckAll');
   }
   uncheckItem(item: any): void {
      this.host.jqxTree('uncheckItem', item);
   }
   updateItem(item: any, newItem: any): void {
      this.host.jqxTree('updateItem', item, newItem);
   }
   val(value?: string): string {
      return this.host.jqxTree('val', value);
   }

   // jqxTreeComponent events
   @Output() OnAdded = new EventEmitter();
   @Output() OnCheckChange = new EventEmitter();
   @Output() OnCollapse = new EventEmitter();
   @Output() OnDragStart = new EventEmitter();
   @Output() OnDragEnd = new EventEmitter();
   @Output() OnExpand = new EventEmitter();
   @Output() OnInitialized = new EventEmitter();
   @Output() OnItemClick = new EventEmitter();
   @Output() OnRemoved = new EventEmitter();
   @Output() OnSelect = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('added', function(eventData) { if (self.OnAdded)    self.OnAdded.next(eventData); });
      this.host.bind('checkChange', function(eventData) { if (self.OnCheckChange)    self.OnCheckChange.next(eventData); });
      this.host.bind('collapse', function(eventData) { if (self.OnCollapse)    self.OnCollapse.next(eventData); });
      this.host.bind('dragStart', function(eventData) { if (self.OnDragStart)    self.OnDragStart.next(eventData); });
      this.host.bind('dragEnd', function(eventData) { if (self.OnDragEnd)    self.OnDragEnd.next(eventData); });
      this.host.bind('expand', function(eventData) { if (self.OnExpand)    self.OnExpand.next(eventData); });
      this.host.bind('initialized', function(eventData) { if (self.OnInitialized)    self.OnInitialized.next(eventData); });
      this.host.bind('itemClick', function(eventData) { if (self.OnItemClick)    self.OnItemClick.next(eventData); });
      this.host.bind('removed', function(eventData) { if (self.OnRemoved)    self.OnRemoved.next(eventData); });
      this.host.bind('select', function(eventData) { if (self.OnSelect)    self.OnSelect.next(eventData); });
   }

} //jqxTreeComponent
