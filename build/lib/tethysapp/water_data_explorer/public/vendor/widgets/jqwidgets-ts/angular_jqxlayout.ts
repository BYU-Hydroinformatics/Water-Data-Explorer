/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularLayout',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxLayoutComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxLayout;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLayout', options);
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
                    this.host.jqxLayout(i, changes[i].currentValue);
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
        this.host.jqxLayout('setOptions', options);
    }

    // jqxLayoutComponent properties
    @Input('contextMenu') contextMenu: boolean;
    @Input('layout') layout: Array<jqwidgets.LayoutLayout>;
    @Input('minGroupHeight') minGroupHeight: String | Number;
    @Input('minGroupWidth') minGroupWidth: String | Number;
    @Input('resizable') resizable: boolean;
    @Input('rtl') rtl: boolean;
    @Input('theme') theme: string;

    // jqxLayoutComponent functions
    destroy(): void
    {
        this.host.jqxLayout('destroy');
    }
    loadLayout(Layout: any): void
    {
        this.host.jqxLayout('loadLayout', Layout);
    }
    refresh(): void
    {
        this.host.jqxLayout('refresh');
    }
    render(): void
    {
        this.host.jqxLayout('render');
    }
    saveLayout(): any
    {
        return this.host.jqxLayout('saveLayout');
    }

    // jqxLayoutComponent events
    @Output() OnCreate = new EventEmitter();
    @Output() OnPin = new EventEmitter();
    @Output() OnResize = new EventEmitter();
    @Output() OnUnpin = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('create', function (eventData) { if (self.OnCreate) self.OnCreate.next(eventData); });
        this.host.bind('pin', function (eventData) { if (self.OnPin) self.OnPin.next(eventData); });
        this.host.bind('resize', function (eventData) { if (self.OnResize) self.OnResize.next(eventData); });
        this.host.bind('unpin', function (eventData) { if (self.OnUnpin) self.OnUnpin.next(eventData); });
    }

} //jqxLayoutComponent
