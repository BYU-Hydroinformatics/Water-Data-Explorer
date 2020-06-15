/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularRadioButton',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxRadioButtonComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxRadioButton;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRadioButton', options);
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
                    this.host.jqxRadioButton(i, changes[i].currentValue);
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
        this.host.jqxRadioButton('setOptions', options);
    }

    // jqxRadioButtonComponent properties
    @Input('animationShowDelay') animationShowDelay: number;
    @Input('animationHideDelay') animationHideDelay: number;
    @Input('boxSize') boxSize: jqwidgets.Size;
    @Input('checked') checked: boolean;
    @Input('disabled') disabled: boolean;
    @Input('enableContainerClick') enableContainerClick: boolean;
    @Input('groupName') groupName: string;
    @Input('hasThreeStates') hasThreeStates: boolean;
    @Input('rtl') rtl: boolean;
    @Input('theme') theme: string;

    // jqxRadioButtonComponent functions
    check(): void
    {
        this.host.jqxRadioButton('check');
    }
    disable(): void
    {
        this.host.jqxRadioButton('disable');
    }
    destroy(): void
    {
        this.host.jqxRadioButton('destroy');
    }
    enable(): void
    {
        this.host.jqxRadioButton('enable');
    }
    focus(): void
    {
        this.host.jqxRadioButton('focus');
    }
    render(): void
    {
        this.host.jqxRadioButton('render');
    }
    uncheck(): void
    {
        this.host.jqxRadioButton('uncheck');
    }
    val(value?: boolean): boolean
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxRadioButton('val', value);
        } else
        {
            return this.host.jqxRadioButton('val');
        }
    }

    // jqxRadioButtonComponent events
    @Output() OnChecked = new EventEmitter();
    @Output() OnChange = new EventEmitter();
    @Output() OnUnchecked = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('checked', function (eventData) { if (self.OnChecked) self.OnChecked.next(eventData); });
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
        this.host.bind('unchecked', function (eventData) { if (self.OnUnchecked) self.OnUnchecked.next(eventData); });
    }

} //jqxRadioButtonComponent