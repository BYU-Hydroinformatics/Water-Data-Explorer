System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxscheduler'], function(exports_1, context_1) {
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
    var core_1, angular_jqxscheduler_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxscheduler_1_1) {
                angular_jqxscheduler_1 = angular_jqxscheduler_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.appointments = new Array();
                    this.appointment1 = {
                        id: "id1",
                        description: "George brings projector for presentations.",
                        location: "",
                        subject: "Quarterly Project Review Meeting",
                        calendar: "Room 1",
                        start: new Date(2016, 10, 23, 9, 0, 0),
                        end: new Date(2016, 10, 23, 16, 0, 0)
                    };
                    this.appointment2 = {
                        id: "id2",
                        description: "",
                        location: "",
                        subject: "IT Group Mtg.",
                        calendar: "Room 2",
                        start: new Date(2016, 10, 24, 10, 0, 0),
                        end: new Date(2016, 10, 24, 15, 0, 0)
                    };
                    this.appointment3 = {
                        id: "id3",
                        description: "",
                        location: "",
                        subject: "Course Social Media",
                        calendar: "Room 1",
                        start: new Date(2016, 10, 27, 11, 0, 0),
                        end: new Date(2016, 10, 27, 13, 0, 0)
                    };
                    this.appointment4 = {
                        id: "id4",
                        description: "",
                        location: "",
                        subject: "New Projects Planning",
                        calendar: "Room 2",
                        start: new Date(2016, 10, 23, 0, 0, 0),
                        end: new Date(2016, 10, 25, 23, 59, 59)
                    };
                    this.appointment5 = {
                        id: "id5",
                        description: "",
                        location: "",
                        subject: "Interview with James",
                        calendar: "Room 1",
                        start: new Date(2016, 10, 25, 15, 0, 0),
                        end: new Date(2016, 10, 25, 17, 0, 0)
                    };
                    this.appointment6 = {
                        id: "id6",
                        description: "",
                        location: "",
                        subject: "Interview with Nancy",
                        calendar: "Room 2",
                        start: new Date(2016, 10, 26, 14, 0, 0),
                        end: new Date(2016, 10, 26, 16, 0, 0)
                    };
                    this.flag = false;
                    this.appointments.push(this.appointment1);
                    this.appointments.push(this.appointment2);
                    this.appointments.push(this.appointment3);
                    this.appointments.push(this.appointment4);
                    this.appointments.push(this.appointment5);
                    this.appointments.push(this.appointment6);
                    this.source = {
                        dataType: "array",
                        dataFields: [
                            { name: 'id', type: 'string' },
                            { name: 'description', type: 'string' },
                            { name: 'location', type: 'string' },
                            { name: 'subject', type: 'string' },
                            { name: 'calendar', type: 'string' },
                            { name: 'start', type: 'date' },
                            { name: 'end', type: 'date' }
                        ],
                        id: 'id',
                        localData: this.appointments
                    };
                    var adapter = new $.jqx.dataAdapter(this.source);
                    this.schedulerSettings = {
                        date: new $.jqx.date(2016, 11, 23),
                        width: 800,
                        height: 600,
                        dayNameFormat: "abbr",
                        source: adapter,
                        showLegend: true,
                        appointmentDataFields: {
                            from: "start",
                            to: "end",
                            id: "id",
                            description: "description",
                            location: "place",
                            subject: "subject",
                            resourceId: "calendar",
                        },
                        resources: {
                            colorScheme: "scheme05",
                            dataField: "calendar",
                            orientation: "horizontal",
                            source: new $.jqx.dataAdapter(this.source)
                        },
                        view: 'weekView',
                        views: [
                            { type: 'dayView', showWeekends: false },
                            { type: 'weekView', showWeekends: false },
                            { type: 'monthView' }
                        ]
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.scheduler.createWidget(this.schedulerSettings);
                    this.scheduler.ensureAppointmentVisible('id1');
                };
                __decorate([
                    core_1.ViewChild(angular_jqxscheduler_1.jqxSchedulerComponent), 
                    __metadata('design:type', angular_jqxscheduler_1.jqxSchedulerComponent)
                ], AppComponent.prototype, "scheduler", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<angularScheduler></angularScheduler>",
                        directives: [angular_jqxscheduler_1.jqxSchedulerComponent]
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