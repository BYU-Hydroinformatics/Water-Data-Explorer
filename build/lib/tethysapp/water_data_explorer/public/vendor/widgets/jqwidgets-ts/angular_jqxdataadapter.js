/*
jQWidgets v4.2.0 (2016-Aug)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/

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
    var jqxDataAdapterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDataAdapterComponent = (function () {
                function jqxDataAdapterComponent(containerElement) {
                    this.elementRef = containerElement;
                }
                jqxDataAdapterComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDataAdapterComponent.prototype.initHost = function () {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDataAdapter');
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDataAdapterComponent.prototype.ngAfterViewInit = function () {
                    if (!this.isHostReady())
                        this.initHost();
                };
                jqxDataAdapterComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDataAdapterComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost())
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDataAdapter(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDataAdapterComponent.prototype.setOptions = function (options) {
                    this.host.jqxDataAdapter('setOptions', options);
                };
                // jqxDataAdapterComponent functions
                // jqxDataAdapterComponent events
                jqxDataAdapterComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDataAdapterComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDataAdapterComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('columnDelimiter'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "columnDelimiter", void 0);
                __decorate([
                    core_1.Input('datafields'), 
                    __metadata('design:type', Array)
                ], jqxDataAdapterComponent.prototype, "datafields", void 0);
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Object)
                ], jqxDataAdapterComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Input('datatype'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "datatype", void 0);
                __decorate([
                    core_1.Input('type'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "type", void 0);
                __decorate([
                    core_1.Input('id'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "id", void 0);
                __decorate([
                    core_1.Input('localdata'), 
                    __metadata('design:type', Object)
                ], jqxDataAdapterComponent.prototype, "localdata", void 0);
                __decorate([
                    core_1.Input('mapChar'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "mapChar", void 0);
                __decorate([
                    core_1.Input('rowDelimiter'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "rowDelimiter", void 0);
                __decorate([
                    core_1.Input('root'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "root", void 0);
                __decorate([
                    core_1.Input('record'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "record", void 0);
                __decorate([
                    core_1.Input('url'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "url", void 0);
                __decorate([
                    core_1.Input('async'), 
                    __metadata('design:type', Boolean)
                ], jqxDataAdapterComponent.prototype, "async", void 0);
                __decorate([
                    core_1.Input('autoBind'), 
                    __metadata('design:type', Boolean)
                ], jqxDataAdapterComponent.prototype, "autoBind", void 0);
                __decorate([
                    core_1.Input('beforeSend'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "beforeSend", void 0);
                __decorate([
                    core_1.Input('beforeLoadComplete'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "beforeLoadComplete", void 0);
                __decorate([
                    core_1.Input('contentType'), 
                    __metadata('design:type', String)
                ], jqxDataAdapterComponent.prototype, "contentType", void 0);
                __decorate([
                    core_1.Input('formatData'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "formatData", void 0);
                __decorate([
                    core_1.Input('loadError'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "loadError", void 0);
                __decorate([
                    core_1.Input('loadComplete'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "loadComplete", void 0);
                __decorate([
                    core_1.Input('loadServerData'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "loadServerData", void 0);
                __decorate([
                    core_1.Input('processData'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "processData", void 0);
                __decorate([
                    core_1.Input('beginUpdate'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "beginUpdate", void 0);
                __decorate([
                    core_1.Input('dataBind'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "dataBind", void 0);
                __decorate([
                    core_1.Input('endUpdate'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "endUpdate", void 0);
                __decorate([
                    core_1.Input('formatDate'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "formatDate", void 0);
                __decorate([
                    core_1.Input('formatNumber'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "formatNumber", void 0);
                __decorate([
                    core_1.Input('getRecordsHierarchy'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "getRecordsHierarchy", void 0);
                __decorate([
                    core_1.Input('getGroupedRecords'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "getGroupedRecords", void 0);
                __decorate([
                    core_1.Input('getAggregatedData'), 
                    __metadata('design:type', Function)
                ], jqxDataAdapterComponent.prototype, "getAggregatedData", void 0);
                __decorate([
                    core_1.Input('records'), 
                    __metadata('design:type', Array)
                ], jqxDataAdapterComponent.prototype, "records", void 0);
                jqxDataAdapterComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDataAdapter',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDataAdapterComponent);
                return jqxDataAdapterComponent;
                var _a;
            }());
            exports_1("jqxDataAdapterComponent", jqxDataAdapterComponent); //jqxDataAdapterComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdataadapter.js.map