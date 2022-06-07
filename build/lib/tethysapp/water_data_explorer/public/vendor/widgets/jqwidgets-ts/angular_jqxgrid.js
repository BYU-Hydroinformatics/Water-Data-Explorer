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
    var jqxGridComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxGridComponent = (function () {
                function jqxGridComponent(containerElement) {
                    // jqxGridComponent events
                    this.OnBindingcomplete = new core_1.EventEmitter();
                    this.OnColumnresized = new core_1.EventEmitter();
                    this.OnColumnreordered = new core_1.EventEmitter();
                    this.OnColumnclick = new core_1.EventEmitter();
                    this.OnCellclick = new core_1.EventEmitter();
                    this.OnCelldoubleclick = new core_1.EventEmitter();
                    this.OnCellselect = new core_1.EventEmitter();
                    this.OnCellunselect = new core_1.EventEmitter();
                    this.OnCellvaluechanged = new core_1.EventEmitter();
                    this.OnCellbeginedit = new core_1.EventEmitter();
                    this.OnCellendedit = new core_1.EventEmitter();
                    this.OnFilter = new core_1.EventEmitter();
                    this.OnGroupschanged = new core_1.EventEmitter();
                    this.OnGroupexpand = new core_1.EventEmitter();
                    this.OnGroupcollapse = new core_1.EventEmitter();
                    this.OnPagechanged = new core_1.EventEmitter();
                    this.OnPagesizechanged = new core_1.EventEmitter();
                    this.OnRowclick = new core_1.EventEmitter();
                    this.OnRowdoubleclick = new core_1.EventEmitter();
                    this.OnRowselect = new core_1.EventEmitter();
                    this.OnRowunselect = new core_1.EventEmitter();
                    this.OnRowexpand = new core_1.EventEmitter();
                    this.OnRowcollapse = new core_1.EventEmitter();
                    this.OnSort = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxGridComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxGridComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxGrid', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxGridComponent.prototype.ngAfterViewInit = function () {
                    //   if (!this.isHostReady())
                    //      this.initHost();
                };
                jqxGridComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxGridComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxGrid(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxGridComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxGridComponent.prototype.setOptions = function (options) {
                    this.host.jqxGrid('setOptions', options);
                };
                // jqxGridComponent functions
                jqxGridComponent.prototype.autoresizecolumns = function (type) {
                    this.host.jqxGrid('autoresizecolumns', type);
                };
                jqxGridComponent.prototype.autoresizecolumn = function (dataField, type) {
                    this.host.jqxGrid('autoresizecolumn', dataField, type);
                };
                jqxGridComponent.prototype.beginupdate = function () {
                    this.host.jqxGrid('beginupdate');
                };
                jqxGridComponent.prototype.clear = function () {
                    this.host.jqxGrid('clear');
                };
                jqxGridComponent.prototype.destroy = function () {
                    this.host.jqxGrid('destroy');
                };
                jqxGridComponent.prototype.endupdate = function () {
                    this.host.jqxGrid('endupdate');
                };
                jqxGridComponent.prototype.ensurerowvisible = function (rowBoundIndex) {
                    this.host.jqxGrid('ensurerowvisible', rowBoundIndex);
                };
                jqxGridComponent.prototype.focus = function () {
                    this.host.jqxGrid('focus');
                };
                jqxGridComponent.prototype.getcolumnindex = function (dataField) {
                    return this.host.jqxGrid('getcolumnindex', dataField);
                };
                jqxGridComponent.prototype.getcolumn = function (dataField) {
                    return this.host.jqxGrid('getcolumn', dataField);
                };
                jqxGridComponent.prototype.getcolumnproperty = function (dataField, propertyName) {
                    return this.host.jqxGrid('getcolumnproperty', dataField, propertyName);
                };
                jqxGridComponent.prototype.getrowid = function (rowBoundIndex) {
                    return this.host.jqxGrid('getrowid', rowBoundIndex);
                };
                jqxGridComponent.prototype.getrowdata = function (rowBoundIndex) {
                    return this.host.jqxGrid('getrowdata', rowBoundIndex);
                };
                jqxGridComponent.prototype.getrowdatabyid = function (rowID) {
                    return this.host.jqxGrid('getrowdatabyid', rowID);
                };
                jqxGridComponent.prototype.getrowboundindexbyid = function (rowID) {
                    return this.host.jqxGrid('getrowboundindexbyid', rowID);
                };
                jqxGridComponent.prototype.getrowboundindex = function (rowDisplayIndex) {
                    return this.host.jqxGrid('getrowboundindex', rowDisplayIndex);
                };
                jqxGridComponent.prototype.getrows = function () {
                    return this.host.jqxGrid('getrows');
                };
                jqxGridComponent.prototype.getboundrows = function () {
                    return this.host.jqxGrid('getboundrows');
                };
                jqxGridComponent.prototype.getdisplayrows = function () {
                    return this.host.jqxGrid('getdisplayrows');
                };
                jqxGridComponent.prototype.getdatainformation = function () {
                    return this.host.jqxGrid('getdatainformation');
                };
                jqxGridComponent.prototype.getsortinformation = function () {
                    return this.host.jqxGrid('getsortinformation');
                };
                jqxGridComponent.prototype.getpaginginformation = function () {
                    return this.host.jqxGrid('getpaginginformation');
                };
                jqxGridComponent.prototype.hidecolumn = function (dataField) {
                    this.host.jqxGrid('hidecolumn', dataField);
                };
                jqxGridComponent.prototype.hideloadelement = function () {
                    this.host.jqxGrid('hideloadelement');
                };
                jqxGridComponent.prototype.hiderowdetails = function (rowBoundIndex) {
                    this.host.jqxGrid('hiderowdetails', rowBoundIndex);
                };
                jqxGridComponent.prototype.iscolumnvisible = function (dataField) {
                    return this.host.jqxGrid('iscolumnvisible', dataField);
                };
                jqxGridComponent.prototype.iscolumnpinned = function (dataField) {
                    return this.host.jqxGrid('iscolumnpinned', dataField);
                };
                jqxGridComponent.prototype.localizestrings = function (localizationObject) {
                    this.host.jqxGrid('localizestrings', localizationObject);
                };
                jqxGridComponent.prototype.pincolumn = function (dataField) {
                    this.host.jqxGrid('pincolumn', dataField);
                };
                jqxGridComponent.prototype.refreshdata = function () {
                    this.host.jqxGrid('refreshdata');
                };
                jqxGridComponent.prototype.refresh = function () {
                    this.host.jqxGrid('refresh');
                };
                jqxGridComponent.prototype.render = function () {
                    this.host.jqxGrid('render');
                };
                jqxGridComponent.prototype.scrolloffset = function (top, left) {
                    this.host.jqxGrid('scrolloffset', top, left);
                };
                jqxGridComponent.prototype.scrollposition = function () {
                    return this.host.jqxGrid('scrollposition');
                };
                jqxGridComponent.prototype.showloadelement = function () {
                    this.host.jqxGrid('showloadelement');
                };
                jqxGridComponent.prototype.showrowdetails = function (rowBoundIndex) {
                    this.host.jqxGrid('showrowdetails', rowBoundIndex);
                };
                jqxGridComponent.prototype.setcolumnindex = function (dataField, index) {
                    this.host.jqxGrid('setcolumnindex', dataField, index);
                };
                jqxGridComponent.prototype.setcolumnproperty = function (dataField, propertyName, propertyValue) {
                    this.host.jqxGrid('setcolumnproperty', dataField, propertyName, propertyValue);
                };
                jqxGridComponent.prototype.showcolumn = function (dataField) {
                    this.host.jqxGrid('showcolumn', dataField);
                };
                jqxGridComponent.prototype.unpincolumn = function (dataField) {
                    this.host.jqxGrid('unpincolumn', dataField);
                };
                jqxGridComponent.prototype.updatebounddata = function (type) {
                    this.host.jqxGrid('updatebounddata', type);
                };
                jqxGridComponent.prototype.updating = function () {
                    return this.host.jqxGrid('updating');
                };
                jqxGridComponent.prototype.getsortcolumn = function () {
                    return this.host.jqxGrid('getsortcolumn');
                };
                jqxGridComponent.prototype.removesort = function () {
                    this.host.jqxGrid('removesort');
                };
                jqxGridComponent.prototype.sortby = function (dataField, sortOrder) {
                    this.host.jqxGrid('sortby', dataField, sortOrder);
                };
                jqxGridComponent.prototype.addgroup = function (dataField) {
                    this.host.jqxGrid('addgroup', dataField);
                };
                jqxGridComponent.prototype.cleargroups = function () {
                    this.host.jqxGrid('cleargroups');
                };
                jqxGridComponent.prototype.collapsegroup = function (group) {
                    this.host.jqxGrid('collapsegroup', group);
                };
                jqxGridComponent.prototype.collapseallgroups = function () {
                    this.host.jqxGrid('collapseallgroups');
                };
                jqxGridComponent.prototype.expandallgroups = function () {
                    this.host.jqxGrid('expandallgroups');
                };
                jqxGridComponent.prototype.expandgroup = function (group) {
                    this.host.jqxGrid('expandgroup', group);
                };
                jqxGridComponent.prototype.getrootgroupscount = function () {
                    return this.host.jqxGrid('getrootgroupscount');
                };
                jqxGridComponent.prototype.getgroup = function (groupIndex) {
                    return this.host.jqxGrid('getgroup', groupIndex);
                };
                jqxGridComponent.prototype.insertgroup = function (groupIndex, dataField) {
                    this.host.jqxGrid('insertgroup', groupIndex, dataField);
                };
                jqxGridComponent.prototype.iscolumngroupable = function () {
                    return this.host.jqxGrid('iscolumngroupable');
                };
                jqxGridComponent.prototype.removegroupat = function (groupIndex) {
                    this.host.jqxGrid('removegroupat', groupIndex);
                };
                jqxGridComponent.prototype.removegroup = function (dataField) {
                    this.host.jqxGrid('removegroup', dataField);
                };
                jqxGridComponent.prototype.addfilter = function (dataField, filterGroup, refreshGrid) {
                    this.host.jqxGrid('addfilter', dataField, filterGroup, refreshGrid);
                };
                jqxGridComponent.prototype.applyfilters = function () {
                    this.host.jqxGrid('applyfilters');
                };
                jqxGridComponent.prototype.clearfilters = function () {
                    this.host.jqxGrid('clearfilters');
                };
                jqxGridComponent.prototype.getfilterinformation = function () {
                    return this.host.jqxGrid('getfilterinformation');
                };
                jqxGridComponent.prototype.removefilter = function (dataField, refreshGrid) {
                    this.host.jqxGrid('removefilter', dataField, refreshGrid);
                };
                jqxGridComponent.prototype.refreshfilterrow = function () {
                    this.host.jqxGrid('refreshfilterrow');
                };
                jqxGridComponent.prototype.gotopage = function (pageNumber) {
                    this.host.jqxGrid('gotopage', pageNumber);
                };
                jqxGridComponent.prototype.gotoprevpage = function () {
                    this.host.jqxGrid('gotoprevpage');
                };
                jqxGridComponent.prototype.gotonextpage = function () {
                    this.host.jqxGrid('gotonextpage');
                };
                jqxGridComponent.prototype.addrow = function (rowIds, data, rowPosition) {
                    this.host.jqxGrid('addrow', rowIds, data, rowPosition);
                };
                jqxGridComponent.prototype.begincelledit = function (rowBoundIndex, dataField) {
                    this.host.jqxGrid('begincelledit', rowBoundIndex, dataField);
                };
                jqxGridComponent.prototype.beginrowedit = function (rowBoundIndex) {
                    this.host.jqxGrid('beginrowedit', rowBoundIndex);
                };
                jqxGridComponent.prototype.closemenu = function () {
                    this.host.jqxGrid('closemenu');
                };
                jqxGridComponent.prototype.deleterow = function (rowIds) {
                    this.host.jqxGrid('deleterow', rowIds);
                };
                jqxGridComponent.prototype.endcelledit = function (rowBoundIndex, dataField, confirmChanges) {
                    this.host.jqxGrid('endcelledit', rowBoundIndex, dataField, confirmChanges);
                };
                jqxGridComponent.prototype.endrowedit = function (rowBoundIndex, confirmChanges) {
                    this.host.jqxGrid('endrowedit', rowBoundIndex, confirmChanges);
                };
                jqxGridComponent.prototype.getcell = function (rowBoundIndex, datafield) {
                    return this.host.jqxGrid('getcell', rowBoundIndex, datafield);
                };
                jqxGridComponent.prototype.getcellatposition = function (left, top) {
                    return this.host.jqxGrid('getcellatposition', left, top);
                };
                jqxGridComponent.prototype.getcelltext = function (rowBoundIndex, dataField) {
                    return this.host.jqxGrid('getcelltext', rowBoundIndex, dataField);
                };
                jqxGridComponent.prototype.getcelltextbyid = function (rowID, dataField) {
                    return this.host.jqxGrid('getcelltextbyid', rowID, dataField);
                };
                jqxGridComponent.prototype.getcellvaluebyid = function (rowID, dataField) {
                    return this.host.jqxGrid('getcellvaluebyid', rowID, dataField);
                };
                jqxGridComponent.prototype.getcellvalue = function (rowBoundIndex, dataField) {
                    return this.host.jqxGrid('getcellvalue', rowBoundIndex, dataField);
                };
                jqxGridComponent.prototype.isBindingCompleted = function () {
                    return this.host.jqxGrid('isBindingCompleted');
                };
                jqxGridComponent.prototype.openmenu = function (dataField) {
                    this.host.jqxGrid('openmenu', dataField);
                };
                jqxGridComponent.prototype.setcellvalue = function (rowBoundIndex, dataField, value) {
                    this.host.jqxGrid('setcellvalue', rowBoundIndex, dataField, value);
                };
                jqxGridComponent.prototype.setcellvaluebyid = function (rowID, dataField, value) {
                    this.host.jqxGrid('setcellvaluebyid', rowID, dataField, value);
                };
                jqxGridComponent.prototype.showvalidationpopup = function (rowBoundIndex, dataField, validationMessage) {
                    this.host.jqxGrid('showvalidationpopup', rowBoundIndex, dataField, validationMessage);
                };
                jqxGridComponent.prototype.updaterow = function (rowIds, data) {
                    this.host.jqxGrid('updaterow', rowIds, data);
                };
                jqxGridComponent.prototype.clearselection = function () {
                    this.host.jqxGrid('clearselection');
                };
                jqxGridComponent.prototype.getselectedrowindex = function () {
                    return this.host.jqxGrid('getselectedrowindex');
                };
                jqxGridComponent.prototype.getselectedrowindexes = function () {
                    return this.host.jqxGrid('getselectedrowindexes');
                };
                jqxGridComponent.prototype.getselectedcell = function () {
                    return this.host.jqxGrid('getselectedcell');
                };
                jqxGridComponent.prototype.getselectedcells = function () {
                    return this.host.jqxGrid('getselectedcells');
                };
                jqxGridComponent.prototype.selectcell = function (rowBoundIndex, dataField) {
                    this.host.jqxGrid('selectcell', rowBoundIndex, dataField);
                };
                jqxGridComponent.prototype.selectallrows = function () {
                    this.host.jqxGrid('selectallrows');
                };
                jqxGridComponent.prototype.selectrow = function (rowBoundIndex) {
                    this.host.jqxGrid('selectrow', rowBoundIndex);
                };
                jqxGridComponent.prototype.unselectrow = function (rowBoundIndex) {
                    this.host.jqxGrid('unselectrow', rowBoundIndex);
                };
                jqxGridComponent.prototype.unselectcell = function (rowBoundIndex, dataField) {
                    this.host.jqxGrid('unselectcell', rowBoundIndex, dataField);
                };
                jqxGridComponent.prototype.getcolumnaggregateddata = function (dataField, aggregates) {
                    return this.host.jqxGrid('getcolumnaggregateddata', dataField, aggregates);
                };
                jqxGridComponent.prototype.refreshaggregates = function () {
                    this.host.jqxGrid('refreshaggregates');
                };
                jqxGridComponent.prototype.renderaggregates = function () {
                    this.host.jqxGrid('renderaggregates');
                };
                jqxGridComponent.prototype.exportdata = function (dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet) {
                    this.host.jqxGrid('exportdata', dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet);
                };
                jqxGridComponent.prototype.getstate = function () {
                    return this.host.jqxGrid('getstate');
                };
                jqxGridComponent.prototype.loadstate = function (stateObject) {
                    this.host.jqxGrid('loadstate', stateObject);
                };
                jqxGridComponent.prototype.savestate = function () {
                    return this.host.jqxGrid('savestate');
                };
                jqxGridComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('bindingcomplete', function (eventData) { if (self.OnBindingcomplete)
                        self.OnBindingcomplete.next(eventData); });
                    this.host.bind('columnresized', function (eventData) { if (self.OnColumnresized)
                        self.OnColumnresized.next(eventData); });
                    this.host.bind('columnreordered', function (eventData) { if (self.OnColumnreordered)
                        self.OnColumnreordered.next(eventData); });
                    this.host.bind('columnclick', function (eventData) { if (self.OnColumnclick)
                        self.OnColumnclick.next(eventData); });
                    this.host.bind('cellclick', function (eventData) { if (self.OnCellclick)
                        self.OnCellclick.next(eventData); });
                    this.host.bind('celldoubleclick', function (eventData) { if (self.OnCelldoubleclick)
                        self.OnCelldoubleclick.next(eventData); });
                    this.host.bind('cellselect', function (eventData) { if (self.OnCellselect)
                        self.OnCellselect.next(eventData); });
                    this.host.bind('cellunselect', function (eventData) { if (self.OnCellunselect)
                        self.OnCellunselect.next(eventData); });
                    this.host.bind('cellvaluechanged', function (eventData) { if (self.OnCellvaluechanged)
                        self.OnCellvaluechanged.next(eventData); });
                    this.host.bind('cellbeginedit', function (eventData) { if (self.OnCellbeginedit)
                        self.OnCellbeginedit.next(eventData); });
                    this.host.bind('cellendedit', function (eventData) { if (self.OnCellendedit)
                        self.OnCellendedit.next(eventData); });
                    this.host.bind('filter', function (eventData) { if (self.OnFilter)
                        self.OnFilter.next(eventData); });
                    this.host.bind('groupschanged', function (eventData) { if (self.OnGroupschanged)
                        self.OnGroupschanged.next(eventData); });
                    this.host.bind('groupexpand', function (eventData) { if (self.OnGroupexpand)
                        self.OnGroupexpand.next(eventData); });
                    this.host.bind('groupcollapse', function (eventData) { if (self.OnGroupcollapse)
                        self.OnGroupcollapse.next(eventData); });
                    this.host.bind('pagechanged', function (eventData) { if (self.OnPagechanged)
                        self.OnPagechanged.next(eventData); });
                    this.host.bind('pagesizechanged', function (eventData) { if (self.OnPagesizechanged)
                        self.OnPagesizechanged.next(eventData); });
                    this.host.bind('rowclick', function (eventData) { if (self.OnRowclick)
                        self.OnRowclick.next(eventData); });
                    this.host.bind('rowdoubleclick', function (eventData) { if (self.OnRowdoubleclick)
                        self.OnRowdoubleclick.next(eventData); });
                    this.host.bind('rowselect', function (eventData) { if (self.OnRowselect)
                        self.OnRowselect.next(eventData); });
                    this.host.bind('rowunselect', function (eventData) { if (self.OnRowunselect)
                        self.OnRowunselect.next(eventData); });
                    this.host.bind('rowexpand', function (eventData) { if (self.OnRowexpand)
                        self.OnRowexpand.next(eventData); });
                    this.host.bind('rowcollapse', function (eventData) { if (self.OnRowcollapse)
                        self.OnRowcollapse.next(eventData); });
                    this.host.bind('sort', function (eventData) { if (self.OnSort)
                        self.OnSort.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('altrows'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "altrows", void 0);
                __decorate([
                    core_1.Input('altstart'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "altstart", void 0);
                __decorate([
                    core_1.Input('altstep'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "altstep", void 0);
                __decorate([
                    core_1.Input('autoshowloadelement'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "autoshowloadelement", void 0);
                __decorate([
                    core_1.Input('autoshowfiltericon'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "autoshowfiltericon", void 0);
                __decorate([
                    core_1.Input('autoshowcolumnsmenubutton'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "autoshowcolumnsmenubutton", void 0);
                __decorate([
                    core_1.Input('clipboard'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "clipboard", void 0);
                __decorate([
                    core_1.Input('closeablegroups'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "closeablegroups", void 0);
                __decorate([
                    core_1.Input('columnsmenuwidth'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "columnsmenuwidth", void 0);
                __decorate([
                    core_1.Input('columnmenuopening'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "columnmenuopening", void 0);
                __decorate([
                    core_1.Input('columnmenuclosing'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "columnmenuclosing", void 0);
                __decorate([
                    core_1.Input('cellhover'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "cellhover", void 0);
                __decorate([
                    core_1.Input('enablekeyboarddelete'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "enablekeyboarddelete", void 0);
                __decorate([
                    core_1.Input('enableellipsis'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "enableellipsis", void 0);
                __decorate([
                    core_1.Input('enablemousewheel'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "enablemousewheel", void 0);
                __decorate([
                    core_1.Input('enableanimations'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "enableanimations", void 0);
                __decorate([
                    core_1.Input('enabletooltips'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "enabletooltips", void 0);
                __decorate([
                    core_1.Input('enablehover'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "enablehover", void 0);
                __decorate([
                    core_1.Input('enablebrowserselection'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "enablebrowserselection", void 0);
                __decorate([
                    core_1.Input('everpresentrowposition'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "everpresentrowposition", void 0);
                __decorate([
                    core_1.Input('everpresentrowheight'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "everpresentrowheight", void 0);
                __decorate([
                    core_1.Input('everpresentrowactions'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "everpresentrowactions", void 0);
                __decorate([
                    core_1.Input('everpresentrowactionsmode'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "everpresentrowactionsmode", void 0);
                __decorate([
                    core_1.Input('filterrowheight'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "filterrowheight", void 0);
                __decorate([
                    core_1.Input('filtermode'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "filtermode", void 0);
                __decorate([
                    core_1.Input('groupsrenderer'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "groupsrenderer", void 0);
                __decorate([
                    core_1.Input('groupcolumnrenderer'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "groupcolumnrenderer", void 0);
                __decorate([
                    core_1.Input('groupsexpandedbydefault'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "groupsexpandedbydefault", void 0);
                __decorate([
                    core_1.Input('handlekeyboardnavigation'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "handlekeyboardnavigation", void 0);
                __decorate([
                    core_1.Input('pagerrenderer'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "pagerrenderer", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('showdefaultloadelement'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showdefaultloadelement", void 0);
                __decorate([
                    core_1.Input('showfiltercolumnbackground'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showfiltercolumnbackground", void 0);
                __decorate([
                    core_1.Input('showfiltermenuitems'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showfiltermenuitems", void 0);
                __decorate([
                    core_1.Input('showpinnedcolumnbackground'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showpinnedcolumnbackground", void 0);
                __decorate([
                    core_1.Input('showsortcolumnbackground'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showsortcolumnbackground", void 0);
                __decorate([
                    core_1.Input('showsortmenuitems'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showsortmenuitems", void 0);
                __decorate([
                    core_1.Input('showgroupmenuitems'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showgroupmenuitems", void 0);
                __decorate([
                    core_1.Input('showrowdetailscolumn'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showrowdetailscolumn", void 0);
                __decorate([
                    core_1.Input('showheader'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showheader", void 0);
                __decorate([
                    core_1.Input('showgroupsheader'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showgroupsheader", void 0);
                __decorate([
                    core_1.Input('showaggregates'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showaggregates", void 0);
                __decorate([
                    core_1.Input('showeverpresentrow'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showeverpresentrow", void 0);
                __decorate([
                    core_1.Input('showfilterrow'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showfilterrow", void 0);
                __decorate([
                    core_1.Input('showemptyrow'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showemptyrow", void 0);
                __decorate([
                    core_1.Input('showstatusbar'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showstatusbar", void 0);
                __decorate([
                    core_1.Input('statusbarheight'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "statusbarheight", void 0);
                __decorate([
                    core_1.Input('showtoolbar'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "showtoolbar", void 0);
                __decorate([
                    core_1.Input('selectionmode'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "selectionmode", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('toolbarheight'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "toolbarheight", void 0);
                __decorate([
                    core_1.Input('autoheight'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "autoheight", void 0);
                __decorate([
                    core_1.Input('autorowheight'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "autorowheight", void 0);
                __decorate([
                    core_1.Input('columnsheight'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "columnsheight", void 0);
                __decorate([
                    core_1.Input('deferreddatafields'), 
                    __metadata('design:type', Array)
                ], jqxGridComponent.prototype, "deferreddatafields", void 0);
                __decorate([
                    core_1.Input('groupsheaderheight'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "groupsheaderheight", void 0);
                __decorate([
                    core_1.Input('groupindentwidth'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "groupindentwidth", void 0);
                __decorate([
                    core_1.Input('pagerheight'), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "pagerheight", void 0);
                __decorate([
                    core_1.Input('rowsheight'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "rowsheight", void 0);
                __decorate([
                    core_1.Input('scrollbarsize'), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "scrollbarsize", void 0);
                __decorate([
                    core_1.Input('scrollmode'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "scrollmode", void 0);
                __decorate([
                    core_1.Input('scrollfeedback'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "scrollfeedback", void 0);
                __decorate([
                    core_1.Input('autosavestate'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "autosavestate", void 0);
                __decorate([
                    core_1.Input('autoloadstate'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "autoloadstate", void 0);
                __decorate([
                    core_1.Input('columns'), 
                    __metadata('design:type', Array)
                ], jqxGridComponent.prototype, "columns", void 0);
                __decorate([
                    core_1.Input('columngroups'), 
                    __metadata('design:type', Array)
                ], jqxGridComponent.prototype, "columngroups", void 0);
                __decorate([
                    core_1.Input('columnsmenu'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "columnsmenu", void 0);
                __decorate([
                    core_1.Input('columnsresize'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "columnsresize", void 0);
                __decorate([
                    core_1.Input('columnsautoresize'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "columnsautoresize", void 0);
                __decorate([
                    core_1.Input('columnsreorder'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "columnsreorder", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('editable'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "editable", void 0);
                __decorate([
                    core_1.Input('editmode'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "editmode", void 0);
                __decorate([
                    core_1.Input('filter'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "filter", void 0);
                __decorate([
                    core_1.Input('filterable'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "filterable", void 0);
                __decorate([
                    core_1.Input('groupable'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "groupable", void 0);
                __decorate([
                    core_1.Input('groups'), 
                    __metadata('design:type', Array)
                ], jqxGridComponent.prototype, "groups", void 0);
                __decorate([
                    core_1.Input('horizontalscrollbarstep'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "horizontalscrollbarstep", void 0);
                __decorate([
                    core_1.Input('horizontalscrollbarlargestep'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "horizontalscrollbarlargestep", void 0);
                __decorate([
                    core_1.Input('initrowdetails'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "initrowdetails", void 0);
                __decorate([
                    core_1.Input('keyboardnavigation'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "keyboardnavigation", void 0);
                __decorate([
                    core_1.Input('pagesize'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "pagesize", void 0);
                __decorate([
                    core_1.Input('pagesizeoptions'), 
                    __metadata('design:type', Array)
                ], jqxGridComponent.prototype, "pagesizeoptions", void 0);
                __decorate([
                    core_1.Input('pagermode'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "pagermode", void 0);
                __decorate([
                    core_1.Input('pagerbuttonscount'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "pagerbuttonscount", void 0);
                __decorate([
                    core_1.Input('pageable'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "pageable", void 0);
                __decorate([
                    core_1.Input('rowdetails'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "rowdetails", void 0);
                __decorate([
                    core_1.Input('rowdetailstemplate'), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "rowdetailstemplate", void 0);
                __decorate([
                    core_1.Input('ready'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "ready", void 0);
                __decorate([
                    core_1.Input('rendered'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "rendered", void 0);
                __decorate([
                    core_1.Input('renderstatusbar'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "renderstatusbar", void 0);
                __decorate([
                    core_1.Input('rendertoolbar'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "rendertoolbar", void 0);
                __decorate([
                    core_1.Input('rendergridrows'), 
                    __metadata('design:type', Function)
                ], jqxGridComponent.prototype, "rendergridrows", void 0);
                __decorate([
                    core_1.Input('sortable'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "sortable", void 0);
                __decorate([
                    core_1.Input('selectedrowindex'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "selectedrowindex", void 0);
                __decorate([
                    core_1.Input('selectedrowindexes'), 
                    __metadata('design:type', Array)
                ], jqxGridComponent.prototype, "selectedrowindexes", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('sorttogglestates'), 
                    __metadata('design:type', String)
                ], jqxGridComponent.prototype, "sorttogglestates", void 0);
                __decorate([
                    core_1.Input('updatedelay'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "updatedelay", void 0);
                __decorate([
                    core_1.Input('virtualmode'), 
                    __metadata('design:type', Boolean)
                ], jqxGridComponent.prototype, "virtualmode", void 0);
                __decorate([
                    core_1.Input('verticalscrollbarstep'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "verticalscrollbarstep", void 0);
                __decorate([
                    core_1.Input('verticalscrollbarlargestep'), 
                    __metadata('design:type', Number)
                ], jqxGridComponent.prototype, "verticalscrollbarlargestep", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnBindingcomplete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnColumnresized", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnColumnreordered", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnColumnclick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnCellclick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnCelldoubleclick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnCellselect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnCellunselect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnCellvaluechanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnCellbeginedit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnCellendedit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnFilter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnGroupschanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnGroupexpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnGroupcollapse", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnPagechanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnPagesizechanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnRowclick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnRowdoubleclick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnRowselect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnRowunselect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnRowexpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnRowcollapse", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxGridComponent.prototype, "OnSort", void 0);
                jqxGridComponent = __decorate([
                    core_1.Component({
                        selector: 'angularGrid',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxGridComponent);
                return jqxGridComponent;
                var _a;
            }());
            exports_1("jqxGridComponent", jqxGridComponent); //jqxGridComponent
        }
    }
});
//# sourceMappingURL=angular_jqxgrid.js.map