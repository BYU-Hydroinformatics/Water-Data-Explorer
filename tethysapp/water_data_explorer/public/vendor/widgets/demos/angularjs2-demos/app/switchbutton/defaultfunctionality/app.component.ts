/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxSwitchButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxswitchbutton';


@Component({
    selector: 'my-app',
    templateUrl: 'app/switchbutton/defaultfunctionality/app.component.htm',
    styleUrls: ['app/switchbutton/defaultfunctionality/app.component.css'],
    directives: [jqxSwitchButtonComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild('button1') button1: jqxSwitchButtonComponent;
    @ViewChild('button2') button2: jqxSwitchButtonComponent;
    @ViewChild('button3') button3: jqxSwitchButtonComponent;
    @ViewChild('button4') button4: jqxSwitchButtonComponent;
    @ViewChild('button5') button5: jqxSwitchButtonComponent;

    buttonSettings: jqwidgets.SwitchButtonOptions;
    label: {};
    flag: Boolean = false;
    buttonsClicked: Boolean = false;
    constructor() {

        // Used to clear the 'Events:' field after the components are loaded.
        setTimeout(() => {
            (<HTMLElement>document.getElementById('events')).innerHTML = '';
        }, 305);

        //settings
        this.label = {
            'button1': 'New Mail',
            'button2': 'Sent Mail',
            'button3': 'Calendar Alerts',
            'button4': 'Lock Sounds',
            'button5': 'Keyboard clicks'
        }
        this.buttonSettings = {
            width: 81,
            height: 27,
            checked: true
        }
    }

    public ngAfterViewChecked(): void {
        
        if (this.flag === false) {
            this.Initialize();
        }
        this.flag = true;
    }

    OnChecked(event) {
        (<HTMLElement>document.getElementById('events')).innerHTML = this.label[event.target.parentElement.id] + ': Unchecked';
    }

    OnUnchecked(event) {
        (<HTMLElement>document.getElementById('events')).innerHTML = this.label[event.target.parentElement.id] + ': Checked';
    }

    Initialize(): void {
        this.button1.createWidget(this.buttonSettings);
        this.button2.createWidget(this.buttonSettings);
        this.button3.createWidget(this.buttonSettings);
        this.button4.createWidget(this.buttonSettings);
        this.buttonSettings['checked'] = false;
        this.button5.createWidget(this.buttonSettings);
    }
}
