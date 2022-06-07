/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularNotification',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxNotificationComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxNotification;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNotification', options);
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
                    this.host.jqxNotification(i, changes[i].currentValue);
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
        this.host.jqxNotification('setOptions', options);
    }

    // jqxNotificationComponent properties
    @Input('appendContainer') appendContainer: string;
    @Input('autoOpen') autoOpen: boolean;
    @Input('animationOpenDelay') animationOpenDelay: number;
    @Input('animationCloseDelay') animationCloseDelay: number;
    @Input('autoClose') autoClose: boolean;
    @Input('autoCloseDelay') autoCloseDelay: String | Number;
    @Input('blink') blink: boolean;
    @Input('browserBoundsOffset') browserBoundsOffset: number;
    @Input('closeOnClick') closeOnClick: boolean;
    @Input('disabled') disabled: boolean;
    @Input('hoverOpacity') hoverOpacity: number;
    @Input('icon') icon: jqwidgets.NotificationIcon;
    @Input('notificationOffset') notificationOffset: number;
    @Input('opacity') opacity: number;
    @Input('position') position: string;
    @Input('rtl') rtl: boolean;
    @Input('showCloseButton') showCloseButton: boolean;
    @Input('template') template: string;
    @Input('theme') theme: string;

    // jqxNotificationComponent functions
    closeAll(): void
    {
        this.host.jqxNotification('closeAll');
    }
    closeLast(): void
    {
        this.host.jqxNotification('closeLast');
    }
    destroy(): void
    {
        this.host.jqxNotification('destroy');
    }
    open(): void
    {
        this.host.jqxNotification('open');
    }
    refresh(): void
    {
        this.host.jqxNotification('refresh');
    }
    render(): void
    {
        this.host.jqxNotification('render');
    }

    // jqxNotificationComponent events
    @Output() OnClose = new EventEmitter();
    @Output() OnClick = new EventEmitter();
    @Output() OnOpen = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('close', function (eventData) { if (self.OnClose) self.OnClose.next(eventData); });
        this.host.bind('click', function (eventData) { if (self.OnClick) self.OnClick.next(eventData); });
        this.host.bind('open', function (eventData) { if (self.OnOpen) self.OnOpen.next(eventData); });
    }

} //jqxNotificationComponent
