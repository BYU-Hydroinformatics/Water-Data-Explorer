/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxWindowComponent} from '../../../../../jqwidgets-ts/angular_jqxwindow';
import {jqxButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxbutton';
import {jqxCheckBoxComponent} from '../../../../../jqwidgets-ts/angular_jqxcheckbox';
import {jqxTabsComponent} from '../../../../../jqwidgets-ts/angular_jqxtabs';

@Component({
    selector: 'my-app',
    templateUrl: 'app/window/defaultfunctionality/app.component.htm',
    directives: [jqxWindowComponent, jqxButtonComponent, jqxCheckBoxComponent, jqxTabsComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxWindowComponent) window: jqxWindowComponent;
    @ViewChild('showWindowButton') showWindowButton: jqxButtonComponent;
    @ViewChild('hideWindowButton') hideWindowButton: jqxButtonComponent;
    @ViewChild('resizeCheckBox') resizeCheckBox: jqxCheckBoxComponent;
    @ViewChild('dragCheckBox') dragCheckBox: jqxCheckBoxComponent;
    @ViewChild(jqxTabsComponent) tab: jqxTabsComponent;

    showWindowButtonSettings: jqwidgets.ButtonOptions;
    hideWindowButtonSettings: jqwidgets.ButtonOptions;
    resizeCheckBoxSettings: jqwidgets.CheckBoxOptions;
    dragCheckBoxSettings: jqwidgets.CheckBoxOptions;
    windowSettings: jqwidgets.WindowOptions;
    tabSettings: jqwidgets.TabsOptions;
    jqxWidget: HTMLElement;
    offSetLeft = 250;
    offSetTop = 50;
    flag: Boolean = false;

    constructor() {

        this.showWindowButtonSettings = {
            width: '70px'
        };
        this.hideWindowButtonSettings = {
            width: '70px'
        };
        this.resizeCheckBoxSettings = {
            width: '185px',
            checked: true
        }
        this.dragCheckBoxSettings = {
            width: '185px',
            checked: true
        }
        this.tabSettings = {
            width: '100%',
            height: '100%'
        }
        var self = this;
        this.windowSettings = {
            height: 300,
            width: 500,
            maxHeight: 400,
            maxWidth: 700,
            minHeight: 200,
            minWidth: 200,
            position: { x: this.offSetLeft + 50, y: this.offSetTop + 50 },
            showCollapseButton: true,
            initContent: function () {
                self.tab.createWidget(self.tabSettings);
                self.window.focus();
            }
        }
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.jqxWidget = <HTMLElement>document.getElementById('jqxWidget');
            this.offSetLeft = this.jqxWidget.offsetLeft;
            this.offSetTop = this.jqxWidget.offsetTop;
            // Button styles
            (<HTMLElement>document.getElementById('showWindowButton').firstElementChild).style.display = 'inline-block';
            (<HTMLElement>document.getElementById('hideWindowButton').firstElementChild).style.display = 'inline-block';
            this.Initialize();
        }
        this.flag = true;
    }

    OnResizeCheckBox(event) {
        if (event.args.checked) {
            this.window.setOptions({ resizable: true });
        }
        else {
            this.window.setOptions({ resizable: false });
        }
    }

    OnDragCheckBox(event) {
        if (event.args.checked) {
            this.window.setOptions({ draggable: true });
        }
        else {
            this.window.setOptions({ draggable: false });
        }
    }

    OnShowButton(event) {
        this.window.open();
    }

    OnHideButton(event) {
        this.window.close();
    }

    Initialize(): void {
        var self = this;
        this.showWindowButton.createWidget(this.showWindowButtonSettings);
        this.hideWindowButton.createWidget(this.hideWindowButtonSettings);
        this.resizeCheckBox.createWidget(this.resizeCheckBoxSettings);
        this.dragCheckBox.createWidget(this.dragCheckBoxSettings);
        this.window.createWidget(this.windowSettings);
        this.tab.setOptions(this.tabSettings); // SetTab options again, because they are only accepted if applied from here. Not from within a function !
    }
}
