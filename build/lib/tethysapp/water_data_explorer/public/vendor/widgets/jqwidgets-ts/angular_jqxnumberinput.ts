/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularNumberInput',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxNumberInputComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxNumberInput;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNumberInput', options);
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
                    this.host.jqxNumberInput(i, changes[i].currentValue);
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
        this.host.jqxNumberInput('setOptions', options);
    }

    // jqxNumberInputComponent properties
    @Input('allowNull') allowNull: boolean;
    @Input('decimal') decimal: String | Number;
    @Input('disabled') disabled: boolean;
    @Input('decimalDigits') decimalDigits: String | Number;
    @Input('decimalSeparator') decimalSeparator: String | Number;
    @Input('digits') digits: String | Number;
    @Input('groupSeparator') groupSeparator: String;
    @Input('groupSize') groupSize: String | Number;
    @Input('inputMode') inputMode: string;
    @Input('min') min: String | Number;
    @Input('max') max: String | Number;
    @Input('negativeSymbol') negativeSymbol: string;
    @Input('placeHolder') placeHolder: String | Number;
    @Input('promptChar') promptChar: string;
    @Input('rtl') rtl: boolean;
    @Input('readOnly') readOnly: boolean;
    @Input('spinMode') spinMode: string;
    @Input('spinButtons') spinButtons: boolean;
    @Input('spinButtonsWidth') spinButtonsWidth: number;
    @Input('spinButtonsStep') spinButtonsStep: String | Number;
    @Input('symbol') symbol: string;
    @Input('symbolPosition') symbolPosition: string;
    @Input('textAlign') textAlign: string;
    @Input('template') template: string;
    @Input('theme') theme: string;

    // jqxNumberInputComponent functions
    clear(): void
    {
        this.host.jqxNumberInput('clear');
    }
    destroy(): void
    {
        this.host.jqxNumberInput('destroy');
    }
    focus(): void
    {
        this.host.jqxNumberInput('focus');
    }
    getDecimal(): number
    {
        return this.host.jqxNumberInput('getDecimal');
    }
    setDecimal(index: String | Number): void
    {
        this.host.jqxNumberInput('setDecimal', index);
    }
    val(value?: String | Number): number
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxNumberInput('val', value);
        } else
        {
            return this.host.jqxNumberInput('val');
        }
    }

    // jqxNumberInputComponent events
    @Output() OnChange = new EventEmitter();
    @Output() OnTextchanged = new EventEmitter();
    @Output() OnValueChanged = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
        this.host.bind('textchanged', function (eventData) { if (self.OnTextchanged) self.OnTextchanged.next(eventData); });
        this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged) self.OnValueChanged.next(eventData); });
    }

} //jqxNumberInputComponent
