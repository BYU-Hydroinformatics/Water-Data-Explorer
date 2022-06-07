System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxChart'], function(exports_1, context_1) {
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
    var core_1, angular_jqxChart_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxChart_1_1) {
                angular_jqxChart_1 = angular_jqxChart_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.sampleData = [
                        { Day: 'Monday', Keith: 30, Erica: 15, George: 25 },
                        { Day: 'Tuesday', Keith: 25, Erica: 25, George: 30 },
                        { Day: 'Wednesday', Keith: 30, Erica: 20, George: 25 },
                        { Day: 'Thursday', Keith: 35, Erica: 25, George: 45 },
                        { Day: 'Friday', Keith: 20, Erica: 20, George: 25 },
                        { Day: 'Saturday', Keith: 30, Erica: 20, George: 30 },
                        { Day: 'Sunday', Keith: 60, Erica: 45, George: 90 }
                    ];
                    this.settings = {
                        title: "Fitness & exercise weekly scorecard",
                        description: "Time spent in vigorous exercise",
                        enableAnimations: true,
                        showLegend: true,
                        padding: { left: 5, top: 5, right: 5, bottom: 5 },
                        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
                        source: this.sampleData,
                        xAxis: {
                            dataField: 'Day',
                            gridLines: {
                                visible: true
                            }
                        },
                        colorScheme: 'scheme01',
                        seriesGroups: [
                            {
                                type: 'column',
                                columnsGapPercent: 50,
                                seriesGapPercent: 0,
                                valueAxis: {
                                    unitInterval: 10,
                                    minValue: 0,
                                    maxValue: 100,
                                    displayValueAxis: true,
                                    description: 'Time in minutes',
                                    axisSize: 'auto',
                                    tickMarksColor: '#888888'
                                },
                                series: [
                                    { dataField: 'Keith', displayText: 'Keith' },
                                    { dataField: 'Erica', displayText: 'Erica' },
                                    { dataField: 'George', displayText: 'George' }
                                ]
                            }
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
                    this.myChart.setOptions(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxChart_1.jqxChartComponent), 
                    __metadata('design:type', angular_jqxChart_1.jqxChartComponent)
                ], AppComponent.prototype, "myChart", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: '<angularChart width="850px" height="500px"></angularChart>',
                        directives: [angular_jqxChart_1.jqxChartComponent]
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