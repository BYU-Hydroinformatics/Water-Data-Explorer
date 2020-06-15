/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import {jqxScrollViewComponent} from '../../../../../jqwidgets-ts/angular_jqxscrollview';
import {jqxButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    templateUrl: 'app/scrollview/defaultfunctionality/app.component.htm',
    styleUrls: ['app/scrollview/defaultfunctionality/app.component.css'],
    directives: [jqxScrollViewComponent, jqxButtonComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxScrollViewComponent) scrollView: jqxScrollViewComponent;
    @ViewChild('StartBtn') startButton: jqxButtonComponent;
    @ViewChild('StopBtn') stopButton: jqxButtonComponent;

    scrollViewSettings: jqwidgets.ScrollViewOptions;
    buttonSettings: jqwidgets.ButtonOptions;
    theme = 'arctic';
    flag: Boolean = false;

    constructor() {

        this.scrollViewSettings = {
            width: 600,
            height: 450,
            buttonsOffset: [0, 0],
            slideShow: false
        };
        this.buttonSettings = {
            width: '110px',
            height: '15px',
            theme: this.theme
        };
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.Initialize();
        }
        this.flag = true;
    }

    OnStartClicked() {
        this.scrollView.setOptions({ slideShow: true });
    }

    OnStopClicked() {
        this.scrollView.setOptions({ slideShow: false });
    }

    Initialize(): void {
        this.scrollView.createWidget(this.scrollViewSettings);
        this.startButton.createWidget(this.buttonSettings);
        this.stopButton.createWidget(this.buttonSettings);
    }
}
