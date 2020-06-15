/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDropDownList',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDropDownListComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDropDownList;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDropDownList', options );
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
                   this.host.jqxDropDownList(i, changes[i].currentValue);
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
      this.host.jqxDropDownList('setOptions', options);
   }

   // jqxDropDownListComponent properties
   @Input('autoOpen') autoOpen : boolean;
   @Input('autoDropDownHeight') autoDropDownHeight : boolean;
   @Input('animationType') animationType : string;
   @Input('checkboxes') checkboxes : boolean;
   @Input('closeDelay') closeDelay : number;
   @Input('disabled') disabled : boolean;
   @Input('displayMember') displayMember : string;
   @Input('dropDownHorizontalAlignment') dropDownHorizontalAlignment : string;
   @Input('dropDownHeight') dropDownHeight : any;
   @Input('dropDownWidth') dropDownWidth : any;
   @Input('enableSelection') enableSelection : boolean;
   @Input('enableBrowserBoundsDetection') enableBrowserBoundsDetection : boolean;
   @Input('enableHover') enableHover : boolean;
   @Input('filterable') filterable : boolean;
   @Input('filterHeight') filterHeight : number;
   @Input('filterDelay') filterDelay : number;
   @Input('filterPlaceHolder') filterPlaceHolder : string;
   @Input('incrementalSearch') incrementalSearch : boolean;
   @Input('incrementalSearchDelay') incrementalSearchDelay : number;
   @Input('itemHeight') itemHeight : any;
   @Input('openDelay') openDelay : number;
   @Input('placeHolder') placeHolder : string;
   @Input('popupZIndex') popupZIndex : number;
   @Input('rtl') rtl : boolean;
   @Input('renderer') renderer : (index: Number, label?: String, value?: any) => String;
   @Input('selectionRenderer') selectionRenderer : (object?: any, index?: Number, label?: String) => String;
   @Input('searchMode') searchMode : string;
   @Input('scrollBarSize') scrollBarSize : any;
   @Input('source') source : any;
   @Input('selectedIndex') selectedIndex : number;
   @Input('theme') theme : string;
   @Input('valueMember') valueMember : string;

   // jqxDropDownListComponent functions
   addItem(item: jqwidgets.DropDownListItem): boolean {
      return this.host.jqxDropDownList('addItem', item);
   }
   clearSelection(): void {
      this.host.jqxDropDownList('clearSelection');
   }
   clear(): void {
      this.host.jqxDropDownList('clear');
   }
   close(): void {
      this.host.jqxDropDownList('close');
   }
   checkIndex(index: number): void {
      this.host.jqxDropDownList('checkIndex', index);
   }
   checkItem(item: any): void {
      this.host.jqxDropDownList('checkItem', item);
   }
   checkAll(): void {
      this.host.jqxDropDownList('checkAll');
   }
   clearFilter(): void {
      this.host.jqxDropDownList('clearFilter');
   }
   destroy(): void {
      this.host.jqxDropDownList('destroy');
   }
   disableItem(item: any): void {
      this.host.jqxDropDownList('disableItem', item);
   }
   disableAt(index: number): void {
      this.host.jqxDropDownList('disableAt', index);
   }
   enableItem(item: any): void {
      this.host.jqxDropDownList('enableItem', item);
   }
   enableAt(index: number): void {
      this.host.jqxDropDownList('enableAt', index);
   }
   ensureVisible(index: number): void {
      this.host.jqxDropDownList('ensureVisible', index);
   }
   focus(): void {
      this.host.jqxDropDownList('focus');
   }
   getItem(index: number): jqwidgets.DropDownListItem {
      return this.host.jqxDropDownList('getItem', index);
   }
   getItemByValue(itemValue: string): jqwidgets.DropDownListItem {
      return this.host.jqxDropDownList('getItemByValue', itemValue);
   }
   getItems(): Array<jqwidgets.DropDownListItem> {
      return this.host.jqxDropDownList('getItems');
   }
   getCheckedItems(): Array<jqwidgets.DropDownListItem> {
      return this.host.jqxDropDownList('getCheckedItems');
   }
   getSelectedItem(): jqwidgets.DropDownListItem {
      return this.host.jqxDropDownList('getSelectedItem');
   }
   getSelectedIndex(): number {
      return this.host.jqxDropDownList('getSelectedIndex');
   }
   insertAt(item: jqwidgets.DropDownListItem, index: number): void {
      this.host.jqxDropDownList('insertAt', item, index);
   }
   isOpened(): boolean {
      return this.host.jqxDropDownList('isOpened');
   }
   indeterminateIndex(index: number): void {
      this.host.jqxDropDownList('indeterminateIndex', index);
   }
   indeterminateItem(item: any): void {
      this.host.jqxDropDownList('indeterminateItem', item);
   }
   loadFromSelect(id: string): void {
      this.host.jqxDropDownList('loadFromSelect', id);
   }
   open(): void {
      this.host.jqxDropDownList('open');
   }
   removeItem(item: any): void {
      this.host.jqxDropDownList('removeItem', item);
   }
   removeAt(index: number): void {
      this.host.jqxDropDownList('removeAt', index);
   }
   selectIndex(index: number): void {
      this.host.jqxDropDownList('selectIndex', index);
   }
   selectItem(item: jqwidgets.DropDownListItem): void {
      this.host.jqxDropDownList('selectItem', item);
   }
   setContent(content: string): void {
      this.host.jqxDropDownList('setContent', content);
   }
   updateItem(newItem: jqwidgets.DropDownListItem, item: any): void {
      this.host.jqxDropDownList('updateItem', newItem, item);
   }
   updateAt(item: jqwidgets.DropDownListItem, index: number): void {
      this.host.jqxDropDownList('updateAt', item, index);
   }
   unselectIndex(index: number): void {
      this.host.jqxDropDownList('unselectIndex', index);
   }
   unselectItem(item: any): void {
      this.host.jqxDropDownList('unselectItem', item);
   }
   uncheckIndex(index: number): void {
      this.host.jqxDropDownList('uncheckIndex', index);
   }
   uncheckItem(item: any): void {
      this.host.jqxDropDownList('uncheckItem', item);
   }
   uncheckAll(): void {
      this.host.jqxDropDownList('uncheckAll');
   }
   val(value?: string): string {
       if (value !== undefined)
       {
           return this.host.jqxDropDownList('val', value);
       } else
       {
           return this.host.jqxDropDownList('val');
       }
   }

   // jqxDropDownListComponent events
   @Output() OnBindingComplete = new EventEmitter();
   @Output() OnClose = new EventEmitter();
   @Output() OnCheckChange = new EventEmitter();
   @Output() OnChange = new EventEmitter();
   @Output() OnOpen = new EventEmitter();
   @Output() OnSelect = new EventEmitter();
   @Output() OnUnselect = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('bindingComplete', function(eventData) { if (self.OnBindingComplete)    self.OnBindingComplete.next(eventData); });
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('checkChange', function(eventData) { if (self.OnCheckChange)    self.OnCheckChange.next(eventData); });
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
      this.host.bind('select', function(eventData) { if (self.OnSelect)    self.OnSelect.next(eventData); });
      this.host.bind('unselect', function(eventData) { if (self.OnUnselect)    self.OnUnselect.next(eventData); });
   }

} //jqxDropDownListComponent
