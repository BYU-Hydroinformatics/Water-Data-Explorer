/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxLinearGaugeComponent } from '../../../../../jqwidgets-ts/angular_jqxlineargauge';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    template: `<div id='jqxWidgets'> 
                       <angularLinearGauge style="margin-left: 60px; float: left;"></angularLinearGauge>
                   </div>`,
    directives: [jqxLinearGaugeComponent, jqxButtonComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxLinearGaugeComponent) myLinearGauge: jqxLinearGaugeComponent;
    @ViewChild('updateButton') myButton: jqxButtonComponent;

    buttonSettings = {};
    settings: jqwidgets.LinearGaugeOptions;
    flag: Boolean = false;

    constructor()
    {
        var majorTicks = { size: '10%', interval: 10 },
            minorTicks = { size: '5%', interval: 2.5, style: { 'stroke-width': 1, stroke: '#aaaaaa' } },
            labels = { interval: 20 };

        this.settings = {
            orientation: 'vertical',
            width: 100,
            height: 350,
            ticksMajor: { size: '10%', interval: 10 },
            ticksMinor: { size: '5%', interval: 2.5, style: { 'stroke-width': 1, stroke: '#aaaaaa' } },
            max: 60,
            pointer: { size: '5%' },
            colorScheme: 'scheme05',
            labels: {
                interval: 20, formatValue: function (value, position)
                {
                    if (position === 'far')
                    {
                        value = (9 / 5) * value + 32;
                        if (value === -76)
                        {
                            return '°F';
                        }
                        return value + '°';
                    }
                    if (value === -60)
                    {
                        return '°C';
                    }
                    return value + '°';
                }
            },
            ranges: [
                { startValue: -10, endValue: 10, style: { fill: '#FFF157', stroke: '#FFF157' } },
                { startValue: 10, endValue: 35, style: { fill: '#FFA200', stroke: '#FFA200' } },
                { startValue: 35, endValue: 60, style: { fill: '#FF4800', stroke: '#FF4800' } }],
            animationDuration: 1500
        };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            var self = this;
            self.Initialize();
            self.myLinearGauge.val(40);
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myLinearGauge.createWidget(this.settings);
    }
}