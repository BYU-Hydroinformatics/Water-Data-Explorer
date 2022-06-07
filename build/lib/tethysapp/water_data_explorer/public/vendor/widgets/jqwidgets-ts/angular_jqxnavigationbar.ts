/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularNavigationBar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxNavigationBarComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxNavigationBar;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNavigationBar', options);
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
                    this.host.jqxNavigationBar(i, changes[i].currentValue);
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
        this.host.jqxNavigationBar('setOptions', options);
    }

    // jqxNavigationBarComponent properties
    @Input('animationType') animationType: string;
    @Input('arrowPosition') arrowPosition: string;
    @Input('collapseAnimationDuration') collapseAnimationDuration: number;
    @Input('disabled') disabled: boolean;
    @Input('expandAnimationDuration') expandAnimationDuration: number;
    @Input('expandMode') expandMode: string;
    @Input('expandedIndexes') expandedIndexes: Array<Number>;
    @Input('initContent') initContent: (index: number) => void;
    @Input('rtl') rtl: boolean;
    @Input('showArrow') showArrow: boolean;
    @Input('theme') theme: string;
    @Input('toggleMode') toggleMode: string;

    // jqxNavigationBarComponent functions
    add(header: String | Number, content: String | Number): void
    {
        this.host.jqxNavigationBar('add', header, content);
    }
    collapseAt(index: String | Number): void
    {
        this.host.jqxNavigationBar('collapseAt', index);
    }
    disableAt(index: String | Number): void
    {
        this.host.jqxNavigationBar('disableAt', index);
    }
    disable(): void
    {
        this.host.jqxNavigationBar('disable');
    }
    destroy(): void
    {
        this.host.jqxNavigationBar('destroy');
    }
    expandAt(index: String | Number): void
    {
        this.host.jqxNavigationBar('expandAt', index);
    }
    enableAt(index: String | Number): void
    {
        this.host.jqxNavigationBar('enableAt', index);
    }
    enable(): void
    {
        this.host.jqxNavigationBar('enable');
    }
    focus(): void
    {
        this.host.jqxNavigationBar('focus');
    }
    getHeaderContentAt(index: String | Number): void
    {
        this.host.jqxNavigationBar('getHeaderContentAt', index);
    }
    getContentAt(index: String | Number): void
    {
        this.host.jqxNavigationBar('getContentAt', index);
    }
    hideArrowAt(index: String | Number): void
    {
        this.host.jqxNavigationBar('hideArrowAt', index);
    }
    invalidate(): void
    {
        this.host.jqxNavigationBar('invalidate');
    }
    insert(Index: number, header: String | Number, content: String | Number): void
    {
        this.host.jqxNavigationBar('insert', Index, header, content);
    }
    refresh(): void
    {
        this.host.jqxNavigationBar('refresh');
    }
    render(): void
    {
        this.host.jqxNavigationBar('render');
    }
    remove(index: String | Number): void
    {
        this.host.jqxNavigationBar('remove', index);
    }
    setContentAt(index: number, item: String | Number): void
    {
        this.host.jqxNavigationBar('setContentAt', index, item);
    }
    setHeaderContentAt(index: number, item: String | Number): void
    {
        this.host.jqxNavigationBar('setHeaderContentAt', index, item);
    }
    showArrowAt(index: String | Number): void
    {
        this.host.jqxNavigationBar('showArrowAt', index);
    }
    update(index: number, header: String | Number, content: String | Number): void
    {
        this.host.jqxNavigationBar('update', index, header, content);
    }
    val(value?: String | Number): String | Number
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxNavigationBar('val', value);
        } else
        {
            return this.host.jqxNavigationBar('val');
        }
    }

    // jqxNavigationBarComponent events
    @Output() OnCollapsingItem = new EventEmitter();
    @Output() OnCollapsedItem = new EventEmitter();
    @Output() OnExpandingItem = new EventEmitter();
    @Output() OnExpandedItem = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('collapsingItem', function (eventData) { if (self.OnCollapsingItem) self.OnCollapsingItem.next(eventData); });
        this.host.bind('collapsedItem', function (eventData) { if (self.OnCollapsedItem) self.OnCollapsedItem.next(eventData); });
        this.host.bind('expandingItem', function (eventData) { if (self.OnExpandingItem) self.OnExpandingItem.next(eventData); });
        this.host.bind('expandedItem', function (eventData) { if (self.OnExpandedItem) self.OnExpandedItem.next(eventData); });
    }

} //jqxNavigationBarComponent
