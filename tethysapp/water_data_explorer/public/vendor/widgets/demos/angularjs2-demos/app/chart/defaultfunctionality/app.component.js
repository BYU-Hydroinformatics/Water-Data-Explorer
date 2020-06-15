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
                    this.source = {
                        datatype: "csv",
                        datafields: [
                            { name: 'Date' },
                            { name: 'S&P 500' },
                            { name: 'NASDAQ' }
                        ],
                        url: '../../demos/sampledata/nasdaq_vs_sp500.txt'
                    };
                    this.dataAdapter = new $.jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + this.source.url + '" : ' + error); } });
                    this.settings = {
                        title: "U.S. Stock Market Index Performance",
                        description: "NASDAQ Composite compared to S&P 500",
                        enableAnimations: true,
                        showLegend: true,
                        padding: { left: 10, top: 5, right: 10, bottom: 5 },
                        titlePadding: { left: 50, top: 0, right: 0, bottom: 10 },
                        source: this.dataAdapter,
                        xAxis: {
                            dataField: 'Date',
                            type: 'date',
                            baseUnit: 'month',
                            valuesOnTicks: true,
                            minValue: '01-01-2014',
                            maxValue: '01-01-2015',
                            tickMarks: {
                                visible: true,
                                interval: 1,
                                color: '#BCBCBC'
                            },
                            unitInterval: 1,
                            gridLines: {
                                visible: true,
                                interval: 3,
                                color: '#BCBCBC'
                            },
                            labels: {
                                angle: -45,
                                rotationPoint: 'topright',
                                offset: { x: 0, y: -25 }
                            }
                        },
                        valueAxis: {
                            visible: true,
                            title: { text: 'Daily Closing Price<br>' },
                            tickMarks: { color: '#BCBCBC' }
                        },
                        colorScheme: 'scheme04',
                        seriesGroups: [
                            {
                                type: 'line',
                                series: [
                                    { dataField: 'S&P 500', displayText: 'S&P 500' },
                                    { dataField: 'NASDAQ', displayText: 'NASDAQ' }
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