/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxTooltipComponent} from '../../../../../jqwidgets-ts/angular_jqxtooltip';

@Component({
    selector: 'my-app',
    templateUrl: 'app/tooltip/defaultfunctionality/app.component.htm',
    styleUrls: ['app/tooltip/defaultfunctionality/app.component.css'],
    directives: [jqxTooltipComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild('filmPicture1') toolTip1: jqxTooltipComponent;
    @ViewChild('filmPicture2') toolTip2: jqxTooltipComponent;
    @ViewChild('filmPicture3') toolTip3: jqxTooltipComponent;
    @ViewChild('filmPicture4') toolTip4: jqxTooltipComponent;
    @ViewChild('filmPicture5') toolTip5: jqxTooltipComponent;
    @ViewChild('filmPicture6') toolTip6: jqxTooltipComponent;
    @ViewChild('filmPicture7') toolTip7: jqxTooltipComponent;
    @ViewChild('filmPicture8') toolTip8: jqxTooltipComponent;
    @ViewChild('filmPicture9') toolTip9: jqxTooltipComponent;

    toolTipSettings: jqwidgets.TooltipOptions;
    flag: Boolean = false;

    constructor() {

        this.toolTipSettings = {
            content: '<b>Title:</b> <i>The Amazing Spider-man</i><br /><b>Year:</b> 2012',
            position: 'mouse',
            name: 'movieTooltip'
        };
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
                for (let i = 0; i < 9; i++) {
                    (<HTMLElement>document.getElementsByTagName('angularTooltip')[i]).getElementsByTagName('div')[0].style.display = 'inline-block';
            }
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void {
        this.toolTip1.createWidget(this.toolTipSettings);
        this.toolTipSettings['content'] = '<b>Title:</b> <i>The Avengers</i><br /><b>Year:</b> 2012';
        this.toolTip2.createWidget(this.toolTipSettings);
        this.toolTipSettings['content'] = '<b>Title:</b> <i>The Dark Knight Rises</i> <br /><b>Year:</b> 2012';
        this.toolTip3.createWidget(this.toolTipSettings);
        this.toolTipSettings['content'] = '<b>Title:</b> <i>Harry Potter and the Deathly Hallows - Part 1</i><br /><b>Year:</b> 2010';
        this.toolTip4.createWidget(this.toolTipSettings);
        this.toolTipSettings['content'] = '<b>Title:</b> <i>Harry Potter and the Deathly Hallows - Part 2</i><br /><b>Year:</b> 2011';
        this.toolTip5.createWidget(this.toolTipSettings);
        this.toolTipSettings['content'] = '<b>Title:</b> <i>Inception</i><br /><b>Year:</b> 2010';
        this.toolTip6.createWidget(this.toolTipSettings);
        this.toolTipSettings['content'] = '<b>Title:</b> <i>Star Trek</i><br /><b>Year:</b> 2009';
        this.toolTip7.createWidget(this.toolTipSettings);
        this.toolTipSettings['content'] = '<b>Title:</b> <i>Star Wars</i> Episode III: <i>Revenge of the Sith</i><br /><b>Year:</b> 2005';
        this.toolTip8.createWidget(this.toolTipSettings);
        this.toolTipSettings['content'] = '<b>Title:</b> <i>Thor</i><br /><b>Year:</b> 2011';
        this.toolTip9.createWidget(this.toolTipSettings);
    }
}
