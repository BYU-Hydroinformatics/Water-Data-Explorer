/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {jqxSplitterComponent} from '../../../../../jqwidgets-ts/angular_jqxsplitter';
import {jqxExpanderComponent} from '../../../../../jqwidgets-ts/angular_jqxexpander';
import {jqxTreeComponent} from '../../../../../jqwidgets-ts/angular_jqxtree';
import {jqxPanelComponent} from '../../../../../jqwidgets-ts/angular_jqxpanel';
import {jqxListBoxComponent} from '../../../../../jqwidgets-ts/angular_jqxlistbox';
import 'rxjs/Rx';

@Component({

    selector: 'my-app',
    templateUrl: 'app/splitter/defaultfunctionality/app.component.htm',
    styleUrls: ['app/splitter/defaultfunctionality/app.component.css'],
    directives: [jqxSplitterComponent, jqxExpanderComponent, jqxTreeComponent, jqxPanelComponent, jqxListBoxComponent],
    providers: [HTTP_PROVIDERS],
})

export class AppComponent implements AfterViewChecked {
    @ViewChild('mainSplitter') mainSplitter: jqxSplitterComponent;
    @ViewChild('contentSplitter') contentSplitter: jqxSplitterComponent;
    @ViewChild('feedExpander') feedExpander: jqxExpanderComponent;
    @ViewChild('feedContentExpander') feedContentExpander: jqxExpanderComponent;
    @ViewChild('feedListExpander') feedListExpander: jqxExpanderComponent;
    @ViewChild(jqxTreeComponent) tree: jqxTreeComponent;
    @ViewChild(jqxPanelComponent) feedItemContent: jqxPanelComponent;
    @ViewChild(jqxListBoxComponent) feedListContainer: jqxListBoxComponent;


    mainSplitterSettings: jqwidgets.SplitterOptions;
    contentSplitterSettings: jqwidgets.SplitterOptions;
    feedExpanderSettings: jqwidgets.ExpanderOptions;
    feedContentExpanderSettings: jqwidgets.ExpanderOptions;
    feedListExpanderSettings: jqwidgets.ExpanderOptions;
    treeSettings: jqwidgets.TreeOptions = {};
    feedItemContentSettings: jqwidgets.PanelOptions;
    feedListContainerSettings: jqwidgets.ListBoxOptions;
    flag: Boolean = false;
    dataDir = 'app/splitter/defaultfunctionality/data';
    config: {};
    http: Http;
    constructor(http: Http) {

        this.http = http;
        this.mainSplitterSettings = {
            width: 850,
            height: 600,
            panels: [{
                size: 200,
                min: 100
            },
                {
                    min: 200,
                    size: 400
                }]
        };
        this.contentSplitterSettings = {
            width: '100%',
            height: '100%',
            orientation: 'horizontal',
            panels: [{
                size: 400,
                min: 100,
                collapsible: false
            },
                {
                    min: 100,
                    collapsible: true
                }]

        };
        var self = this;
        this.feedExpanderSettings = {
            toggleMode: 'none',
            showArrow: false,
            width: "100%",
            height: "100%",
            initContent: function () {
                self.tree.createWidget(self.treeSettings);
            }
        };
        this.feedListContainerSettings = {
            width: '100%',
            height: '100%',
            source: ['1']
        }
        this.feedItemContentSettings = {
            width: '100%',
            height: '100%'
        };
        this.feedContentExpanderSettings = {
            toggleMode: 'none',
            showArrow: false,
            width: "100%",
            height: "100%",
            initContent: function () {
                self.feedItemContent.createWidget(self.feedItemContentSettings);
            }
        };
        this.feedListExpanderSettings = {
            toggleMode: 'none',
            showArrow: false,
            width: "100%",
            height: "100%",
            initContent: function () {
                self.feedListContainer.createWidget(self.feedListContainerSettings);
            }
        }
        this.config = {
            feeds: { 'CNN.com': 'cnn', 'Geek.com': 'geek', 'ScienceDaily': 'sciencedaily' },
            format: 'txt',
            dataDir: this.dataDir,
            feedTree: (<HTMLElement>document.getElementById('jqxTree')),
            feedItemHeader: (<HTMLElement>document.getElementById('feedItemHeader')),
            feedUpperPanel: (<HTMLElement>document.getElementById('feedUpperPanel')),
            feedHeader: (<HTMLElement>document.getElementById('feedHeader')),
            feedContentArea: (<HTMLElement>document.getElementById('feedContentArea')),
            selectedIndex: -1,
            currentFeed: '',
            currentFeedContent: {}
        }
    }

