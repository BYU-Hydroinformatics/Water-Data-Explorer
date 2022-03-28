System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxtreegrid'], function(exports_1, context_1) {
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
    var core_1, angular_jqxtreegrid_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxtreegrid_1_1) {
                angular_jqxtreegrid_1 = angular_jqxtreegrid_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    var self = this;
                    this.treeGridSettings = {
                        width: 850,
                        pageable: true,
                        altRows: true,
                        virtualModeCreateRecords: function (expandedRecord, done) {
                            // expandedRecord is equal to null when the function is initially called, because there is still no record to be expanded.
                            // prepare the data
                            var source = {
                                dataType: "array",
                                dataFields: [
                                    { name: "id", type: "string" },
                                    { name: "name", type: "string" },
                                    { name: "duration", type: "number" },
                                    { name: "task", type: "number" }
                                ],
                                localData: expandedRecord === null ? self.generateTasks(3000) : self.generateTasks(),
                                id: 'id'
                            };
                            var dataAdapter = new $.jqx.dataAdapter(source, {
                                loadComplete: function () {
                                    done(dataAdapter.records);
                                }
                            });
                            dataAdapter.dataBind();
                        },
                        virtualModeRecordCreating: function (record) {
                            if (record.level == 2) {
                                // by setting the record's leaf member to true, you will define the record as a leaf node.
                                record.leaf = true;
                            }
                        },
                        columns: [
                            { text: 'Task', dataField: "task", align: 'center', width: 300 },
                            { text: 'Person Name', dataField: "name", cellsAlign: 'center', align: 'center', width: 300 },
                            {
                                text: 'Duration', aggregates: ['sum'], dataField: "duration", cellsAlign: 'center', align: 'center', cellsRenderer: function (row, column, value) {
                                    var hour = value > 1 ? " hours" : " hour";
                                    return value + hour;
                                }
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
                AppComponent.prototype.generateTasks = function (rowsCount) {
                    var rowsCount = !rowsCount ? 1 + Math.floor(Math.random() * 5) : rowsCount;
                    var data = new Array();
                    var generatekey = function () {
                        var S4 = function () {
                            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                        };
                        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
                    };
                    for (var i = 0; i < rowsCount; i++) {
                        var row = {};
                        var tasks = ["Shopping", "Housewares", "Kitchen supplies", "Groceries", "Cleaning supplies", "Office supplies", "Remodeling", "Paint bedroom", "Paint wall", "Fitness", "Decorate living room",
                            "Fix lights", "Fix front door", "Clean kitchen"];
                        var firstNames = [
                            "Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
                        ];
                        var lastNames = [
                            "Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
                        ];
                        row["id"] = generatekey();
                        row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
                        row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
                        row["name"] = row["firstname"] + " " + row["lastname"];
                        var taskindex = Math.floor(Math.random() * tasks.length);
                        row["task"] = tasks[taskindex];
                        row["duration"] = 1 + Math.floor(Math.random() * 10);
                        data.push(row);
                    }
                    return data;
                };
                AppComponent.prototype.Initialize = function () {
                    this.treeGrid.createWidget(this.treeGridSettings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxtreegrid_1.jqxTreeGridComponent), 
                    __metadata('design:type', angular_jqxtreegrid_1.jqxTreeGridComponent)
                ], AppComponent.prototype, "treeGrid", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: '<angularTreeGrid></angularTreeGrid>',
                        directives: [angular_jqxtreegrid_1.jqxTreeGridComponent]
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