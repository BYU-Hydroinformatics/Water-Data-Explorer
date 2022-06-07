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
    var jqxToolBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxToolBarComponent = (function () {
                function jqxToolBarComponent(containerElement) {
                    // jqxToolBarComponent events
                    this.OnClose = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxToolBarComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxToolBarComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxToolBar', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxToolBarComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxToolBarComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxToolBarComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxToolBar(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxToolBarComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxToolBarComponent.prototype.setOptions = function (options) {
                    this.host.jqxToolBar('setOptions', options);
                };
                // jqxToolBarComponent functions
                jqxToolBarComponent.prototype.addTool = function (type, position, separator, menuToolIninitialization) {
                    this.host.jqxToolBar('addTool', type, position, separator, menuToolIninitialization);
                };
                jqxToolBarComponent.prototype.disableTool = function (index, disable) {
                    this.host.jqxToolBar('disableTool', index, disable);
                };
                jqxToolBarComponent.prototype.destroy = function () {
                    this.host.jqxToolBar('destroy');
                };
                jqxToolBarComponent.prototype.destroyTool = function (index) {
                    this.host.jqxToolBar('destroyTool', index);
                };
                jqxToolBarComponent.prototype.getTools = function () {
                    return this.host.jqxToolBar('getTools');
                };
                jqxToolBarComponent.prototype.render = function () {
                    this.host.jqxToolBar('render');
                };
                jqxToolBarComponent.prototype.refresh = function () {
                    this.host.jqxToolBar('refresh');
                };
                jqxToolBarComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxToolBarComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxToolBarComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxToolBarComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('initTools'), 
                    __metadata('design:type', Function)
                ], jqxToolBarComponent.prototype, "initTools", void 0);
                __decorate([
                    core_1.Input('minimizeWidth'), 
                    __metadata('design:type', Number)
                ], jqxToolBarComponent.prototype, "minimizeWidth", void 0);
                __decorate([
                    core_1.Input('minWidth'), 
                    __metadata('design:type', Object)
                ], jqxToolBarComponent.prototype, "minWidth", void 0);
                __decorate([
                    core_1.Input('maxWidth'), 
                    __metadata('design:type', Object)
                ], jqxToolBarComponent.prototype, "maxWidth", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxToolBarComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('tools'), 
                    __metadata('design:type', String)
                ], jqxToolBarComponent.prototype, "tools", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxToolBarComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxToolBarComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxToolBarComponent.prototype, "OnOpen", void 0);
                jqxToolBarComponent = __decorate([
                    core_1.Component({
                        selector: 'angularToolbar',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxToolBarComponent);
                return jqxToolBarComponent;
                var _a;
            }());
            exports_1("jqxToolBarComponent", jqxToolBarComponent); //jqxToolBarComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtoolbar.js.map