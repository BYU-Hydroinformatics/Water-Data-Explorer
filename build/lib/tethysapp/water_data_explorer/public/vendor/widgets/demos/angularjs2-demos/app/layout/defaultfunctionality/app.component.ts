/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import { Component, ViewChild, ElementRef, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxLayoutComponent } from '../../../../../jqwidgets-ts/angular_jqxlayout';
import { jqxTreeComponent } from '../../../../../jqwidgets-ts/angular_jqxtree';

@Component({
    selector: 'my-app',
    templateUrl: 'app/layout/defaultfunctionality/app.component.htm',
    styles: [
        `.jqx-layout-group-auto-hide-content-vertical
          {
              width: 200px;
          }`,
        // Additional settings because Angular2 make changes by default
        `div[role=tree]
         {
              height: 99% !important;
         }`
    ],
    directives: [jqxLayoutComponent, jqxTreeComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxLayoutComponent) myLayout: jqxLayoutComponent;
  
    settings: jqwidgets.LayoutOptions;
    treeSettings: jqwidgets.TreeOptions;
    source = new Array();
    flag: Boolean = false;
    tt: any = {};
    constructor()
    {
        var self = this;

        this.source = [{
            icon: '../../images/earth.png',
            label: 'Project',
            expanded: true,
            items: [{
                icon: '../../images/folder.png',
                label: 'css',
                expanded: true,
                items: [{
                    icon: '../../images/nav1.png',
                    label: 'jqx.base.css'
                }, {
                        icon: '../../images/nav1.png',
                        label: 'jqx.energyblue.css'
                    }, {
                        icon: '../../images/nav1.png',
                        label: 'jqx.orange.css'
                    }]
            }, {
                    icon: '../../images/folder.png',
                    label: 'scripts',
                    items: [{
                        icon: '../../images/nav1.png',
                        label: 'jqxcore.js'
                    }, {
                            icon: '../../images/nav1.png',
                            label: 'jqxdata.js'
                        }, {
                            icon: '../../images/nav1.png',
                            label: 'jqxgrid.js'
                        }]
                }, {
                    icon: '../../images/nav1.png',
                    label: 'index.htm'
                }]
        }];

        self.treeSettings = {
            width: '100%',
            height: '100%',
            source: self.source
        };
        // the 'layout' JSON array defines the internal structure of the layout
        var layout = [{
            type: 'layoutGroup',
            orientation: 'horizontal',
            items: [{
                type: 'autoHideGroup',
                alignment: 'left',
                width: 80,
                unpinnedWidth: 200,
                items: [{
                    type: 'layoutPanel',
                    title: 'Toolbox',
                    contentContainer: 'ToolboxPanel'
                }, {
                        type: 'layoutPanel',
                        title: 'Help',
                        contentContainer: 'HelpPanel'
                    }]
            }, {
                    type: 'layoutGroup',
                    orientation: 'vertical',
                    width: 500,
                    items: [{
                        type: 'documentGroup',
                        height: 400,
                        minHeight: 200,
                        items: [{
                            type: 'documentPanel',
                            title: 'Document 1',
                            contentContainer: 'Document1Panel'
                        }, {
                                type: 'documentPanel',
                                title: 'Document 2',
                                contentContainer: 'Document2Panel'
                            }]
                    }, {
                            type: 'tabbedGroup',
                            height: 200,
                            pinnedHeight: 30,
                            items: [{
                                type: 'layoutPanel',
                                title: 'Error List',
                                contentContainer: 'ErrorListPanel'
                            }, {
                                    type: 'layoutPanel',
                                    title: 'Output',
                                    contentContainer: 'OutputPanel',
                                    selected: true
                                }]
                        }]
                }, {
                    type: 'tabbedGroup',
                    width: 220,
                    minWidth: 200,
                    items: [{
                        type: 'layoutPanel',
                        title: 'Solution Explorer',
                        contentContainer: 'SolutionExplorerPanel',
                        initContent: function ()
                        {              
                            let myTree: jqxTreeComponent = new jqxTreeComponent(new ElementRef(document.getElementById("Tree")));
                            myTree.createWidget(self.treeSettings);
                        }
                    },
                        {
                            type: 'layoutPanel',
                            title: 'Properties',
                            contentContainer: 'PropertiesPanel'
                        }]
                }]
        }];

        this.settings = {
            width: 800,
            height: 600,
            layout: layout
        };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myLayout.createWidget(this.settings);
    }
}