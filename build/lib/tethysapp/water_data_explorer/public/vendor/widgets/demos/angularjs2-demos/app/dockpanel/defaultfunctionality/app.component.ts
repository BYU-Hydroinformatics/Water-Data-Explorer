/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxDockPanelComponent} from '../../../../../jqwidgets-ts/angular_jqxdockpanel';

@Component({
    selector: 'my-app',
    templateUrl: `app/dockpanel/defaultfunctionality/app.component.htm`,
    styles: [`
        .jqx-layout-group-auto-hide-content-vertical
        {
            width: 200px;
        }
    `]
    ,
    directives: [jqxDockPanelComponent]
})

export class AppComponent implements AfterViewChecked { 
    @ViewChild('jqxDockPanel') myjqxDockPanel: jqxDockPanelComponent;
    @ViewChild('jqxDockPanel2') myjqxDockPanel2: jqxDockPanelComponent;

    settings: jqwidgets.DockPanelOptions;
    flag: Boolean = false;

    constructor() {        

        this.settings = {
            width: 300, height: 210
        }  
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            var self = this;
            var dockpanels = document.getElementsByTagName('angularDockPanel');
            (<HTMLElement>dockpanels[0]).style.color = '#fff';
            (<HTMLElement>dockpanels[1]).style.color = '#fff';

            this.InitializeSecondDockPanel();
            for (var i = 0; i < 4; i++)
            {
                (<HTMLElement>(<HTMLElement>(<HTMLElement>(<HTMLElement>dockpanels[1]).children[0]).children[0]).children[i]).style.width = '20px';
                (<HTMLElement>(<HTMLElement>(<HTMLElement>(<HTMLElement>dockpanels[1]).children[0]).children[0]).children[i]).style.height = '20px';
            }

            var LayoutElement = document.getElementById('layout');
            var firstElement = document.getElementById('first');
            var secondElement = document.getElementById('second');
            var thirdElement = document.getElementById('third');
            var fourthElement = document.getElementById('fourth');

            LayoutElement.addEventListener('click', function (event: any)
            {
                var position = parseInt(event.clientX) - parseInt(event.target.offsetLeft);
                for (var i = 0; i < 4; i++)
                {
                    (<HTMLElement>(<HTMLElement>(<HTMLElement>(<HTMLElement>dockpanels[0]).children[0]).children[0]).children[i]).style.width = 'auto';
                    (<HTMLElement>(<HTMLElement>(<HTMLElement>(<HTMLElement>dockpanels[0]).children[0]).children[0]).children[i]).style.height = 'auto';
                }

                if (position < 55)
                {
                    firstElement.setAttribute('dock', 'bottom');
                    firstElement.style.height = '105px';
                    secondElement.setAttribute('dock', 'left');
                    secondElement.style.width = '100px';
                    thirdElement.setAttribute('dock', 'left');
                    thirdElement.style.width = '100px';
                    fourthElement.setAttribute('dock', 'left');
                    fourthElement.style.width = '100px';
                } else
                    if (position < 115)
                    {
                        for (var i = 0; i < 4; i++)
                        {
                            (<HTMLElement>(<HTMLElement>(<HTMLElement>(<HTMLElement>dockpanels[0]).children[0]).children[0]).children[i]).style.width = '100px';
                        }
                        firstElement.setAttribute('dock', 'left');
                        secondElement.setAttribute('dock', 'right');
                        thirdElement.setAttribute('dock', 'bottom');
                        thirdElement.style.height = '140px';
                        fourthElement.setAttribute('dock', 'top');
                        fourthElement.style.height = '70px';
                    } else if (position < 175)
                    {
                        for (var i = 0; i < 4; i++)
                        {
                            (<HTMLElement>(<HTMLElement>(<HTMLElement>(<HTMLElement>dockpanels[0]).children[0]).children[0]).children[i]).style.width = '150px';
                        }
                        firstElement.setAttribute('dock', 'left');
                        secondElement.setAttribute('dock', 'left');
                        thirdElement.setAttribute('dock', 'left');
                        fourthElement.setAttribute('dock', 'left');

                    } else if (position < 235)
                    {
                        for (var i = 0; i < 4; i++)
                        {
                            (<HTMLElement>(<HTMLElement>(<HTMLElement>(<HTMLElement>dockpanels[0]).children[0]).children[0]).children[i]).style.height = '70px';
                        }
                        firstElement.setAttribute('dock', 'top');
                        secondElement.setAttribute('dock', 'top');
                        thirdElement.setAttribute('dock', 'top');
                        fourthElement.setAttribute('dock', 'top');
                    }
                    else
                    {
                        for (var i = 0; i < 4; i++)
                        {
                            (<HTMLElement>(<HTMLElement>(<HTMLElement>(<HTMLElement>dockpanels[0]).children[0]).children[0]).children[i]).style.width = '100px';
                        }
                        firstElement.setAttribute('dock', 'left');
                        secondElement.setAttribute('dock', 'left');
                        thirdElement.setAttribute('dock', 'left');
                        fourthElement.setAttribute('dock', 'left');
                    }
                self.myjqxDockPanel.widgetObject.refresh();
            }, true)
        }

        this.InitializeFirstDockPanel();

        this.flag = true;
    }   
    
    InitializeFirstDockPanel() : void
    {
        this.myjqxDockPanel.createWidget(this.settings);    
    }  
    InitializeSecondDockPanel(): void
    {
        this.myjqxDockPanel2.createWidget(this.settings);
        this.myjqxDockPanel2.setOptions({ lastchildfill: false });
    }

}
