System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxcombobox'], function(exports_1, context_1) {
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
    var core_1, angular_jqxcombobox_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxcombobox_1_1) {
                angular_jqxcombobox_1 = angular_jqxcombobox_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.source = new Array();
                    this.flag = false;
                    for (var i = 0; i < 10; i++) {
                        var movie = 'avatar.png';
                        var title = 'Avatar';
                        var year = 2009;
                        switch (i) {
                            case 1:
                                movie = 'endgame.png';
                                title = 'End Game';
                                year = 2006;
                                break;
                            case 2:
                                movie = 'priest.png';
                                title = 'Priest';
                                year = 2011;
                                break;
                            case 3:
                                movie = 'unknown.png';
                                title = 'Unknown';
                                year = 2011;
                                break;
                            case 4:
                                movie = 'unstoppable.png';
                                title = 'Unstoppable';
                                year = 2010;
                                break;
                            case 5:
                                movie = 'twilight.png';
                                title = 'Twilight';
                                year = 2008;
                                break;
                            case 6:
                                movie = 'kungfupanda.png';
                                title = 'Kung Fu Panda';
                                year = 2008;
                                break;
                            case 7:
                                movie = 'knockout.png';
                                title = 'Knockout';
                                year = 2011;
                                break;
                            case 8:
                                movie = 'theplane.png';
                                title = 'The Plane';
                                year = 2010;
                                break;
                            case 9:
                                movie = 'bigdaddy.png';
                                title = 'Big Daddy';
                                year = 1999;
                                break;
                        }
                        var html = "<div style='padding: 0px; margin: 0px; height: 95px; float: left;'><img width='60'" +
                            "style='float: left; margin-top: 4px; margin-right: 15px;' src='../../images/" + movie
                            + "'/><div style='margin-top: 10px; font-size: 13px;'>" + "<b>Title</b><div>" + title +
                            "</div><div style='margin-top: 10px;'><b>Year</b><div>" + year.toString() + "</div></div></div>";
                        this.source[i] = { html: html, title: title };
                    }
                    this.settings = {
                        source: this.source,
                        selectedIndex: 0,
                        width: '250',
                        height: '25px'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myComboBox.createWidget(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxcombobox_1.jqxComboBoxComponent), 
                    __metadata('design:type', angular_jqxcombobox_1.jqxComboBoxComponent)
                ], AppComponent.prototype, "myComboBox", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<angularComboBox></angularComboBox>",
                        directives: [angular_jqxcombobox_1.jqxComboBoxComponent]
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