/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxChartComponent} from '../../../../../jqwidgets-ts/angular_jqxChart';
import {jqxSliderComponent} from '../../../../../jqwidgets-ts/angular_jqxslider';
import {jqxDropDownListComponent} from '../../../../../jqwidgets-ts/angular_jqxdropdownlist';

@Component({
    selector: 'my-app',
    templateUrl: 'app/chart/polarseries/app.component.htm',
    directives: [jqxChartComponent, jqxSliderComponent, jqxDropDownListComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxChartComponent) myChart: jqxChartComponent;
    @ViewChild('sliderStartAngle') SliderStartAngle: jqxSliderComponent;
    @ViewChild('sliderRadius') SliderRadius: jqxSliderComponent;
    @ViewChild('dropDownSeries') DropDownSeries: jqxDropDownListComponent;
    @ViewChild('dropDownColors') DropDownColors: jqxDropDownListComponent;


    chartSettings: jqwidgets.ChartOptions;
    sliderStartAngleSettings: jqwidgets.SliderOptions; sliderRadiusSettings: jqwidgets.SliderOptions;
    dropDownListSeriesSettings: jqwidgets.DropDownListOptions; dropDownListColorsSettings: jqwidgets.DropDownListOptions; 
    flag: Boolean = false;
    source =
    {
        datatype: "tab",
        datafields: [
            { name: 'Year' },
            { name: 'HPI' },
            { name: 'BuildCost' },
            { name: 'Population' },
            { name: 'Rate' }
        ],
        url: '../sampledata/homeprices.txt'
    };
    dataAdapter = new $.jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + this.source.url + '" : ' + error); } });

    colorsSchemesList = ["scheme01", "scheme02", "scheme03", "scheme04", "scheme05", "scheme06", "scheme07", "scheme08"];
    seriesList = ["splinearea", "spline", "column", "scatter", "stackedcolumn", "stackedsplinearea", "stackedspline"];

    constructor()
    {

        this.chartSettings = {
            title: "U.S. Real Home Price vs Building Cost Indeces (1950-2010)",
            description: "Source: http://www.econ.yale.edu/~shiller/data.htm",
            enableAnimations: false,
            showLegend: true,
            padding: { left: 5, top: 5, right: 5, bottom: 5 },
            titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
            source: this.dataAdapter,
            xAxis:
            {
                dataField: 'Year',
                unitInterval: 10,
                maxValue: 2010,
                valuesOnTicks: true,
                labels: { autoRotate: true }
            },
            colorScheme: 'scheme01',
            seriesGroups:
            [
                {
                    polar: true,
                    radius: 120,
                    type: 'splinearea',
                    valueAxis:
                    {
                        labels: {
                            formatSettings: { decimalPlaces: 0 },
                            autoRotate: true
                        }
                    },
                    series: [
                        { dataField: 'HPI', displayText: 'Real Home Price Index', opacity: 0.7, lineWidth: 1, radius: 2 },
                        { dataField: 'BuildCost', displayText: 'Building Cost Index', opacity: 0.7, lineWidth: 1, radius: 2 }
                    ]
                }
            ]
        };

        this.sliderStartAngleSettings = {
            width: 240, min: 0, max: 360, step: 1, ticksFrequency: 20, mode: 'fixed'
        }
        this.sliderRadiusSettings = {
            width: 240, min: 80, max: 140, value: 120, step: 1, ticksFrequency: 20, mode: 'fixed'
        }
        this.dropDownListSeriesSettings = {
            source: this.seriesList, selectedIndex: 0, width: '200', height: '25', dropDownHeight: 100
        }
        this.dropDownListColorsSettings = {
            source: this.colorsSchemesList, selectedIndex: 2, width: '200', height: '25', dropDownHeight: 100
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
        this.myChart.setOptions(this.chartSettings);
        this.SliderRadius.createWidget(this.sliderRadiusSettings);
        this.SliderStartAngle.createWidget(this.sliderStartAngleSettings);
        this.DropDownColors.createWidget(this.dropDownListColorsSettings);
        this.DropDownSeries.createWidget(this.dropDownListSeriesSettings);
    }

    SliderStartAngleOnChange(event)
    {
        let value = event.args.value;
        this.chartSettings.seriesGroups[0].startAngle = value;
        this.chartSettings.seriesGroups[0].endAngle = value + 360;
        this.myChart.setOptions({ seriesGroups: this.chartSettings.seriesGroups });

    }
    SliderRadiusOnChange(event)
    {
        let value = event.args.value;
        this.chartSettings.seriesGroups[0].radius = value;
        this.myChart.setOptions({ seriesGroups: this.chartSettings.seriesGroups });
    }
    DropDownListColorsOnChange(event)
    {
        let value = event.args.item.value;
        this.myChart.setOptions({ colorScheme: value });
    }
    DropDownListSeriesOnSelect(event)
    {
        let args = event.args;
        if (args)
        {
            let value = args.item.value;
            this.chartSettings.seriesGroups[0].type = value;
            this.myChart.setOptions({ seriesGroups: this.chartSettings.seriesGroups });
        }
    }
}