    selectFirst() {
        this.feedListContainer.selectIndex(0);
        this.loadContent(0);
    }

    getFeed(feed) {
        this.config['currentFeed'] = feed;
        if (feed !== undefined) {
            feed = this.config['dataDir'] + '/' + feed + '.' + this.config['format'];
            this.loadFeed(feed);
        }
    }

    loadFeed(feed, callback?: any) {
        var response;
        this.http.get(feed)
            .map(res => res.json())
            .subscribe(
            data => response = data,
            err => console.log(err),
            () => {
                var channel = response.rss.channel;
                this.config['currentFeedContent'] = channel.item;
                this.displayFeedList(this.config['currentFeedContent']);
                this.displayFeedHeader(channel.title);
                this.selectFirst();
            }
            );
    }

    displayFeedHeader(header) {
        this.feedListExpander.setHeaderContent('header');
    }

    displayFeedList(items) {
        var headers = this.getHeaders(items);
        this.feedListContainer.setOptions({ source: headers });
    }

    getHeaders(items) {
        var headers = [], header;
        for (var i = 0; i < items.length; i += 1) {
            header = items[i].title;
            headers.push(header);
        }
        return headers
    }

    loadContent(index) {
        var item = this.config['currentFeedContent'][index];
        if (item != null) {
            this.feedItemContent.clearcontent();
            this.feedItemContent.prepend('<div style="padding: 1px;"><span>' + item.description + '</span></div>');
            this.addContentHeaderData(item);
            this.config['selectedIndex'] = index;
        }
    }

    addContentHeaderData(item) {
        var link = document.createElement('a');
        link.style.whiteSpace = 'nowrap';
        link.style.marginLeft = '15px';
        link.target = '_blank';
        var text = document.createTextNode('Source');
        link.appendChild(text);
        var date = document.createElement('div');
        date.style.whiteSpace = 'nowrap';
        date.style.marginLeft = '30px';
        date.appendChild(document.createTextNode(item.pubDate));
        var container = (<HTMLElement>document.createElement('table'));
        container.style.height = '100%';
        var element1 = (<HTMLElement>document.createElement('tr'));
        container.appendChild(element1);
        container.appendChild(document.createElement('td'));
        container.appendChild(document.createElement('td'));
        link.href = item.link;
        (<HTMLElement>document.getElementById('feedItemHeader')).innerHTML = null;
        (<HTMLElement>document.getElementById('feedItemHeader')).appendChild(container);
        container.getElementsByTagName('td')[0].appendChild(link);
        container.querySelector('td:last-child').appendChild(date);
        this.feedContentExpander.setHeaderContent(container.outerHTML);
    }

    OnTreeSelect(event) {
        var item = this.tree.getItem(event.args.element);
        this.getFeed(this.config['feeds'][item.label]);
    }

    OnfeedListContainerSelect(event) {
        this.loadContent(event.args.index);
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            //Set Styling on the components
            (<HTMLElement>document.getElementsByTagName('angularTree')[0].firstElementChild).style.height = '100%';
            (<HTMLElement>document.getElementsByTagName('angularTree')[0].firstElementChild).className += ' jqx-hideborder';
            (<HTMLElement>document.getElementById('contentSplitter').firstElementChild).className += ' jqx-hideborder';
            (<HTMLElement>document.getElementById('feedListExpander').firstElementChild).className += ' jqx-hideborder';
            (<HTMLElement>document.getElementById('feedListContainer').firstElementChild).className += ' jqx-hideborder';
            (<HTMLElement>document.getElementById('feedItemContent').firstElementChild).className += ' jqx-hideborder';
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void {
        this.mainSplitter.createWidget(this.mainSplitterSettings);
        this.contentSplitter.createWidget(this.contentSplitterSettings);
        this.feedExpander.createWidget(this.feedExpanderSettings);
        this.feedContentExpander.createWidget(this.feedContentExpanderSettings);
        this.feedItemContent.createWidget(this.feedItemContentSettings);
        this.feedListExpander.createWidget(this.feedListExpanderSettings);
        this.getFeed('sciencedaily');
    }
}
