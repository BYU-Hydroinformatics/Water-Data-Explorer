/*
jQWidgets v4.2.1 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChange} from '@angular/core';
declare var $: any;

@Component({
    selector: 'angularKnob',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxKnobComponent implements OnChanges {
    @Input('width') width: any;
    @Input('height') height: any;

    elementRef: ElementRef;
    host;
    widgetObject: jqwidgets.jqxKnob;

    constructor(containerElement: ElementRef) {
        this.elementRef = containerElement;
    }

    isHostReady() {
        return (this.host !== undefined && this.host.length == 1);
    }

    initHost(options: any) {
        if (this.isHostReady())
            return true;
        this.host = $(this.elementRef.nativeElement.firstChild);
        if (this.isHostReady())
        {
            this.widgetObject = jqwidgets.createInstance(this.host, 'jqxKnob', options);
            this.__wireEvents__();
            this.__updateRect__();

            return true;
        }
        return false;
    }

    ngAfterViewInit() {
        //if (!this.isHostReady())
        //    this.initHost();
    }

    __updateRect__(): void {
        this.host.css({ width: this.width, height: this.height });
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (!this.isHostReady()) {
            if (!this.initHost({}))
                return;
        }

        for (var i in changes) {
            if (i == 'settings' || i == 'width' || i == 'height')
                continue;


            if (changes[i] && changes[i].currentValue !== undefined) {
                try {
                    this.host.jqxKnob(i, changes[i].currentValue);
                }
                catch (e) {
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

    setOptions(options: any): void {
        this.host.jqxKnob('setOptions', options);
    }

    // jqxKnobComponent properties
    @Input('allowValueChangeOnClick') allowValueChangeOnClick: boolean;
    @Input('allowValueChangeOnDrag') allowValueChangeOnDrag: boolean;
    @Input('allowValueChangeOnMouseWheel') allowValueChangeOnMouseWheel: boolean;
    @Input('changing') changing: (oldValue: String | Number, newValue: String | Number) => Boolean;
    @Input('dragEndAngle') dragEndAngle: number;
    @Input('dragStartAngle') dragStartAngle: number;
    @Input('disabled') disabled: boolean;
    @Input('dial') dial: jqwidgets.KnobDial;
    @Input('endAngle') endAngle: number;
    @Input('labels') labels: jqwidgets.KnobLabels;
    @Input('marks') marks: jqwidgets.KnobMarks;
    @Input('min') min: number;
    @Input('max') max: number;
    @Input('progressBar') progressBar: jqwidgets.KnobProgressBar;
    @Input('pointer') pointer: jqwidgets.KnobPointer;
    @Input('pointerGrabAction') pointerGrabAction: string;
    @Input('rotation') rotation: string;
    @Input('startAngle') startAngle: number;
    @Input('spinner') spinner: jqwidgets.KnobSpinner;
    @Input('style') style: jqwidgets.KnobStyle;
    @Input('step') step: number;
    @Input('snapToStep') snapToStep: boolean;
    @Input('value') value: number;

    // jqxKnobComponent functions
    destroy(): void {
        this.host.jqxKnob('destroy');
    }
    val(value?: String | Number): number {
        var hasArguments = value !== undefined;
        if (hasArguments) {
            return this.host.jqxKnob('val', value);
        } else {
            return this.host.jqxKnob('val');
        }
    }

    // jqxKnobComponent events
    @Output() OnChange = new EventEmitter();

    __wireEvents__(): void {
        var self = this;
        this.host.bind('change', function (eventData) { if (self.OnChange) self.OnChange.next(eventData); });
    }

} //jqxKnobComponent