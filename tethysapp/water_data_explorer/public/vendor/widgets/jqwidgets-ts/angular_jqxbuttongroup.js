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
    var jqxButtonGroupComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxButtonGroupComponent = (function () {
                function jqxButtonGroupComponent(containerElement) {
                    // jqxButtonGroupComponent events
                    this.OnButtonClick = new core_1.EventEmitter();
                    this.OnSelected = new core_1.EventEmitter();
                    this.OnUnselected = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxButtonGroupComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxButtonGroupComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    this.host[0].style.marginLeft = "1px";
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxButtonGroup', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxButtonGroupComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxButtonGroupComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxButtonGroupComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxButtonGroup(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxButtonGroupComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxButtonGroupComponent.prototype.setOptions = function (options) {
                    this.host.jqxButtonGroup('setOptions', options);
                };
                // jqxButtonGroupComponent functions
                jqxButtonGroupComponent.prototype.disableAt = function (index) {
                    this.host.jqxButtonGroup('disableAt', index);
                };
                jqxButtonGroupComponent.prototype.disable = function () {
                    this.host.jqxButtonGroup('disable');
                };
                jqxButtonGroupComponent.prototype.destroy = function () {
                    this.host.jqxButtonGroup('destroy');
                };
                jqxButtonGroupComponent.prototype.enable = function () {
                    this.host.jqxButtonGroup('enable');
                };
                jqxButtonGroupComponent.prototype.enableAt = function (index) {
                    this.host.jqxButtonGroup('enableAt', index);
                };
                jqxButtonGroupComponent.prototype.focus = function () {
                    this.host.jqxButtonGroup('focus');
                };
                jqxButtonGroupComponent.prototype.getSelection = function () {
                    return this.host.jqxButtonGroup('getSelection');
                };
                jqxButtonGroupComponent.prototype.render = function () {
                    this.host.jqxButtonGroup('render');
                };
                jqxButtonGroupComponent.prototype.setSelection = function (index) {
                    this.host.jqxButtonGroup('setSelection', index);
                };
                jqxButtonGroupComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('buttonclick', function (eventData) { if (self.OnButtonclick)
                        self.OnButtonclick.next(eventData); });
                    this.host.bind('selected', function (eventData) { if (self.OnSelected)
                        self.OnSelected.next(eventData); });
                    this.host.bind('unselected', function (eventData) { if (self.OnUnselected)
                        self.OnUnselected.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxButtonGroupComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxButtonGroupComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxButtonGroupComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('enableHover'), 
                    __metadata('design:type', Boolean)
                ], jqxButtonGroupComponent.prototype, "enableHover", void 0);
                __decorate([
                    core_1.Input('mode'), 
                    __metadata('design:type', String)
                ], jqxButtonGroupComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxButtonGroupComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxButtonGroupComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxButtonGroupComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxButtonGroupComponent.prototype, "OnButtonClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxButtonGroupComponent.prototype, "OnSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxButtonGroupComponent.prototype, "OnUnselected", void 0);
                jqxButtonGroupComponent = __decorate([
                    core_1.Component({
                        selector: 'angularButtonGroup',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxButtonGroupComponent);
                return jqxButtonGroupComponent;
                var _a;
            }());
            exports_1("jqxButtonGroupComponent", jqxButtonGroupComponent); //jqxButtonGroupComponent
        }
    }
});
//# sourceMappingURL=angular_jqxbuttongroup.js.map