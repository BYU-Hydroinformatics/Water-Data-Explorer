/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxrating'], function(exports_1, context_1) {
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
    var core_1, angular_jqxrating_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxrating_1_1) {
                angular_jqxrating_1 = angular_jqxrating_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.theme = 'arctic';
                    this.flag = false;
                    this.settings = {
                        width: 350,
                        height: 35,
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnChange = function (event) {
                    document.getElementById('rate').innerHTML = '<span>' + event.value + '</span';
                };
                AppComponent.prototype.Initialize = function () {
                    this.childcmp.createWidget(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxrating_1.jqxRatingComponent), 
                    __metadata('design:type', angular_jqxrating_1.jqxRatingComponent)
                ], AppComponent.prototype, "childcmp", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <div id=\"jqxWidget\">\n        <angularRating (OnChange)=\"OnChange($event)\"></angularRating><br>\n        <div style=\"margin-top: 10px;\">\n            <div style=\"float: left;\">Rating:</div>\n            <div id=\"rate\"></div>\n        </div>\n    </div>\n    ",
                        styles: ["\n    #jqxWidget\n        {\n            font-size: 13px;\n            font-family: Verdana;\n        }\n    #rate\n    {\n        float: left;\n    }\n    "],
                        directives: [angular_jqxrating_1.jqxRatingComponent]
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