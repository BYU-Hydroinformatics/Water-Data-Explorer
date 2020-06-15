/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularGauge',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxGaugeComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxGauge;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxGauge', options);
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
                    this.host.jqxGauge(i, changes[i].currentValue);
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
        this.host.jqxGauge('setOptions', options);
    }

    // jqxGaugeComponent properties
    @Input('animationDuration') animationDuration: String | Number;
    @Input('border') border: jqwidgets.GaugeBorder;
    @Input('caption') caption: jqwidgets.GaugeCaption;
    @Input('cap') cap: jqwidgets.GaugeCap;
    @Input('colorScheme') colorScheme: string;
    @Input('disabled') disabled: boolean;
    @Input('easing') easing: string;
    @Input('endAngle') endAngle: String | Number;
    @Input('int64') int64: boolean;
    @Input('labels') labels: jqwidgets.GaugeLabels;
    @Input('min') min: number;
    @Input('max') max: String | Number;
    @Input('pointer') pointer: jqwidgets.GaugePointer;
    @Input('radius') radius: String | Number;
    @Input('ranges') ranges: Array<jqwidgets.GaugeRanges>;
    @Input('startAngle') startAngle: String | Number;
    @Input('showRanges') showRanges: boolean;
    @Input('style') style: jqwidgets.GaugeStyle;
    @Input('ticksMajor') ticksMajor: jqwidgets.GaugeTicks;
    @Input('ticksMinor') ticksMinor: jqwidgets.GaugeTicks;
    @Input('ticksDistance') ticksDistance: String | Number;
    @Input('value') value: number;

    // jqxGaugeComponent functions
    disable(): void
    {
        this.host.jqxGauge('disable');
    }
    enable(): void
    {
        this.host.jqxGauge('enable');
    }
    val(value?: number): number
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxGauge('val', value);
        } else
        {
            return this.host.jqxGauge('val');
        }
    }

    // jqxGaugeComponent events
    @Output() OnValueChanging = new EventEmitter();
    @Output() OnValueChanged = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('valueChanging', function (eventData) { if (self.OnValueChanging) self.OnValueChanging.next(eventData); });
        this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged) self.OnValueChanged.next(eventData); });
    }

} //jqxGaugeComponent
