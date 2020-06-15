/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxBarGaugeComponent} from '../../../../../jqwidgets-ts/angular_jqxbargauge';

@Component({
    selector: 'my-app',
    template: '<angularBarGauge></angularBarGauge>',
    directives: [jqxBarGaugeComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxBarGaugeComponent) myBarGauge: jqxBarGaugeComponent;

    settings: jqwidgets.BarGaugeOptions;
    flag: Boolean = false;
    constructor()
    {

        this.settings = {
            colorScheme: "scheme02",
            width: 600,
            height: 600,
            max: 150,
            values: [102, 115, 130, 137],
            tooltip: {
                visible: true, formatFunction: function (value)
                {
                    var realVal = parseInt(value);
                    return ('Year: 2016<br/>Price Index:' + realVal);
                }
            }
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
        this.myBarGauge.createWidget(this.settings);
    }
}
