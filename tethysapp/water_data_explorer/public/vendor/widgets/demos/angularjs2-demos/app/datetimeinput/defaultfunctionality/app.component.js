System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdatetimeinput'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdatetimeinput_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdatetimeinput_1_1) {
                angular_jqxdatetimeinput_1 = angular_jqxdatetimeinput_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.dateInputSettings = {
                        width: '300px', height: '25px'
                    };
                    this.timeInputSettings = {
                        formatString: "T", showTimeButton: true, showCalendarButton: false, width: '300px', height: '25px'
                    };
                    this.dateTimeInputSettings = {
                        formatString: "F", showTimeButton: true, width: '300px', height: '25px'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myDateInput.createWidget(this.dateInputSettings);
                    this.myTimeInput.createWidget(this.timeInputSettings);
                    this.myDateTimeInput.createWidget(this.dateTimeInputSettings);
                };
                __decorate([
                    core_1.ViewChild('dateInput'), 
                    __metadata('design:type', angular_jqxdatetimeinput_1.jqxDateTimeInputComponent)
                ], AppComponent.prototype, "myDateInput", void 0);
                __decorate([
                    core_1.ViewChild('timeInput'), 
                    __metadata('design:type', angular_jqxdatetimeinput_1.jqxDateTimeInputComponent)
                ], AppComponent.prototype, "myTimeInput", void 0);
                __decorate([
                    core_1.ViewChild('dateTimeInput'), 
                    __metadata('design:type', angular_jqxdatetimeinput_1.jqxDateTimeInputComponent)
                ], AppComponent.prototype, "myDateTimeInput", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<label>Date Input</label>\n                <angularDateTimeInput #dateInput></angularDateTimeInput><br />\n                <label>Time Input</label>\n                <angularDateTimeInput #timeInput></angularDateTimeInput><br />\n                <label>Date Time Input</label>\n                <angularDateTimeInput #dateTimeInput></angularDateTimeInput>",
                        directives: [angular_jqxdatetimeinput_1.jqxDateTimeInputComponent]
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