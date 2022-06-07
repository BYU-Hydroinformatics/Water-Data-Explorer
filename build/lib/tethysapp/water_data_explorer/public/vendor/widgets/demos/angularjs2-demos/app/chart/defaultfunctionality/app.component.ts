/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxChartComponent} from '../../../../../jqwidgets-ts/angular_jqxChart';

@Component({
    selector: 'my-app',
    template: '<angularChart width="850px" height="500px"></angularChart>',
    directives: [jqxChartComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxChartComponent) myChart: jqxChartComponent;

    settings: jqwidgets.ChartOptions;
    flag: Boolean = false;
    source =
    {
        datatype: "csv",
        datafields: [
            { name: 'Date' },
            { name: 'S&P 500' },
            { name: 'NASDAQ' }
        ],
        url: '../../demos/sampledata/nasdaq_vs_sp500.txt'
    };
    dataAdapter = new $.jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + this.source.url + '" : ' + error); } });

    constructor()
    {

        this.settings = {
            title: "U.S. Stock Market Index Performance",
            description: "NASDAQ Composite compared to S&P 500",
            enableAnimations: true,
            showLegend: true,
            padding: { left: 10, top: 5, right: 10, bottom: 5 },
            titlePadding: { left: 50, top: 0, right: 0, bottom: 10 },
            source: this.dataAdapter,
            xAxis:
            {
                dataField: 'Date',
                type: 'date',
                baseUnit: 'month',
                valuesOnTicks: true,
                minValue: '01-01-2014',
                maxValue: '01-01-2015',
                tickMarks: {
                    visible: true,
                    interval: 1,
                    color: '#BCBCBC'
                },
                unitInterval: 1,
                gridLines: {
                    visible: true,
                    interval: 3,
                    color: '#BCBCBC'
                },
                labels: {
                    angle: -45,
                    rotationPoint: 'topright',
                    offset: { x: 0, y: -25 }
                }
            },
            valueAxis:
            {
                visible: true,
                title: { text: 'Daily Closing Price<br>' },
                tickMarks: { color: '#BCBCBC' }
            },
            colorScheme: 'scheme04',
            seriesGroups:
            [
                {
                    type: 'line',
                    series: [
                        { dataField: 'S&P 500', displayText: 'S&P 500' },
                        { dataField: 'NASDAQ', displayText: 'NASDAQ' }
                    ]
                }
            ]
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
        this.myChart.setOptions(this.settings);
    }
}
