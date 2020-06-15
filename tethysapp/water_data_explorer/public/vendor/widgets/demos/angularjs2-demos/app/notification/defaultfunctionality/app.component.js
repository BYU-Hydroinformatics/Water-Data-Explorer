System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxnotification', '../../../../../jqwidgets-ts/angular_jqxbutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxnotification_1, angular_jqxbutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxnotification_1_1) {
                angular_jqxnotification_1 = angular_jqxnotification_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    var self = this;
                    this.msgNotificationSettings = {
                        width: 250, position: "top-right", opacity: 0.9,
                        autoOpen: false, animationOpenDelay: 800,
                        autoClose: true, autoCloseDelay: 3000,
                        template: "info"
                    };
                    this.timeNotificationSettings = {
                        width: 250, position: "top-right", opacity: 0.9,
                        autoOpen: false, animationOpenDelay: 800,
                        autoClose: true, autoCloseDelay: 3000,
                        template: "time"
                    };
                    this.buttonsSettings = { width: 230, height: 30 };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                        document.getElementsByTagName('angularButton')[0].firstElementChild.style.boxSizing = 'border-box';
                        document.getElementsByTagName('angularButton')[0].firstElementChild.style.paddingTop = '5px';
                        document.getElementsByTagName('angularButton')[1].firstElementChild.style.boxSizing = 'border-box';
                        document.getElementsByTagName('angularButton')[1].firstElementChild.style.paddingTop = '5px';
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.msgNotification.createWidget(this.msgNotificationSettings);
                    this.timeNotification.createWidget(this.timeNotificationSettings);
                    this.openMessageNotificationButton.createWidget(this.buttonsSettings);
                    this.openTimeNotificationButton.createWidget(this.buttonsSettings);
                };
                AppComponent.prototype.OnClickOpenMessageNotification = function () {
                    this.msgNotification.open();
                };
                AppComponent.prototype.OnClickOpenTimeNotification = function () {
                    var date = new Date();
                    var minutes = date.getMinutes();
                    var minutesString = '';
                    if (minutes < 10) {
                        minutesString = "0" + minutes;
                    }
                    else {
                        minutesString = "" + minutes;
                    }
                    var seconds = date.getSeconds();
                    var secondsString = '';
                    if (seconds < 10) {
                        secondsString = "0" + seconds;
                    }
                    else {
                        secondsString = "" + seconds;
                    }
                    var timeSpan = document.getElementById('currentTime');
                    timeSpan.innerText = date.getHours() + ":" + minutesString + ":" + secondsString;
                    this.timeNotification.open();
                };
                __decorate([
                    core_1.ViewChild('msgNotification'), 
                    __metadata('design:type', angular_jqxnotification_1.jqxNotificationComponent)
                ], AppComponent.prototype, "msgNotification", void 0);
                __decorate([
                    core_1.ViewChild('timeNotification'), 
                    __metadata('design:type', angular_jqxnotification_1.jqxNotificationComponent)
                ], AppComponent.prototype, "timeNotification", void 0);
                __decorate([
                    core_1.ViewChild('openMessageNotification'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "openMessageNotificationButton", void 0);
                __decorate([
                    core_1.ViewChild('openTimeNotification'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "openTimeNotificationButton", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/notification/defaultfunctionality/app.component.htm',
                        directives: [angular_jqxnotification_1.jqxNotificationComponent, angular_jqxbutton_1.jqxButtonComponent]
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