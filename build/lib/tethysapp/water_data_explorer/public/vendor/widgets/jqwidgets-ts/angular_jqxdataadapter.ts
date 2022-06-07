/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularDataAdapter',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDataAdapterComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxDataAdapter;

   constructor(containerElement: ElementRef) {
      this.elementRef = containerElement;
   }

   isHostReady()
   {
       return (this.host !== undefined && this.host.length == 1);
   }

   initHost()
   {
       if (this.isHostReady())
          return true;
       this.host = $(this.elementRef.nativeElement.firstChild);
       if (this.isHostReady())
       {
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDataAdapter' );
          this.__wireEvents__();
          this.__updateRect__();

          return true;
       }
       return false;
   }

   ngAfterViewInit() {
      if (!this.isHostReady())
         this.initHost();
   }

   __updateRect__() : void {
      this.host.css({width: this.width, height: this.height});
   }

   ngOnChanges(changes: {[propName: string]: SimpleChange}) {
      if (!this.isHostReady())
      {
         if (!this.initHost())
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
                   this.host.jqxDataAdapter(i, changes[i].currentValue);
               }
               catch(e)
               {
                   console.log(e);
               }
           }
       }
       this.__updateRect__();
   }

   setOptions(options: any) : void {
      this.host.jqxDataAdapter('setOptions', options);
   }

   // jqxDataAdapterComponent properties
   @Input('columnDelimiter') columnDelimiter : string;
   @Input('datafields') datafields : Array<jqwidgets.DataAdapterDataFields>;
   @Input('data') data : jqwidgets.DataAdapterData;
   @Input('datatype') datatype : string;
   @Input('type') type : string;
   @Input('id') id : string;
   @Input('localdata') localdata : any;
   @Input('mapChar') mapChar : string;
   @Input('rowDelimiter') rowDelimiter : string;
   @Input('root') root : string;
   @Input('record') record : string;
   @Input('url') url : string;
   @Input('async') async : boolean;
   @Input('autoBind') autoBind : boolean;
   @Input('beforeSend') beforeSend : (jqXHR:any , settings?:any) => void;
   @Input('beforeLoadComplete') beforeLoadComplete : (records:Array<any> , originalData?:Array<any>) => Array<any>;
   @Input('contentType') contentType : string;
   @Input('formatData') formatData : (data:any) => any;
   @Input('loadError') loadError : (jqXHR?:any, status?: string, error?: String) => void;
   @Input('loadComplete') loadComplete : (records:Array<any>) => void;
   @Input('loadServerData') loadServerData : (serverdata:any, source:any, callback:any) => void;
   @Input('processData') processData : (data:any) => void;
   @Input('beginUpdate') beginUpdate : () => void;
   @Input('dataBind') dataBind : () => void;
   @Input('endUpdate') endUpdate : (automaticDataBind?: boolean ) => void;
   @Input('formatDate') formatDate : (value: any, format:string, calendar:any ) => string;
   @Input('formatNumber') formatNumber : (value: number, format:string, calendar:any ) => string;
   @Input('getRecordsHierarchy') getRecordsHierarchy : (id:number, parentField:number, name?:string, map?:any ) => any[];
   @Input('getGroupedRecords') getGroupedRecords : (groupingFields:Array<any>, items:any, name:string, map:any ) => any[];
   @Input('getAggregatedData') getAggregatedData: (data: Array<jqwidgets.DataAdapterGetAggregatedData>) => any;
   @Input('records') records : Array<any>;

   // jqxDataAdapterComponent functions


   // jqxDataAdapterComponent events


   __wireEvents__(): void {
   var self = this;

   }

} //jqxDataAdapterComponent
