/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import { jqxSliderComponent } from '../../../../../jqwidgets-ts/angular_jqxslider';

@Component({
    selector: 'my-app',
    template: `
             <angularSlider #slider (OnChange)="OnChange($event)"></angularSlider>
            <div id="eventLog"></div>
                `,
    styles: [`

    `],
    directives: [jqxSliderComponent],
    encapsulation: ViewEncapsulation.None
})



export class AppComponent implements AfterViewChecked {
    @ViewChild('slider') slider: jqxSliderComponent;

    sliderSettings: jqwidgets.SliderOptions;
    flag: Boolean = false;
    constructor() {
        this.sliderSettings = {
            width: 350,
            height: 60,
            ticksFrequency: 10,
            min: 0,
            max: 100
        };
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.Initialize();
        }
        this.flag = true;
    }

    OnChange(event) {
        (<HTMLElement>document.getElementById('eventLog')).innerHTML = '(' + parseInt(event.args.value) + ')';
    }


    Initialize(): void {
        this.slider.createWidget(this.sliderSettings);
    }
}