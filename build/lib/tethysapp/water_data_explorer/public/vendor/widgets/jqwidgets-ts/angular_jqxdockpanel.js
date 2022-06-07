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
    var jqxDockPanelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDockPanelComponent = (function () {
                function jqxDockPanelComponent(containerElement) {
                    // jqxDockPanelComponent functions
                    // jqxDockPanelComponent events
                    this.OnLayout = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxDockPanelComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDockPanelComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDockPanel', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDockPanelComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDockPanelComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDockPanelComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDockPanel(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDockPanelComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDockPanelComponent.prototype.setOptions = function (options) {
                    this.host.jqxDockPanel('setOptions', options);
                };
                jqxDockPanelComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('layout', function (eventData) { if (self.OnLayout)
                        self.OnLayout.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDockPanelComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDockPanelComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxDockPanelComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('lastchildfill'), 
                    __metadata('design:type', Boolean)
                ], jqxDockPanelComponent.prototype, "lastchildfill", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDockPanelComponent.prototype, "OnLayout", void 0);
                jqxDockPanelComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDockPanel',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDockPanelComponent);
                return jqxDockPanelComponent;
                var _a;
            }());
            exports_1("jqxDockPanelComponent", jqxDockPanelComponent); //jqxDockPanelComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdockpanel.js.map