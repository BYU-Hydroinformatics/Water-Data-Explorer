/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularTreeGrid',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTreeGridComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxTreeGrid;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTreeGrid', options );
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
                   this.host.jqxTreeGrid(i, changes[i].currentValue);
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
      this.host.jqxTreeGrid('setOptions', options);
   }

   // jqxTreeGridComponent properties
   @Input('altRows') altRows : boolean;
   @Input('autoRowHeight') autoRowHeight : boolean;
   @Input('aggregatesHeight') aggregatesHeight : number;
   @Input('autoShowLoadElement') autoShowLoadElement : boolean;
   @Input('checkboxes') checkboxes : boolean;
   @Input('columnsHeight') columnsHeight : number;
   @Input('columns') columns : Array<any>;
   @Input('columnGroups') columnGroups : Array<any>;
   @Input('columnsResize') columnsResize : boolean;
   @Input('columnsReorder') columnsReorder : boolean;
   @Input('disabled') disabled : boolean;
   @Input('editable') editable : boolean;
   @Input('editSettings') editSettings : jqwidgets.TreeGridEditSettings;
   @Input('exportSettings') exportSettings : jqwidgets.TreeGridExportSettings;
   @Input('enableHover') enableHover : boolean;
   @Input('enableBrowserSelection') enableBrowserSelection : boolean;
   @Input('filterable') filterable : boolean;
   @Input('filterHeight') filterHeight : number;
   @Input('filterMode') filterMode : string;
   @Input('hierarchicalCheckboxes') hierarchicalCheckboxes : boolean;
   @Input('icons') icons : boolean;
   @Input('incrementalSearch') incrementalSearch : boolean;
   @Input('localization') localization : any;
   @Input('pagerHeight') pagerHeight : number;
   @Input('pageSize') pageSize : number;
   @Input('pageSizeOptions') pageSizeOptions : Array<Number | String>;
   @Input('pageable') pageable : boolean;
   @Input('pagerPosition') pagerPosition : string;
   @Input('pagerMode') pagerMode : string;
   @Input('pageSizeMode') pageSizeMode : string;
   @Input('pagerButtonsCount') pagerButtonsCount : number;
   @Input('pagerRenderer') pagerRenderer : () => any;
   @Input('ready') ready : () => void;
   @Input('rowDetails') rowDetails : boolean;
   @Input('rowDetailsRenderer') rowDetailsRenderer : (key: number, dataRow: number) => any;
   @Input('renderToolbar') renderToolbar : (toolBar?: any) => void;
   @Input('renderStatusbar') renderStatusbar : (statusBar?: any) => void;
   @Input('rendering') rendering : () => void;
   @Input('rendered') rendered : () => void;
   @Input('rtl') rtl : boolean;
   @Input('source') source : any;
   @Input('sortable') sortable : boolean;
   @Input('showAggregates') showAggregates : boolean;
   @Input('showSubAggregates') showSubAggregates : boolean;
   @Input('showToolbar') showToolbar : boolean;
   @Input('showStatusbar') showStatusbar : boolean;
   @Input('statusBarHeight') statusBarHeight : number;
   @Input('scrollBarSize') scrollBarSize : number;
   @Input('selectionMode') selectionMode : string;
   @Input('showHeader') showHeader : boolean;
   @Input('theme') theme : string;
   @Input('toolbarHeight') toolbarHeight : number;
   @Input('virtualModeCreateRecords') virtualModeCreateRecords : (expandedRecord?: any, done?: any) => void;
   @Input('virtualModeRecordCreating') virtualModeRecordCreating : (record?: jqwidgets.VirtualModeRecordCreatingRow) => any;

   // jqxTreeGridComponent functions
   addRow(rowKey: string, rowData: any, rowPosition: string): void {
      this.host.jqxTreeGrid('addRow', rowKey, rowData, rowPosition);
   }
   addFilter(dataField: string, filerGroup: any): void {
      this.host.jqxTreeGrid('addFilter', dataField, filerGroup);
   }
   applyFilters(): void {
      this.host.jqxTreeGrid('applyFilters');
   }
   beginUpdate(): void {
      this.host.jqxTreeGrid('beginUpdate');
   }
   beginRowEdit(rowKey: string): void {
      this.host.jqxTreeGrid('beginRowEdit', rowKey);
   }
   beginCellEdit(rowKey: string, dataField: string): void {
      this.host.jqxTreeGrid('beginCellEdit', rowKey, dataField);
   }
   clearSelection(): void {
      this.host.jqxTreeGrid('clearSelection');
   }
   clearFilters(): void {
      this.host.jqxTreeGrid('clearFilters');
   }
   clear(): void {
      this.host.jqxTreeGrid('clear');
   }
   checkRow(rowKey: string): void {
      this.host.jqxTreeGrid('checkRow', rowKey);
   }
   collapseRow(rowKey: string): void {
      this.host.jqxTreeGrid('collapseRow', rowKey);
   }
   collapseAll(): void {
      this.host.jqxTreeGrid('collapseAll');
   }
   destroy(): void {
      this.host.jqxTreeGrid('destroy');
   }
   deleteRow(rowKey: string): void {
      this.host.jqxTreeGrid('deleteRow', rowKey);
   }
   expandRow(rowKey: String | Number): void {
      this.host.jqxTreeGrid('expandRow', rowKey);
   }
   expandAll(): void {
      this.host.jqxTreeGrid('expandAll');
   }
   endUpdate(): void {
      this.host.jqxTreeGrid('endUpdate');
   }
   ensureRowVisible(rowKey: string): void {
      this.host.jqxTreeGrid('ensureRowVisible', rowKey);
   }
   endRowEdit(rowKey: string, cancelChanges: boolean): void {
      this.host.jqxTreeGrid('endRowEdit', rowKey, cancelChanges);
   }
   endCellEdit(rowKey: string, dataField: string, cancelChanges: boolean): void {
      this.host.jqxTreeGrid('endCellEdit', rowKey, dataField, cancelChanges);
   }
   exportData(exportDataType: string): any {
      return this.host.jqxTreeGrid('exportData', exportDataType);
   }
   focus(): void {
      this.host.jqxTreeGrid('focus');
   }
   getColumnProperty(dataField: string, propertyName: string): any {
      return this.host.jqxTreeGrid('getColumnProperty', dataField, propertyName);
   }
   goToPage(pageIndex: number): void {
      this.host.jqxTreeGrid('goToPage', pageIndex);
   }
   goToPrevPage(): void {
      this.host.jqxTreeGrid('goToPrevPage');
   }
   goToNextPage(): void {
      this.host.jqxTreeGrid('goToNextPage');
   }
   getSelection(): Array<any> {
      return this.host.jqxTreeGrid('getSelection');
   }
   getKey(row: any): string {
      return this.host.jqxTreeGrid('getKey', row);
   }
   getRow(rowKey: string): jqwidgets.TreeGridGetRow {
      return this.host.jqxTreeGrid('getRow', rowKey);
   }
   getRows(): Array<jqwidgets.TreeGridGetRow> {
      return this.host.jqxTreeGrid('getRows');
   }
   getCheckedRows(): Array<jqwidgets.TreeGridGetRow> {
      return this.host.jqxTreeGrid('getCheckedRows');
   }
   getView(): Array<jqwidgets.TreeGridGetRow> {
      return this.host.jqxTreeGrid('getView');
   }
   getCellValue(rowKey: string, dataField: string): any {
      return this.host.jqxTreeGrid('getCellValue', rowKey, dataField);
   }
   hideColumn(dataField: string): void {
      this.host.jqxTreeGrid('hideColumn', dataField);
   }
   isBindingCompleted(): boolean {
      return this.host.jqxTreeGrid('isBindingCompleted');
   }
   lockRow(rowKey: string): void {
      this.host.jqxTreeGrid('lockRow', rowKey);
   }
   refresh(): void {
      this.host.jqxTreeGrid('refresh');
   }
   render(): void {
      this.host.jqxTreeGrid('render');
   }
   removeFilter(dataField: string): void {
      this.host.jqxTreeGrid('removeFilter', dataField);
   }
   scrollOffset(top: number, left: number): jqwidgets.TreeGridScrollOffset {
      return this.host.jqxTreeGrid('scrollOffset', top, left);
   }
   setColumnProperty(dataField: string, propertyName: string, propertyValue: any): void {
      this.host.jqxTreeGrid('setColumnProperty', dataField, propertyName, propertyValue);
   }
   showColumn(dataField: string): void {
      this.host.jqxTreeGrid('showColumn', dataField);
   }
   selectRow(rowId: string): void {
      this.host.jqxTreeGrid('selectRow', rowId);
   }
   setCellValue(rowId: string, dataField: string, cellValue: any): void {
      this.host.jqxTreeGrid('setCellValue', rowId, dataField, cellValue);
   }
   sortBy(dataField: string, sortOrder: string): void {
      this.host.jqxTreeGrid('sortBy', dataField, sortOrder);
   }
   updating(): boolean {
      return this.host.jqxTreeGrid('updating');
   }
   updateBoundData(): void {
      this.host.jqxTreeGrid('updateBoundData');
   }
   unselectRow(rowId: string): void {
      this.host.jqxTreeGrid('unselectRow', rowId);
   }
   uncheckRow(rowId: string): void {
      this.host.jqxTreeGrid('uncheckRow', rowId);
   }
   updateRow(rowId: string, data: any): void {
      this.host.jqxTreeGrid('updateRow', rowId, data);
   }
   unlockRow(rowId: string): void {
      this.host.jqxTreeGrid('unlockRow', rowId);
   }

   // jqxTreeGridComponent events
   @Output() OnBindingComplete = new EventEmitter();
   @Output() OnCellBeginEdit = new EventEmitter();
   @Output() OnCellEndEdit = new EventEmitter();
   @Output() OnCellValueChanged = new EventEmitter();
   @Output() OnColumnResized = new EventEmitter();
   @Output() OnColumnReordered = new EventEmitter();
   @Output() OnFilter = new EventEmitter();
   @Output() OnPageChanged = new EventEmitter();
   @Output() OnPageSizeChanged = new EventEmitter();
   @Output() OnRowClick = new EventEmitter();
   @Output() OnRowDoubleClick = new EventEmitter();
   @Output() OnRowSelect = new EventEmitter();
   @Output() OnRowUnselect = new EventEmitter();
   @Output() OnRowBeginEdit = new EventEmitter();
   @Output() OnRowEndEdit = new EventEmitter();
   @Output() OnRowExpand = new EventEmitter();
   @Output() OnRowCollapse = new EventEmitter();
   @Output() OnRowCheck = new EventEmitter();
   @Output() OnRowUncheck = new EventEmitter();
   @Output() OnSort = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('bindingComplete', function(eventData) { if (self.OnBindingComplete)    self.OnBindingComplete.next(eventData); });
      this.host.bind('cellBeginEdit', function(eventData) { if (self.OnCellBeginEdit)    self.OnCellBeginEdit.next(eventData); });
      this.host.bind('cellEndEdit', function(eventData) { if (self.OnCellEndEdit)    self.OnCellEndEdit.next(eventData); });
      this.host.bind('cellValueChanged', function(eventData) { if (self.OnCellValueChanged)    self.OnCellValueChanged.next(eventData); });
      this.host.bind('columnResized', function(eventData) { if (self.OnColumnResized)    self.OnColumnResized.next(eventData); });
      this.host.bind('columnReordered', function(eventData) { if (self.OnColumnReordered)    self.OnColumnReordered.next(eventData); });
      this.host.bind('filter', function(eventData) { if (self.OnFilter)    self.OnFilter.next(eventData); });
      this.host.bind('pageChanged', function(eventData) { if (self.OnPageChanged)    self.OnPageChanged.next(eventData); });
      this.host.bind('pageSizeChanged', function(eventData) { if (self.OnPageSizeChanged)    self.OnPageSizeChanged.next(eventData); });
      this.host.bind('rowClick', function(eventData) { if (self.OnRowClick)    self.OnRowClick.next(eventData); });
      this.host.bind('rowDoubleClick', function(eventData) { if (self.OnRowDoubleClick)    self.OnRowDoubleClick.next(eventData); });
      this.host.bind('rowSelect', function(eventData) { if (self.OnRowSelect)    self.OnRowSelect.next(eventData); });
      this.host.bind('rowUnselect', function(eventData) { if (self.OnRowUnselect)    self.OnRowUnselect.next(eventData); });
      this.host.bind('rowBeginEdit', function(eventData) { if (self.OnRowBeginEdit)    self.OnRowBeginEdit.next(eventData); });
      this.host.bind('rowEndEdit', function(eventData) { if (self.OnRowEndEdit)    self.OnRowEndEdit.next(eventData); });
      this.host.bind('rowExpand', function(eventData) { if (self.OnRowExpand)    self.OnRowExpand.next(eventData); });
      this.host.bind('rowCollapse', function(eventData) { if (self.OnRowCollapse)    self.OnRowCollapse.next(eventData); });
      this.host.bind('rowCheck', function(eventData) { if (self.OnRowCheck)    self.OnRowCheck.next(eventData); });
      this.host.bind('rowUncheck', function(eventData) { if (self.OnRowUncheck)    self.OnRowUncheck.next(eventData); });
      this.host.bind('sort', function(eventData) { if (self.OnSort)    self.OnSort.next(eventData); });
   }

} //jqxTreeGridComponent
