/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxFileUploadComponent} from '../../../../../jqwidgets-ts/angular_jqxfileupload';

@Component({
    selector: 'my-app',
    template: `<angularFileUpload></angularFileUpload>`,
    directives: [jqxFileUploadComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxFileUploadComponent) myFileUpload: jqxFileUploadComponent;

    settings: jqwidgets.FileUploadOptions;
    flag: Boolean = false;
    constructor() {        

        this.settings = {
            width: 300, uploadUrl: 'imageUpload.php', fileInputName: 'fileToUpload'
        }    
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
        }
        this.flag = true;
    }   
    
    Initialize() : void
    {
        this.myFileUpload.createWidget(this.settings);
    }
}
