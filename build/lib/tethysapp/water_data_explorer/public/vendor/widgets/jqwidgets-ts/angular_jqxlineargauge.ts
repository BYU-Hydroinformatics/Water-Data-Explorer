/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularLinearGauge',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxLinearGaugeComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxLinearGauge;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLinearGauge', options);
            this.__wireEvents__();
            this.__updateRect__();

            return true;
        }
        return false;
    }

    ngAfterViewInit()
    {
        //if (!this.isHostReady())
        //    this.initHost({});
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
                    this.host.jqxLinearGauge(i, changes[i].currentValue);
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
        this.host.jqxLinearGauge('setOptions', options);
    }

    // jqxLinearGaugeComponent properties
    @Input('animationDuration') animationDuration: number;
    @Input('background') background: jqwidgets.LinearGaugeBackground;
    @Input('colorScheme') colorScheme: string;
    @Input('disabled') disabled: boolean;
    @Input('easing') easing: string;
    @Input('int64') int64: boolean;
    @Input('labels') labels: jqwidgets.LinearGaugeLabels;
    @Input('min') min: number;
    @Input('max') max: number;
    @Input('orientation') orientation: string;
    @Input('pointer') pointer: jqwidgets.LinearGaugePointer;
    @Input('rangesOffset') rangesOffset: number;
    @Input('rangeSize') rangeSize: String | Number;
    @Input('ranges') ranges: Array<jqwidgets.LinearGaugeRanges>;
    @Input('showRanges') showRanges: boolean;
    @Input('scaleStyle') scaleStyle: any;
    @Input('scaleLength') scaleLength: String | Number;
    @Input('ticksOffset') ticksOffset: Array<Number | String>;
    @Input('ticksPosition') ticksPosition: string;
    @Input('ticksMinor') ticksMinor: jqwidgets.LinearGaugeTicks;
    @Input('ticksMajor') ticksMajor: jqwidgets.LinearGaugeTicks;
    @Input('value') value: number;

    // jqxLinearGaugeComponent functions
    disable(): void
    {
        return this.host.jqxLinearGauge('disable');
    }
    enable(): void
    {
        return this.host.jqxLinearGauge('enable');
    }
    val(value?: String | Number): number
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxLinearGauge('val', value);
        } else
        {
            return this.host.jqxLinearGauge('val');
        }
    }

    // jqxLinearGaugeComponent events
    @Output() OnValueChanging = new EventEmitter();
    @Output() OnValueChanged = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('valueChanging', function (eventData) { if (self.OnValueChanging) self.OnValueChanging.next(eventData); });
        this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged) self.OnValueChanged.next(eventData); });
    }

} //jqxLinearGaugeComponent
