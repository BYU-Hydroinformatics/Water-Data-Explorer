/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import {Component, ViewChild, AfterViewChecked} from '@angular/core';

import {jqxRatingComponent} from '../../../../../jqwidgets-ts/angular_jqxrating';

@Component({
    selector: 'my-app',
    template: `
    <div id="jqxWidget">
        <angularRating (OnChange)="OnChange($event)"></angularRating><br>
        <div style="margin-top: 10px;">
            <div style="float: left;">Rating:</div>
            <div id="rate"></div>
        </div>
    </div>
    `,
    styles: [`
    #jqxWidget
        {
            font-size: 13px;
            font-family: Verdana;
        }
    #rate
    {
        float: left;
    }
    `],
    directives: [jqxRatingComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxRatingComponent) childcmp: jqxRatingComponent;

    settings: jqwidgets.RatingOptions;
    theme = 'arctic';
    flag: Boolean = false;

    constructor() {

        this.settings = {
            width: 350,
            height: 35,
        }
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
                this.Initialize();
        }
        this.flag = true;
    }

    OnChange(event) {
        (<HTMLElement>document.getElementById('rate')).innerHTML = '<span>' + event.value + '</span';
    }

    Initialize(): void {
        this.childcmp.createWidget(this.settings);
    }
}