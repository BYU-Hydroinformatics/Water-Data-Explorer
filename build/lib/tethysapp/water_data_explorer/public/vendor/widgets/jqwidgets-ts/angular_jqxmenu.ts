/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularMenu',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxMenuComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxMenu;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxMenu', options);
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
                    this.host.jqxMenu(i, changes[i].currentValue);
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
        this.host.jqxMenu('setOptions', options);
    }

    // jqxMenuComponent properties
    @Input('animationShowDuration') animationShowDuration: number;
    @Input('animationHideDuration') animationHideDuration: number;
    @Input('animationHideDelay') animationHideDelay: number;
    @Input('animationShowDelay') animationShowDelay: number;
    @Input('autoCloseInterval') autoCloseInterval: number;
    @Input('autoSizeMainItems') autoSizeMainItems: boolean;
    @Input('autoCloseOnClick') autoCloseOnClick: boolean;
    @Input('autoOpenPopup') autoOpenPopup: boolean;
    @Input('autoOpen') autoOpen: boolean;
    @Input('clickToOpen') clickToOpen: boolean;
    @Input('disabled') disabled: boolean;
    @Input('enableHover') enableHover: boolean;
    @Input('easing') easing: string;
    @Input('keyboardNavigation') keyboardNavigation: boolean;
    @Input('minimizeWidth') minimizeWidth: String | Number;
    @Input('mode') mode: string;
    @Input('popupZIndex') popupZIndex: String | Number;
    @Input('rtl') rtl: boolean;
    @Input('showTopLevelArrows') showTopLevelArrows: boolean;
    @Input('source') source: any;
    @Input('theme') theme: string;

    // jqxMenuComponent functions
    closeItem(itemID: String | Number): void
    {
        this.host.jqxMenu('closeItem', itemID);
    }
    close(): void
    {
        this.host.jqxMenu('close');
    }
    disable(itemID: String | Number, value: boolean): void
    {
        this.host.jqxMenu('disable', itemID, value);
    }
    destroy(): void
    {
        this.host.jqxMenu('destroy');
    }
    focus(): void
    {
        this.host.jqxMenu('focus');
    }
    minimize(): void
    {
        this.host.jqxMenu('minimize');
    }
    open(left: number, top: number): void
    {
        this.host.jqxMenu('open', left, top);
    }
    openItem(itemID: String | Number): void
    {
        this.host.jqxMenu('openItem', itemID);
    }
    restore(): void
    {
        this.host.jqxMenu('restore');
    }
    setItemOpenDirection(item: String | Number, horizontaldirection: string, verticaldirection: string): void
    {
        this.host.jqxMenu('setItemOpenDirection', item, horizontaldirection, verticaldirection);
    }

    // jqxMenuComponent events
    @Output() OnClosed = new EventEmitter();
    @Output() OnItemclick = new EventEmitter();
    @Output() OnInitialized = new EventEmitter();
    @Output() OnShown = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('closed', function (eventData) { if (self.OnClosed) self.OnClosed.next(eventData); });
        this.host.bind('itemclick', function (eventData) { if (self.OnItemclick) self.OnItemclick.next(eventData); });
        this.host.bind('initialized', function (eventData) { if (self.OnInitialized) self.OnInitialized.next(eventData); });
        this.host.bind('shown', function (eventData) { if (self.OnShown) self.OnShown.next(eventData); });
    }

} //jqxMenuComponent
