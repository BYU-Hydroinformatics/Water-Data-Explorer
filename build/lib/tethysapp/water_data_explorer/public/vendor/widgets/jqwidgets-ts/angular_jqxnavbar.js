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
    var jqxNavBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxNavBarComponent = (function () {
                function jqxNavBarComponent(containerElement) {
                    // jqxNavBarComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxNavBarComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxNavBarComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNavBar', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxNavBarComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxNavBarComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxNavBarComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxNavBar(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxNavBarComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxNavBarComponent.prototype.setOptions = function (options) {
                    this.host.jqxNavBar('setOptions', options);
                };
                // jqxNavBarComponent functions
                jqxNavBarComponent.prototype.close = function () {
                    this.host.jqxNavBar('close');
                };
                jqxNavBarComponent.prototype.destroy = function () {
                    this.host.jqxNavBar('destroy');
                };
                jqxNavBarComponent.prototype.getSelectedIndex = function () {
                    return this.host.jqxNavBar('getSelectedIndex');
                };
                jqxNavBarComponent.prototype.open = function () {
                    this.host.jqxNavBar('open');
                };
                jqxNavBarComponent.prototype.selectAt = function (index) {
                    this.host.jqxNavBar('selectAt', index);
                };
                jqxNavBarComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxNavBarComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxNavBarComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('columns'), 
                    __metadata('design:type', Array)
                ], jqxNavBarComponent.prototype, "columns", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxNavBarComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('minimized'), 
                    __metadata('design:type', Boolean)
                ], jqxNavBarComponent.prototype, "minimized", void 0);
                __decorate([
                    core_1.Input('minimizeButtonPosition'), 
                    __metadata('design:type', String)
                ], jqxNavBarComponent.prototype, "minimizeButtonPosition", void 0);
                __decorate([
                    core_1.Input('minimizedHeight'), 
                    __metadata('design:type', Object)
                ], jqxNavBarComponent.prototype, "minimizedHeight", void 0);
                __decorate([
                    core_1.Input('minimizedTitle'), 
                    __metadata('design:type', Object)
                ], jqxNavBarComponent.prototype, "minimizedTitle", void 0);
                __decorate([
                    core_1.Input('orientation'), 
                    __metadata('design:type', String)
                ], jqxNavBarComponent.prototype, "orientation", void 0);
                __decorate([
                    core_1.Input('popupAnimationDelay'), 
                    __metadata('design:type', Number)
                ], jqxNavBarComponent.prototype, "popupAnimationDelay", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxNavBarComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('selection'), 
                    __metadata('design:type', Boolean)
                ], jqxNavBarComponent.prototype, "selection", void 0);
                __decorate([
                    core_1.Input('selectedItem'), 
                    __metadata('design:type', Object)
                ], jqxNavBarComponent.prototype, "selectedItem", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxNavBarComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxNavBarComponent.prototype, "OnChange", void 0);
                jqxNavBarComponent = __decorate([
                    core_1.Component({
                        selector: 'angularNavBar',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxNavBarComponent);
                return jqxNavBarComponent;
                var _a;
            }());
            exports_1("jqxNavBarComponent", jqxNavBarComponent); //jqxNavBarComponent
        }
    }
});
//# sourceMappingURL=angular_jqxnavbar.js.map