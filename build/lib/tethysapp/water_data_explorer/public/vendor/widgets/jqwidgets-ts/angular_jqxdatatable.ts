/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDataTable',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDataTableComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDataTable;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDataTable', options );
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
                   this.host.jqxDataTable(i, changes[i].currentValue);
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
      this.host.jqxDataTable('setOptions', options);
   }

   // jqxDataTableComponent properties
   @Input('altRows') altRows : boolean;
   @Input('autoRowHeight') autoRowHeight : boolean;
   @Input('aggregatesHeight') aggregatesHeight : number;
   @Input('autoShowLoadElement') autoShowLoadElement : boolean;
   @Input('columnsHeight') columnsHeight : number;
   @Input('columns') columns : Array<jqwidgets.DataTableColumns>;
   @Input('columnGroups') columnGroups : Array<jqwidgets.DataTableColumnGroups>;
   @Input('columnsResize') columnsResize : boolean;
   @Input('columnsReorder') columnsReorder : boolean;
   @Input('disabled') disabled : boolean;
   @Input('editable') editable : boolean;
   @Input('editSettings') editSettings : jqwidgets.DataTableEditSettings;
   @Input('exportSettings') exportSettings : jqwidgets.DataTableExportSettings;
   @Input('enableHover') enableHover : boolean;
   @Input('enableBrowserSelection') enableBrowserSelection : boolean;
   @Input('filterable') filterable : boolean;
   @Input('filterHeight') filterHeight : number;
   @Input('filterMode') filterMode : string;
   @Input('groups') groups : Array<any>;
   @Input('groupsRenderer') groupsRenderer : (value:any, rowData?:any, level?:number) => string;
   @Input('initRowDetails') initRowDetails : (id:number, row?:any, element?:any, rowInfo?:any) => void;
   @Input('incrementalSearch') incrementalSearch : boolean;
   @Input('localization') localization : any;
   @Input('pagerHeight') pagerHeight : number;
   @Input('pageSize') pageSize : number;
   @Input('pageSizeOptions') pageSizeOptions : Array<String>;
   @Input('pageable') pageable : boolean;
   @Input('pagerPosition') pagerPosition : string;
   @Input('pagerMode') pagerMode : string;
   @Input('pagerButtonsCount') pagerButtonsCount : number;
   @Input('pagerRenderer') pagerRenderer : () => any;
   @Input('ready') ready : () => void;
   @Input('rowDetails') rowDetails : boolean;
   @Input('renderToolbar') renderToolbar : (toolbar:any) => void;
   @Input('renderStatusbar') renderStatusbar : (statusbar:any) => void;
   @Input('rendering') rendering : () => void;
   @Input('rendered') rendered : () => void;
   @Input('rtl') rtl : boolean;
   @Input('source') source : any;
   @Input('sortable') sortable : boolean;
   @Input('showAggregates') showAggregates : boolean;
   @Input('showToolbar') showToolbar : boolean;
   @Input('showStatusbar') showStatusbar : boolean;
   @Input('statusBarHeight') statusBarHeight : number;
   @Input('scrollBarSize') scrollBarSize : jqwidgets.Size;
   @Input('selectionMode') selectionMode : string;
   @Input('serverProcessing') serverProcessing : boolean;
   @Input('showHeader') showHeader : boolean;
   @Input('theme') theme : string;
   @Input('toolbarHeight') toolbarHeight : number;

   // jqxDataTableComponent functions
   addRow(rowIndex: number, rowData: any, rowPosition: string): void {
      this.host.jqxDataTable('addRow', rowIndex, rowData, rowPosition);
   }
   addFilter(dataField: string, filerGroup: any): void {
      this.host.jqxDataTable('addFilter', dataField, filerGroup);
   }
   applyFilters(): void {
      this.host.jqxDataTable('applyFilters');
   }
   beginUpdate(): void {
      this.host.jqxDataTable('beginUpdate');
   }
   beginRowEdit(rowIndex: number): void {
      this.host.jqxDataTable('beginRowEdit', rowIndex);
   }
   beginCellEdit(rowIndex: number, dataField: string): void {
      this.host.jqxDataTable('beginCellEdit', rowIndex, dataField);
   }
   clearSelection(): void {
      this.host.jqxDataTable('clearSelection');
   }
   clearFilters(): void {
      this.host.jqxDataTable('clearFilters');
   }
   clear(): void {
      this.host.jqxDataTable('clear');
   }
   destroy(): void {
      this.host.jqxDataTable('destroy');
   }
   deleteRow(rowIndex: number): void {
      this.host.jqxDataTable('deleteRow', rowIndex);
   }
   endUpdate(): void {
      this.host.jqxDataTable('endUpdate');
   }
   ensureRowVisible(rowIndex: number): void {
      this.host.jqxDataTable('ensureRowVisible', rowIndex);
   }
   endRowEdit(rowIndex: number, cancelChanges: boolean): void {
      this.host.jqxDataTable('endRowEdit', rowIndex, cancelChanges);
   }
   endCellEdit(rowIndex: number, dataField: string): void {
      this.host.jqxDataTable('endCellEdit', rowIndex, dataField);
   }
   exportData(exportDataType: string): any {
      return this.host.jqxDataTable('exportData', exportDataType);
   }
   focus(): void {
      this.host.jqxDataTable('focus');
   }
   getColumnProperty(dataField: string, propertyName: string): any {
      return this.host.jqxDataTable('getColumnProperty', dataField, propertyName);
   }
   goToPage(pageIndex: number): void {
      this.host.jqxDataTable('goToPage', pageIndex);
   }
   goToPrevPage(): void {
      this.host.jqxDataTable('goToPrevPage');
   }
   goToNextPage(): void {
      this.host.jqxDataTable('goToNextPage');
   }
   getSelection(): Array<any> {
      return this.host.jqxDataTable('getSelection');
   }
   getRows(): Array<any> {
      return this.host.jqxDataTable('getRows');
   }
   getView(): Array<any> {
      return this.host.jqxDataTable('getView');
   }
   getCellValue(rowIndex: number, dataField: string): any {
      return this.host.jqxDataTable('getCellValue', rowIndex, dataField);
   }
   hideColumn(dataField: string): void {
      this.host.jqxDataTable('hideColumn', dataField);
   }
   hideDetails(rowIndex: boolean): void {
      this.host.jqxDataTable('hideDetails', rowIndex);
   }
   isBindingCompleted(): boolean {
      return this.host.jqxDataTable('isBindingCompleted');
   }
   lockRow(rowIndex: number): void {
      this.host.jqxDataTable('lockRow', rowIndex);
   }
   refresh(): void {
      this.host.jqxDataTable('refresh');
   }
   render(): void {
      this.host.jqxDataTable('render');
   }
   removeFilter(dataField: string): void {
      this.host.jqxDataTable('removeFilter', dataField);
   }
   scrollOffset(top: number, left: number): any {
      return this.host.jqxDataTable('scrollOffset', top, left);
   }
   setColumnProperty(dataField: string, propertyName: string, propertyValue: any): void {
      this.host.jqxDataTable('setColumnProperty', dataField, propertyName, propertyValue);
   }
   showColumn(dataField: string): void {
      this.host.jqxDataTable('showColumn', dataField);
   }
   selectRow(rowIndex: number): void {
      this.host.jqxDataTable('selectRow', rowIndex);
   }
   showDetails(rowIndex: number): void {
      this.host.jqxDataTable('showDetails', rowIndex);
   }
   setCellValue(rowIndex: number, dataField: string, value: any): void {
      this.host.jqxDataTable('setCellValue', rowIndex, dataField, value);
   }
   sortBy(dataField: string, sortOrder: string): void {
      this.host.jqxDataTable('sortBy', dataField, sortOrder);
   }
   updating(): boolean {
      return this.host.jqxDataTable('updating');
   }
   updateBoundData(): void {
      this.host.jqxDataTable('updateBoundData');
   }
   unselectRow(rowIndex: number): void {
      this.host.jqxDataTable('unselectRow', rowIndex);
   }
   updateRow(rowIndex: number, rowData: any): void {
      this.host.jqxDataTable('updateRow', rowIndex, rowData);
   }
   unlockRow(rowIndex: number): void {
      this.host.jqxDataTable('unlockRow', rowIndex);
   }

   // jqxDataTableComponent events
   @Output() OnBindingComplete = new EventEmitter();
   @Output() OnCellBeginEdit = new EventEmitter();
   @Output() OnCellEndEdit = new EventEmitter();
   @Output() OnCellValueChanged = new EventEmitter();
   @Output() OnColumnResized = new EventEmitter();
   @Output() OnColumnReordered = new EventEmitter();
   @Output() OnSort = new EventEmitter();
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

   __wireEvents__(): void {
   var self = this;
      this.host.bind('bindingComplete', function(eventData) { if (self.OnBindingComplete)    self.OnBindingComplete.next(eventData); });
      this.host.bind('cellBeginEdit', function(eventData) { if (self.OnCellBeginEdit)    self.OnCellBeginEdit.next(eventData); });
      this.host.bind('cellEndEdit', function(eventData) { if (self.OnCellEndEdit)    self.OnCellEndEdit.next(eventData); });
      this.host.bind('cellValueChanged', function(eventData) { if (self.OnCellValueChanged)    self.OnCellValueChanged.next(eventData); });
      this.host.bind('columnResized', function(eventData) { if (self.OnColumnResized)    self.OnColumnResized.next(eventData); });
      this.host.bind('columnReordered', function(eventData) { if (self.OnColumnReordered)    self.OnColumnReordered.next(eventData); });
      this.host.bind('sort', function(eventData) { if (self.OnSort)    self.OnSort.next(eventData); });
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
   }

} //jqxDataTableComponent
