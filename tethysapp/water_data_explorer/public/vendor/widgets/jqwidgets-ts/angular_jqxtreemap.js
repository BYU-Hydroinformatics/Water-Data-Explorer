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
    var jqxTreeMapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxTreeMapComponent = (function () {
                function jqxTreeMapComponent(containerElement) {
                    // jqxTreeMapComponent events
                    this.OnBindingComplete = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxTreeMapComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxTreeMapComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    this.host.css('margin-left', '1px');
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTreeMap', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxTreeMapComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxTreeMapComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxTreeMapComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxTreeMap(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxTreeMapComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxTreeMapComponent.prototype.setOptions = function (options) {
                    this.host.jqxTreeMap('setOptions', options);
                };
                // jqxTreeMapComponent functions
                jqxTreeMapComponent.prototype.destroy = function () {
                    this.host.jqxTreeMap('destroy');
                };
                jqxTreeMapComponent.prototype.render = function () {
                    this.host.jqxTreeMap('render');
                };
                jqxTreeMapComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('bindingComplete', function (eventData) { if (self.OnBindingComplete)
                        self.OnBindingComplete.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxTreeMapComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxTreeMapComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('baseColor'), 
                    __metadata('design:type', String)
                ], jqxTreeMapComponent.prototype, "baseColor", void 0);
                __decorate([
                    core_1.Input('colorRanges'), 
                    __metadata('design:type', Array)
                ], jqxTreeMapComponent.prototype, "colorRanges", void 0);
                __decorate([
                    core_1.Input('colorRange'), 
                    __metadata('design:type', Number)
                ], jqxTreeMapComponent.prototype, "colorRange", void 0);
                __decorate([
                    core_1.Input('colorMode'), 
                    __metadata('design:type', String)
                ], jqxTreeMapComponent.prototype, "colorMode", void 0);
                __decorate([
                    core_1.Input('displayMember'), 
                    __metadata('design:type', String)
                ], jqxTreeMapComponent.prototype, "displayMember", void 0);
                __decorate([
                    core_1.Input('hoverEnabled'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeMapComponent.prototype, "hoverEnabled", void 0);
                __decorate([
                    core_1.Input('headerHeight'), 
                    __metadata('design:type', Number)
                ], jqxTreeMapComponent.prototype, "headerHeight", void 0);
                __decorate([
                    core_1.Input('legendLabel'), 
                    __metadata('design:type', String)
                ], jqxTreeMapComponent.prototype, "legendLabel", void 0);
                __decorate([
                    core_1.Input('legendPosition'), 
                    __metadata('design:type', Object)
                ], jqxTreeMapComponent.prototype, "legendPosition", void 0);
                __decorate([
                    core_1.Input('legendScaleCallback'), 
                    __metadata('design:type', Function)
                ], jqxTreeMapComponent.prototype, "legendScaleCallback", void 0);
                __decorate([
                    core_1.Input('renderCallbacks'), 
                    __metadata('design:type', Object)
                ], jqxTreeMapComponent.prototype, "renderCallbacks", void 0);
                __decorate([
                    core_1.Input('selectionEnabled'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeMapComponent.prototype, "selectionEnabled", void 0);
                __decorate([
                    core_1.Input('showLegend'), 
                    __metadata('design:type', Boolean)
                ], jqxTreeMapComponent.prototype, "showLegend", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxTreeMapComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxTreeMapComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('valueMember'), 
                    __metadata('design:type', String)
                ], jqxTreeMapComponent.prototype, "valueMember", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTreeMapComponent.prototype, "OnBindingComplete", void 0);
                jqxTreeMapComponent = __decorate([
                    core_1.Component({
                        selector: 'angularTreeMap',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxTreeMapComponent);
                return jqxTreeMapComponent;
                var _a;
            }());
            exports_1("jqxTreeMapComponent", jqxTreeMapComponent); //jqxTreeMapComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtreemap.js.map