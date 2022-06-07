/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularListMenu',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxListMenuComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxListMenu;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxListMenu', options);
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
                    this.host.jqxListMenu(i, changes[i].currentValue);
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
        this.host.jqxListMenu('setOptions', options);
    }

    // jqxListMenuComponent properties
    @Input('alwaysShowNavigationArrows') alwaysShowNavigationArrows: boolean;
    @Input('animationType') animationType: string;
    @Input('animationDuration') animationDuration: String | Number;
    @Input('autoSeparators') autoSeparators: boolean;
    @Input('backLabel') backLabel: String | Number;
    @Input('disabled') disabled: boolean;
    @Input('enableScrolling') enableScrolling: boolean;
    @Input('filterCallback') filterCallback: (text: string, seachValue: String | Number) => boolean;
    @Input('headerAnimationDuration') headerAnimationDuration: String | Number;
    @Input('placeHolder') placeHolder: String | Number;
    @Input('readOnly') readOnly: boolean;
    @Input('rtl') rtl: boolean;
    @Input('roundedCorners') roundedCorners: boolean;
    @Input('showNavigationArrows') showNavigationArrows: boolean;
    @Input('showFilter') showFilter: boolean;
    @Input('showHeader') showHeader: boolean;
    @Input('showBackButton') showBackButton: boolean;
    @Input('theme') theme: string;

    // jqxListMenuComponent functions
    back(): void
    {
        this.host.jqxListMenu('back');
    }
    changePage(Item: any): void
    {
        this.host.jqxListMenu('changePage', Item);
    }
    destroy(): void
    {
        this.host.jqxListMenu('destroy');
    }

    // jqxListMenuComponent events


    __wireEvents__(): void
    {
        var self = this;

    }

} //jqxListMenuComponent
