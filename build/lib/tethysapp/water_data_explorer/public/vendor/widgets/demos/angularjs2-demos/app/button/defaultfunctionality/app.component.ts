/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxbutton';

@Component({
    selector: 'my-app',
    template: `<angularButton #imageButton (OnClick)= "ImageButtonClicked($event)"></angularButton>
               <angularButton #textImageButton (OnClick)= "TextImageButtonClicked($event)">Button</angularButton>
               <div>Events:</div>
               <div id="events"></div>`,
    directives: [jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked { 
    @ViewChild('imageButton') myImageButton: jqxButtonComponent;
    @ViewChild('textImageButton') myTextImageButton: jqxButtonComponent;
    
    settings: jqwidgets.ButtonOptions;
    flag: Boolean = false;
    constructor() {        

    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
            var buttons = document.getElementsByClassName('jqx-button');
            for (var i = 1; i < buttons.length; i++)
            {
                (<HTMLElement>buttons[i]).style.marginTop = '20px';
            } 
        }
        this.flag = true;
    }   
    
    Initialize() : void
    {
        let that = this;
        that.myImageButton.createWidget({ width: 120, height: 30, imgSrc: '../../images/facebook.png' });
        that.myTextImageButton.createWidget({ width: 120, height: 30, textImageRelation: "imageBeforeText", textPosition: "left", imgSrc: "../../images/twitter.png" });
    }

    ImageButtonClicked(): void
    {
        document.getElementById('events').innerHTML = '<span>Image Button Clicked</span>';
    }

    TextImageButtonClicked(): void
    {
        document.getElementById('events').innerHTML = '<span>Text Image Button Clicked</span>';
    } 
}

