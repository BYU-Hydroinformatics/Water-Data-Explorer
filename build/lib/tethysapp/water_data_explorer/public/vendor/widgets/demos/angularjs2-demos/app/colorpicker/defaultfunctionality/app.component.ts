/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxDropDownButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxdropdownbutton';
import {jqxScrollViewComponent} from '../../../../../jqwidgets-ts/angular_jqxscrollview';
import {jqxColorPickerComponent} from '../../../../../jqwidgets-ts/angular_jqxcolorpicker';

@Component({
    selector: 'my-app',
    templateUrl: `app/colorpicker/defaultfunctionality/app.component.htm`,
    styleUrls: ['app/colorpicker/defaultfunctionality/app.component.css'],
    directives: [jqxDropDownButtonComponent, jqxScrollViewComponent, jqxColorPickerComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild('dropDownButton') myDropDown: jqxDropDownButtonComponent;
    @ViewChild('photoGallery') myScrollView: jqxScrollViewComponent;
    @ViewChild('colorPicker') myColorPicker: jqxColorPickerComponent;

    DropDownSettings: jqwidgets.DropDownButtonOptions;
    ScrollViewSettings: jqwidgets.ScrollViewOptions;
    ColorPickerSettings: jqwidgets.ColorPickerOptions;
    flag: Boolean = false;
    constructor() {        

        this.DropDownSettings = {
            width: 150, height: 22
        } 
        this.ScrollViewSettings = {
            slideShow: true, width: 500, height: 350, showButtons: false
        } 
        this.ColorPickerSettings = {
            colorMode: 'hue', width: 220, height: 220
        } 
           
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
            (<HTMLElement>document.getElementsByClassName('jqx-scrollview')[0]).style.border = '15px solid #ffaabb';
            (<HTMLElement>document.getElementsByClassName('jqx-scrollview')[0]).style.borderRadius = '10px';
        }
        this.flag = true;
    }   
    
    Initialize() : void
    {
        this.myDropDown.createWidget(this.DropDownSettings);
        this.myScrollView.createWidget(this.ScrollViewSettings);
        this.myColorPicker.createWidget(this.ColorPickerSettings);
        this.myDropDown.setContent(this.getTextElementByColor({ hex: "FFAABB" }));
    }

    getTextElementByColor(color)
    {
        if (color == 'transparent' || color.hex == "")
        {
            return '<div style="text-shadow: none; position: relative; padding-bottom: 2px; margin-top: 2px;">transparent</div>';
        }
        let nThreshold = 105;
        let bgDelta = (color.r * 0.299) + (color.g * 0.587) + (color.b * 0.114);
        let foreColor = (255 - bgDelta < nThreshold) ? 'Black' : 'White';
        let element = '<div style="text-shadow: none; position: relative; padding-bottom: 2px; margin-top: 2px;color:' + foreColor + '; background: #' + color.hex + '">#' + color.hex + '</div>';
        return element;
    }

    ColorPickerEvent(event)
    {
        this.myDropDown.setContent(this.getTextElementByColor(event.args.color));
        (<HTMLElement>document.getElementsByClassName('jqx-scrollview')[0]).style.borderColor = '#' + event.args.color.hex;
    }
}
