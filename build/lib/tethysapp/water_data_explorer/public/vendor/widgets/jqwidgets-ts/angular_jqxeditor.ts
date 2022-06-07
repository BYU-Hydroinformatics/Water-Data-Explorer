/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularEditor',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxEditorComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxEditor;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxEditor', options );
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
                   this.host.jqxEditor(i, changes[i].currentValue);
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
      this.host.jqxEditor('setOptions', options);
   }

   // jqxEditorComponent properties
   @Input('createCommand') createCommand : (name:any) => void;
   @Input('disabled') disabled : boolean;
   @Input('editable') editable : boolean;
   @Input('lineBreak') lineBreak : string;
   @Input('localization') localization : jqwidgets.EditorLocalization;
   @Input('pasteMode') pasteMode : string;
   @Input('rtl') rtl : boolean;
   @Input('stylesheets') stylesheets : Array<any>;
   @Input('theme') theme : string;
   @Input('toolbarPosition') toolbarPosition : string;
   @Input('tools') tools : string;

   // jqxEditorComponent functions
   destroy(): void {
      this.host.jqxEditor('destroy');
   }
   focus(): void {
      this.host.jqxEditor('focus');
   }
   print(): void {
      this.host.jqxEditor('print');
   }
   setMode(mode: boolean): void {
      this.host.jqxEditor('setMode', mode);
   }
   val(htmlValue?: string): string {
       if (htmlValue !== undefined)
       {
           return this.host.jqxEditor('val', htmlValue);
       } else
       {
           return this.host.jqxEditor('val');
       }
   }

   // jqxEditorComponent events
   @Output() OnChange = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('change', function(eventData) { if (self.OnChange)    self.OnChange.next(eventData); });
   }

} //jqxEditorComponent
