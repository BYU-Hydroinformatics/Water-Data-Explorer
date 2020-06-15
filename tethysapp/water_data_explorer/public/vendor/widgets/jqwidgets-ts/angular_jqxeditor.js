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
    var jqxEditorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxEditorComponent = (function () {
                function jqxEditorComponent(containerElement) {
                    // jqxEditorComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxEditorComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxEditorComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxEditor', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxEditorComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxEditorComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxEditorComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxEditor(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxEditorComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxEditorComponent.prototype.setOptions = function (options) {
                    this.host.jqxEditor('setOptions', options);
                };
                // jqxEditorComponent functions
                jqxEditorComponent.prototype.destroy = function () {
                    this.host.jqxEditor('destroy');
                };
                jqxEditorComponent.prototype.focus = function () {
                    this.host.jqxEditor('focus');
                };
                jqxEditorComponent.prototype.print = function () {
                    this.host.jqxEditor('print');
                };
                jqxEditorComponent.prototype.setMode = function (mode) {
                    this.host.jqxEditor('setMode', mode);
                };
                jqxEditorComponent.prototype.val = function (htmlValue) {
                    if (htmlValue !== undefined) {
                        return this.host.jqxEditor('val', htmlValue);
                    }
                    else {
                        return this.host.jqxEditor('val');
                    }
                };
                jqxEditorComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxEditorComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxEditorComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('createCommand'), 
                    __metadata('design:type', Function)
                ], jqxEditorComponent.prototype, "createCommand", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxEditorComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('editable'), 
                    __metadata('design:type', Boolean)
                ], jqxEditorComponent.prototype, "editable", void 0);
                __decorate([
                    core_1.Input('lineBreak'), 
                    __metadata('design:type', String)
                ], jqxEditorComponent.prototype, "lineBreak", void 0);
                __decorate([
                    core_1.Input('localization'), 
                    __metadata('design:type', Object)
                ], jqxEditorComponent.prototype, "localization", void 0);
                __decorate([
                    core_1.Input('pasteMode'), 
                    __metadata('design:type', String)
                ], jqxEditorComponent.prototype, "pasteMode", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxEditorComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('stylesheets'), 
                    __metadata('design:type', Array)
                ], jqxEditorComponent.prototype, "stylesheets", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxEditorComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('toolbarPosition'), 
                    __metadata('design:type', String)
                ], jqxEditorComponent.prototype, "toolbarPosition", void 0);
                __decorate([
                    core_1.Input('tools'), 
                    __metadata('design:type', String)
                ], jqxEditorComponent.prototype, "tools", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxEditorComponent.prototype, "OnChange", void 0);
                jqxEditorComponent = __decorate([
                    core_1.Component({
                        selector: 'angularEditor',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxEditorComponent);
                return jqxEditorComponent;
                var _a;
            }());
            exports_1("jqxEditorComponent", jqxEditorComponent); //jqxEditorComponent
        }
    }
});
//# sourceMappingURL=angular_jqxeditor.js.map