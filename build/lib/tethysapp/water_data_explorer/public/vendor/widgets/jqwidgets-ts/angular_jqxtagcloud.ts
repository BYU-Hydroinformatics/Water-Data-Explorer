/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularTagCloud',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTagCloudComponent implements OnChanges  {

   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxTagCloud;

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
          this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTagCloud', options );
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
                   this.host.jqxTagCloud(i, changes[i].currentValue);
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
      this.host.jqxTagCloud('setOptions', options);
   }

   // jqxTagCloudComponent properties
   @Input('alterTextCase') alterTextCase : string;
   @Input('disabled') disabled : boolean;
   @Input('displayLimit') displayLimit : number;
   @Input('displayMember') displayMember : string;
   @Input('displayValue') displayValue : boolean;
   @Input('fontSizeUnit') fontSizeUnit : string;
   @Input('maxColor') maxColor : string;
   @Input('maxFontSize') maxFontSize : number;
   @Input('maxValueToDisplay') maxValueToDisplay : number;
   @Input('minColor') minColor : string;
   @Input('minFontSize') minFontSize : number;
   @Input('minValueToDisplay') minValueToDisplay : number;
   @Input('rtl') rtl : boolean;
   @Input('sortBy') sortBy : string;
   @Input('sortOrder') sortOrder : string;
   @Input('source') source : jqwidgets.TagCloudSource;
   @Input('tagRenderer') tagRenderer : (itemData: jqwidgets.TagCloudItem, minValue: Number, valueRange: Number) => any;
   @Input('takeTopWeightedItems') takeTopWeightedItems : boolean;
   @Input('textColor') textColor : string;
   @Input('urlBase') urlBase : string;
   @Input('urlMember') urlMember : string;
   @Input('valueMember') valueMember : string;

   // jqxTagCloudComponent functions
   destroy(): void {
      this.host.jqxTagCloud('destroy');
   }
   findTagIndex(tag: string): number {
      return this.host.jqxTagCloud('findTagIndex', tag);
   }
   getHiddenTagsList(): Array<any> {
      return this.host.jqxTagCloud('getHiddenTagsList');
   }
   getRenderedTags(): Array<any> {
      return this.host.jqxTagCloud('getRenderedTags');
   }
   getTagsList(): Array<any> {
      return this.host.jqxTagCloud('getTagsList');
   }
   hideItem(index: number): void {
      this.host.jqxTagCloud('hideItem', index);
   }
   insertAt(index: number, item: any): void {
      this.host.jqxTagCloud('insertAt', index, item);
   }
   removeAt(index: number): void {
      this.host.jqxTagCloud('removeAt', index);
   }
   updateAt(index: number, item: any): void {
      this.host.jqxTagCloud('updateAt', index, item);
   }
   showItem(index: number): void {
      this.host.jqxTagCloud('showItem', index);
   }

   // jqxTagCloudComponent events
   @Output() OnBindingComplete = new EventEmitter();
   @Output() OnItemClick = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('bindingComplete', function(eventData) { if (self.OnBindingComplete)    self.OnBindingComplete.next(eventData); });
      this.host.bind('itemClick', function(eventData) { if (self.OnItemClick)    self.OnItemClick.next(eventData); });
   }

} //jqxTagCloudComponent
