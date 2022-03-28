/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxEditorComponent} from '../../../../../jqwidgets-ts/angular_jqxeditor';

@Component({
    selector: 'my-app',
    templateUrl: `app/editor/defaultfunctionality/app.component.htm`,
    directives: [jqxEditorComponent]
})

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxEditorComponent) myEditor: jqxEditorComponent;

    flag: Boolean = false;
    constructor() { }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
            (<HTMLElement>(<HTMLElement>document.getElementsByTagName('angularEditor')[0]).childNodes[0]).style.width = '800px';
            (<HTMLElement>(<HTMLElement>document.getElementsByTagName('angularEditor')[0]).childNodes[0]).style.height = '400px';
            (<HTMLElement>document.getElementsByClassName('jqx-editor-content')[0]).style.height = '91%';
        }
        this.flag = true;
    }   
    
    Initialize() : void
    {
        this.myEditor.createWidget({}); 
    }
}
