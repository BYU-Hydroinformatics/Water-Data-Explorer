/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { jqxFormattedInputComponent } from '../../../../../jqwidgets-ts/angular_jqxformattedinput';

@Component({
    selector: 'my-app',
    template: `<angularFormattedInput id='container'><div></div><div></div></angularFormattedInput>`,
    directives: [jqxFormattedInputComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxFormattedInputComponent) myFormattedInput: jqxFormattedInputComponent;

    settings: {};
    flag: Boolean = false;
    constructor()
    {
        this.settings = {
            width: 250,
            height: 25,
            radix: "decimal",
            value: "15",
            spinButtons: true,
            dropDown: true
        }
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            var self = this;
            self.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myFormattedInput.createWidget(this.settings);
    }
}
