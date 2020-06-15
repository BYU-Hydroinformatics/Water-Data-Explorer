System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxChart', '../../../../../jqwidgets-ts/angular_jqxslider', '../../../../../jqwidgets-ts/angular_jqxdropdownlist'], function(exports_1, context_1) {
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
    var core_1, angular_jqxChart_1, angular_jqxslider_1, angular_jqxdropdownlist_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxChart_1_1) {
                angular_jqxChart_1 = angular_jqxChart_1_1;
            },
            function (angular_jqxslider_1_1) {
                angular_jqxslider_1 = angular_jqxslider_1_1;
            },
            function (angular_jqxdropdownlist_1_1) {
                angular_jqxdropdownlist_1 = angular_jqxdropdownlist_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.source = {
                        datatype: "tab",
                        datafields: [
                            { name: 'Year' },
                            { name: 'HPI' },
                            { name: 'BuildCost' },
                            { name: 'Population' },
                            { name: 'Rate' }
                        ],
                        url: '../sampledata/homeprices.txt'
                    };
                    this.dataAdapter = new $.jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + this.source.url + '" : ' + error); } });
                    this.colorsSchemesList = ["scheme01", "scheme02", "scheme03", "scheme04", "scheme05", "scheme06", "scheme07", "scheme08"];
                    this.seriesList = ["splinearea", "spline", "column", "scatter", "stackedcolumn", "stackedsplinearea", "stackedspline"];
                    this.chartSettings = {
                        title: "U.S. Real Home Price vs Building Cost Indeces (1950-2010)",
                        description: "Source: http://www.econ.yale.edu/~shiller/data.htm",
                        enableAnimations: false,
                        showLegend: true,
                        padding: { left: 5, top: 5, right: 5, bottom: 5 },
                        titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
                        source: this.dataAdapter,
                        xAxis: {
                            dataField: 'Year',
                            unitInterval: 10,
                            maxValue: 2010,
                            valuesOnTicks: true,
                            labels: { autoRotate: true }
                        },
                        colorScheme: 'scheme01',
                        seriesGroups: [
                            {
                                polar: true,
                                radius: 120,
                                type: 'splinearea',
                                valueAxis: {
                                    labels: {
                                        formatSettings: { decimalPlaces: 0 },
                                        autoRotate: true
                                    }
                                },
                                series: [
                                    { dataField: 'HPI', displayText: 'Real Home Price Index', opacity: 0.7, lineWidth: 1, radius: 2 },
                                    { dataField: 'BuildCost', displayText: 'Building Cost Index', opacity: 0.7, lineWidth: 1, radius: 2 }
                                ]
                            }
                        ]
                    };
                    this.sliderStartAngleSettings = {
                        width: 240, min: 0, max: 360, step: 1, ticksFrequency: 20, mode: 'fixed'
                    };
                    this.sliderRadiusSettings = {
                        width: 240, min: 80, max: 140, value: 120, step: 1, ticksFrequency: 20, mode: 'fixed'
                    };
                    this.dropDownListSeriesSettings = {
                        source: this.seriesList, selectedIndex: 0, width: '200', height: '25', dropDownHeight: 100
                    };
                    this.dropDownListColorsSettings = {
                        source: this.colorsSchemesList, selectedIndex: 2, width: '200', height: '25', dropDownHeight: 100
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myChart.setOptions(this.chartSettings);
                    this.SliderRadius.createWidget(this.sliderRadiusSettings);
                    this.SliderStartAngle.createWidget(this.sliderStartAngleSettings);
                    this.DropDownColors.createWidget(this.dropDownListColorsSettings);
                    this.DropDownSeries.createWidget(this.dropDownListSeriesSettings);
                };
                AppComponent.prototype.SliderStartAngleOnChange = function (event) {
                    var value = event.args.value;
                    this.chartSettings.seriesGroups[0].startAngle = value;
                    this.chartSettings.seriesGroups[0].endAngle = value + 360;
                    this.myChart.setOptions({ seriesGroups: this.chartSettings.seriesGroups });
                };
                AppComponent.prototype.SliderRadiusOnChange = function (event) {
                    var value = event.args.value;
                    this.chartSettings.seriesGroups[0].radius = value;
                    this.myChart.setOptions({ seriesGroups: this.chartSettings.seriesGroups });
                };
                AppComponent.prototype.DropDownListColorsOnChange = function (event) {
                    var value = event.args.item.value;
                    this.myChart.setOptions({ colorScheme: value });
                };
                AppComponent.prototype.DropDownListSeriesOnSelect = function (event) {
                    var args = event.args;
                    if (args) {
                        var value = args.item.value;
                        this.chartSettings.seriesGroups[0].type = value;
                        this.myChart.setOptions({ seriesGroups: this.chartSettings.seriesGroups });
                    }
                };
                __decorate([
                    core_1.ViewChild(angular_jqxChart_1.jqxChartComponent), 
                    __metadata('design:type', angular_jqxChart_1.jqxChartComponent)
                ], AppComponent.prototype, "myChart", void 0);
                __decorate([
                    core_1.ViewChild('sliderStartAngle'), 
                    __metadata('design:type', angular_jqxslider_1.jqxSliderComponent)
                ], AppComponent.prototype, "SliderStartAngle", void 0);
                __decorate([
                    core_1.ViewChild('sliderRadius'), 
                    __metadata('design:type', angular_jqxslider_1.jqxSliderComponent)
                ], AppComponent.prototype, "SliderRadius", void 0);
                __decorate([
                    core_1.ViewChild('dropDownSeries'), 
                    __metadata('design:type', angular_jqxdropdownlist_1.jqxDropDownListComponent)
                ], AppComponent.prototype, "DropDownSeries", void 0);
                __decorate([
                    core_1.ViewChild('dropDownColors'), 
                    __metadata('design:type', angular_jqxdropdownlist_1.jqxDropDownListComponent)
                ], AppComponent.prototype, "DropDownColors", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/chart/polarseries/app.component.htm',
                        directives: [angular_jqxChart_1.jqxChartComponent, angular_jqxslider_1.jqxSliderComponent, angular_jqxdropdownlist_1.jqxDropDownListComponent]
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