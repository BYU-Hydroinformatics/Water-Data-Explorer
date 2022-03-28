/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularListBox',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxListBoxComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxListBox;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxListBox', options);
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
                    this.host.jqxListBox(i, changes[i].currentValue);
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
        this.host.jqxListBox('setOptions', options);
    }

    // jqxListBoxComponent properties
    @Input('autoHeight') autoHeight: boolean;
    @Input('allowDrag') allowDrag: boolean;
    @Input('allowDrop') allowDrop: boolean;
    @Input('checkboxes') checkboxes: boolean;
    @Input('disabled') disabled: boolean;
    @Input('displayMember') displayMember: String | Number;
    @Input('dropAction') dropAction: string;
    @Input('dragStart') dragStart: (item: any) => Boolean;
    @Input('dragEnd') dragEnd: (dragItem: any, dropItem: any) => Boolean;
    @Input('enableHover') enableHover: boolean;
    @Input('enableSelection') enableSelection: boolean;
    @Input('equalItemsWidth') equalItemsWidth: boolean;
    @Input('filterable') filterable: boolean;
    @Input('filterHeight') filterHeight: number;
    @Input('filterDelay') filterDelay: String | Number;
    @Input('filterPlaceHolder') filterPlaceHolder: String | Number;
    @Input('hasThreeStates') hasThreeStates: boolean;
    @Input('itemHeight') itemHeight: number;
    @Input('incrementalSearch') incrementalSearch: boolean;
    @Input('incrementalSearchDelay') incrementalSearchDelay: String | Number;
    @Input('multiple') multiple: boolean;
    @Input('multipleextended') multipleextended: boolean;
    @Input('renderer') renderer: (index: Number, label: String | Number, value: String | Number) => String;
    @Input('rtl') rtl: boolean;
    @Input('selectedIndex') selectedIndex: String | Number;
    @Input('source') source: Array<any>;
    @Input('scrollBarSize') scrollBarSize: number;
    @Input('searchMode') searchMode: string;
    @Input('theme') theme: string;
    @Input('valueMember') valueMember: String | Number;

    // jqxListBoxComponent functions
    addItem(Item: any): boolean
    {
        return this.host.jqxListBox('addItem', Item);
    }
    beginUpdate(): void
    {
        this.host.jqxListBox('beginUpdate');
    }
    clear(): void
    {
        this.host.jqxListBox('clear');
    }
    clearSelection(): void
    {
        this.host.jqxListBox('clearSelection');
    }
    checkIndex(Index: number): void
    {
        this.host.jqxListBox('checkIndex', Index);
    }
    checkItem(Item: any): void
    {
        this.host.jqxListBox('checkItem', Item);
    }
    checkAll(): void
    {
        this.host.jqxListBox('checkAll');
    }
    clearFilter(): void
    {
        this.host.jqxListBox('clearFilter');
    }
    destroy(): void
    {
        this.host.jqxListBox('destroy');
    }
    disableItem(Item: any): void
    {
        this.host.jqxListBox('disableItem', Item);
    }
    disableAt(Index: number): void
    {
        this.host.jqxListBox('disableAt', Index);
    }
    enableItem(Item: any): void
    {
        this.host.jqxListBox('enableItem', Item);
    }
    enableAt(Index: String | Number): void
    {
        this.host.jqxListBox('enableAt', Index);
    }
    ensureVisible(item: any): void
    {
        this.host.jqxListBox('ensureVisible', item);
    }
    endUpdate(): void
    {
        this.host.jqxListBox('endUpdate');
    }
    focus(): void
    {
        this.host.jqxListBox('focus');
    }
    getItems(): Array<any>
    {
        return this.host.jqxListBox('getItems');
    }
    getSelectedItems(): Array<any>
    {
        return this.host.jqxListBox('getSelectedItems');
    }
    getCheckedItems(): Array<any>
    {
        return this.host.jqxListBox('getCheckedItems');
    }
    getItem(Index: number): any
    {
        return this.host.jqxListBox('getItem', Index);
    }
    getItemByValue(Item: any): any
    {
        return this.host.jqxListBox('getItemByValue', Item);
    }
    getSelectedItem(): any
    {
        return this.host.jqxListBox('getSelectedItem');
    }
    getSelectedIndex(): number
    {
        return this.host.jqxListBox('getSelectedIndex');
    }
    insertAt(Item: any, Index: String | Number): void
    {
        this.host.jqxListBox('insertAt', Item, Index);
    }
    invalidate(): void
    {
        this.host.jqxListBox('invalidate');
    }
    indeterminateItem(Item: any): void
    {
        this.host.jqxListBox('indeterminateItem', Item);
    }
    indeterminateIndex(Index: number): void
    {
        this.host.jqxListBox('indeterminateIndex', Index);
    }
    removeItem(Item: any): void
    {
        this.host.jqxListBox('removeItem', Item);
    }
    removeAt(Index: String | Number): void
    {
        this.host.jqxListBox('removeAt', Index);
    }
    render(): void
    {
        this.host.jqxListBox('render');
    }
    refresh(): void
    {
        this.host.jqxListBox('refresh');
    }
    selectItem(Item: any): void
    {
        this.host.jqxListBox('selectItem', Item);
    }
    selectIndex(Index: String | Number): void
    {
        this.host.jqxListBox('selectIndex', Index);
    }
    updateItem(Item: any, Value: String | Number): void
    {
        this.host.jqxListBox('updateItem', Item, Value);
    }
    updateAt(item: any, index: String | Number): void
    {
        this.host.jqxListBox('updateAt', item, index);
    }
    unselectIndex(index: String | Number): void
    {
        this.host.jqxListBox('unselectIndex', index);
    }
    unselectItem(item: any): void
    {
        this.host.jqxListBox('unselectItem', item);
    }
    uncheckIndex(index: String | Number): void
    {
        this.host.jqxListBox('uncheckIndex', index);
    }
    uncheckItem(item: any): void
    {
        this.host.jqxListBox('uncheckItem', item);
    }
    uncheckAll(): void
    {
        this.host.jqxListBox('uncheckAll');
    }
    val(value?: String | Number): string
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxListBox('val', value);
        } else
        {
            return this.host.jqxListBox('val');
        }
    }

    // jqxListBoxComponent events
    @Output() OnBindingComplete = new EventEmitter();
    @Output() OnChange = new EventEmitter();
    @Output() OnCheckChange = new EventEmitter();
    @Output() OnDragStart = new EventEmitter();
    @Output() OnDragEnd = new EventEmitter();
    @Output() OnSelect = new EventEmitter();
    @Output() OnUnselect = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('bindingComplete', function (eventData) { if (self.OnBindingComplete) self.OnBindingComplete.next(eventData); });
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
        this.host.bind('checkChange', function (eventData) { if (self.OnCheckChange) self.OnCheckChange.next(eventData); });
        this.host.bind('dragStart', function (eventData) { if (self.OnDragStart) self.OnDragStart.next(eventData); });
        this.host.bind('dragEnd', function (eventData) { if (self.OnDragEnd) self.OnDragEnd.next(eventData); });
        this.host.bind('select', function (eventData) { if (self.OnSelect) self.OnSelect.next(eventData); });
        this.host.bind('unselect', function (eventData) { if (self.OnUnselect) self.OnUnselect.next(eventData); });
    }

} //jqxListBoxComponent