System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxswitchbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxswitchbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxswitchbutton_1_1) {
                angular_jqxswitchbutton_1 = angular_jqxswitchbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.buttonsClicked = false;
                    // Used to clear the 'Events:' field after the components are loaded.
                    setTimeout(function () {
                        document.getElementById('events').innerHTML = '';
                    }, 305);
                    //settings
                    this.label = {
                        'button1': 'New Mail',
                        'button2': 'Sent Mail',
                        'button3': 'Calendar Alerts',
                        'button4': 'Lock Sounds',
                        'button5': 'Keyboard clicks'
                    };
                    this.buttonSettings = {
                        width: 81,
                        height: 27,
                        checked: true
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnChecked = function (event) {
                    document.getElementById('events').innerHTML = this.label[event.target.parentElement.id] + ': Unchecked';
                };
                AppComponent.prototype.OnUnchecked = function (event) {
                    document.getElementById('events').innerHTML = this.label[event.target.parentElement.id] + ': Checked';
                };
                AppComponent.prototype.Initialize = function () {
                    this.button1.createWidget(this.buttonSettings);
                    this.button2.createWidget(this.buttonSettings);
                    this.button3.createWidget(this.buttonSettings);
                    this.button4.createWidget(this.buttonSettings);
                    this.buttonSettings['checked'] = false;
                    this.button5.createWidget(this.buttonSettings);
                };
                __decorate([
                    core_1.ViewChild('button1'), 
                    __metadata('design:type', angular_jqxswitchbutton_1.jqxSwitchButtonComponent)
                ], AppComponent.prototype, "button1", void 0);
                __decorate([
                    core_1.ViewChild('button2'), 
                    __metadata('design:type', angular_jqxswitchbutton_1.jqxSwitchButtonComponent)
                ], AppComponent.prototype, "button2", void 0);
                __decorate([
                    core_1.ViewChild('button3'), 
                    __metadata('design:type', angular_jqxswitchbutton_1.jqxSwitchButtonComponent)
                ], AppComponent.prototype, "button3", void 0);
                __decorate([
                    core_1.ViewChild('button4'), 
                    __metadata('design:type', angular_jqxswitchbutton_1.jqxSwitchButtonComponent)
                ], AppComponent.prototype, "button4", void 0);
                __decorate([
                    core_1.ViewChild('button5'), 
                    __metadata('design:type', angular_jqxswitchbutton_1.jqxSwitchButtonComponent)
                ], AppComponent.prototype, "button5", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/switchbutton/defaultfunctionality/app.component.htm',
                        styleUrls: ['app/switchbutton/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxswitchbutton_1.jqxSwitchButtonComponent]
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