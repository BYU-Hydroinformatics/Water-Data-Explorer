/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxLoaderComponent } from '../../../../../jqwidgets-ts/angular_jqxloader';
import { jqxButtonComponent } from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    template: `<div id='jqxWidgets'>
                        <angularLoader></angularLoader>
                        <angularButton style="float: left;" #OpenButton (OnClick) = "Open($event)">Open Loader</angularButton>
                        <angularButton style="float: left; margin-left: 10px;" #CloseButton (OnClick) = "Close($event)">Close</angularButton>
                    </div>`,
    directives: [jqxLoaderComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxLoaderComponent) myLoader: jqxLoaderComponent;
    @ViewChild('OpenButton') openButton: jqxButtonComponent;
    @ViewChild('CloseButton') closeButton: jqxButtonComponent;

    settings: jqwidgets.LoaderOptions;
    flag: Boolean = false;

    constructor()
    {
        this.settings = {
            width: 100,
            height: 60,
            imagePosition: 'top'
        };
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
        this.myLoader.createWidget(this.settings);
        this.closeButton.createWidget({ width: 100 });
        this.openButton.createWidget({ width: 150 });
    }

    Open(event): void
    {
        this.myLoader.open();
    }

    Close(event): void
    {
        this.myLoader.close();
    }
}