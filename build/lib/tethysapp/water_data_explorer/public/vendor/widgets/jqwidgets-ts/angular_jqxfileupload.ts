/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularFileUpload',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxFileUploadComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxFileUpload;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxFileUpload', options );
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
                   this.host.jqxFileUpload(i, changes[i].currentValue);
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
      this.host.jqxFileUpload('setOptions', options);
   }

   // jqxFileUploadComponent properties
   @Input('autoUpload') autoUpload : boolean;
   @Input('accept') accept : string;
   @Input('browseTemplate') browseTemplate : string;
   @Input('cancelTemplate') cancelTemplate : string;
   @Input('disabled') disabled : boolean;
   @Input('fileInputName') fileInputName : string;
   @Input('localization') localization : jqwidgets.FileUploadLocalization;
   @Input('multipleFilesUpload') multipleFilesUpload : boolean;
   @Input('renderFiles') renderFiles : (filename:any) => void;
   @Input('rtl') rtl : boolean;
   @Input('theme') theme : string;
   @Input('uploadUrl') uploadUrl : string;
   @Input('uploadTemplate') uploadTemplate : string;

   // jqxFileUploadComponent functions
   browse(): void {
      this.host.jqxFileUpload('browse');
   }
   cancelFile(): void {
      this.host.jqxFileUpload('cancelFile');
   }
   cancelAll(): void {
      this.host.jqxFileUpload('cancelAll');
   }
   destroy(): void {
      this.host.jqxFileUpload('destroy');
   }
   render(): void {
      this.host.jqxFileUpload('render');
   }
   refresh(): void {
      this.host.jqxFileUpload('refresh');
   }
   uploadFile(fileIndex: number): void {
      this.host.jqxFileUpload('uploadFile', fileIndex);
   }
   uploadAll(): void {
      this.host.jqxFileUpload('uploadAll');
   }

   // jqxFileUploadComponent events
   @Output() OnRemove = new EventEmitter();
   @Output() OnSelect = new EventEmitter();
   @Output() OnUploadStart = new EventEmitter();
   @Output() OnUploadEnd = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('remove', function(eventData) { if (self.OnRemove)    self.OnRemove.next(eventData); });
      this.host.bind('select', function(eventData) { if (self.OnSelect)    self.OnSelect.next(eventData); });
      this.host.bind('uploadStart', function(eventData) { if (self.OnUploadStart)    self.OnUploadStart.next(eventData); });
      this.host.bind('uploadEnd', function(eventData) { if (self.OnUploadEnd)    self.OnUploadEnd.next(eventData); });
   }

} //jqxFileUploadComponent
