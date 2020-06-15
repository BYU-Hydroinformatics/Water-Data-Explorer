/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularFormattedInput',
    template: '<div><input /><ng-content></ng-content></div>'
})

export class jqxFormattedInputComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxFormattedInput;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxFormattedInput', options);
            this.__wireEvents__();
            this.__updateRect__();

            return true;
        }
        return false;
    }

    ngAfterViewInit()
    {
        //if (!this.isHostReady())
        //   this.initHost();
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
                    this.host.jqxFormattedInput(i, changes[i].currentValue);
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
        this.host.jqxFormattedInput('setOptions', options);
    }

    // jqxFormattedInputComponent properties
    @Input('disabled') disabled: boolean;
    @Input('decimalNotation') decimalNotation: string;
    @Input('dropDown') dropDown: boolean;
    @Input('dropDownWidth') dropDownWidth: any;
    @Input('min') min: string;
    @Input('max') max: string;
    @Input('placeHolder') placeHolder: string;
    @Input('popupZIndex') popupZIndex: number;
    @Input('roundedCorners') roundedCorners: boolean;
    @Input('rtl') rtl: boolean;
    @Input('radix') radix: any;
    @Input('spinButtons') spinButtons: boolean;
    @Input('spinButtonsStep') spinButtonsStep: number;
    @Input('template') template: string;
    @Input('theme') theme: string;
    @Input('upperCase') upperCase: boolean;
    @Input('value') value: string;

    // jqxFormattedInputComponent functions
    close(): void
    {
        this.host.jqxFormattedInput('close');
    }
    destroy(): void
    {
        this.host.jqxFormattedInput('destroy');
    }
    focus(): void
    {
        this.host.jqxFormattedInput('focus');
    }
    open(): void
    {
        this.host.jqxFormattedInput('open');
    }
    render(): void
    {
        this.host.jqxFormattedInput('render');
    }
    refresh(): void
    {
        this.host.jqxFormattedInput('refresh');
    }
    selectAll(): void
    {
        this.host.jqxFormattedInput('selectAll');
    }
    selectFirst(): void
    {
        this.host.jqxFormattedInput('selectFirst');
    }
    selectLast(): void
    {
        this.host.jqxFormattedInput('selectLast');
    }
    val(value?: String | Number): any
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxFormattedInput('val', value);
        } else
        {
            return this.host.jqxFormattedInput('val');
        }
    }

    // jqxFormattedInputComponent events
    @Output() OnChange = new EventEmitter();
    @Output() OnClose = new EventEmitter();
    @Output() OnOpen = new EventEmitter();
    @Output() OnRadixChange = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
        this.host.bind('close', function (eventData) { if (self.OnClose) self.OnClose.next(eventData); });
        this.host.bind('open', function (eventData) { if (self.OnOpen) self.OnOpen.next(eventData); });
        this.host.bind('radixChange', function (eventData) { if (self.OnRadixChange) self.OnRadixChange.next(eventData); });
    }

} //jqxFormattedInputComponent
