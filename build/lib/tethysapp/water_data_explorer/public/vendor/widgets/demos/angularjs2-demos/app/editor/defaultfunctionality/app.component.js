System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxeditor'], function(exports_1, context_1) {
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
    var core_1, angular_jqxeditor_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxeditor_1_1) {
                angular_jqxeditor_1 = angular_jqxeditor_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                        document.getElementsByTagName('angularEditor')[0].childNodes[0].style.width = '800px';
                        document.getElementsByTagName('angularEditor')[0].childNodes[0].style.height = '400px';
                        document.getElementsByClassName('jqx-editor-content')[0].style.height = '91%';
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myEditor.createWidget({});
                };
                __decorate([
                    core_1.ViewChild(angular_jqxeditor_1.jqxEditorComponent), 
                    __metadata('design:type', angular_jqxeditor_1.jqxEditorComponent)
                ], AppComponent.prototype, "myEditor", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: "app/editor/defaultfunctionality/app.component.htm",
                        directives: [angular_jqxeditor_1.jqxEditorComponent]
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