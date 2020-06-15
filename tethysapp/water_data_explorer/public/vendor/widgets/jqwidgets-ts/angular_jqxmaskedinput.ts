/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularMaskedInput',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxMaskedInputComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxMaskedInput;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxMaskedInput', options);
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
                    this.host.jqxMaskedInput(i, changes[i].currentValue);
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
        this.host.jqxMaskedInput('setOptions', options);
    }

    // jqxMaskedInputComponent properties
    @Input('disabled') disabled: boolean;
    @Input('mask') mask: string;
    @Input('promptChar') promptChar: String | Number;
    @Input('readOnly') readOnly: boolean;
    @Input('rtl') rtl: boolean;
    @Input('theme') theme: string;
    @Input('textAlign') textAlign: string;
    @Input('value') value: String | Number;

    // jqxMaskedInputComponent functions
    clear(): void
    {
        this.host.jqxMaskedInput('clear');
    }
    destroy(): void
    {
        this.host.jqxMaskedInput('destroy');
    }
    focus(): void
    {
        this.host.jqxMaskedInput('focus');
    }
    val(value?: String | Number): string
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxMaskedInput('val', value);
        } else
        {
            return this.host.jqxMaskedInput('val');
        }
    }

    // jqxMaskedInputComponent events
    @Output() OnChange = new EventEmitter();
    @Output() OnValueChanged = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
        this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged) self.OnValueChanged.next(eventData); });
    }

} //jqxMaskedInputComponent