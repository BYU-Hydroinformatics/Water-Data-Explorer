/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularInput',
    template: '<input type="text" />'
})

export class jqxInputComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxInput;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxInput', options);
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
                    this.host.jqxInput(i, changes[i].currentValue);
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
        this.host.jqxInput('setOptions', options);
    }

    // jqxInputComponent properties
    @Input('disabled') disabled: boolean;
    @Input('dropDownWidth') dropDownWidth: String | Number;
    @Input('displayMember') displayMember: string;
    @Input('items') items: number;
    @Input('minLength') minLength: number;
    @Input('maxLength') maxLength: number;
    @Input('opened') opened: boolean;
    @Input('placeHolder') placeHolder: string;
    @Input('popupZIndex') popupZIndex: number;
    @Input('query') query: string;
    @Input('renderer') renderer: (itemValue?: String, inputValue?: String) => String;
    @Input('rtl') rtl: boolean;
    @Input('searchMode') searchMode: string;
    @Input('source') source: Array<String> | any;
    @Input('theme') theme: string;
    @Input('valueMember') valueMember: string;

    // jqxInputComponent functions
    destroy(): void
    {
        this.host.jqxInput('destroy');
    }
    focus(): void
    {
        this.host.jqxInput('focus');
    }
    selectAll(): void
    {
        this.host.jqxInput('selectAll');
    }
    val(value?: String | Number): string
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxInput('val', value);
        } else
        {
            return this.host.jqxInput('val');
        }
    }

    // jqxInputComponent events
    @Output() OnChange = new EventEmitter();
    @Output() OnClose = new EventEmitter();
    @Output() OnOpen = new EventEmitter();
    @Output() OnSelect = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
        this.host.bind('close', function (eventData) { if (self.OnClose) self.OnClose.next(eventData); });
        this.host.bind('open', function (eventData) { if (self.OnOpen) self.OnOpen.next(eventData); });
        this.host.bind('select', function (eventData) { if (self.OnSelect) self.OnSelect.next(eventData); });
    }

} //jqxInputComponent
