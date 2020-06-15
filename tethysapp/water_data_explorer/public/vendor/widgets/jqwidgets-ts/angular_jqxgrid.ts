/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularGrid',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxGridComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxGrid;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxGrid' , options);
          this.__wireEvents__();
          this.__updateRect__();

          return true;
       }
       return false;
   }

   ngAfterViewInit() {
   //   if (!this.isHostReady())
   //      this.initHost();
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
                   this.host.jqxGrid(i, changes[i].currentValue);
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
   setOptions(options: any): void
   {
      this.host.jqxGrid('setOptions', options);
   }

   // jqxGridComponent properties
   @Input('altrows') altrows : boolean;
   @Input('altstart') altstart : number;
   @Input('altstep') altstep : number;
   @Input('autoshowloadelement') autoshowloadelement : boolean;
   @Input('autoshowfiltericon') autoshowfiltericon : boolean;
   @Input('autoshowcolumnsmenubutton') autoshowcolumnsmenubutton : boolean;
   @Input('clipboard') clipboard : boolean;
   @Input('closeablegroups') closeablegroups : boolean;
   @Input('columnsmenuwidth') columnsmenuwidth : number;
   @Input('columnmenuopening') columnmenuopening : (menu?: any, datafield?: String, height?: Number) => Boolean;
   @Input('columnmenuclosing') columnmenuclosing : (menu?: any, datafield?: String, height?: Number) => Boolean;
   @Input('cellhover') cellhover : (cellhtmlElement?: any, x?: Number, y?: Number) => void;
   @Input('enablekeyboarddelete') enablekeyboarddelete : boolean;
   @Input('enableellipsis') enableellipsis : boolean;
   @Input('enablemousewheel') enablemousewheel : boolean;
   @Input('enableanimations') enableanimations : boolean;
   @Input('enabletooltips') enabletooltips : boolean;
   @Input('enablehover') enablehover : boolean;
   @Input('enablebrowserselection') enablebrowserselection : boolean;
   @Input('everpresentrowposition') everpresentrowposition : string;
   @Input('everpresentrowheight') everpresentrowheight : number;
   @Input('everpresentrowactions') everpresentrowactions : string;
   @Input('everpresentrowactionsmode') everpresentrowactionsmode : string;
   @Input('filterrowheight') filterrowheight : number;
   @Input('filtermode') filtermode : string;
   @Input('groupsrenderer') groupsrenderer : (text?: String, group?: Number, expanded?: Boolean, data?: any) => String;
   @Input('groupcolumnrenderer') groupcolumnrenderer : (text?: String, group?: Number, expanded?: Boolean, data?: any) => String;
   @Input('groupsexpandedbydefault') groupsexpandedbydefault : boolean;
   @Input('handlekeyboardnavigation') handlekeyboardnavigation : (event: any) => Boolean;
   @Input('pagerrenderer') pagerrenderer : () => any[];
   @Input('rtl') rtl : boolean;
   @Input('showdefaultloadelement') showdefaultloadelement : boolean;
   @Input('showfiltercolumnbackground') showfiltercolumnbackground : boolean;
   @Input('showfiltermenuitems') showfiltermenuitems : boolean;
   @Input('showpinnedcolumnbackground') showpinnedcolumnbackground : boolean;
   @Input('showsortcolumnbackground') showsortcolumnbackground : boolean;
   @Input('showsortmenuitems') showsortmenuitems : boolean;
   @Input('showgroupmenuitems') showgroupmenuitems : boolean;
   @Input('showrowdetailscolumn') showrowdetailscolumn : boolean;
   @Input('showheader') showheader : boolean;
   @Input('showgroupsheader') showgroupsheader : boolean;
   @Input('showaggregates') showaggregates : boolean;
   @Input('showeverpresentrow') showeverpresentrow : boolean;
   @Input('showfilterrow') showfilterrow : boolean;
   @Input('showemptyrow') showemptyrow : boolean;
   @Input('showstatusbar') showstatusbar : boolean;
   @Input('statusbarheight') statusbarheight : number;
   @Input('showtoolbar') showtoolbar : boolean;
   @Input('selectionmode') selectionmode : string;
   @Input('theme') theme : string;
   @Input('toolbarheight') toolbarheight : number;
   @Input('autoheight') autoheight : boolean;
   @Input('autorowheight') autorowheight : boolean;
   @Input('columnsheight') columnsheight : number;
   @Input('deferreddatafields') deferreddatafields : Array<String>;
   @Input('groupsheaderheight') groupsheaderheight : number;
   @Input('groupindentwidth') groupindentwidth : number;
   @Input('pagerheight') pagerheight : String | Number;
   @Input('rowsheight') rowsheight : number;
   @Input('scrollbarsize') scrollbarsize : String | Number;
   @Input('scrollmode') scrollmode : string;
   @Input('scrollfeedback') scrollfeedback : (row: any) => String;
   @Input('autosavestate') autosavestate : boolean;
   @Input('autoloadstate') autoloadstate : boolean;
   @Input('columns') columns : Array<jqwidgets.GridColumn>;
   @Input('columngroups') columngroups : Array<any>;
   @Input('columnsmenu') columnsmenu : boolean;
   @Input('columnsresize') columnsresize : boolean;
   @Input('columnsautoresize') columnsautoresize : boolean;
   @Input('columnsreorder') columnsreorder : boolean;
   @Input('disabled') disabled : boolean;
   @Input('editable') editable : boolean;
   @Input('editmode') editmode : string;
   @Input('filter') filter : (cellValue?: any, rowData?: any, dataField?: String, filterGroup?: any, defaultFilterResult?: Boolean) => Boolean | any;
   @Input('filterable') filterable : boolean;
   @Input('groupable') groupable : boolean;
   @Input('groups') groups : Array<String>;
   @Input('horizontalscrollbarstep') horizontalscrollbarstep : number;
   @Input('horizontalscrollbarlargestep') horizontalscrollbarlargestep : number;
   @Input('initrowdetails') initrowdetails : (index?: Number, parentElement?: any, gridElement?: any, datarecord?: any) => void;
   @Input('keyboardnavigation') keyboardnavigation : boolean;
   @Input('pagesize') pagesize : number;
   @Input('pagesizeoptions') pagesizeoptions : Array<String | Number>;
   @Input('pagermode') pagermode : string;
   @Input('pagerbuttonscount') pagerbuttonscount : number;
   @Input('pageable') pageable : boolean;
   @Input('rowdetails') rowdetails : boolean;
   @Input('rowdetailstemplate') rowdetailstemplate : any;
   @Input('ready') ready : () => void;
   @Input('rendered') rendered : () => void;
   @Input('renderstatusbar') renderstatusbar : (statusbar?: any) => void;
   @Input('rendertoolbar') rendertoolbar : (toolbar?: any) => void;
   @Input('rendergridrows') rendergridrows : (params?: any) => any;
   @Input('sortable') sortable : boolean;
   @Input('selectedrowindex') selectedrowindex : number;
   @Input('selectedrowindexes') selectedrowindexes : Array<Number>;
   @Input('source') source : jqwidgets.GridSource | any;
   @Input('sorttogglestates') sorttogglestates : string;
   @Input('updatedelay') updatedelay : number;
   @Input('virtualmode') virtualmode : boolean;
   @Input('verticalscrollbarstep') verticalscrollbarstep : number;
   @Input('verticalscrollbarlargestep') verticalscrollbarlargestep : number;

   // jqxGridComponent functions
   autoresizecolumns(type: string): void {
      this.host.jqxGrid('autoresizecolumns', type);
   }
   autoresizecolumn(dataField: string, type: string): void {
      this.host.jqxGrid('autoresizecolumn', dataField, type);
   }
   beginupdate(): void {
      this.host.jqxGrid('beginupdate');
   }
   clear(): void {
      this.host.jqxGrid('clear');
   }
   destroy(): void {
      this.host.jqxGrid('destroy');
   }
   endupdate(): void {
      this.host.jqxGrid('endupdate');
   }
   ensurerowvisible(rowBoundIndex: number): void {
      this.host.jqxGrid('ensurerowvisible', rowBoundIndex);
   }
   focus(): void {
      this.host.jqxGrid('focus');
   }
   getcolumnindex(dataField: string): number {
      return this.host.jqxGrid('getcolumnindex', dataField);
   }
   getcolumn(dataField: string): jqwidgets.GridGetColumn {
      return this.host.jqxGrid('getcolumn', dataField);
   }
   getcolumnproperty(dataField: string, propertyName: string): string {
      return this.host.jqxGrid('getcolumnproperty', dataField, propertyName);
   }
   getrowid(rowBoundIndex: number): string {
      return this.host.jqxGrid('getrowid', rowBoundIndex);
   }
   getrowdata(rowBoundIndex: number): any {
      return this.host.jqxGrid('getrowdata', rowBoundIndex);
   }
   getrowdatabyid(rowID: string): any {
      return this.host.jqxGrid('getrowdatabyid', rowID);
   }
   getrowboundindexbyid(rowID: string): number {
      return this.host.jqxGrid('getrowboundindexbyid', rowID);
   }
   getrowboundindex(rowDisplayIndex: number): number {
      return this.host.jqxGrid('getrowboundindex', rowDisplayIndex);
   }
   getrows(): Array<any> {
      return this.host.jqxGrid('getrows');
   }
   getboundrows(): Array<any> {
      return this.host.jqxGrid('getboundrows');
   }
   getdisplayrows(): Array<any> {
      return this.host.jqxGrid('getdisplayrows');
   }
   getdatainformation(): jqwidgets.GridGetDataInformation {
      return this.host.jqxGrid('getdatainformation');
   }
   getsortinformation(): jqwidgets.GridGetSortInformation {
      return this.host.jqxGrid('getsortinformation');
   }
   getpaginginformation(): jqwidgets.GridGetPagingInformation {
      return this.host.jqxGrid('getpaginginformation');
   }
   hidecolumn(dataField: string): void {
      this.host.jqxGrid('hidecolumn', dataField);
   }
   hideloadelement(): void {
      this.host.jqxGrid('hideloadelement');
   }
   hiderowdetails(rowBoundIndex: number): void {
      this.host.jqxGrid('hiderowdetails', rowBoundIndex);
   }
   iscolumnvisible(dataField: string): boolean {
      return this.host.jqxGrid('iscolumnvisible', dataField);
   }
   iscolumnpinned(dataField: string): boolean {
      return this.host.jqxGrid('iscolumnpinned', dataField);
   }
   localizestrings(localizationObject: jqwidgets.GridLocalizationObject): void {
      this.host.jqxGrid('localizestrings', localizationObject);
   }
   pincolumn(dataField: string): void {
      this.host.jqxGrid('pincolumn', dataField);
   }
   refreshdata(): void {
      this.host.jqxGrid('refreshdata');
   }
   refresh(): void {
      this.host.jqxGrid('refresh');
   }
   render(): void {
      this.host.jqxGrid('render');
   }
   scrolloffset(top: number, left: number): void {
      this.host.jqxGrid('scrolloffset', top, left);
   }
   scrollposition(): jqwidgets.GridScrollPosition {
      return this.host.jqxGrid('scrollposition');
   }
   showloadelement(): void {
      this.host.jqxGrid('showloadelement');
   }
   showrowdetails(rowBoundIndex: number): void {
      this.host.jqxGrid('showrowdetails', rowBoundIndex);
   }
   setcolumnindex(dataField: string, index: number): void {
      this.host.jqxGrid('setcolumnindex', dataField, index);
   }
   setcolumnproperty(dataField: string, propertyName: string, propertyValue: any): void {
      this.host.jqxGrid('setcolumnproperty', dataField, propertyName, propertyValue);
   }
   showcolumn(dataField: string): void {
      this.host.jqxGrid('showcolumn', dataField);
   }
   unpincolumn(dataField: string): void {
      this.host.jqxGrid('unpincolumn', dataField);
   }
   updatebounddata(type?: string): void {
      this.host.jqxGrid('updatebounddata', type);
   }
   updating(): boolean {
      return this.host.jqxGrid('updating');
   }
   getsortcolumn(): string {
      return this.host.jqxGrid('getsortcolumn');
   }
   removesort(): void {
      this.host.jqxGrid('removesort');
   }
   sortby(dataField: string, sortOrder: string): void {
      this.host.jqxGrid('sortby', dataField, sortOrder);
   }
   addgroup(dataField: string): void {
      this.host.jqxGrid('addgroup', dataField);
   }
   cleargroups(): void {
      this.host.jqxGrid('cleargroups');
   }
   collapsegroup(group: String | Number): void {
      this.host.jqxGrid('collapsegroup', group);
   }
   collapseallgroups(): void {
      this.host.jqxGrid('collapseallgroups');
   }
   expandallgroups(): void {
      this.host.jqxGrid('expandallgroups');
   }
   expandgroup(group: String | Number): void {
      this.host.jqxGrid('expandgroup', group);
   }
   getrootgroupscount(): number {
      return this.host.jqxGrid('getrootgroupscount');
   }
   getgroup(groupIndex: number): jqwidgets.GridGetGroup {
      return this.host.jqxGrid('getgroup', groupIndex);
   }
   insertgroup(groupIndex: number, dataField: string): void {
      this.host.jqxGrid('insertgroup', groupIndex, dataField);
   }
   iscolumngroupable(): boolean {
      return this.host.jqxGrid('iscolumngroupable');
   }
   removegroupat(groupIndex: number): void {
      this.host.jqxGrid('removegroupat', groupIndex);
   }
   removegroup(dataField: string): void {
      this.host.jqxGrid('removegroup', dataField);
   }
   addfilter(dataField: string, filterGroup: any, refreshGrid?: boolean): void {
      this.host.jqxGrid('addfilter', dataField, filterGroup, refreshGrid);
   }
   applyfilters(): void {
      this.host.jqxGrid('applyfilters');
   }
   clearfilters(): void {
      this.host.jqxGrid('clearfilters');
   }
   getfilterinformation(): any {
      return this.host.jqxGrid('getfilterinformation');
   }
   removefilter(dataField: string, refreshGrid: boolean): void {
      this.host.jqxGrid('removefilter', dataField, refreshGrid);
   }
   refreshfilterrow(): void {
      this.host.jqxGrid('refreshfilterrow');
   }
   gotopage(pageNumber: number): void {
      this.host.jqxGrid('gotopage', pageNumber);
   }
   gotoprevpage(): void {
      this.host.jqxGrid('gotoprevpage');
   }
   gotonextpage(): void {
      this.host.jqxGrid('gotonextpage');
   }
   addrow(rowIds: any, data: any, rowPosition: string): void {
      this.host.jqxGrid('addrow', rowIds, data, rowPosition);
   }
   begincelledit(rowBoundIndex: number, dataField: string): void {
      this.host.jqxGrid('begincelledit', rowBoundIndex, dataField);
   }
   beginrowedit(rowBoundIndex: number): void {
      this.host.jqxGrid('beginrowedit', rowBoundIndex);
   }
   closemenu(): void {
      this.host.jqxGrid('closemenu');
   }
   deleterow(rowIds: String | Number | Array<String | Number>): void {
      this.host.jqxGrid('deleterow', rowIds);
   }
   endcelledit(rowBoundIndex: number, dataField: string, confirmChanges: boolean): void {
      this.host.jqxGrid('endcelledit', rowBoundIndex, dataField, confirmChanges);
   }
   endrowedit(rowBoundIndex: number, confirmChanges: boolean): void {
      this.host.jqxGrid('endrowedit', rowBoundIndex, confirmChanges);
   }
   getcell(rowBoundIndex: number, datafield: string): jqwidgets.GridGetCell {
      return this.host.jqxGrid('getcell', rowBoundIndex, datafield);
   }
   getcellatposition(left: number, top: number): jqwidgets.GridGetCell {
      return this.host.jqxGrid('getcellatposition', left, top);
   }
   getcelltext(rowBoundIndex: number, dataField: string): string {
      return this.host.jqxGrid('getcelltext', rowBoundIndex, dataField);
   }
   getcelltextbyid(rowID: string, dataField: string): string {
      return this.host.jqxGrid('getcelltextbyid', rowID, dataField);
   }
   getcellvaluebyid(rowID: string, dataField: string): any {
      return this.host.jqxGrid('getcellvaluebyid', rowID, dataField);
   }
   getcellvalue(rowBoundIndex: number, dataField: string): any {
      return this.host.jqxGrid('getcellvalue', rowBoundIndex, dataField);
   }
   isBindingCompleted(): boolean {
      return this.host.jqxGrid('isBindingCompleted');
   }
   openmenu(dataField: string): void {
      this.host.jqxGrid('openmenu', dataField);
   }
   setcellvalue(rowBoundIndex: number, dataField: string, value: any): void {
      this.host.jqxGrid('setcellvalue', rowBoundIndex, dataField, value);
   }
   setcellvaluebyid(rowID: string, dataField: string, value: any): void {
      this.host.jqxGrid('setcellvaluebyid', rowID, dataField, value);
   }
   showvalidationpopup(rowBoundIndex: number, dataField: string, validationMessage: string): void {
      this.host.jqxGrid('showvalidationpopup', rowBoundIndex, dataField, validationMessage);
   }
   updaterow(rowIds: String | Number | Array<String | Number>, data: any): void {
      this.host.jqxGrid('updaterow', rowIds, data);
   }
   clearselection(): void {
      this.host.jqxGrid('clearselection');
   }
   getselectedrowindex(): number {
      return this.host.jqxGrid('getselectedrowindex');
   }
   getselectedrowindexes(): Array<Number> {
      return this.host.jqxGrid('getselectedrowindexes');
   }
   getselectedcell(): jqwidgets.GridGetSelectedCell {
      return this.host.jqxGrid('getselectedcell');
   }
   getselectedcells(): Array<jqwidgets.GridGetSelectedCell> {
      return this.host.jqxGrid('getselectedcells');
   }
   selectcell(rowBoundIndex: number, dataField: string): void {
      this.host.jqxGrid('selectcell', rowBoundIndex, dataField);
   }
   selectallrows(): void {
      this.host.jqxGrid('selectallrows');
   }
   selectrow(rowBoundIndex: number): void {
      this.host.jqxGrid('selectrow', rowBoundIndex);
   }
   unselectrow(rowBoundIndex: number): void {
      this.host.jqxGrid('unselectrow', rowBoundIndex);
   }
   unselectcell(rowBoundIndex: number, dataField: string): void {
      this.host.jqxGrid('unselectcell', rowBoundIndex, dataField);
   }
   getcolumnaggregateddata(dataField: string, aggregates: Array<any>): string {
      return this.host.jqxGrid('getcolumnaggregateddata', dataField, aggregates);
   }
   refreshaggregates(): void {
      this.host.jqxGrid('refreshaggregates');
   }
   renderaggregates(): void {
      this.host.jqxGrid('renderaggregates');
   }
   exportdata(dataType: string, fileName: string, exportHeader: boolean, rows: Array<Number>, exportHiddenColumns: boolean, serverURL: string, charSet: string): void {
      this.host.jqxGrid('exportdata', dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet);
   }
   getstate(): jqwidgets.GridGetState {
      return this.host.jqxGrid('getstate');
   }
   loadstate(stateObject: any): void {
      this.host.jqxGrid('loadstate', stateObject);
   }
   savestate(): jqwidgets.GridGetState {
      return this.host.jqxGrid('savestate');
   }

   // jqxGridComponent events
   @Output() OnBindingcomplete = new EventEmitter();
   @Output() OnColumnresized = new EventEmitter();
   @Output() OnColumnreordered = new EventEmitter();
   @Output() OnColumnclick = new EventEmitter();
   @Output() OnCellclick = new EventEmitter();
   @Output() OnCelldoubleclick = new EventEmitter();
   @Output() OnCellselect = new EventEmitter();
   @Output() OnCellunselect = new EventEmitter();
   @Output() OnCellvaluechanged = new EventEmitter();
   @Output() OnCellbeginedit = new EventEmitter();
   @Output() OnCellendedit = new EventEmitter();
   @Output() OnFilter = new EventEmitter();
   @Output() OnGroupschanged = new EventEmitter();
   @Output() OnGroupexpand = new EventEmitter();
   @Output() OnGroupcollapse = new EventEmitter();
   @Output() OnPagechanged = new EventEmitter();
   @Output() OnPagesizechanged = new EventEmitter();
   @Output() OnRowclick = new EventEmitter();
   @Output() OnRowdoubleclick = new EventEmitter();
   @Output() OnRowselect = new EventEmitter();
   @Output() OnRowunselect = new EventEmitter();
   @Output() OnRowexpand = new EventEmitter();
   @Output() OnRowcollapse = new EventEmitter();
   @Output() OnSort = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('bindingcomplete', function(eventData) { if (self.OnBindingcomplete)    self.OnBindingcomplete.next(eventData); });
      this.host.bind('columnresized', function(eventData) { if (self.OnColumnresized)    self.OnColumnresized.next(eventData); });
      this.host.bind('columnreordered', function(eventData) { if (self.OnColumnreordered)    self.OnColumnreordered.next(eventData); });
      this.host.bind('columnclick', function(eventData) { if (self.OnColumnclick)    self.OnColumnclick.next(eventData); });
      this.host.bind('cellclick', function(eventData) { if (self.OnCellclick)    self.OnCellclick.next(eventData); });
      this.host.bind('celldoubleclick', function(eventData) { if (self.OnCelldoubleclick)    self.OnCelldoubleclick.next(eventData); });
      this.host.bind('cellselect', function(eventData) { if (self.OnCellselect)    self.OnCellselect.next(eventData); });
      this.host.bind('cellunselect', function(eventData) { if (self.OnCellunselect)    self.OnCellunselect.next(eventData); });
      this.host.bind('cellvaluechanged', function(eventData) { if (self.OnCellvaluechanged)    self.OnCellvaluechanged.next(eventData); });
      this.host.bind('cellbeginedit', function(eventData) { if (self.OnCellbeginedit)    self.OnCellbeginedit.next(eventData); });
      this.host.bind('cellendedit', function(eventData) { if (self.OnCellendedit)    self.OnCellendedit.next(eventData); });
      this.host.bind('filter', function(eventData) { if (self.OnFilter)    self.OnFilter.next(eventData); });
      this.host.bind('groupschanged', function(eventData) { if (self.OnGroupschanged)    self.OnGroupschanged.next(eventData); });
      this.host.bind('groupexpand', function(eventData) { if (self.OnGroupexpand)    self.OnGroupexpand.next(eventData); });
      this.host.bind('groupcollapse', function(eventData) { if (self.OnGroupcollapse)    self.OnGroupcollapse.next(eventData); });
      this.host.bind('pagechanged', function(eventData) { if (self.OnPagechanged)    self.OnPagechanged.next(eventData); });
      this.host.bind('pagesizechanged', function(eventData) { if (self.OnPagesizechanged)    self.OnPagesizechanged.next(eventData); });
      this.host.bind('rowclick', function(eventData) { if (self.OnRowclick)    self.OnRowclick.next(eventData); });
      this.host.bind('rowdoubleclick', function(eventData) { if (self.OnRowdoubleclick)    self.OnRowdoubleclick.next(eventData); });
      this.host.bind('rowselect', function(eventData) { if (self.OnRowselect)    self.OnRowselect.next(eventData); });
      this.host.bind('rowunselect', function(eventData) { if (self.OnRowunselect)    self.OnRowunselect.next(eventData); });
      this.host.bind('rowexpand', function(eventData) { if (self.OnRowexpand)    self.OnRowexpand.next(eventData); });
      this.host.bind('rowcollapse', function(eventData) { if (self.OnRowcollapse)    self.OnRowcollapse.next(eventData); });
      this.host.bind('sort', function(eventData) { if (self.OnSort)    self.OnSort.next(eventData); });
   }

} //jqxGridComponent
