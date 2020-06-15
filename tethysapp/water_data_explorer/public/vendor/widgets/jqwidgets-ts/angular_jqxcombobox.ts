/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularComboBox',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxComboBoxComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxComboBox;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxComboBox', options );
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
                   this.host.jqxComboBox(i, changes[i].currentValue);
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
      this.host.jqxComboBox('setOptions', options);
   }

   // jqxComboBoxComponent properties
   @Input('animationType') animationType : string;
   @Input('autoComplete') autoComplete : boolean;
   @Input('autoOpen') autoOpen : boolean;
   @Input('autoItemsHeight') autoItemsHeight : boolean;
   @Input('autoDropDownHeight') autoDropDownHeight : boolean;
   @Input('closeDelay') closeDelay : number;
   @Input('checkboxes') checkboxes : boolean;
   @Input('disabled') disabled : boolean;
   @Input('displayMember') displayMember : string;
   @Input('dropDownHorizontalAlignment') dropDownHorizontalAlignment : string;
   @Input('dropDownVerticalAlignment') dropDownVerticalAlignment : string;
   @Input('dropDownHeight') dropDownHeight : jqwidgets.Size;
   @Input('dropDownWidth') dropDownWidth : jqwidgets.Size;
   @Input('enableHover') enableHover : boolean;
   @Input('enableSelection') enableSelection : boolean;
   @Input('enableBrowserBoundsDetection') enableBrowserBoundsDetection : boolean;
   @Input('itemHeight') itemHeight : number;
   @Input('multiSelect') multiSelect : boolean;
   @Input('minLength') minLength : number;
   @Input('openDelay') openDelay : number;
   @Input('popupZIndex') popupZIndex : number;
   @Input('placeHolder') placeHolder : string;
   @Input('remoteAutoComplete') remoteAutoComplete : boolean;
   @Input('remoteAutoCompleteDelay') remoteAutoCompleteDelay : number;
   @Input('renderer') renderer : (index:number, label?:string, value?:any) => string;
   @Input('renderSelectedItem') renderSelectedItem : (index:number, item?:any) => string;
   @Input('rtl') rtl : boolean;
   @Input('selectedIndex') selectedIndex : number;
   @Input('showArrow') showArrow : boolean;
   @Input('showCloseButtons') showCloseButtons : boolean;
   @Input('searchMode') searchMode : string;
   @Input('search') search : (searchString:string) => void;
   @Input('source') source : Array<any>;
   @Input('scrollBarSize') scrollBarSize : jqwidgets.Size;
   @Input('template') template : string;
   @Input('theme') theme : string;
   @Input('validateSelection') validateSelection : (itemValue:string) => boolean;
   @Input('valueMember') valueMember : string;

   // jqxComboBoxComponent functions
   addItem(item: any): boolean {
      return this.host.jqxComboBox('addItem', item);
   }
   clearSelection(): void {
      this.host.jqxComboBox('clearSelection');
   }
   clear(): void {
      this.host.jqxComboBox('clear');
   }
   close(): void {
      this.host.jqxComboBox('close');
   }
   checkIndex(index: number): void {
      this.host.jqxComboBox('checkIndex', index);
   }
   checkItem(item: any): void {
      this.host.jqxComboBox('checkItem', item);
   }
   checkAll(): void {
      this.host.jqxComboBox('checkAll');
   }
   destroy(): void {
      this.host.jqxComboBox('destroy');
   }
   disableItem(item: any): void {
      this.host.jqxComboBox('disableItem', item);
   }
   disableAt(index: number): void {
      this.host.jqxComboBox('disableAt', index);
   }
   enableItem(item: any): void {
      this.host.jqxComboBox('enableItem', item);
   }
   enableAt(index: number): void {
      this.host.jqxComboBox('enableAt', index);
   }
   ensureVisible(index: number): void {
      this.host.jqxComboBox('ensureVisible', index);
   }
   focus(): void {
      this.host.jqxComboBox('focus');
   }
   getItem(index: number): any {
      return this.host.jqxComboBox('getItem', index);
   }
   getItemByValue(value: string): any {
      return this.host.jqxComboBox('getItemByValue', value);
   }
   getVisibleItems(): Array<any> {
      return this.host.jqxComboBox('getVisibleItems');
   }
   getItems(): Array<any> {
      return this.host.jqxComboBox('getItems');
   }
   getCheckedItems(): Array<any> {
      return this.host.jqxComboBox('getCheckedItems');
   }
   getSelectedItem(): any {
      return this.host.jqxComboBox('getSelectedItem');
   }
   getSelectedItems(): Array<any> {
      return this.host.jqxComboBox('getSelectedItems');
   }
   getSelectedIndex(): number {
      return this.host.jqxComboBox('getSelectedIndex');
   }
   insertAt(item: any, index: number): boolean {
      return this.host.jqxComboBox('insertAt', item, index);
   }
   isOpened(): boolean {
      return this.host.jqxComboBox('isOpened');
   }
   indeterminateIndex(index: number): void {
      this.host.jqxComboBox('indeterminateIndex', index);
   }
   indeterminateItem(item: any): void {
      this.host.jqxComboBox('indeterminateItem', item);
   }
   loadFromSelect(selectTagId: string): void {
      this.host.jqxComboBox('loadFromSelect', selectTagId);
   }
   open(): void {
      this.host.jqxComboBox('open');
   }
   removeItem(item: any): boolean {
      return this.host.jqxComboBox('removeItem', item);
   }
   removeAt(index: number): boolean {
      return this.host.jqxComboBox('removeAt', index);
   }
   selectIndex(index: number): void {
      this.host.jqxComboBox('selectIndex', index);
   }
   selectItem(item: any): void {
      this.host.jqxComboBox('selectItem', item);
   }
   updateItem(item: any, itemValue: string): void {
      this.host.jqxComboBox('updateItem', item, itemValue);
   }
   updateAt(item: any, index: any): void {
      this.host.jqxComboBox('updateAt', item, index);
   }
   unselectIndex(index: number): void {
      this.host.jqxComboBox('unselectIndex', index);
   }
   unselectItem(item: any): void {
      this.host.jqxComboBox('unselectItem', item);
   }
   uncheckIndex(index: number): void {
      this.host.jqxComboBox('uncheckIndex', index);
   }
   uncheckItem(item: any): void {
      this.host.jqxComboBox('uncheckItem', item);
   }
   uncheckAll(): void {
      this.host.jqxComboBox('uncheckAll');
   }
   val(value?: string): string {
       if (value !== undefined)
       {
           return this.host.jqxComboBox('val', value);
       } else
       {
           return this.host.jqxComboBox('val');
       }
   }

   // jqxComboBoxComponent events
   @Output() OnBindingComplete = new EventEmitter();
   @Output() OnCheckChange = new EventEmitter();
   @Output() OnClose = new EventEmitter();
   @Output() OnChange = new EventEmitter();
   @Output() OnOpen = new EventEmitter();
   @Output() OnSelect = new EventEmitter();
   @Output() OnUnselect = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('bindingComplete', function(eventData) { if (self.OnBindingComplete)    self.OnBindingComplete.next(eventData); });
      this.host.bind('checkChange', function(eventData) { if (self.OnCheckChange)    self.OnCheckChange.next(eventData); });
      this.host.bind('close', function(eventData) { if (self.OnClose)    self.OnClose.next(eventData); });
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
      this.host.bind('open', function(eventData) { if (self.OnOpen)    self.OnOpen.next(eventData); });
      this.host.bind('select', function(eventData) { if (self.OnSelect)    self.OnSelect.next(eventData); });
      this.host.bind('unselect', function(eventData) { if (self.OnUnselect)    self.OnUnselect.next(eventData); });
   }

} //jqxComboBoxComponent
