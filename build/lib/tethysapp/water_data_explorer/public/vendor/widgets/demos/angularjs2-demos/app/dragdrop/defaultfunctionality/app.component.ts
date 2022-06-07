/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { jqxDragDropComponent } from '../../../../../jqwidgets-ts/angular_jqxdragdrop';
import { jqxPanelComponent } from '../../../../../jqwidgets-ts/angular_jqxpanel';


@Component({
    selector: 'my-app',
    templateUrl: 'app/dragdrop/defaultfunctionality/app.component.htm',
    styleUrls: ['app/dragdrop/defaultfunctionality/app.component.css'],
    directives: [jqxDragDropComponent, jqxPanelComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxDragDropComponent) myDragDrop: jqxDragDropComponent;
    @ViewChild(jqxPanelComponent) myPanel: jqxPanelComponent;

    DragDropSettings: jqwidgets.DragDropOptions;
    PanelSettings: jqwidgets.PanelOptions;

    flag: Boolean = false;
    constructor() {

        this.DragDropSettings = {
            restricter: '#draggable-parent', dropTarget: '.drop-target', appendTo: '#draggable-parent'   
        };
        this.PanelSettings = {
            width: 260, height: 330
        }
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false)
        {       
            this.Initialize();

            var dragDropElement = document.getElementsByClassName('jqx-draggable')[0];
            var panelElement = document.getElementsByClassName('jqx-panel')[0];
            (<HTMLElement>dragDropElement).style.border = '1px solid #bbb';
            (<HTMLElement>dragDropElement).style.backgroundColor = '#C9ECFF';
            (<HTMLElement>dragDropElement).style.width = '100px';
            (<HTMLElement>dragDropElement).style.height = '100px';
            (<HTMLElement>dragDropElement).style.left = '30px';
            (<HTMLElement>dragDropElement).style.top = '50px';
            (<HTMLElement>dragDropElement).style.padding = '5px';
            (<HTMLElement>dragDropElement).style.zIndex = '2';
            (<HTMLElement>panelElement).style.cssFloat = 'right';
            (<HTMLElement>panelElement).style.padding = '10px';
            (<HTMLElement>panelElement).style.fontFamily = 'Tahoma';
            (<HTMLElement>panelElement).style.fontSize = '13px';

            this.centerLabels();
        }   
        this.flag = true;
    }

    addEvent(type, position)
    {
        position.left = position.left.toString().match(/([^.]+)/);
        position.top = position.top.toString().match(/([^.]+)/);
        position.left[0] === '-0' ? position.left[0] = 0 : position.left[0] = position.left[0];
        position.top[0] === '-0' ? position.top[0] = 0 : position.top[0] = position.top[0];
        this.myPanel.prepend('<div class="row">Event: ' + type + ', (' + position.left[0] + ', ' + position.top[0] + ')</div>');
    }

    centerLabels()
    {
        var labels = document.getElementsByClassName('label');
        for (var i = 0; i < labels.length; i++)
        {
            var parentHeight = labels[i].parentElement.offsetHeight;
            var elementheight = labels[i].clientHeight;
            var top = (parentHeight - elementheight) / 2;
            (<HTMLElement>labels[i]).style.top = top + 'px';
        }
    }

    OnDragStart(event)
    {
        this.addEvent(event.type, event.args.position);
    }
    OnDragEnd(event)
    {
        this.addEvent(event.type, event.args.position);
    }
    OnDropTargetEnter(event)
    {
        this.addEvent(event.type, event.args.position);
    }
    OnDropTargetLeave(event)
    {
        this.addEvent(event.type, event.args.position);
    }

    Initialize(): void {
        this.myDragDrop.createWidget(this.DragDropSettings);
        this.myPanel.createWidget(this.PanelSettings);
    }
}