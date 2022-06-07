/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularKanban',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxKanbanComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxKanban;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxKanban', options);
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
                    this.host.jqxKanban(i, changes[i].currentValue);
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
        this.host.jqxKanban('setOptions', options);
    }

    // jqxKanbanComponent properties
    @Input('columnRenderer') columnRenderer: (element?: any, collapsedElement?: any, column?: any) => void;
    @Input('columns') columns: Array<jqwidgets.KanbanColumns>;
    @Input('connectWith') connectWith: string;
    @Input('headerHeight') headerHeight: String | Number;
    @Input('headerWidth') headerWidth: number;
    @Input('itemRenderer') itemRenderer: (element?: Array<any>, item?: any, resource?: any) => void;
    @Input('ready') ready: () => void;
    @Input('rtl') rtl: boolean;
    @Input('source') source: Array<any> | jqwidgets.KanbanSource;
    @Input('resources') resources: Array<any>;
    @Input('template') template: string;
    @Input('templateContent') templateContent: any;
    @Input('theme') theme: string;

    // jqxKanbanComponent functions
    addItem(newItem: any): void
    {
        this.host.jqxKanban('addItem', newItem);
    }
    destroy(): void
    {
        this.host.jqxKanban('destroy');
    }
    getColumn(dataField: string): jqwidgets.KanbanColumns
    {
        return this.host.jqxKanban('getColumn', dataField);
    }
    getColumnItems(dataField: string): Array<jqwidgets.KanbanSource>
    {
        return this.host.jqxKanban('getColumnItems', dataField);
    }
    getItems(): jqwidgets.KanbanSource
    {
        return this.host.jqxKanban('getItems');
    }
    removeItem(itemId: string): void
    {
        this.host.jqxKanban('removeItem', itemId);
    }
    updateItem(itemId: string, newContent: jqwidgets.KanbanUpdateItem): void
    {
        this.host.jqxKanban('updateItem', itemId, newContent);
    }

    // jqxKanbanComponent events
    @Output() OnColumnAttrClicked = new EventEmitter();
    @Output() OnColumnCollapsed = new EventEmitter();
    @Output() OnColumnExpanded = new EventEmitter();
    @Output() OnItemAttrClicked = new EventEmitter();
    @Output() OnItemMoved = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('columnAttrClicked', function (eventData) { if (self.OnColumnAttrClicked) self.OnColumnAttrClicked.next(eventData); });
        this.host.bind('columnCollapsed', function (eventData) { if (self.OnColumnCollapsed) self.OnColumnCollapsed.next(eventData); });
        this.host.bind('columnExpanded', function (eventData) { if (self.OnColumnExpanded) self.OnColumnExpanded.next(eventData); });
        this.host.bind('itemAttrClicked', function (eventData) { if (self.OnItemAttrClicked) self.OnItemAttrClicked.next(eventData); });
        this.host.bind('itemMoved', function (eventData) { if (self.OnItemMoved) self.OnItemMoved.next(eventData); });
    }

} //jqxKanbanComponent