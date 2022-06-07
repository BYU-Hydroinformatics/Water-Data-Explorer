/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularPasswordInput',
    template: '<input type="password" />'
})

export class jqxPasswordInputComponent implements OnChanges
{
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxPasswordInput;

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
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPasswordInput', options);
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
                    this.host.jqxPasswordInput(i, changes[i].currentValue);
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
        this.host.jqxPasswordInput('setOptions', options);
    }

    // jqxPasswordInputComponent properties
    @Input('disabled') disabled: boolean;
    @Input('localization') localization: jqwidgets.PasswordInpitLocalization;
    @Input('maxLength') maxLength: String | Number;
    @Input('placeHolder') placeHolder: String | Number;
    @Input('passwordStrength') passwordStrength: (password: String | Number, characters: any, defaultStrength: String) => string;
    @Input('rtl') rtl: boolean;
    @Input('strengthColors') strengthColors: jqwidgets.PasswordInpitStrengthColors;
    @Input('showStrength') showStrength: boolean;
    @Input('showStrengthPosition') showStrengthPosition: string;
    @Input('strengthTypeRenderer') strengthTypeRenderer: (password: String | Number, characters: any, defaultStrength: String) => string;
    @Input('showPasswordIcon') showPasswordIcon: boolean;
    @Input('theme') theme: string;

    // jqxPasswordInputComponent functions
    render(): void
    {
        this.host.jqxPasswordInput('render');
    }
    refresh(): void
    {
        this.host.jqxPasswordInput('refresh');
    }
    val(value?: string | number): string
    {
        var hasArguments = value !== undefined;
        if (hasArguments)
        {
            return this.host.jqxPasswordInput('val', value);
        } else
        {
            return this.host.jqxPasswordInput('val');
        }
    }

    // jqxPasswordInputComponent events
    @Output() OnChange = new EventEmitter();

    __wireEvents__(): void
    {
        var self = this;
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
    }

} //jqxPasswordInputComponent
