/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxRadioButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxradiobutton';

@Component({
    selector: 'my-app',
    templateUrl: 'app/radiobutton/defaultfunctionality/app.component.htm',
    directives: [jqxRadioButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild('firstRadioButton') firstRadioButton: jqxRadioButtonComponent;
    @ViewChild('secondRadioButton') secondRadioButton: jqxRadioButtonComponent;
    @ViewChild('thirdRadioButton') thirdRadioButton: jqxRadioButtonComponent;
    @ViewChild('fourthRadioButton') fourthRadioButton: jqxRadioButtonComponent;

    flag: Boolean = false;
    firstRadioButtonSettings: jqwidgets.RadioButtonOptions;
    secondRadioButtonSettings: jqwidgets.RadioButtonOptions;
    thirdRadioButtonSettings: jqwidgets.RadioButtonOptions;
    fourthRadioButtonSettings: jqwidgets.RadioButtonOptions;

    clearLog = function ()
    {
        var log = document.getElementById('events').getElementsByTagName('span');
        if (log.length >= 2)
        {
            document.getElementById('events').innerHTML = '';
        }
    }

    constructor()
    {
        this.firstRadioButtonSettings = {
            width: 250,
            height: 25,
            checked: true
        };

        this.secondRadioButtonSettings = { width: 250, height: 25 };
        this.thirdRadioButtonSettings = this.secondRadioButtonSettings;

        this.fourthRadioButtonSettings = { width: 250, height: 25, disabled: true };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            var self = this;
            self.Initialize();

            var angularRadioButtonsDom = <any>document.getElementsByTagName('angularRadioButton');
            for (var i = 0; i < angularRadioButtonsDom.length; i += 1)
            {
                (angularRadioButtonsDom[i].firstElementChild).style.marginTop = '10px';
            }
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.firstRadioButton.createWidget(this.firstRadioButtonSettings);
        this.secondRadioButton.createWidget(this.secondRadioButtonSettings);
        this.thirdRadioButton.createWidget(this.thirdRadioButtonSettings);
        this.fourthRadioButton.createWidget(this.fourthRadioButtonSettings);
    }
    
            
    OnChangeFirst(event): void
    {
        this.clearLog();
        var log = document.getElementById('events');
        var checked = event.args.checked;
        if (checked)
        {
            log.innerHTML += '<div><span>Checked: 12 Months Contract</span></div>';
        } else
        {
            log.innerHTML += '<div><span>Unchecked: 12 Months Contract</span></div>';
        }
    }

    OnChangeSecond(event): void
    {
        this.clearLog();
        var log = document.getElementById('events');
        var checked = event.args.checked;
        if (checked)
        {
            log.innerHTML += '<div><span>Checked: 6 Months Contract</span></div>';
        } else
        {
            log.innerHTML += '<div><span>Unchecked: 6 Months Contract</span></div>';
        }
    }

    OnChangeThird(event): void
    {
        this.clearLog();
        var log = document.getElementById('events');
        var checked = event.args.checked;
        if (checked)
        {
            log.innerHTML += '<div><span>Checked: 3 Months Contract</span></div>';
        } else
        {
            log.innerHTML += '<div><span>Unchecked: 3 Months Contract</span></div>';
        }
    }
}