/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularChart',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxChartComponent implements OnChanges
{
   @Input('width') width: any;
   @Input('height') height: any;

   elementRef: ElementRef;
   host;
   widgetObject:  jqwidgets.jqxChart;

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
           this.widgetObject = jqwidgets.createInstance(this.host, 'jqxChart', options );
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

       this.refresh();
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
                   this.host.jqxChart(i, changes[i].currentValue);
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
      this.host.jqxChart('setOptions', options);
   }

   // jqxChartComponent properties
   @Input('title') title : string;
   @Input('description') description : string;
   @Input('source') source : any;
   @Input('showBorderLine') showBorderLine : boolean;
   @Input('borderLineColor') borderLineColor : string;
   @Input('borderLineWidth') borderLineWidth : number;
   @Input('backgroundColor') backgroundColor : string;
   @Input('backgroundImage') backgroundImage : string;
   @Input('showLegend') showLegend : boolean;
   @Input('legendLayout') legendLayout : jqwidgets.ChartLegendLayout;
   @Input('padding') padding : jqwidgets.ChartPadding;
   @Input('titlePadding') titlePadding : jqwidgets.ChartPadding;
   @Input('colorScheme') colorScheme : string;
   @Input('greyScale') greyScale : boolean;
   @Input('showToolTips') showToolTips : boolean;
   @Input('toolTipShowDelay') toolTipShowDelay : number;
   @Input('toolTipHideDelay') toolTipHideDelay : number;
   @Input('toolTipMoveDuration') toolTipMoveDuration : number;
   @Input('rtl') rtl : boolean;
   @Input('enableCrosshairs') enableCrosshairs : boolean;
   @Input('crosshairsColor') crosshairsColor : string;
   @Input('crosshairsDashStyle') crosshairsDashStyle : string;
   @Input('crosshairsLineWidth') crosshairsLineWidth : number;
   @Input('columnSeriesOverlap') columnSeriesOverlap : boolean;
   @Input('enabled') enabled : boolean;
   @Input('enableAnimations') enableAnimations : boolean;
   @Input('animationDuration') animationDuration : number;
   @Input('enableAxisTextAnimation') enableAxisTextAnimation : boolean;
   @Input('renderEngine') renderEngine : string;
   @Input('xAxis') xAxis : jqwidgets.ChartXAxis;
   @Input('valueAxis') valueAxis : jqwidgets.ChartValueAxis;
   @Input('seriesGroups') seriesGroups : Array<jqwidgets.ChartSeriesGroup>;

   // jqxChartComponent functions
   refresh(): void {
      this.host.jqxChart('refresh');
   }
   update(): void {
      this.host.jqxChart('update');
   }
   destroy(): void {
      this.host.jqxChart('destroy');
   }
   addColorScheme(schemeName: string, colors: Array<string>): void {
      this.host.jqxChart('addColorScheme', schemeName, colors);
   }
   removeColorScheme(schemeName: string): void {
      this.host.jqxChart('removeColorScheme', schemeName);
   }
   getItemsCount(groupIndex: number, serieIndex: number): number {
      return this.host.jqxChart('getItemsCount', groupIndex, serieIndex);
   }
   getItemCoord(groupIndex: number, serieIndex: number, itemIndex: number): any {
      return this.host.jqxChart('getItemCoord', groupIndex, serieIndex, itemIndex);
   }
   getXAxisRect(groupIndex: number): jqwidgets.ChartRect {
      return this.host.jqxChart('getXAxisRect', groupIndex);
   }
   getXAxisLabels(groupIndex: number): Array<any> {
      return this.host.jqxChart('getXAxisLabels', groupIndex);
   }
   getValueAxisRect(groupIndex: number): jqwidgets.ChartRect {
      return this.host.jqxChart('getValueAxisRect', groupIndex);
   }
   getValueAxisLabels(groupIndex: number): Array<any> {
      return this.host.jqxChart('getValueAxisLabels', groupIndex);
   }
   getColorScheme(colorScheme: string): Array<string> {
      return this.host.jqxChart('getColorScheme', colorScheme);
   }
   hideSerie(groupIndex: number, serieIndex: number, itemIndex?: number): void {
      this.host.jqxChart('hideSerie', groupIndex, serieIndex, itemIndex);
   }
   showSerie(groupIndex: number, serieIndex: number, itemIndex?: number): void {
      this.host.jqxChart('showSerie', groupIndex, serieIndex, itemIndex);
   }
   hideToolTip(hideDelay: number): void {
      this.host.jqxChart('hideToolTip', hideDelay);
   }
   showToolTip(groupIndex: number, serieIndex: number, itemIndex: number, showDelay?: number, hideDelay?: number): void {
      this.host.jqxChart('showToolTip', groupIndex, serieIndex, itemIndex, showDelay, hideDelay);
   }
   saveAsJPEG(fileName: string, exportServerUrl: string): void {
      this.host.jqxChart('saveAsJPEG', fileName, exportServerUrl);
   }
   saveAsPDF(fileName: string, exportServerUrl: string): void {
      this.host.jqxChart('saveAsPDF', fileName, exportServerUrl);
   }
   getXAxisValue(offset: number, groupIndex: number): any {
      return this.host.jqxChart('getXAxisValue', offset, groupIndex);
   }
   getValueAxisValue(offset: number, groupIndex: number): any {
      return this.host.jqxChart('getValueAxisValue', offset, groupIndex);
   }

   // jqxChartComponent events
   @Output() OnToggle = new EventEmitter();
   @Output() OnClick = new EventEmitter();
   @Output() OnMouseOver = new EventEmitter();
   @Output() OnMouseOut = new EventEmitter();
   @Output() OnRefreshBegin = new EventEmitter();
   @Output() OnRefreshEnd = new EventEmitter();
   @Output() OnRangeSelectionChanging = new EventEmitter();
   @Output() OnRangeSelectionChanged = new EventEmitter();

   __wireEvents__(): void {
   var self = this;
      this.host.bind('toggle', function(eventData) { if (self.OnToggle)    self.OnToggle.next(eventData); });
      this.host.bind('click', function(eventData) { if (self.OnClick)    self.OnClick.next(eventData); });
      this.host.bind('mouseOver', function(eventData) { if (self.OnMouseOver)    self.OnMouseOver.next(eventData); });
      this.host.bind('mouseOut', function(eventData) { if (self.OnMouseOut)    self.OnMouseOut.next(eventData); });
      this.host.bind('refreshBegin', function(eventData) { if (self.OnRefreshBegin)    self.OnRefreshBegin.next(eventData); });
      this.host.bind('refreshEnd', function(eventData) { if (self.OnRefreshEnd)    self.OnRefreshEnd.next(eventData); });
      this.host.bind('rangeSelectionChanging', function(eventData) { if (self.OnRangeSelectionChanging)    self.OnRangeSelectionChanging.next(eventData); });
      this.host.bind('rangeSelectionChanged', function(eventData) { if (self.OnRangeSelectionChanged)    self.OnRangeSelectionChanged.next(eventData); });
   }

} //jqxChartComponent
