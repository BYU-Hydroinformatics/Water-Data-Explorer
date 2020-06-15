/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularNavBar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxNavBarComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxNavBar;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNavBar', options);
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
                    this.host.jqxNavBar(i, changes[i].currentValue);
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
        this.host.jqxNavBar('setOptions', options);
    }

    // jqxNavBarComponent properties
    @Input('columns') columns: Array<String>;
    @Input('disabled') disabled: boolean;
    @Input('minimized') minimized: boolean;
    @Input('minimizeButtonPosition') minimizeButtonPosition: string;
    @Input('minimizedHeight') minimizedHeight: String | Number;
    @Input('minimizedTitle') minimizedTitle: String | Number;
    @Input('orientation') orientation: string;
    @Input('popupAnimationDelay') popupAnimationDelay: number;
    @Input('rtl') rtl: boolean;
    @Input('selection') selection: boolean;
    @Input('selectedItem') selectedItem: String | Number;
    @Input('theme') theme: string;

    // jqxNavBarComponent functions
    close(): void
    {
        this.host.jqxNavBar('close');
    }
    destroy(): void
    {
        this.host.jqxNavBar('destroy');
    }
    getSelectedIndex(): number
    {
        return this.host.jqxNavBar('getSelectedIndex');
    }
    open(): void
    {
        this.host.jqxNavBar('open');
    }
    selectAt(index: String | Number): void
    {
        this.host.jqxNavBar('selectAt', index);
    }

    // jqxNavBarComponent events
    @Output() OnChange = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
    }

} //jqxNavBarComponent
