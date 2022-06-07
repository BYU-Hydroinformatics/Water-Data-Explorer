/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxChartComponent} from '../../../../../jqwidgets-ts/angular_jqxChart';

@Component({
    selector: 'my-app',
    template: '<angularChart width="850px" height="500px"></angularChart>',
    directives: [jqxChartComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxChartComponent) myChart: jqxChartComponent;

    settings: jqwidgets.ChartOptions;
    flag: Boolean = false;
    sampleData = [
        { Day: 'Monday', Keith: 30, Erica: 15, George: 25 },
        { Day: 'Tuesday', Keith: 25, Erica: 25, George: 30 },
        { Day: 'Wednesday', Keith: 30, Erica: 20, George: 25 },
        { Day: 'Thursday', Keith: 35, Erica: 25, George: 45 },
        { Day: 'Friday', Keith: 20, Erica: 20, George: 25 },
        { Day: 'Saturday', Keith: 30, Erica: 20, George: 30 },
        { Day: 'Sunday', Keith: 60, Erica: 45, George: 90 }
    ];

    constructor() {        

        this.settings = {
            title: "Fitness & exercise weekly scorecard",
            description: "Time spent in vigorous exercise",
            enableAnimations: true,
            showLegend: true,
            padding: { left: 5, top: 5, right: 5, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: this.sampleData,
            xAxis:
            {
                dataField: 'Day',
                gridLines: {
                    visible:true
                }
            },
            colorScheme: 'scheme01',
            seriesGroups:
            [
                {
                    type: 'column',
                    columnsGapPercent: 50,
                    seriesGapPercent: 0,
                    valueAxis:
                    {
                        unitInterval: 10,
                        minValue: 0,
                        maxValue: 100,
                        displayValueAxis: true,
                        description: 'Time in minutes',
                        axisSize: 'auto',
                        tickMarksColor: '#888888'
                    },
                    series: [
                        { dataField: 'Keith', displayText: 'Keith' },
                        { dataField: 'Erica', displayText: 'Erica' },
                        { dataField: 'George', displayText: 'George' }
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
    
    Initialize() : void
    {
        this.myChart.setOptions(this.settings);
    }
}
