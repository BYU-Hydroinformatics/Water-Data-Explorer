System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxbuttongroup', '../../../../../jqwidgets-ts/angular_jqxradiobutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxbuttongroup_1, angular_jqxradiobutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxbuttongroup_1_1) {
                angular_jqxbuttongroup_1 = angular_jqxbuttongroup_1_1;
            },
            function (angular_jqxradiobutton_1_1) {
                angular_jqxradiobutton_1 = angular_jqxradiobutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        mode: 'default',
                        width: '300px'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myButtonGroup.createWidget(this.settings);
                    this.myDefaultModeRadioButton.createWidget({});
                    this.myRadioModeRadioButton.createWidget({});
                    this.myCheckBoxModeRadioButton.createWidget({});
                    this.myDefaultModeRadioButton.check();
                };
                AppComponent.prototype.DefaltModeSelected = function () {
                    this.myButtonGroup.setOptions({ mode: 'default' });
                };
                AppComponent.prototype.CheckBoxModeSelected = function () {
                    this.myButtonGroup.setOptions({ mode: 'checkbox' });
                };
                AppComponent.prototype.RadioModeSelected = function () {
                    this.myButtonGroup.setOptions({ mode: 'radio' });
                };
                AppComponent.prototype.ButtonGroupOnClick = function (event) {
                    var clickedButton = event.args.button;
                    document.getElementById("log").innerHTML = "Clicked: " + clickedButton[0].id;
                };
                __decorate([
                    core_1.ViewChild(angular_jqxbuttongroup_1.jqxButtonGroupComponent), 
                    __metadata('design:type', angular_jqxbuttongroup_1.jqxButtonGroupComponent)
                ], AppComponent.prototype, "myButtonGroup", void 0);
                __decorate([
                    core_1.ViewChild('DefaultMode'), 
                    __metadata('design:type', angular_jqxradiobutton_1.jqxRadioButtonComponent)
                ], AppComponent.prototype, "myDefaultModeRadioButton", void 0);
                __decorate([
                    core_1.ViewChild('RadioMode'), 
                    __metadata('design:type', angular_jqxradiobutton_1.jqxRadioButtonComponent)
                ], AppComponent.prototype, "myRadioModeRadioButton", void 0);
                __decorate([
                    core_1.ViewChild('CheckBoxMode'), 
                    __metadata('design:type', angular_jqxradiobutton_1.jqxRadioButtonComponent)
                ], AppComponent.prototype, "myCheckBoxModeRadioButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<angularButtonGroup (OnButtonClick)=\"ButtonGroupOnClick($event)\">\n                    <button style=\"padding:4px 16px;\" id=\"Left\">Left</button>\n                    <button style=\"padding:4px 16px;\" id= \"Center\">Center</button>\n                    <button style= \"padding:4px 16px;\" id= \"Right\">Right</button>\n                </angularButtonGroup>\n                <h4>Modes</h4>\n                <angularRadioButton (OnChecked)=\"DefaltModeSelected($event)\" #DefaultMode>Default</angularRadioButton>\n                <angularRadioButton (OnChecked)=\"RadioModeSelected($event)\" #RadioMode>RadioButtons</angularRadioButton>\n                <angularRadioButton (OnChecked)=\"CheckBoxModeSelected($event)\" #CheckBoxMode>CheckBoxes</angularRadioButton>   \n                <div id=\"log\" style=\"margin-top: 10px;\"></div>",
                        directives: [angular_jqxbuttongroup_1.jqxButtonGroupComponent, angular_jqxradiobutton_1.jqxRadioButtonComponent]
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