/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularExpander',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxExpanderComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxExpander;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxExpander', options );
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
                   this.host.jqxExpander(i, changes[i].currentValue);
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
      this.host.jqxExpander('setOptions', options);
   }

   // jqxExpanderComponent properties
   @Input('animationType') animationType : string;
   @Input('arrowPosition') arrowPosition : string;
   @Input('collapseAnimationDuration') collapseAnimationDuration : number;
   @Input('disabled') disabled : boolean;
   @Input('expanded') expanded : boolean;
   @Input('expandAnimationDuration') expandAnimationDuration : number;
   @Input('headerPosition') headerPosition: string;
   @Input('initContent') initContent: () => void;
   @Input('rtl') rtl : boolean;
   @Input('showArrow') showArrow : boolean;
   @Input('theme') theme : string;
   @Input('toggleMode') toggleMode : string;

   // jqxExpanderComponent functions
   collapse(): void {
      this.host.jqxExpander('collapse');
   }
   disable(): void {
      this.host.jqxExpander('disable');
   }
   destroy(): void {
      this.host.jqxExpander('destroy');
   }
   enable(): void {
      this.host.jqxExpander('enable');
   }
   expand(): void {
      this.host.jqxExpander('expand');
   }
   focus(): void {
      this.host.jqxExpander('focus');
   }
   getContent(): string {
      return this.host.jqxExpander('getContent');
   }
   getHeaderContent(): string {
      return this.host.jqxExpander('getHeaderContent');
   }
   invalidate(): void {
      this.host.jqxExpander('invalidate');
   }
   refresh(): void {
      this.host.jqxExpander('refresh');
   }
   render(): void {
      this.host.jqxExpander('render');
   }
   setHeaderContent(headerContent: string): void {
      this.host.jqxExpander('setHeaderContent', headerContent);
   }
   setContent(content: string): void {
      this.host.jqxExpander('setContent', content);
   }

   // jqxExpanderComponent events
   @Output() OnCollapsing = new EventEmitter();
   @Output() OnCollapsed = new EventEmitter();
   @Output() OnExpanding = new EventEmitter();
   @Output() OnExpanded = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('collapsing', function(eventData) { if (self.OnCollapsing)    self.OnCollapsing.next(eventData); });
      this.host.bind('collapsed', function(eventData) { if (self.OnCollapsed)    self.OnCollapsed.next(eventData); });
      this.host.bind('expanding', function(eventData) { if (self.OnExpanding)    self.OnExpanding.next(eventData); });
      this.host.bind('expanded', function(eventData) { if (self.OnExpanded)    self.OnExpanded.next(eventData); });
   }

} //jqxExpanderComponent
