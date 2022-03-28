/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxTagCloudComponent} from '../../../../../jqwidgets-ts/angular_jqxtagcloud';

@Component({
    selector: 'my-app',
    template: '<angularTagCloud></angularTagCloud>',
    directives: [jqxTagCloudComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxTagCloudComponent) tagCloud: jqxTagCloudComponent;

    data = new Array();
    source: {};
    settings: jqwidgets.TagCloudOptions;
    flag: Boolean = false;

    constructor() {

        this.data.push(
            { countryName: "Australia", technologyRating: 35 },
            { countryName: "United States", technologyRating: 60 },
            { countryName: "Germany", technologyRating: 55 },
            { countryName: "Brasil", technologyRating: 20 },
            { countryName: "United Kingdom", technologyRating: 50 },
            { countryName: "Japan", technologyRating: 80 });

        this.source = {
            localdata: this.data,
            datatype: "array",
            datafields: [
                { name: 'countryName' },
                { name: 'technologyRating' }
            ]
        }
        var dataAdapter = new $.jqx.dataAdapter(this.source, {});
        this.settings = {
            width: '600px',
            source: dataAdapter,
            displayMember: 'countryName',
            valueMember: 'technologyRating'
        }
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.Initialize();
        } 
        this.flag = true;
    }

    Initialize(): void {
        this.tagCloud.createWidget(this.settings);
    }
}
