System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var jqxDataTableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDataTableComponent = (function () {
                function jqxDataTableComponent(containerElement) {
                    // jqxDataTableComponent events
                    this.OnBindingComplete = new core_1.EventEmitter();
                    this.OnCellBeginEdit = new core_1.EventEmitter();
                    this.OnCellEndEdit = new core_1.EventEmitter();
                    this.OnCellValueChanged = new core_1.EventEmitter();
                    this.OnColumnResized = new core_1.EventEmitter();
                    this.OnColumnReordered = new core_1.EventEmitter();
                    this.OnSort = new core_1.EventEmitter();
                    this.OnFilter = new core_1.EventEmitter();
                    this.OnPageChanged = new core_1.EventEmitter();
                    this.OnPageSizeChanged = new core_1.EventEmitter();
                    this.OnRowClick = new core_1.EventEmitter();
                    this.OnRowDoubleClick = new core_1.EventEmitter();
                    this.OnRowSelect = new core_1.EventEmitter();
                    this.OnRowUnselect = new core_1.EventEmitter();
                    this.OnRowBeginEdit = new core_1.EventEmitter();
                    this.OnRowEndEdit = new core_1.EventEmitter();
                    this.OnRowExpand = new core_1.EventEmitter();
                    this.OnRowCollapse = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxDataTableComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDataTableComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDataTable', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDataTableComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDataTableComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDataTableComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDataTable(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDataTableComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDataTableComponent.prototype.setOptions = function (options) {
                    this.host.jqxDataTable('setOptions', options);
                };
                // jqxDataTableComponent functions
                jqxDataTableComponent.prototype.addRow = function (rowIndex, rowData, rowPosition) {
                    this.host.jqxDataTable('addRow', rowIndex, rowData, rowPosition);
                };
                jqxDataTableComponent.prototype.addFilter = function (dataField, filerGroup) {
                    this.host.jqxDataTable('addFilter', dataField, filerGroup);
                };
                jqxDataTableComponent.prototype.applyFilters = function () {
                    this.host.jqxDataTable('applyFilters');
                };
                jqxDataTableComponent.prototype.beginUpdate = function () {
                    this.host.jqxDataTable('beginUpdate');
                };
                jqxDataTableComponent.prototype.beginRowEdit = function (rowIndex) {
                    this.host.jqxDataTable('beginRowEdit', rowIndex);
                };
                jqxDataTableComponent.prototype.beginCellEdit = function (rowIndex, dataField) {
                    this.host.jqxDataTable('beginCellEdit', rowIndex, dataField);
                };
                jqxDataTableComponent.prototype.clearSelection = function () {
                    this.host.jqxDataTable('clearSelection');
                };
                jqxDataTableComponent.prototype.clearFilters = function () {
                    this.host.jqxDataTable('clearFilters');
                };
                jqxDataTableComponent.prototype.clear = function () {
                    this.host.jqxDataTable('clear');
                };
                jqxDataTableComponent.prototype.destroy = function () {
                    this.host.jqxDataTable('destroy');
                };
                jqxDataTableComponent.prototype.deleteRow = function (rowIndex) {
                    this.host.jqxDataTable('deleteRow', rowIndex);
                };
                jqxDataTableComponent.prototype.endUpdate = function () {
                    this.host.jqxDataTable('endUpdate');
                };
                jqxDataTableComponent.prototype.ensureRowVisible = function (rowIndex) {
                    this.host.jqxDataTable('ensureRowVisible', rowIndex);
                };
                jqxDataTableComponent.prototype.endRowEdit = function (rowIndex, cancelChanges) {
                    this.host.jqxDataTable('endRowEdit', rowIndex, cancelChanges);
                };
                jqxDataTableComponent.prototype.endCellEdit = function (rowIndex, dataField) {
                    this.host.jqxDataTable('endCellEdit', rowIndex, dataField);
                };
                jqxDataTableComponent.prototype.exportData = function (exportDataType) {
                    return this.host.jqxDataTable('exportData', exportDataType);
                };
                jqxDataTableComponent.prototype.focus = function () {
                    this.host.jqxDataTable('focus');
                };
                jqxDataTableComponent.prototype.getColumnProperty = function (dataField, propertyName) {
                    return this.host.jqxDataTable('getColumnProperty', dataField, propertyName);
                };
                jqxDataTableComponent.prototype.goToPage = function (pageIndex) {
                    this.host.jqxDataTable('goToPage', pageIndex);
                };
                jqxDataTableComponent.prototype.goToPrevPage = function () {
                    this.host.jqxDataTable('goToPrevPage');
                };
                jqxDataTableComponent.prototype.goToNextPage = function () {
                    this.host.jqxDataTable('goToNextPage');
                };
                jqxDataTableComponent.prototype.getSelection = function () {
                    return this.host.jqxDataTable('getSelection');
                };
                jqxDataTableComponent.prototype.getRows = function () {
                    return this.host.jqxDataTable('getRows');
                };
                jqxDataTableComponent.prototype.getView = function () {
                    return this.host.jqxDataTable('getView');
                };
                jqxDataTableComponent.prototype.getCellValue = function (rowIndex, dataField) {
                    return this.host.jqxDataTable('getCellValue', rowIndex, dataField);
                };
                jqxDataTableComponent.prototype.hideColumn = function (dataField) {
                    this.host.jqxDataTable('hideColumn', dataField);
                };
                jqxDataTableComponent.prototype.hideDetails = function (rowIndex) {
                    this.host.jqxDataTable('hideDetails', rowIndex);
                };
                jqxDataTableComponent.prototype.isBindingCompleted = function () {
                    return this.host.jqxDataTable('isBindingCompleted');
                };
                jqxDataTableComponent.prototype.lockRow = function (rowIndex) {
                    this.host.jqxDataTable('lockRow', rowIndex);
                };
                jqxDataTableComponent.prototype.refresh = function () {
                    this.host.jqxDataTable('refresh');
                };
                jqxDataTableComponent.prototype.render = function () {
                    this.host.jqxDataTable('render');
                };
                jqxDataTableComponent.prototype.removeFilter = function (dataField) {
                    this.host.jqxDataTable('removeFilter', dataField);
                };
                jqxDataTableComponent.prototype.scrollOffset = function (top, left) {
                    return this.host.jqxDataTable('scrollOffset', top, left);
                };
                jqxDataTableComponent.prototype.setColumnProperty = function (dataField, propertyName, propertyValue) {
                    this.host.jqxDataTable('setColumnProperty', dataField, propertyName, propertyValue);
                };
                jqxDataTableComponent.prototype.showColumn = function (dataField) {
                    this.host.jqxDataTable('showColumn', dataField);
                };
                jqxDataTableComponent.prototype.selectRow = function (rowIndex) {
                    this.host.jqxDataTable('selectRow', rowIndex);
                };
                jqxDataTableComponent.prototype.showDetails = function (rowIndex) {
                    this.host.jqxDataTable('showDetails', rowIndex);
                };
                jqxDataTableComponent.prototype.setCellValue = function (rowIndex, dataField, value) {
                    this.host.jqxDataTable('setCellValue', rowIndex, dataField, value);
                };
                jqxDataTableComponent.prototype.sortBy = function (dataField, sortOrder) {
                    this.host.jqxDataTable('sortBy', dataField, sortOrder);
                };
                jqxDataTableComponent.prototype.updating = function () {
                    return this.host.jqxDataTable('updating');
                };
                jqxDataTableComponent.prototype.updateBoundData = function () {
                    this.host.jqxDataTable('updateBoundData');
                };
                jqxDataTableComponent.prototype.unselectRow = function (rowIndex) {
                    this.host.jqxDataTable('unselectRow', rowIndex);
                };
                jqxDataTableComponent.prototype.updateRow = function (rowIndex, rowData) {
                    this.host.jqxDataTable('updateRow', rowIndex, rowData);
                };
                jqxDataTableComponent.prototype.unlockRow = function (rowIndex) {
                    this.host.jqxDataTable('unlockRow', rowIndex);
                };
                jqxDataTableComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('bindingComplete', function (eventData) { if (self.OnBindingComplete)
                        self.OnBindingComplete.next(eventData); });
                    this.host.bind('cellBeginEdit', function (eventData) { if (self.OnCellBeginEdit)
                        self.OnCellBeginEdit.next(eventData); });
                    this.host.bind('cellEndEdit', function (eventData) { if (self.OnCellEndEdit)
                        self.OnCellEndEdit.next(eventData); });
                    this.host.bind('cellValueChanged', function (eventData) { if (self.OnCellValueChanged)
                        self.OnCellValueChanged.next(eventData); });
                    this.host.bind('columnResized', function (eventData) { if (self.OnColumnResized)
                        self.OnColumnResized.next(eventData); });
                    this.host.bind('columnReordered', function (eventData) { if (self.OnColumnReordered)
                        self.OnColumnReordered.next(eventData); });
                    this.host.bind('sort', function (eventData) { if (self.OnSort)
                        self.OnSort.next(eventData); });
                    this.host.bind('filter', function (eventData) { if (self.OnFilter)
                        self.OnFilter.next(eventData); });
                    this.host.bind('pageChanged', function (eventData) { if (self.OnPageChanged)
                        self.OnPageChanged.next(eventData); });
                    this.host.bind('pageSizeChanged', function (eventData) { if (self.OnPageSizeChanged)
                        self.OnPageSizeChanged.next(eventData); });
                    this.host.bind('rowClick', function (eventData) { if (self.OnRowClick)
                        self.OnRowClick.next(eventData); });
                    this.host.bind('rowDoubleClick', function (eventData) { if (self.OnRowDoubleClick)
                        self.OnRowDoubleClick.next(eventData); });
                    this.host.bind('rowSelect', function (eventData) { if (self.OnRowSelect)
                        self.OnRowSelect.next(eventData); });
                    this.host.bind('rowUnselect', function (eventData) { if (self.OnRowUnselect)
                        self.OnRowUnselect.next(eventData); });
                    this.host.bind('rowBeginEdit', function (eventData) { if (self.OnRowBeginEdit)
                        self.OnRowBeginEdit.next(eventData); });
                    this.host.bind('rowEndEdit', function (eventData) { if (self.OnRowEndEdit)
                        self.OnRowEndEdit.next(eventData); });
                    this.host.bind('rowExpand', function (eventData) { if (self.OnRowExpand)
                        self.OnRowExpand.next(eventData); });
                    this.host.bind('rowCollapse', function (eventData) { if (self.OnRowCollapse)
                        self.OnRowCollapse.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('altRows'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "altRows", void 0);
                __decorate([
                    core_1.Input('autoRowHeight'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "autoRowHeight", void 0);
                __decorate([
                    core_1.Input('aggregatesHeight'), 
                    __metadata('design:type', Number)
                ], jqxDataTableComponent.prototype, "aggregatesHeight", void 0);
                __decorate([
                    core_1.Input('autoShowLoadElement'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "autoShowLoadElement", void 0);
                __decorate([
                    core_1.Input('columnsHeight'), 
                    __metadata('design:type', Number)
                ], jqxDataTableComponent.prototype, "columnsHeight", void 0);
                __decorate([
                    core_1.Input('columns'), 
                    __metadata('design:type', Array)
                ], jqxDataTableComponent.prototype, "columns", void 0);
                __decorate([
                    core_1.Input('columnGroups'), 
                    __metadata('design:type', Array)
                ], jqxDataTableComponent.prototype, "columnGroups", void 0);
                __decorate([
                    core_1.Input('columnsResize'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "columnsResize", void 0);
                __decorate([
                    core_1.Input('columnsReorder'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "columnsReorder", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('editable'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "editable", void 0);
                __decorate([
                    core_1.Input('editSettings'), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "editSettings", void 0);
                __decorate([
                    core_1.Input('exportSettings'), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "exportSettings", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('enableBrowserSelection'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "enableBrowserSelection", void 0);
                __decorate([
                    core_1.Input('filterable'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "filterable", void 0);
                __decorate([
                    core_1.Input('filterHeight'), 
                    __metadata('design:type', Number)
                ], jqxDataTableComponent.prototype, "filterHeight", void 0);
                __decorate([
                    core_1.Input('filterMode'), 
                    __metadata('design:type', String)
                ], jqxDataTableComponent.prototype, "filterMode", void 0);
                __decorate([
                    core_1.Input('groups'), 
                    __metadata('design:type', Array)
                ], jqxDataTableComponent.prototype, "groups", void 0);
                __decorate([
                    core_1.Input('groupsRenderer'), 
                    __metadata('design:type', Function)
                ], jqxDataTableComponent.prototype, "groupsRenderer", void 0);
                __decorate([
                    core_1.Input('initRowDetails'), 
                    __metadata('design:type', Function)
                ], jqxDataTableComponent.prototype, "initRowDetails", void 0);
                __decorate([
                    core_1.Input('incrementalSearch'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "incrementalSearch", void 0);
                __decorate([
                    core_1.Input('localization'), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "localization", void 0);
                __decorate([
                    core_1.Input('pagerHeight'), 
                    __metadata('design:type', Number)
                ], jqxDataTableComponent.prototype, "pagerHeight", void 0);
                __decorate([
                    core_1.Input('pageSize'), 
                    __metadata('design:type', Number)
                ], jqxDataTableComponent.prototype, "pageSize", void 0);
                __decorate([
                    core_1.Input('pageSizeOptions'), 
                    __metadata('design:type', Array)
                ], jqxDataTableComponent.prototype, "pageSizeOptions", void 0);
                __decorate([
                    core_1.Input('pageable'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "pageable", void 0);
                __decorate([
                    core_1.Input('pagerPosition'), 
                    __metadata('design:type', String)
                ], jqxDataTableComponent.prototype, "pagerPosition", void 0);
                __decorate([
                    core_1.Input('pagerMode'), 
                    __metadata('design:type', String)
                ], jqxDataTableComponent.prototype, "pagerMode", void 0);
                __decorate([
                    core_1.Input('pagerButtonsCount'), 
                    __metadata('design:type', Number)
                ], jqxDataTableComponent.prototype, "pagerButtonsCount", void 0);
                __decorate([
                    core_1.Input('pagerRenderer'), 
                    __metadata('design:type', Function)
                ], jqxDataTableComponent.prototype, "pagerRenderer", void 0);
                __decorate([
                    core_1.Input('ready'), 
                    __metadata('design:type', Function)
                ], jqxDataTableComponent.prototype, "ready", void 0);
                __decorate([
                    core_1.Input('rowDetails'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "rowDetails", void 0);
                __decorate([
                    core_1.Input('renderToolbar'), 
                    __metadata('design:type', Function)
                ], jqxDataTableComponent.prototype, "renderToolbar", void 0);
                __decorate([
                    core_1.Input('renderStatusbar'), 
                    __metadata('design:type', Function)
                ], jqxDataTableComponent.prototype, "renderStatusbar", void 0);
                __decorate([
                    core_1.Input('rendering'), 
                    __metadata('design:type', Function)
                ], jqxDataTableComponent.prototype, "rendering", void 0);
                __decorate([
                    core_1.Input('rendered'), 
                    __metadata('design:type', Function)
                ], jqxDataTableComponent.prototype, "rendered", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('sortable'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "sortable", void 0);
                __decorate([
                    core_1.Input('showAggregates'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "showAggregates", void 0);
                __decorate([
                    core_1.Input('showToolbar'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "showToolbar", void 0);
                __decorate([
                    core_1.Input('showStatusbar'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "showStatusbar", void 0);
                __decorate([
                    core_1.Input('statusBarHeight'), 
                    __metadata('design:type', Number)
                ], jqxDataTableComponent.prototype, "statusBarHeight", void 0);
                __decorate([
                    core_1.Input('scrollBarSize'), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "scrollBarSize", void 0);
                __decorate([
                    core_1.Input('selectionMode'), 
                    __metadata('design:type', String)
                ], jqxDataTableComponent.prototype, "selectionMode", void 0);
                __decorate([
                    core_1.Input('serverProcessing'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "serverProcessing", void 0);
                __decorate([
                    core_1.Input('showHeader'), 
                    __metadata('design:type', Boolean)
                ], jqxDataTableComponent.prototype, "showHeader", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxDataTableComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('toolbarHeight'), 
                    __metadata('design:type', Number)
                ], jqxDataTableComponent.prototype, "toolbarHeight", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnBindingComplete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnCellBeginEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnCellEndEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnCellValueChanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnColumnResized", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnColumnReordered", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnSort", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnFilter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnPageChanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnPageSizeChanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnRowClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnRowDoubleClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnRowSelect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnRowUnselect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnRowBeginEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnRowEndEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnRowExpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDataTableComponent.prototype, "OnRowCollapse", void 0);
                jqxDataTableComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDataTable',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDataTableComponent);
                return jqxDataTableComponent;
                var _a;
            }());
            exports_1("jqxDataTableComponent", jqxDataTableComponent); //jqxDataTableComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdatatable.js.map