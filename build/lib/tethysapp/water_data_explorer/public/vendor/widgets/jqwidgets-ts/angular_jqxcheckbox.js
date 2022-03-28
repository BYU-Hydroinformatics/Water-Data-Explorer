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
    var jqxCheckBoxComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxCheckBoxComponent = (function () {
                function jqxCheckBoxComponent(containerElement) {
                    // jqxCheckBoxComponent events
                    this.OnChecked = new core_1.EventEmitter();
                    this.OnChange = new core_1.EventEmitter();
                    this.OnIndeterminate = new core_1.EventEmitter();
                    this.OnUnchecked = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxCheckBoxComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxCheckBoxComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxCheckBox', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxCheckBoxComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxCheckBoxComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxCheckBoxComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxCheckBox(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxCheckBoxComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxCheckBoxComponent.prototype.setOptions = function (options) {
                    this.host.jqxCheckBox('setOptions', options);
                };
                // jqxCheckBoxComponent functions
                jqxCheckBoxComponent.prototype.check = function () {
                    this.host.jqxCheckBox('check');
                };
                jqxCheckBoxComponent.prototype.disable = function () {
                    this.host.jqxCheckBox('disable');
                };
                jqxCheckBoxComponent.prototype.destroy = function () {
                    this.host.jqxCheckBox('destroy');
                };
                jqxCheckBoxComponent.prototype.enable = function () {
                    this.host.jqxCheckBox('enable');
                };
                jqxCheckBoxComponent.prototype.focus = function () {
                    this.host.jqxCheckBox('focus');
                };
                jqxCheckBoxComponent.prototype.indeterminate = function () {
                    this.host.jqxCheckBox('indeterminate');
                };
                jqxCheckBoxComponent.prototype.render = function () {
                    this.host.jqxCheckBox('render');
                };
                jqxCheckBoxComponent.prototype.toggle = function () {
                    this.host.jqxCheckBox('toggle');
                };
                jqxCheckBoxComponent.prototype.uncheck = function () {
                    this.host.jqxCheckBox('uncheck');
                };
                jqxCheckBoxComponent.prototype.val = function (value) {
                    if (value !== undefined) {
                        return this.host.jqxCheckBox('val', value);
                    }
                    else {
                        return this.host.jqxCheckBox('val');
                    }
                };
                jqxCheckBoxComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('checked', function (eventData) { if (self.OnChecked)
                        self.OnChecked.next(eventData); });
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('indeterminate', function (eventData) { if (self.OnIndeterminate)
                        self.OnIndeterminate.next(eventData); });
                    this.host.bind('unchecked', function (eventData) { if (self.OnUnchecked)
                        self.OnUnchecked.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxCheckBoxComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxCheckBoxComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationShowDelay'), 
                    __metadata('design:type', Number)
                ], jqxCheckBoxComponent.prototype, "animationShowDelay", void 0);
                __decorate([
                    core_1.Input('animationHideDelay'), 
                    __metadata('design:type', Number)
                ], jqxCheckBoxComponent.prototype, "animationHideDelay", void 0);
                __decorate([
                    core_1.Input('boxSize'), 
                    __metadata('design:type', Object)
                ], jqxCheckBoxComponent.prototype, "boxSize", void 0);
                __decorate([
                    core_1.Input('checked'), 
                    __metadata('design:type', Boolean)
                ], jqxCheckBoxComponent.prototype, "checked", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxCheckBoxComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enableContainerClick'), 
                    __metadata('design:type', Boolean)
                ], jqxCheckBoxComponent.prototype, "enableContainerClick", void 0);
                __decorate([
                    core_1.Input('groupName'), 
                    __metadata('design:type', String)
                ], jqxCheckBoxComponent.prototype, "groupName", void 0);
                __decorate([
                    core_1.Input('hasThreeStates'), 
                    __metadata('design:type', Boolean)
                ], jqxCheckBoxComponent.prototype, "hasThreeStates", void 0);
                __decorate([
                    core_1.Input('locked'), 
                    __metadata('design:type', Boolean)
                ], jqxCheckBoxComponent.prototype, "locked", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxCheckBoxComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxCheckBoxComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxCheckBoxComponent.prototype, "OnChecked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxCheckBoxComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxCheckBoxComponent.prototype, "OnIndeterminate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxCheckBoxComponent.prototype, "OnUnchecked", void 0);
                jqxCheckBoxComponent = __decorate([
                    core_1.Component({
                        selector: 'angularCheckBox',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxCheckBoxComponent);
                return jqxCheckBoxComponent;
                var _a;
            }());
            exports_1("jqxCheckBoxComponent", jqxCheckBoxComponent); //jqxCheckBoxComponent
        }
    }
});
//# sourceMappingURL=angular_jqxcheckbox.js.map