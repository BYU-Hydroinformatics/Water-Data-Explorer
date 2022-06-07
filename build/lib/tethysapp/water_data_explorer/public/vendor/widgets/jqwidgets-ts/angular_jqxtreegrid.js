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
    var jqxTreeGridComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxTreeGridComponent = (function () {
                function jqxTreeGridComponent(containerElement) {
                    // jqxTreeGridComponent events
                    this.OnBindingComplete = new core_1.EventEmitter();
                    this.OnCellBeginEdit = new core_1.EventEmitter();
                    this.OnCellEndEdit = new core_1.EventEmitter();
                    this.OnCellValueChanged = new core_1.EventEmitter();
                    this.OnColumnResized = new core_1.EventEmitter();
                    this.OnColumnReordered = new core_1.EventEmitter();
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
                    this.OnRowCheck = new core_1.EventEmitter();
                    this.OnRowUncheck = new core_1.EventEmitter();
                    this.OnSort = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxTreeGridComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxTreeGridComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTreeGrid', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxTreeGridComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxTreeGridComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxTreeGridComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxTreeGrid(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxTreeGridComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxTreeGridComponent.prototype.setOptions = function (options) {
                    this.host.jqxTreeGrid('setOptions', options);
                };
                // jqxTreeGridComponent functions
                jqxTreeGridComponent.prototype.addRow = function (rowKey, rowData, rowPosition) {
                    this.host.jqxTreeGrid('addRow', rowKey, rowData, rowPosition);
                };
                jqxTreeGridComponent.prototype.addFilter = function (dataField, filerGroup) {
                    this.host.jqxTreeGrid('addFilter', dataField, filerGroup);
                };
                jqxTreeGridComponent.prototype.applyFilters = function () {
                    this.host.jqxTreeGrid('applyFilters');
                };
                jqxTreeGridComponent.prototype.beginUpdate = function () {
                    this.host.jqxTreeGrid('beginUpdate');
                };
                jqxTreeGridComponent.prototype.beginRowEdit = function (rowKey) {
                    this.host.jqxTreeGrid('beginRowEdit', rowKey);
                };
                jqxTreeGridComponent.prototype.beginCellEdit = function (rowKey, dataField) {
                    this.host.jqxTreeGrid('beginCellEdit', rowKey, dataField);
                };
                jqxTreeGridComponent.prototype.clearSelection = function () {
                    this.host.jqxTreeGrid('clearSelection');
                };
                jqxTreeGridComponent.prototype.clearFilters = function () {
                    this.host.jqxTreeGrid('clearFilters');
                };
                jqxTreeGridComponent.prototype.clear = function () {
                    this.host.jqxTreeGrid('clear');
                };
                jqxTreeGridComponent.prototype.checkRow = function (rowKey) {
                    this.host.jqxTreeGrid('checkRow', rowKey);
                };
                jqxTreeGridComponent.prototype.collapseRow = function (rowKey) {
                    this.host.jqxTreeGrid('collapseRow', rowKey);
                };
                jqxTreeGridComponent.prototype.collapseAll = function () {
                    this.host.jqxTreeGrid('collapseAll');
                };
                jqxTreeGridComponent.prototype.destroy = function () {
                    this.host.jqxTreeGrid('destroy');
                };
                jqxTreeGridComponent.prototype.deleteRow = function (rowKey) {
                    this.host.jqxTreeGrid('deleteRow', rowKey);
                };
                jqxTreeGridComponent.prototype.expandRow = function (rowKey) {
                    this.host.jqxTreeGrid('expandRow', rowKey);
                };
                jqxTreeGridComponent.prototype.expandAll = function () {
                    this.host.jqxTreeGrid('expandAll');
                };
                jqxTreeGridComponent.prototype.endUpdate = function () {
                    this.host.jqxTreeGrid('endUpdate');
                };
                jqxTreeGridComponent.prototype.ensureRowVisible = function (rowKey) {
                    this.host.jqxTreeGrid('ensureRowVisible', rowKey);
                };
                jqxTreeGridComponent.prototype.endRowEdit = function (rowKey, cancelChanges) {
                    this.host.jqxTreeGrid('endRowEdit', rowKey, cancelChanges);
                };
                jqxTreeGridComponent.prototype.endCellEdit = function (rowKey, dataField, cancelChanges) {
                    this.host.jqxTreeGrid('endCellEdit', rowKey, dataField, cancelChanges);
                };
                jqxTreeGridComponent.prototype.exportData = function (exportDataType) {
                    return this.host.jqxTreeGrid('exportData', exportDataType);
                };
                jqxTreeGridComponent.prototype.focus = function () {
                    this.host.jqxTreeGrid('focus');
                };
                jqxTreeGridComponent.prototype.getColumnProperty = function (dataField, propertyName) {
                    return this.host.jqxTreeGrid('getColumnProperty', dataField, propertyName);
                };
                jqxTreeGridComponent.prototype.goToPage = function (pageIndex) {
                    this.host.jqxTreeGrid('goToPage', pageIndex);
                };
                jqxTreeGridComponent.prototype.goToPrevPage = function () {
                    this.host.jqxTreeGrid('goToPrevPage');
                };
                jqxTreeGridComponent.prototype.goToNextPage = function () {
                    this.host.jqxTreeGrid('goToNextPage');
                };
                jqxTreeGridComponent.prototype.getSelection = function () {
                    return this.host.jqxTreeGrid('getSelection');
                };
                jqxTreeGridComponent.prototype.getKey = function (row) {
                    return this.host.jqxTreeGrid('getKey', row);
                };
                jqxTreeGridComponent.prototype.getRow = function (rowKey) {
                    return this.host.jqxTreeGrid('getRow', rowKey);
                };
                jqxTreeGridComponent.prototype.getRows = function () {
                    return this.host.jqxTreeGrid('getRows');
                };
                jqxTreeGridComponent.prototype.getCheckedRows = function () {
                    return this.host.jqxTreeGrid('getCheckedRows');
                };
                jqxTreeGridComponent.prototype.getView = function () {
                    return this.host.jqxTreeGrid('getView');
                };
                jqxTreeGridComponent.prototype.getCellValue = function (rowKey, dataField) {
                    return this.host.jqxTreeGrid('getCellValue', rowKey, dataField);
                };
                jqxTreeGridComponent.prototype.hideColumn = function (dataField) {
                    this.host.jqxTreeGrid('hideColumn', dataField);
                };
                jqxTreeGridComponent.prototype.isBindingCompleted = function () {
                    return this.host.jqxTreeGrid('isBindingCompleted');
                };
                jqxTreeGridComponent.prototype.lockRow = function (rowKey) {
                    this.host.jqxTreeGrid('lockRow', rowKey);
                };
                jqxTreeGridComponent.prototype.refresh = function () {
                    this.host.jqxTreeGrid('refresh');
                };
                jqxTreeGridComponent.prototype.render = function () {
                    this.host.jqxTreeGrid('render');
                };
                jqxTreeGridComponent.prototype.removeFilter = function (dataField) {
                    this.host.jqxTreeGrid('removeFilter', dataField);
                };
                jqxTreeGridComponent.prototype.scrollOffset = function (top, left) {
                    return this.host.jqxTreeGrid('scrollOffset', top, left);
                };
                jqxTreeGridComponent.prototype.setColumnProperty = function (dataField, propertyName, propertyValue) {
                    this.host.jqxTreeGrid('setColumnProperty', dataField, propertyName, propertyValue);
                };
                jqxTreeGridComponent.prototype.showColumn = function (dataField) {
                    this.host.jqxTreeGrid('showColumn', dataField);
                };
                jqxTreeGridComponent.prototype.selectRow = function (rowId) {
                    this.host.jqxTreeGrid('selectRow', rowId);
                };
                jqxTreeGridComponent.prototype.setCellValue = function (rowId, dataField, cellValue) {
                    this.host.jqxTreeGrid('setCellValue', rowId, dataField, cellValue);
                };
                jqxTreeGridComponent.prototype.sortBy = function (dataField, sortOrder) {
                    this.host.jqxTreeGrid('sortBy', dataField, sortOrder);
                };
                jqxTreeGridComponent.prototype.updating = function () {
                    return this.host.jqxTreeGrid('updating');
                };
                jqxTreeGridComponent.prototype.updateBoundData = function () {
                    this.host.jqxTreeGrid('updateBoundData');
                };
                jqxTreeGridComponent.prototype.unselectRow = function (rowId) {
                    this.host.jqxTreeGrid('unselectRow', rowId);
                };
                jqxTreeGridComponent.prototype.uncheckRow = function (rowId) {
                    this.host.jqxTreeGrid('uncheckRow', rowId);
                };
                jqxTreeGridComponent.prototype.updateRow = function (rowId, data) {
                    this.host.jqxTreeGrid('updateRow', rowId, data);
                };
                jqxTreeGridComponent.prototype.unlockRow = function (rowId) {
                    this.host.jqxTreeGrid('unlockRow', rowId);
                };
                jqxTreeGridComponent.prototype.__wireEvents__ = function () {
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
                    this.host.bind('rowCheck', function (eventData) { if (self.OnRowCheck)
                        self.OnRowCheck.next(eventData); });
                    this.host.bind('rowUncheck', function (eventData) { if (self.OnRowUncheck)
                        self.OnRowUncheck.next(eventData); });
                    this.host.bind('sort', function (eventData) { if (self.OnSort)
                        self.OnSort.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('altRows'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "altRows", void 0);
                __decorate([
                    core_1.Input('autoRowHeight'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "autoRowHeight", void 0);
                __decorate([
                    core_1.Input('aggregatesHeight'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "aggregatesHeight", void 0);
                __decorate([
                    core_1.Input('autoShowLoadElement'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "autoShowLoadElement", void 0);
                __decorate([
                    core_1.Input('checkboxes'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "checkboxes", void 0);
                __decorate([
                    core_1.Input('columnsHeight'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "columnsHeight", void 0);
                __decorate([
                    core_1.Input('columns'), 
                    __metadata('design:type', Array)
                ], jqxTreeGridComponent.prototype, "columns", void 0);
                __decorate([
                    core_1.Input('columnGroups'), 
                    __metadata('design:type', Array)
                ], jqxTreeGridComponent.prototype, "columnGroups", void 0);
                __decorate([
                    core_1.Input('columnsResize'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "columnsResize", void 0);
                __decorate([
                    core_1.Input('columnsReorder'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "columnsReorder", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('editable'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "editable", void 0);
                __decorate([
                    core_1.Input('editSettings'), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "editSettings", void 0);
                __decorate([
                    core_1.Input('exportSettings'), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "exportSettings", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('enableBrowserSelection'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "enableBrowserSelection", void 0);
                __decorate([
                    core_1.Input('filterable'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "filterable", void 0);
                __decorate([
                    core_1.Input('filterHeight'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "filterHeight", void 0);
                __decorate([
                    core_1.Input('filterMode'), 
                    __metadata('design:type', String)
                ], jqxTreeGridComponent.prototype, "filterMode", void 0);
                __decorate([
                    core_1.Input('hierarchicalCheckboxes'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "hierarchicalCheckboxes", void 0);
                __decorate([
                    core_1.Input('icons'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "icons", void 0);
                __decorate([
                    core_1.Input('incrementalSearch'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "incrementalSearch", void 0);
                __decorate([
                    core_1.Input('localization'), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "localization", void 0);
                __decorate([
                    core_1.Input('pagerHeight'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "pagerHeight", void 0);
                __decorate([
                    core_1.Input('pageSize'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "pageSize", void 0);
                __decorate([
                    core_1.Input('pageSizeOptions'), 
                    __metadata('design:type', Array)
                ], jqxTreeGridComponent.prototype, "pageSizeOptions", void 0);
                __decorate([
                    core_1.Input('pageable'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "pageable", void 0);
                __decorate([
                    core_1.Input('pagerPosition'), 
                    __metadata('design:type', String)
                ], jqxTreeGridComponent.prototype, "pagerPosition", void 0);
                __decorate([
                    core_1.Input('pagerMode'), 
                    __metadata('design:type', String)
                ], jqxTreeGridComponent.prototype, "pagerMode", void 0);
                __decorate([
                    core_1.Input('pageSizeMode'), 
                    __metadata('design:type', String)
                ], jqxTreeGridComponent.prototype, "pageSizeMode", void 0);
                __decorate([
                    core_1.Input('pagerButtonsCount'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "pagerButtonsCount", void 0);
                __decorate([
                    core_1.Input('pagerRenderer'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "pagerRenderer", void 0);
                __decorate([
                    core_1.Input('ready'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "ready", void 0);
                __decorate([
                    core_1.Input('rowDetails'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "rowDetails", void 0);
                __decorate([
                    core_1.Input('rowDetailsRenderer'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "rowDetailsRenderer", void 0);
                __decorate([
                    core_1.Input('renderToolbar'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "renderToolbar", void 0);
                __decorate([
                    core_1.Input('renderStatusbar'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "renderStatusbar", void 0);
                __decorate([
                    core_1.Input('rendering'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "rendering", void 0);
                __decorate([
                    core_1.Input('rendered'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "rendered", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('sortable'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "sortable", void 0);
                __decorate([
                    core_1.Input('showAggregates'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "showAggregates", void 0);
                __decorate([
                    core_1.Input('showSubAggregates'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "showSubAggregates", void 0);
                __decorate([
                    core_1.Input('showToolbar'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "showToolbar", void 0);
                __decorate([
                    core_1.Input('showStatusbar'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "showStatusbar", void 0);
                __decorate([
                    core_1.Input('statusBarHeight'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "statusBarHeight", void 0);
                __decorate([
                    core_1.Input('scrollBarSize'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "scrollBarSize", void 0);
                __decorate([
                    core_1.Input('selectionMode'), 
                    __metadata('design:type', String)
                ], jqxTreeGridComponent.prototype, "selectionMode", void 0);
                __decorate([
                    core_1.Input('showHeader'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeGridComponent.prototype, "showHeader", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxTreeGridComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('toolbarHeight'), 
                    __metadata('design:type', Number)
                ], jqxTreeGridComponent.prototype, "toolbarHeight", void 0);
                __decorate([
                    core_1.Input('virtualModeCreateRecords'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "virtualModeCreateRecords", void 0);
                __decorate([
                    core_1.Input('virtualModeRecordCreating'), 
                    __metadata('design:type', Function)
                ], jqxTreeGridComponent.prototype, "virtualModeRecordCreating", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnBindingComplete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnCellBeginEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnCellEndEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnCellValueChanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnColumnResized", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnColumnReordered", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnFilter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnPageChanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnPageSizeChanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowDoubleClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowSelect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowUnselect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowBeginEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowEndEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowExpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowCollapse", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowCheck", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnRowUncheck", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeGridComponent.prototype, "OnSort", void 0);
                jqxTreeGridComponent = __decorate([
                    core_1.Component({
                        selector: 'angularTreeGrid',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxTreeGridComponent);
                return jqxTreeGridComponent;
                var _a;
            }());
            exports_1("jqxTreeGridComponent", jqxTreeGridComponent); //jqxTreeGridComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtreegrid.js.map