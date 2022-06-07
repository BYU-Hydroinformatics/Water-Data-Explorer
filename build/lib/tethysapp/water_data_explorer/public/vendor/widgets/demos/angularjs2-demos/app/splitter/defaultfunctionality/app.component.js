System.register(['@angular/core', '@angular/http', '../../../../../jqwidgets-ts/angular_jqxsplitter', '../../../../../jqwidgets-ts/angular_jqxexpander', '../../../../../jqwidgets-ts/angular_jqxtree', '../../../../../jqwidgets-ts/angular_jqxpanel', '../../../../../jqwidgets-ts/angular_jqxlistbox', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, angular_jqxsplitter_1, angular_jqxexpander_1, angular_jqxtree_1, angular_jqxpanel_1, angular_jqxlistbox_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular_jqxsplitter_1_1) {
                angular_jqxsplitter_1 = angular_jqxsplitter_1_1;
            },
            function (angular_jqxexpander_1_1) {
                angular_jqxexpander_1 = angular_jqxexpander_1_1;
            },
            function (angular_jqxtree_1_1) {
                angular_jqxtree_1 = angular_jqxtree_1_1;
            },
            function (angular_jqxpanel_1_1) {
                angular_jqxpanel_1 = angular_jqxpanel_1_1;
            },
            function (angular_jqxlistbox_1_1) {
                angular_jqxlistbox_1 = angular_jqxlistbox_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http) {
                    this.treeSettings = {};
                    this.flag = false;
                    this.dataDir = 'app/splitter/defaultfunctionality/data';
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
                    };
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
                    };
                    this.config = {
                        feeds: { 'CNN.com': 'cnn', 'Geek.com': 'geek', 'ScienceDaily': 'sciencedaily' },
                        format: 'txt',
                        dataDir: this.dataDir,
                        feedTree: document.getElementById('jqxTree'),
                        feedItemHeader: document.getElementById('feedItemHeader'),
                        feedUpperPanel: document.getElementById('feedUpperPanel'),
                        feedHeader: document.getElementById('feedHeader'),
                        feedContentArea: document.getElementById('feedContentArea'),
                        selectedIndex: -1,
                        currentFeed: '',
                        currentFeedContent: {}
                    };
                }
                AppComponent.prototype.selectFirst = function () {
                    this.feedListContainer.selectIndex(0);
                    this.loadContent(0);
                };
                AppComponent.prototype.getFeed = function (feed) {
                    this.config['currentFeed'] = feed;
                    if (feed !== undefined) {
                        feed = this.config['dataDir'] + '/' + feed + '.' + this.config['format'];
                        this.loadFeed(feed);
                    }
                };
                AppComponent.prototype.loadFeed = function (feed, callback) {
                    var _this = this;
                    var response;
                    this.http.get(feed)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return response = data; }, function (err) { return console.log(err); }, function () {
                        var channel = response.rss.channel;
                        _this.config['currentFeedContent'] = channel.item;
                        _this.displayFeedList(_this.config['currentFeedContent']);
                        _this.displayFeedHeader(channel.title);
                        _this.selectFirst();
                    });
                };
                AppComponent.prototype.displayFeedHeader = function (header) {
                    this.feedListExpander.setHeaderContent('header');
                };
                AppComponent.prototype.displayFeedList = function (items) {
                    var headers = this.getHeaders(items);
                    this.feedListContainer.setOptions({ source: headers });
                };
                AppComponent.prototype.getHeaders = function (items) {
                    var headers = [], header;
                    for (var i = 0; i < items.length; i += 1) {
                        header = items[i].title;
                        headers.push(header);
                    }
                    return headers;
                };
                AppComponent.prototype.loadContent = function (index) {
                    var item = this.config['currentFeedContent'][index];
                    if (item != null) {
                        this.feedItemContent.clearcontent();
                        this.feedItemContent.prepend('<div style="padding: 1px;"><span>' + item.description + '</span></div>');
                        this.addContentHeaderData(item);
                        this.config['selectedIndex'] = index;
                    }
                };
                AppComponent.prototype.addContentHeaderData = function (item) {
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
                    var container = document.createElement('table');
                    container.style.height = '100%';
                    var element1 = document.createElement('tr');
                    container.appendChild(element1);
                    container.appendChild(document.createElement('td'));
                    container.appendChild(document.createElement('td'));
                    link.href = item.link;
                    document.getElementById('feedItemHeader').innerHTML = null;
                    document.getElementById('feedItemHeader').appendChild(container);
                    container.getElementsByTagName('td')[0].appendChild(link);
                    container.querySelector('td:last-child').appendChild(date);
                    this.feedContentExpander.setHeaderContent(container.outerHTML);
                };
                AppComponent.prototype.OnTreeSelect = function (event) {
                    var item = this.tree.getItem(event.args.element);
                    this.getFeed(this.config['feeds'][item.label]);
                };
                AppComponent.prototype.OnfeedListContainerSelect = function (event) {
                    this.loadContent(event.args.index);
                };
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        //Set Styling on the components
                        document.getElementsByTagName('angularTree')[0].firstElementChild.style.height = '100%';
                        document.getElementsByTagName('angularTree')[0].firstElementChild.className += ' jqx-hideborder';
                        document.getElementById('contentSplitter').firstElementChild.className += ' jqx-hideborder';
                        document.getElementById('feedListExpander').firstElementChild.className += ' jqx-hideborder';
                        document.getElementById('feedListContainer').firstElementChild.className += ' jqx-hideborder';
                        document.getElementById('feedItemContent').firstElementChild.className += ' jqx-hideborder';
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.mainSplitter.createWidget(this.mainSplitterSettings);
                    this.contentSplitter.createWidget(this.contentSplitterSettings);
                    this.feedExpander.createWidget(this.feedExpanderSettings);
                    this.feedContentExpander.createWidget(this.feedContentExpanderSettings);
                    this.feedItemContent.createWidget(this.feedItemContentSettings);
                    this.feedListExpander.createWidget(this.feedListExpanderSettings);
                    this.getFeed('sciencedaily');
                };
                __decorate([
                    core_1.ViewChild('mainSplitter'), 
                    __metadata('design:type', angular_jqxsplitter_1.jqxSplitterComponent)
                ], AppComponent.prototype, "mainSplitter", void 0);
                __decorate([
                    core_1.ViewChild('contentSplitter'), 
                    __metadata('design:type', angular_jqxsplitter_1.jqxSplitterComponent)
                ], AppComponent.prototype, "contentSplitter", void 0);
                __decorate([
                    core_1.ViewChild('feedExpander'), 
                    __metadata('design:type', angular_jqxexpander_1.jqxExpanderComponent)
                ], AppComponent.prototype, "feedExpander", void 0);
                __decorate([
                    core_1.ViewChild('feedContentExpander'), 
                    __metadata('design:type', angular_jqxexpander_1.jqxExpanderComponent)
                ], AppComponent.prototype, "feedContentExpander", void 0);
                __decorate([
                    core_1.ViewChild('feedListExpander'), 
                    __metadata('design:type', angular_jqxexpander_1.jqxExpanderComponent)
                ], AppComponent.prototype, "feedListExpander", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxtree_1.jqxTreeComponent), 
                    __metadata('design:type', angular_jqxtree_1.jqxTreeComponent)
                ], AppComponent.prototype, "tree", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxpanel_1.jqxPanelComponent), 
                    __metadata('design:type', angular_jqxpanel_1.jqxPanelComponent)
                ], AppComponent.prototype, "feedItemContent", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxlistbox_1.jqxListBoxComponent), 
                    __metadata('design:type', angular_jqxlistbox_1.jqxListBoxComponent)
                ], AppComponent.prototype, "feedListContainer", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/splitter/defaultfunctionality/app.component.htm',
                        styleUrls: ['app/splitter/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxsplitter_1.jqxSplitterComponent, angular_jqxexpander_1.jqxExpanderComponent, angular_jqxtree_1.jqxTreeComponent, angular_jqxpanel_1.jqxPanelComponent, angular_jqxlistbox_1.jqxListBoxComponent],
                        providers: [http_1.HTTP_PROVIDERS],
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], AppComponent);
                return AppComponent;
                var _a;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map