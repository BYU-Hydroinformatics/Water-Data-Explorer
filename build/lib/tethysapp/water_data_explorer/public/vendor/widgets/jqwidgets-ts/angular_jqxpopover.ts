/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularPopover',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxPopoverComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxPopover;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPopover', options);
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
                    this.host.jqxPopover(i, changes[i].currentValue);
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
        this.host.jqxPopover('setOptions', options);
    }

    // jqxPopoverComponent properties
    @Input('arrowOffsetValue') arrowOffsetValue: number;
    @Input('animationOpenDelay') animationOpenDelay: string;
    @Input('animationCloseDelay') animationCloseDelay: String | Number;
    @Input('autoClose') autoClose: boolean;
    @Input('animationType') animationType: string;
    @Input('initContent') initContent: () => void;
    @Input('isModal') isModal: boolean;
    @Input('offset') offset: any;
    @Input('position') position: string;
    @Input('rtl') rtl: boolean;
    @Input('selector') selector: string;
    @Input('showArrow') showArrow: boolean;
    @Input('showCloseButton') showCloseButton: boolean;
    @Input('title') title: String | Number;
    @Input('theme') theme: string;

    // jqxPopoverComponent functions
    close(): void
    {
        this.host.jqxPopover('close');
    }
    destroy(): void
    {
        this.host.jqxPopover('destroy');
    }
    open(): void
    {
        this.host.jqxPopover('open');
    }

    // jqxPopoverComponent events
    @Output() OnClose = new EventEmitter();
    @Output() OnOpen = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('close', function (eventData) { if (self.OnClose) self.OnClose.next(eventData); });
        this.host.bind('open', function (eventData) { if (self.OnOpen) self.OnOpen.next(eventData); });
    }

} //jqxPopoverComponent
