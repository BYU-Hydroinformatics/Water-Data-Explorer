/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxDropDownButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxdropdownbutton';
import {jqxTreeComponent} from '../../../../../jqwidgets-ts/angular_jqxtree';
import {jqxCheckBoxComponent} from '../../../../../jqwidgets-ts/angular_jqxcheckbox';

@Component({
    selector: 'my-app',
    templateUrl: `app/dropdownbutton/defaultfunctionality/app.component.htm`,
    directives: [jqxDropDownButtonComponent, jqxTreeComponent, jqxCheckBoxComponent]
})

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxDropDownButtonComponent) myDropDownButton: jqxDropDownButtonComponent;
    @ViewChild(jqxTreeComponent) myTree: jqxTreeComponent;
    @ViewChild(jqxCheckBoxComponent) myCheckBox: jqxCheckBoxComponent;

    DropDownButtonSettings: jqwidgets.DropDownButtonOptions;
    TreeSettings: jqwidgets.TreeOptions;
    flag: Boolean = false;
    constructor() {        

        this.DropDownButtonSettings = {
            width: 150, height: 25
        } 
        this.TreeSettings = {
            width: 200
        }   
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
            this.myDropDownButton.setContent('<div style= "position: relative; margin-left: 3px; margin-top: 5px;">Home</div>');

        }
        this.flag = true;
    }   
    
    Initialize() : void
    {
        this.myDropDownButton.createWidget(this.DropDownButtonSettings); 
        this.myTree.createWidget(this.TreeSettings);     
        this.myCheckBox.createWidget({ }); 
    }

    TreeOnSelect(event)
    {
        var args = event.args;
        var item = this.myTree.getItem(args.element);
        var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
        this.myDropDownButton.setContent(dropDownContent);
    }
    CheckBoxOnChange(event)
    {
        var DropDownButtonAutoOpen: jqwidgets.DropDownButtonOptions =
            {
                autoOpen: event.args.checked
            };
        this.myDropDownButton.setOptions(DropDownButtonAutoOpen)
    }

}
