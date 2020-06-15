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
    var jqxFileUploadComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxFileUploadComponent = (function () {
                function jqxFileUploadComponent(containerElement) {
                    // jqxFileUploadComponent events
                    this.OnRemove = new core_1.EventEmitter();
                    this.OnSelect = new core_1.EventEmitter();
                    this.OnUploadStart = new core_1.EventEmitter();
                    this.OnUploadEnd = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxFileUploadComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxFileUploadComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxFileUpload', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxFileUploadComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxFileUploadComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxFileUploadComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxFileUpload(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxFileUploadComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxFileUploadComponent.prototype.setOptions = function (options) {
                    this.host.jqxFileUpload('setOptions', options);
                };
                // jqxFileUploadComponent functions
                jqxFileUploadComponent.prototype.browse = function () {
                    this.host.jqxFileUpload('browse');
                };
                jqxFileUploadComponent.prototype.cancelFile = function () {
                    this.host.jqxFileUpload('cancelFile');
                };
                jqxFileUploadComponent.prototype.cancelAll = function () {
                    this.host.jqxFileUpload('cancelAll');
                };
                jqxFileUploadComponent.prototype.destroy = function () {
                    this.host.jqxFileUpload('destroy');
                };
                jqxFileUploadComponent.prototype.render = function () {
                    this.host.jqxFileUpload('render');
                };
                jqxFileUploadComponent.prototype.refresh = function () {
                    this.host.jqxFileUpload('refresh');
                };
                jqxFileUploadComponent.prototype.uploadFile = function (fileIndex) {
                    this.host.jqxFileUpload('uploadFile', fileIndex);
                };
                jqxFileUploadComponent.prototype.uploadAll = function () {
                    this.host.jqxFileUpload('uploadAll');
                };
                jqxFileUploadComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('remove', function (eventData) { if (self.OnRemove)
                        self.OnRemove.next(eventData); });
                    this.host.bind('select', function (eventData) { if (self.OnSelect)
                        self.OnSelect.next(eventData); });
                    this.host.bind('uploadStart', function (eventData) { if (self.OnUploadStart)
                        self.OnUploadStart.next(eventData); });
                    this.host.bind('uploadEnd', function (eventData) { if (self.OnUploadEnd)
                        self.OnUploadEnd.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxFileUploadComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxFileUploadComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('autoUpload'), 
                    __metadata('design:type', Boolean)
                ], jqxFileUploadComponent.prototype, "autoUpload", void 0);
                __decorate([
                    core_1.Input('accept'), 
                    __metadata('design:type', String)
                ], jqxFileUploadComponent.prototype, "accept", void 0);
                __decorate([
                    core_1.Input('browseTemplate'), 
                    __metadata('design:type', String)
                ], jqxFileUploadComponent.prototype, "browseTemplate", void 0);
                __decorate([
                    core_1.Input('cancelTemplate'), 
                    __metadata('design:type', String)
                ], jqxFileUploadComponent.prototype, "cancelTemplate", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxFileUploadComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('fileInputName'), 
                    __metadata('design:type', String)
                ], jqxFileUploadComponent.prototype, "fileInputName", void 0);
                __decorate([
                    core_1.Input('localization'), 
                    __metadata('design:type', Object)
                ], jqxFileUploadComponent.prototype, "localization", void 0);
                __decorate([
                    core_1.Input('multipleFilesUpload'), 
                    __metadata('design:type', Boolean)
                ], jqxFileUploadComponent.prototype, "multipleFilesUpload", void 0);
                __decorate([
                    core_1.Input('renderFiles'), 
                    __metadata('design:type', Function)
                ], jqxFileUploadComponent.prototype, "renderFiles", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxFileUploadComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxFileUploadComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('uploadUrl'), 
                    __metadata('design:type', String)
                ], jqxFileUploadComponent.prototype, "uploadUrl", void 0);
                __decorate([
                    core_1.Input('uploadTemplate'), 
                    __metadata('design:type', String)
                ], jqxFileUploadComponent.prototype, "uploadTemplate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxFileUploadComponent.prototype, "OnRemove", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxFileUploadComponent.prototype, "OnSelect", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxFileUploadComponent.prototype, "OnUploadStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxFileUploadComponent.prototype, "OnUploadEnd", void 0);
                jqxFileUploadComponent = __decorate([
                    core_1.Component({
                        selector: 'angularFileUpload',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxFileUploadComponent);
                return jqxFileUploadComponent;
                var _a;
            }());
            exports_1("jqxFileUploadComponent", jqxFileUploadComponent); //jqxFileUploadComponent
        }
    }
});
//# sourceMappingURL=angular_jqxfileupload.js.map