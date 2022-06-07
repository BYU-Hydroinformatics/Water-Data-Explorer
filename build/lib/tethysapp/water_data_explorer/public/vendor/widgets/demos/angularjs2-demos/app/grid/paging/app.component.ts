/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxGridComponent } from '../../../../../jqwidgets-ts/angular_jqxgrid';
import { jqxPanelComponent } from '../../../../../jqwidgets-ts/angular_jqxpanel';

@Component({
    selector: 'my-app',
    template: `
<angularGrid (OnPagechanged)="Pagechanged($event)" (OnPagesizechanged)="Pagesizechanged($event)"></angularGrid>
<div id="eventslog" style="display: none; margin-top: 30px;">
    <div style="float: left;">
        Event Log:
        <angularPanel></angularPanel>
        <div style="border: none;" id="events">
        </div>
    </div>
    <div style="float: left;">
        Paging Details:
        <div id="paginginfo">
        </div>
    </div>
</div>
`,
    directives: [jqxGridComponent, jqxPanelComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxGridComponent) myGrid: jqxGridComponent;
    @ViewChild(jqxPanelComponent) eventsLogPanel: jqxPanelComponent;

    settings: jqwidgets.GridOptions;
    flag: Boolean = false;
    panelSettings: jqwidgets.PanelOptions;
    url = "../sampledata/orders.xml";
    source =
    {
        datatype: "xml",
        datafields: [
            { name: 'ShippedDate', map: 'm\\:properties>d\\:ShippedDate', type: 'date' },
            { name: 'Freight', map: 'm\\:properties>d\\:Freight', type: 'float' },
            { name: 'ShipName', map: 'm\\:properties>d\\:ShipName' },
            { name: 'ShipAddress', map: 'm\\:properties>d\\:ShipAddress' },
            { name: 'ShipCity', map: 'm\\:properties>d\\:ShipCity' },
            { name: 'ShipCountry', map: 'm\\:properties>d\\:ShipCountry' }
        ],
        root: "entry",
        record: "content",
        id: 'm\\:properties>d\\:OrderID',
        url: this.url,
        pager: function (pagenum, pagesize, oldpagenum)
        {
            // callback called when a page or page size is changed.
        }
    };
    dataAdapter = new $.jqx.dataAdapter(this.source);

    constructor()
    {
        this.settings = {
            width: 850,
            source: this.dataAdapter,
            selectionmode: 'multiplerowsextended',
            sortable: true,
            pageable: true,
            autoheight: true,
            columnsresize: true,
            columns: [
                { text: 'Ship Name', datafield: 'ShipName', width: 250 },
                { text: 'Shipped Date', datafield: 'ShippedDate', width: 230, cellsformat: 'D' },
                { text: 'Freight', datafield: 'Freight', width: 130, cellsformat: 'F2', cellsalign: 'right' },
                { text: 'Ship Address', datafield: 'ShipAddress', width: 350 },
                { text: 'Ship City', datafield: 'ShipCity', width: 100 },
                { text: 'Ship Country', datafield: 'ShipCountry', width: 101 }
            ]
        };

        this.panelSettings = { width: 300, height: 300 };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            var self = this;
            self.Initialize();
            // Set style on the Panel
            var panel = <HTMLElement>document.getElementsByTagName('angularPanel')[0].firstElementChild;
            panel.style.border = 'none';
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myGrid.createWidget(this.settings);
        this.eventsLogPanel.createWidget(this.panelSettings);
    }

    Pagechanged(event): void
    {
        document.getElementById('eventslog').style.display = 'block';;
        var loggedElements = document.getElementsByClassName('logged');
        if (loggedElements.length >= 5)
        {
            this.eventsLogPanel.clearcontent();
        }
        var args = event.args;
        var eventData = "pagechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + "</div>";
        this.eventsLogPanel.prepend('<div class="logged" style="margin-top: 5px;">' + eventData + '</div>');
        // get page information.
        var paginginformation = this.myGrid.getpaginginformation();
        var paginginfoDom = document.getElementById('paginginfo');
        paginginfoDom.innerHTML = "<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>";
    }

    Pagesizechanged(event): void
    {
        document.getElementById('eventslog').style.display = 'block';
        this.eventsLogPanel.clearcontent();
        var args = event.args;
        var eventData = "pagesizechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + ", Old Page Size: " + args.oldpagesize + "</div>";
        this.eventsLogPanel.prepend('<div style="margin-top: 5px;">' + eventData + '</div>');
        // get page information.
        var paginginformation = this.myGrid.getpaginginformation();
        var paginginfoDom = document.getElementById('paginginfo');
        paginginfoDom.innerHTML = "<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>";
    }
}