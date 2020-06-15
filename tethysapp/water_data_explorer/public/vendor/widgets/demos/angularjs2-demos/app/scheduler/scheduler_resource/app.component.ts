/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxSchedulerComponent} from '../../../../../jqwidgets-ts/angular_jqxscheduler';

@Component({
    selector: 'my-app',
    template: `<angularScheduler></angularScheduler>`,
    directives: [jqxSchedulerComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxSchedulerComponent) scheduler: jqxSchedulerComponent;

    appointments = new Array();
    schedulerSettings: jqwidgets.SchedulerOptions;
    appointment1 = {
        id: "id1",
        description: "George brings projector for presentations.",
        location: "",
        subject: "Quarterly Project Review Meeting",
        calendar: "Room 1",
        start: new Date(2016, 10, 23, 9, 0, 0),
        end: new Date(2016, 10, 23, 16, 0, 0)
    };
    appointment2 = {
        id: "id2",
        description: "",
        location: "",
        subject: "IT Group Mtg.",
        calendar: "Room 2",
        start: new Date(2016, 10, 24, 10, 0, 0),
        end: new Date(2016, 10, 24, 15, 0, 0)
    };
    appointment3 = {
        id: "id3",
        description: "",
        location: "",
        subject: "Course Social Media",
        calendar: "Room 1",
        start: new Date(2016, 10, 27, 11, 0, 0),
        end: new Date(2016, 10, 27, 13, 0, 0)
    };
    appointment4 = {
        id: "id4",
        description: "",
        location: "",
        subject: "New Projects Planning",
        calendar: "Room 2",
        start: new Date(2016, 10, 23, 0, 0, 0),
        end: new Date(2016, 10, 25, 23, 59, 59)
    };
    appointment5 = {
        id: "id5",
        description: "",
        location: "",
        subject: "Interview with James",
        calendar: "Room 1",
        start: new Date(2016, 10, 25, 15, 0, 0),
        end: new Date(2016, 10, 25, 17, 0, 0)
    };
    appointment6 = {
        id: "id6",
        description: "",
        location: "",
        subject: "Interview with Nancy",
        calendar: "Room 2",
        start: new Date(2016, 10, 26, 14, 0, 0),
        end: new Date(2016, 10, 26, 16, 0, 0)
    };
    source: {};
    flag: Boolean = false;

    constructor() {

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
        }
        var adapter = new $.jqx.dataAdapter(this.source);
        this.schedulerSettings = {
            date: new $.jqx.date(2016, 11, 23),
            width: 800,
            height: 600,
            dayNameFormat: "abbr",
            source: adapter,
            showLegend: true,
            appointmentDataFields:
            {
                from: "start",
                to: "end",
                id: "id",
                description: "description",
                location: "place",
                subject: "subject",
                resourceId: "calendar",
            },
            resources:
            {
                colorScheme: "scheme05",
                dataField: "calendar",
                orientation: "horizontal",
                source: new $.jqx.dataAdapter(this.source)
            },
            view: 'weekView',
            views:
            [
                { type: 'dayView', showWeekends: false },
                { type: 'weekView', showWeekends: false },
                { type: 'monthView' }
            ]
        };
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void {
        this.scheduler.createWidget(this.schedulerSettings);
        this.scheduler.ensureAppointmentVisible('id1');
    }
}
