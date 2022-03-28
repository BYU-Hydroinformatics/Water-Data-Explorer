/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularRangeSelector',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxRangeSelectorComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxRangeSelector;

    constructor(containerElement: ElementRef)
    {
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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRangeSelector', options);
            this.__wireEvents__();
            this.__updateRect__();

            return true;
        }
        return false;
    }

    ngAfterViewInit()
    {
        //if (!this.isHostReady())
        //    this.initHost();
    }

    __updateRect__(): void
    {
        this.host.css({ width: this.width, height: this.height });
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange })
    {
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
                    this.host.jqxRangeSelector(i, changes[i].currentValue);
                }
                catch (e)
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
        this.host.jqxRangeSelector('setOptions', options);
    }

    // jqxRangeSelectorComponent properties
    @Input('disabled') disabled: boolean;
    @Input('labelFormat') labelFormat: string;
    @Input('labelsFormatFunction') labelsFormatFunction: (value: any) => string;
    @Input('labelPrecision') labelPrecision: number;
    @Input('moveOnClick') moveOnClick: boolean;
    @Input('markerRenderer') markerRenderer: (value: any, position: string) => String;
    @Input('markerPrecision') markerPrecision: number;
    @Input('majorLabelRenderer') majorLabelRenderer: (value: any, date: any) => String;
    @Input('markerFormat') markerFormat: string;
    @Input('majorTicksInterval') majorTicksInterval: String | Number;
    @Input('minorTicksInterval') minorTicksInterval: number;
    @Input('max') max: String | Number;
    @Input('min') min: String | Number;
    @Input('padding') padding: String | Number;
    @Input('range') range: jqwidgets.RangeSelectorRange;
    @Input('resizable') resizable: boolean;
    @Input('rtl') rtl: boolean;
    @Input('showMinorTicks') showMinorTicks: boolean;
    @Input('snapToTicks') snapToTicks: boolean;
    @Input('showMajorLabels') showMajorLabels: boolean;
    @Input('showMarkers') showMarkers: boolean;
    @Input('theme') theme: string;

    // jqxRangeSelectorComponent functions
    destroy(): void
    {
        this.host.jqxRangeSelector('destroy');
    }
    getRange(): jqwidgets.RangeSelectorGetRange
    {
        return this.host.jqxRangeSelector('getRange');
    }
    render(): void
    {
        this.host.jqxRangeSelector('render');
    }
    refresh(): void
    {
        this.host.jqxRangeSelector('refresh');
    }
    setRange(from: any, to: any): void
    {
        this.host.jqxRangeSelector('setRange', from, to);
    }

    // jqxRangeSelectorComponent events
    @Output() OnChange = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
    }

} //jqxRangeSelectorComponent
