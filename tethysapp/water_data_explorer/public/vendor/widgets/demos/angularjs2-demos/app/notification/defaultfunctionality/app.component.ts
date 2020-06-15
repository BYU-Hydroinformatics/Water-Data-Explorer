/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxNotificationComponent } from '../../../../../jqwidgets-ts/angular_jqxnotification';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    templateUrl: 'app/notification/defaultfunctionality/app.component.htm',
    directives: [jqxNotificationComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild('msgNotification') msgNotification: jqxNotificationComponent;
    @ViewChild('timeNotification') timeNotification: jqxNotificationComponent;
    @ViewChild('openMessageNotification') openMessageNotificationButton: jqxButtonComponent;
    @ViewChild('openTimeNotification') openTimeNotificationButton: jqxButtonComponent;
    
    msgNotificationSettings: jqwidgets.NotificationOptions;
    timeNotificationSettings: jqwidgets.NotificationOptions;
    buttonsSettings: jqwidgets.ButtonOptions;
    flag: Boolean = false;

    constructor()
    {
        var self = this;

        this.msgNotificationSettings = {
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800,
            autoClose: true, autoCloseDelay: 3000,
            template: "info"
        };

        this.timeNotificationSettings = {
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800,
            autoClose: true, autoCloseDelay: 3000,
            template: "time"
        };

        this.buttonsSettings = { width: 230, height: 30 };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
            (<HTMLElement>document.getElementsByTagName('angularButton')[0].firstElementChild).style.boxSizing = 'border-box';
            (<HTMLElement>document.getElementsByTagName('angularButton')[0].firstElementChild).style.paddingTop = '5px';

            (<HTMLElement>document.getElementsByTagName('angularButton')[1].firstElementChild).style.boxSizing = 'border-box';
            (<HTMLElement>document.getElementsByTagName('angularButton')[1].firstElementChild).style.paddingTop = '5px';
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.msgNotification.createWidget(this.msgNotificationSettings);
        this.timeNotification.createWidget(this.timeNotificationSettings);

        this.openMessageNotificationButton.createWidget(this.buttonsSettings);
        this.openTimeNotificationButton.createWidget(this.buttonsSettings);
    }

    OnClickOpenMessageNotification(): void
    {
        this.msgNotification.open();
    }

    OnClickOpenTimeNotification(): void
    {
        var date = new Date();
        var minutes = date.getMinutes();
        var minutesString: String = '';
        if (minutes < 10)
        {
            minutesString = "0" + minutes;
        } else
        {
            minutesString = "" + minutes;
        }

        var seconds = date.getSeconds();
        var secondsString: String = '';
        if (seconds < 10)
        {
            secondsString = "0" + seconds;
        } else
        {
            secondsString = "" + seconds;
        }

        var timeSpan = document.getElementById('currentTime');
        timeSpan.innerText = date.getHours() + ":" + minutesString + ":" + secondsString;
        this.timeNotification.open();
    }
}