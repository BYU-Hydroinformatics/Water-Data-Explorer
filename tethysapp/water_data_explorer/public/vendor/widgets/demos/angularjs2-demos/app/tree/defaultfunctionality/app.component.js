System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxexpander', '../../../../../jqwidgets-ts/angular_jqxtree'], function(exports_1, context_1) {
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
    var core_1, angular_jqxexpander_1, angular_jqxtree_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxexpander_1_1) {
                angular_jqxexpander_1 = angular_jqxexpander_1_1;
            },
            function (angular_jqxtree_1_1) {
                angular_jqxtree_1 = angular_jqxtree_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.source = new Array();
                    this.flag = false;
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
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.expander.createWidget(this.expanderSettings);
                    this.tree.createWidget(this.treeSettings);
                    this.tree.selectItem(null);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxexpander_1.jqxExpanderComponent), 
                    __metadata('design:type', angular_jqxexpander_1.jqxExpanderComponent)
                ], AppComponent.prototype, "expander", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxtree_1.jqxTreeComponent), 
                    __metadata('design:type', angular_jqxtree_1.jqxTreeComponent)
                ], AppComponent.prototype, "tree", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n            <angularExpander>\n            <div>\n                Folders\n            </div>\n            <div style=\"overflow: hidden;\">\n                <angularTree></angularTree>\n            </div>\n        </angularExpander>\n    ",
                        styles: ["\n        angularTree > div:first-child\n        {\n            height: 100%;\n            border: none;\n        }\n    "],
                        directives: [angular_jqxexpander_1.jqxExpanderComponent, angular_jqxtree_1.jqxTreeComponent],
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map