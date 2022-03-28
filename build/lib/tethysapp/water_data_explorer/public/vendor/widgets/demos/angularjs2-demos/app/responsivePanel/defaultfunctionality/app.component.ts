/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxTreeComponent} from '../../../../../jqwidgets-ts/angular_jqxtree';
import {jqxPanelComponent} from '../../../../../jqwidgets-ts/angular_jqxpanel';
import {jqxResponsivePanelComponent} from '../../../../../jqwidgets-ts/angular_jqxresponsivepanel';
import {jqxButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxbutton';


@Component({
    selector: 'my-app',
    templateUrl: 'app/responsivePanel/defaultfunctionality/app.component.htm',
    styleUrls: ['app/responsivePanel/defaultfunctionality/app.component.css'],
    directives: [jqxTreeComponent, jqxPanelComponent, jqxResponsivePanelComponent, jqxButtonComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxTreeComponent) tree: jqxTreeComponent;
    @ViewChild(jqxPanelComponent) panel: jqxPanelComponent;
    @ViewChild(jqxResponsivePanelComponent) RespPanel: jqxResponsivePanelComponent;
    @ViewChild('resizeSmall') resizeSmallButton: jqxButtonComponent;
    @ViewChild('resizeBig') resizeBigButton: jqxButtonComponent;

    treeSettings: jqwidgets.TreeOptions;
    respPanelSettings: jqwidgets.ResponsivePanelOptions;
    panelsettings: jqwidgets.PanelOptions;
    buttonsSettings: jqwidgets.ButtonOptions;
    flag: Boolean = false;
    collapsed: Boolean = false;

    constructor() {

        this.treeSettings = {
            height: '100%',
            width: '100%'

        };
        this.respPanelSettings = {
            width: 220,
            height: 300,
            collapseBreakpoint: 200,  // works only on ResponsivePanel 'width' change, not on #ownerPanel
            toggleButton: '#toggleResponsivePanel',
            animationType: 'none',
            autoClose: false
        };
        this.panelsettings = {
            width: '65%',
            height: '100%'
        };
        this.buttonsSettings = {
            width: '150px',
            height: '15px'
        }
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            (<HTMLElement>document.getElementsByTagName("angularButton")[0].firstElementChild).style.width = '15%';
            (<HTMLElement>document.getElementsByTagName("angularButton")[0].firstElementChild).style.display = 'inline-block';
            (<HTMLElement>document.getElementsByTagName("angularButton")[1].firstElementChild).style.width = '15%';
            (<HTMLElement>document.getElementsByTagName("angularButton")[1].firstElementChild).style.display = 'inline-block';
            (<HTMLElement>document.getElementById("jqxMenu").firstElementChild).style.border = 'none';
            this.Initialize();

        }
        this.flag = true;
    }

    OnClose(event) {
        if (event.args.element) return;
        this.collapsed = this.RespPanel.isCollapsed();
        var opened = this.RespPanel.isOpened();
        if (this.collapsed && !opened)
        {
            this.panel.setOptions({ width: '65%' });
        }
    }
    OnCollapse(event) {
        if (event.args.element) return;
        this.collapsed = this.RespPanel.isCollapsed();
        var opened = this.RespPanel.isOpened();
        if (this.collapsed && !opened) this.panel.setOptions({ width: '100%' });//this.panel.widgetObject.width = '100%';
        else if (this.collapsed && opened) this.panel.setOptions({ width: '65%' }); //this.panel.widgetObject.width = '65%';
        else if (!this.collapsed) this.panel.setOptions({ width: '65%' }); //this.panel.widgetObject.width = '65%';
    }
    OnExpand(event) {
        if (event.args.element) return;
        this.collapsed = this.RespPanel.isCollapsed();
        var opened = this.RespPanel.isOpened();
        //if (this.collapsed && !this.opened) this.panel.widgetObject.width = '100%';
        if (this.collapsed && opened) this.panel.widgetObject.width = '65%';
        else if (!this.collapsed) this.panel.widgetObject.width = '65%';

    }
    OnOpen(event) {
        if (event.args.element) return;
        this.collapsed = this.RespPanel.isCollapsed();
        var opened = true;
        if (this.collapsed && opened) this.panel.setOptions({ width: '65%' });

    }

    onClickSmall() {
        this.collapsed = this.RespPanel.isCollapsed();
        var opened = this.RespPanel.isOpened();
        let ownerPanel = (<HTMLElement>document.getElementById("ownerPanel"));
        ownerPanel.style.width = '500px';
        this.RespPanel.setOptions({ width: 150 });
        if (opened) {
            this.RespPanel.close();
        }
        this.panel.widgetObject.width = '100%';
        //this.panel.setOptions({ width: '100%' });
        this.RespPanel.refresh();
        //}
        //else if (this.collapsed && this.opened) this.panel.widgetObject.width = '65%';
        //else if (!this.collapsed) this.panel.widgetObject.width = '65%';
   
    }
    onClickBig() {
        //this.opened = true;
        var opened = this.RespPanel.isOpened();
        let ownerPanel = (<HTMLElement>document.getElementById("ownerPanel"));
        ownerPanel.style.width = '800px';
        this.RespPanel.setOptions({ width: 220 });
        this.panel.setOptions({ width: '65%' });
        if (!opened) {
            this.RespPanel.open();
        }
        this.RespPanel.refresh();
    }

    Initialize(): void {
        this.tree.createWidget(this.treeSettings);
        (<HTMLElement>document.getElementById("jqxMenu").firstElementChild).style.visibility = "visible";
        this.RespPanel.createWidget(this.respPanelSettings);
        this.panel.createWidget(this.panelsettings);
        this.resizeSmallButton.createWidget(this.buttonsSettings);
        this.resizeBigButton.createWidget(this.buttonsSettings);
    }
}
