System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxtagcloud'], function(exports_1, context_1) {
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
    var core_1, angular_jqxtagcloud_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxtagcloud_1_1) {
                angular_jqxtagcloud_1 = angular_jqxtagcloud_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.data = new Array();
                    this.flag = false;
                    this.data.push({ countryName: "Australia", technologyRating: 35 }, { countryName: "United States", technologyRating: 60 }, { countryName: "Germany", technologyRating: 55 }, { countryName: "Brasil", technologyRating: 20 }, { countryName: "United Kingdom", technologyRating: 50 }, { countryName: "Japan", technologyRating: 80 });
                    this.source = {
                        localdata: this.data,
                        datatype: "array",
                        datafields: [
                            { name: 'countryName' },
                            { name: 'technologyRating' }
                        ]
                    };
                    var dataAdapter = new $.jqx.dataAdapter(this.source, {});
                    this.settings = {
                        width: '600px',
                        source: dataAdapter,
                        displayMember: 'countryName',
                        valueMember: 'technologyRating'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.tagCloud.createWidget(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxtagcloud_1.jqxTagCloudComponent), 
                    __metadata('design:type', angular_jqxtagcloud_1.jqxTagCloudComponent)
                ], AppComponent.prototype, "tagCloud", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: '<angularTagCloud></angularTagCloud>',
                        directives: [angular_jqxtagcloud_1.jqxTagCloudComponent]
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