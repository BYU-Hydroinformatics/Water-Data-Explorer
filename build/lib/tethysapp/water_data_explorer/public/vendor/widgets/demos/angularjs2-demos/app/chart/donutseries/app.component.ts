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
    data_source_mobile =
    {
        datatype: "csv",
        datafields: [
            { name: 'Browser' },
            { name: 'Share' }
        ],
        url: '../sampledata/mobile_browsers_share_dec2011.txt'
    };
    dataAdapter_mobile = new $.jqx.dataAdapter(this.data_source_mobile, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + this.source.url + '" : ' + error); } });
    data_source_desktop =
    {
        datatype: "csv",
        datafields: [
            { name: 'Browser' },
            { name: 'Share' }
        ],
        url: '../sampledata/desktop_browsers_share_dec2011.txt'
    };
    dataAdapter_desktop = new $.jqx.dataAdapter(this.data_source_desktop, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + this.source.url + '" : ' + error); } });

    constructor() {        

        this.settings = {
            title: "Mobile & Desktop browsers share",
            description: "(source: wikipedia.org)",
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: { left: 520, top: 170, width: 300, height: 200, flow: 'vertical' },
            padding: { left: 5, top: 5, right: 5, bottom: 5 },
            titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
            seriesGroups:
            [
                {
                    type: 'donut',
                    offsetX: 250,
                    source: this.dataAdapter_mobile,
                    xAxis:
                    {
                        formatSettings: { prefix: 'Mobile ' }
                    },
                    series:
                    [
                        {
                            dataField: 'Share',
                            displayText: 'Browser',
                            labelRadius: 120,
                            initialAngle: 10,
                            radius: 130,
                            innerRadius: 90,
                            centerOffset: 0,
                            formatSettings: { sufix: '%', decimalPlaces: 1 }
                        }
                    ]
                },
                {
                    type: 'donut',
                    offsetX: 250,
                    source: this.dataAdapter_desktop,
                    colorScheme: 'scheme02',
                    xAxis:
                    {
                        formatSettings: { prefix: 'Desktop ' }
                    },
                    series:
                    [
                        {
                            dataField: 'Share',
                            displayText: 'Browser',
                            labelRadius: 120,
                            initialAngle: 10,
                            radius: 70,
                            innerRadius: 30,
                            centerOffset: 0,
                            formatSettings: { sufix: '%', decimalPlaces: 1 }
                        }
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
