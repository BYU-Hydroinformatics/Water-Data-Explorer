/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularProgressBar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxProgressBarComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxProgressBar;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxProgressBar', options);
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
                    this.host.jqxProgressBar(i, changes[i].currentValue);
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
        this.host.jqxProgressBar('setOptions', options);
    }

    // jqxProgressBarComponent properties
    @Input('animationDuration') animationDuration: number;
    @Input('colorRanges') colorRanges: Array<jqwidgets.ProgressBarColorRanges>;
    @Input('disabled') disabled: boolean;
    @Input('layout') layout: string;
    @Input('max') max: String | Number;
    @Input('min') min: String | Number;
    @Input('orientation') orientation: string;
    @Input('rtl') rtl: boolean;
    @Input('renderText') renderText: (text?: String) => String;
    @Input('showText') showText: boolean;
    @Input('template') template: string;
    @Input('theme') theme: string;
    @Input('value') value: String | Number;

    // jqxProgressBarComponent functions
    actualValue(value: String | Number): void
    {
        this.host.jqxProgressBar('actualValue', value);
    }
    destroy(): void
    {
        this.host.jqxProgressBar('destroy');
    }
    val(value?: String | Number): number
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxProgressBar('val', value);
        } else
        {
            return this.host.jqxProgressBar('val');
        }
    }

    // jqxProgressBarComponent events
    @Output() OnComplete = new EventEmitter();
    @Output() OnInvalidvalue = new EventEmitter();
    @Output() OnValueChanged = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('complete', function (eventData) { if (self.OnComplete) self.OnComplete.next(eventData); });
        this.host.bind('invalidvalue', function (eventData) { if (self.OnInvalidvalue) self.OnInvalidvalue.next(eventData); });
        this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged) self.OnValueChanged.next(eventData); });
    }

} //jqxProgressBarComponent
