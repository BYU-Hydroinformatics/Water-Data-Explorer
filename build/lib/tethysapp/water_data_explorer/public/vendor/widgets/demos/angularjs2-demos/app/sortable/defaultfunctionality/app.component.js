System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxsortable'], function(exports_1, context_1) {
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
    var core_1, angular_jqxsortable_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxsortable_1_1) {
                angular_jqxsortable_1 = angular_jqxsortable_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        opacity: 0.5
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.loadInfo = function () {
                    var firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven"];
                    var lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan"];
                    var titles = ["Sales Representative", "Vice President, Sales", "Sales Representative", "Sales Representative", "Sales Manager"];
                    var sortableList = '';
                    for (var i = 0; i < firstNames.length; i++) {
                        var imgurl = '../../images/' + firstNames[i].toLowerCase() + '.png';
                        var img = '<img height="50" width="40" src="' + imgurl + '"/>';
                        var element = '<div><table style="min-width: 130px;"><tr><td style="width: 40px;" rowspan="2">' + img + '</td><td>' + firstNames[i] + " " + lastNames[i] + '</td></tr><tr><td>' + titles[i] + '</td></tr></table></div>';
                        sortableList = sortableList + element;
                    }
                    document.getElementsByClassName('jqx-sortable')[0].innerHTML = sortableList;
                };
                AppComponent.prototype.Initialize = function () {
                    this.sortable.createWidget(this.settings);
                    this.loadInfo();
                };
                __decorate([
                    core_1.ViewChild(angular_jqxsortable_1.jqxSortableComponent), 
                    __metadata('design:type', angular_jqxsortable_1.jqxSortableComponent)
                ], AppComponent.prototype, "sortable", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: '<angularSortable></angularSortable>',
                        styles: ["\n            .jqx-sortable {\n                        margin: 2px;\n                        padding: 5px;\n                        float: left;\n                        width: 200px;\n                        border: lightblue solid 1px;\n                    }\n                        .jqx-sortable div {\n                            border-radius: 5px;\n                            padding: 5px;\n                            cursor: pointer;\n                            background-color: white;\n                            color: black;\n                            border: 1px solid transparent;\n                        }\n                            .jqx-sortable div:hover {\n                                border: 1px solid #356AA0;\n                            }        \n            "],
                        directives: [angular_jqxsortable_1.jqxSortableComponent],
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