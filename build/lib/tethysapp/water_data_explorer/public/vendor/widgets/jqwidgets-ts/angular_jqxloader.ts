/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularLoader',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxLoaderComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxLoader;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLoader', options);
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
                    this.host.jqxLoader(i, changes[i].currentValue);
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
        this.host.jqxLoader('setOptions', options);
    }

    // jqxLoaderComponent properties
    @Input('autoOpen') autoOpen: boolean;
    @Input('html') html: string;
    @Input('isModal') isModal: boolean;
    @Input('imagePosition') imagePosition: string;
    @Input('rtl') rtl: boolean;
    @Input('text') text: String | Number;
    @Input('textPosition') textPosition: string;
    @Input('theme') theme: string;

    // jqxLoaderComponent functions
    close(): void
    {
        this.host.jqxLoader('close');
    }
    open(): void
    {
        this.host.jqxLoader('open');
    }

    // jqxLoaderComponent events
    @Output() OnCreate = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('create', function (eventData) { if (self.OnCreate) self.OnCreate.next(eventData); });
    }

} //jqxLoaderComponent
