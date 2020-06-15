System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxcheckbox'], function(exports_1, context_1) {
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
    var core_1, angular_jqxcheckbox_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxcheckbox_1_1) {
                angular_jqxcheckbox_1 = angular_jqxcheckbox_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        width: 120, height: 25
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.CheckBox1.createWidget(this.settings);
                    this.CheckBox2.createWidget(this.settings);
                    this.CheckBox3.createWidget(this.settings);
                    this.CheckBox4.createWidget(this.settings);
                    this.CheckBox5.createWidget(this.settings);
                    this.CheckBox6.createWidget(this.settings);
                    this.CheckBox7.createWidget(this.settings);
                    this.CheckBox8.createWidget(this.settings);
                    this.CheckBox9.createWidget(this.settings);
                    this.CheckBox10.createWidget(this.settings);
                    this.CheckBox11.createWidget(this.settings);
                    this.CheckBox12.createWidget(this.settings);
                    this.CheckBox13.createWidget(this.settings);
                    this.CheckBox2.setOptions({ checked: true });
                    this.CheckBox10.setOptions({ checked: true });
                    this.CheckBox11.setOptions({ checked: false });
                    this.CheckBox12.setOptions({ hasThreeStates: true, checked: null });
                    this.CheckBox13.setOptions({ disabled: true });
                };
                AppComponent.prototype.CheckBox10OnChange = function (event) {
                    var checked = event.args.checked;
                    if (checked) {
                        document.getElementsByTagName('angularCheckBox')[9].childNodes[0].childNodes.item(2).innerHTML = 'Checked';
                    }
                    else {
                        document.getElementsByTagName('angularCheckBox')[9].childNodes[0].childNodes.item(2).innerHTML = 'Unchecked';
                    }
                };
                AppComponent.prototype.CheckBox11OnChange = function (event) {
                    var checked = event.args.checked;
                    if (checked) {
                        document.getElementsByTagName('angularCheckBox')[10].childNodes[0].childNodes.item(2).innerHTML = 'Checked';
                    }
                    else {
                        document.getElementsByTagName('angularCheckBox')[10].childNodes[0].childNodes.item(2).innerHTML = 'Unchecked';
                    }
                };
                AppComponent.prototype.CheckBox12OnChange = function (event) {
                    var checked = event.args.checked;
                    if (checked) {
                        document.getElementsByTagName('angularCheckBox')[11].childNodes[0].childNodes.item(2).innerHTML = 'Checked';
                    }
                    else if (false == checked) {
                        document.getElementsByTagName('angularCheckBox')[11].childNodes[0].childNodes.item(2).innerHTML = 'Unchecked';
                    }
                    else {
                        document.getElementsByTagName('angularCheckBox')[11].childNodes[0].childNodes.item(2).innerHTML = 'Indeterminate';
                    }
                };
                __decorate([
                    core_1.ViewChild('CheckBox1'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox1", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox2'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox2", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox3'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox3", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox4'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox4", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox5'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox5", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox6'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox6", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox7'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox7", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox8'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox8", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox9'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox9", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox10'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox10", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox11'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox11", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox12'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox12", void 0);
                __decorate([
                    core_1.ViewChild('CheckBox13'), 
                    __metadata('design:type', angular_jqxcheckbox_1.jqxCheckBoxComponent)
                ], AppComponent.prototype, "CheckBox13", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: "app/checkbox/defaultfunctionality/app.component.htm",
                        directives: [angular_jqxcheckbox_1.jqxCheckBoxComponent]
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