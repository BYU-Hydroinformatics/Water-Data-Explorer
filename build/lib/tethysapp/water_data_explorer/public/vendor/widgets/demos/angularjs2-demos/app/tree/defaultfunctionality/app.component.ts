/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import {jqxExpanderComponent} from '../../../../../jqwidgets-ts/angular_jqxexpander';
import {jqxTreeComponent} from '../../../../../jqwidgets-ts/angular_jqxtree';

@Component({
    selector: 'my-app',
    template: `
            <angularExpander>
            <div>
                Folders
            </div>
            <div style="overflow: hidden;">
                <angularTree></angularTree>
            </div>
        </angularExpander>
    `,
    styles: [`
        angularTree > div:first-child
        {
            height: 100%;
            border: none;
        }
    `],
    directives: [jqxExpanderComponent, jqxTreeComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxExpanderComponent) expander: jqxExpanderComponent;
    @ViewChild(jqxTreeComponent) tree: jqxTreeComponent;

    expanderSettings: jqwidgets.ExpanderOptions;
    treeSettings: jqwidgets.TreeOptions;
    source = new Array();
    flag: Boolean = false;

    constructor() {

        this.expanderSettings = {
            width: '300px',
            height: '370px',
            showArrow: false,
            toggleMode: 'none'
        };

        this.source = [
            {
                icon: "../../images/mailIcon.png", label: "Mail", expanded: true, items: [
                    { icon: "../../images/calendarIcon.png", label: "Calendar" },
                    { icon: "../../images/contactsIcon.png", label: "Contacts", selected: true }
                ]
            },
            {
                icon: "../../images/folder.png", label: "Inbox", expanded: true, items: [
                    { icon: "../../images/folder.png", label: "Admin" },
                    { icon: "../../images/folder.png", label: "Corporate" },
                    { icon: "../../images/folder.png", label: "Finance" },
                    { icon: "../../images/folder.png", label: "Other" },
                ]
            },
            { icon: "../../images/recycle.png", label: "Deleted Items" },
            { icon: "../../images/notesIcon.png", label: "Notes" },
            { iconsize: 14, icon: "../../images/settings.png", label: "Settings" },
            { icon: "../../images/favorites.png", label: "Favorites" }
        ];
        this.treeSettings = {
            width: '100%',
            height: '100%',
            source: this.source
        }
    }


    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.expander.createWidget(this.expanderSettings);
        this.tree.createWidget(this.treeSettings);
        this.tree.selectItem(null);
    }
}
