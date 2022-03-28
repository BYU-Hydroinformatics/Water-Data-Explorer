/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import { jqxScrollBarComponent } from '../../../../../jqwidgets-ts/angular_jqxscrollbar';

@Component({
    selector: 'my-app',
    template: `
            <div id='jqxWidget'>
                    <div id='VerticalDiv'>Vertical</div>
                    <angularScrollBar #jqxVerticalScrollBar id='jqxVerticalScrollBar' (OnValueChanged)="OnValueChangedVertical($event)"></angularScrollBar>
                    <div id='HorizontalDiv'>Horizontal</div>
                    <angularScrollBar #jqxHorizontalScrollBar id='jqxHorizontalScrollBar'(OnValueChanged) = "OnValueChangedHorizontal($event)"></angularScrollBar>
            </div>
                `,
    styles: [`
    #jqxWidget{
        font-size: 13px; 
        font-family: Verdana; 
        float: left;
    }
    #VerticalDiv{
        margin-top: 10px;
    }
    #container{
        margin-top: 10px;
    }
    #HorizontalDiv{
        margin-top: 10px;
    }
    `],
    directives: [jqxScrollBarComponent],
    encapsulation: ViewEncapsulation.None
})



export class AppComponent implements AfterViewChecked {
    @ViewChild('jqxVerticalScrollBar') verticalScrollBar: jqxScrollBarComponent;
    @ViewChild('jqxHorizontalScrollBar') horizontalScrollBar: jqxScrollBarComponent;

    verticalScrollBarSettings: jqwidgets.ScrollBarOptions;
    horizontalScrollBarSettings: jqwidgets.ScrollBarOptions;
    flag: Boolean = false;
    constructor() {
        this.verticalScrollBarSettings = {
            width: 18,
            height: 280,
            min: 0,
            max: 1000,
            vertical: true
        }
        this.horizontalScrollBarSettings = {
            width: 280,
            height: 18,
            min: 0,
            max: 1000
        };
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.Initialize();
        }
        this.flag = true;
    }

    OnValueChangedVertical(event) {
        (<HTMLElement>document.getElementById('VerticalDiv')).innerHTML = 'Vertical (' + parseInt(event.currentValue) + ')';
    }
    OnValueChangedHorizontal(event) {
        (<HTMLElement>document.getElementById('HorizontalDiv')).innerHTML = 'Horizontal (' + parseInt(event.currentValue) + ')';
    }


    Initialize(): void {
        this.verticalScrollBar.createWidget(this.verticalScrollBarSettings);
        this.horizontalScrollBar.createWidget(this.horizontalScrollBarSettings);
    }
}