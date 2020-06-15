System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdropdownbutton', '../../../../../jqwidgets-ts/angular_jqxtree', '../../../../../jqwidgets-ts/angular_jqxcheckbox'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdropdownbutton_1, angular_jqxtree_1, angular_jqxcheckbox_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdropdownbutton_1_1) {
                angular_jqxdropdownbutton_1 = angular_jqxdropdownbutton_1_1;
            },
            function (angular_jqxtree_1_1) {
                angular_jqxtree_1 = angular_jqxtree_1_1;
            },
            function (angular_jqxcheckbox_1_1) {
                angular_jqxcheckbox_1 = angular_jqxcheckbox_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.DropDownButtonSettings = {
                        width: 150, height: 25
                    };
                    this.TreeSettings = {
                        width: 200
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                        this.myDropDownButton.setContent('<div style= "position: relative; margin-left: 3px; margin-top: 5px;">Home</div>');
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myDropDownButton.createWidget(this.DropDownButtonSettings);
                    this.myTree.createWidget(this.TreeSettings);
                    this.myCheckBox.createWidget({});
                };
                AppComponent.prototype.TreeOnSelect = function (event) {
                    var args = event.args;
                    var item = this.myTree.getItem(args.element);
                    var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
                    this.myDropDownButton.setContent(dropDownContent);
                };
                AppComponent.prototype.CheckBoxOnChange = function (event) {
                    var DropDownButtonAutoOpen = {
                        autoOpen: event.args.checked
                    };
                    this.myDropDownButton.setOptions(DropDownButtonAutoOpen);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxdropdownbutton_1.jqxDropDownButtonComponent), 
                    __metadata('design:type', angular_jqxdropdownbutton_1.jqxDropDownButtonComponent)
                ], AppComponent.prototype, "myDropDownButton", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxtree_1.jqxTreeComponent), 
                    __metadata('design:type', angular_jqxtree_1.jqxTreeComponent)
                ], AppComponent.prototype, "myTree", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxcheckbox_1.jqxCheckBoxComponent), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "myCheckBox", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: "app/dropdownbutton/defaultfunctionality/app.component.htm",
                        directives: [angular_jqxdropdownbutton_1.jqxDropDownButtonComponent, angular_jqxtree_1.jqxTreeComponent, angular_jqxcheckbox_1.jqxCheckBoxComponent]
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