/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxMenuComponent } from '../../../../../jqwidgets-ts/angular_jqxmenu';
import { jqxCheckBoxComponent } from '../../../../../jqwidgets-ts/angular_jqxcheckbox';

@Component({
    selector: 'my-app',
    templateUrl: 'app/menu/defaultfunctionality/app.component.htm',
    directives: [jqxMenuComponent, jqxCheckBoxComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxMenuComponent) myMenu: jqxMenuComponent;
    @ViewChild('animation') myAnimationCheckBox: jqxCheckBoxComponent;
    @ViewChild('disabled') myDisabledCheckBox: jqxCheckBoxComponent;
    @ViewChild('hover') myHoverCheckBox: jqxCheckBoxComponent;
    @ViewChild('open') myOpenCheckBox: jqxCheckBoxComponent;
    @ViewChild('topLevelArrows') myTopLevelArrowsCheckBox: jqxCheckBoxComponent;

    settings: jqwidgets.MenuOptions;
    checkBoxSettings: jqwidgets.CheckBoxOptions;
    flag: Boolean = false;

    constructor()
    {       
        this.settings = {
            width: '670', height: '30px'
        };

        this.checkBoxSettings = {
            width: '150px', height: '20px'
        };
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
        this.myMenu.createWidget(this.settings);
        this.checkBoxSettings.checked = true;
        this.myAnimationCheckBox.createWidget(this.checkBoxSettings);
        this.myHoverCheckBox.createWidget(this.checkBoxSettings);
        this.myOpenCheckBox.createWidget(this.checkBoxSettings);
        this.checkBoxSettings.checked = false;
        this.myDisabledCheckBox.createWidget(this.checkBoxSettings);
        this.checkBoxSettings = { width: '200px', height: '20px' };
        this.myTopLevelArrowsCheckBox.createWidget(this.checkBoxSettings);
    }

    AnimationOnChange(event): void
    {
        var value = event.args.checked;
        // enable or disable the menu's animation.
        if (!value)
        {
            this.settings = {
                animationShowDuration: 0,
                animationHideDuration: 0,
                animationShowDelay: 0
            };
            this.myMenu.setOptions(this.settings);
        }
        else
        {
            this.settings = {
                animationShowDuration: 300,
                animationHideDuration: 200,
                animationShowDelay: 200
            };
            this.myMenu.setOptions(this.settings);
        }        
    }

    DisabledOnChange(event): void
    {
        var value = event.args.checked;
        // enable or disable the menu
        if (!value)
        {
            this.settings = { disabled: false };
            this.myMenu.setOptions(this.settings);
        }
        else
        {
            this.settings = { disabled: true };
            this.myMenu.setOptions(this.settings);
        }
    }

    HoverOnChange(event): void
    {
        var value = event.args.checked;
        // enable or disable the menu's hover effect.
        if (!value)
        {
            this.settings = { enableHover: false };
            this.myMenu.setOptions(this.settings);
        }
        else
        {
            this.settings = { enableHover: true };
            this.myMenu.setOptions(this.settings);
        }
    }

    OpenOnChange(event): void
    {
        var value = event.args.checked;
        // enable or disable the opening of the top level menu items when the user hovers them.
        if (!value)
        {
            this.settings = { autoOpen: false };
            this.myMenu.setOptions(this.settings);
        }
        else
        {
            this.settings = { autoOpen: true };
            this.myMenu.setOptions(this.settings);
        }
    }

    TopLevelArrowsOnChange(event): void
    {
        var value = event.args.checked;
        // enable or disable the top level arrows.
        if (!value)
        {
            this.settings = { showTopLevelArrows: false };
            this.myMenu.setOptions(this.settings);
        }
        else
        {
            this.settings = { showTopLevelArrows: true };
            this.myMenu.setOptions(this.settings);
        }
    }
}