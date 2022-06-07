/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { jqxGaugeComponent } from '../../../../../jqwidgets-ts/angular_jqxgauge';

@Component({
    selector: 'my-app',
    template: `
        <angularGauge (OnValueChanging)="GaugeOnValueChanging($event)"></angularGauge>
        <div id="gaugeValue" style="position: absolute; top: 235px; left: 132px; font-family: Sans-Serif; text-align: center; font-size: 17px; width: 70px;"></div>
    `,
    styleUrls: ['app/gauge/defaultfunctionality/app.component.css'],
    directives: [jqxGaugeComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxGaugeComponent) myGauge: jqxGaugeComponent;

    settings: jqwidgets.GaugeOptions;
    flag: Boolean = false;
    constructor()
    {
        this.settings = {
            ranges: [{ startValue: 0, endValue: 55, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 5, startWidth: 1 },
                { startValue: 55, endValue: 110, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 10, startWidth: 5 },
                { startValue: 110, endValue: 165, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 13, startWidth: 10 },
                { startValue: 165, endValue: 220, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 16, startWidth: 13 }],
            ticksMinor: { interval: 5, size: '5%' },
            ticksMajor: { interval: 10, size: '9%' },
            value: 0,
            colorScheme: 'scheme05',
            animationDuration: 1200
        }
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
        }
        this.flag = true;
    }


    Initialize(): void
    {
        this.myGauge.createWidget(this.settings);
        this.myGauge.setOptions({ value: 140 });
    }

    GaugeOnValueChanging(event)
    {
        var gaugeValueDom = <HTMLElement>document.getElementById('gaugeValue');
        gaugeValueDom.innerText = Math.round(event.args.value) + ' kph';
    }
}