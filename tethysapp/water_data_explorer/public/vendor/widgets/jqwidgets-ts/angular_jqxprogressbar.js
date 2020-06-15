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
    var jqxProgressBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxProgressBarComponent = (function () {
                function jqxProgressBarComponent(containerElement) {
                    // jqxProgressBarComponent events
                    this.OnComplete = new core_1.EventEmitter();
                    this.OnInvalidvalue = new core_1.EventEmitter();
                    this.OnValueChanged = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxProgressBarComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxProgressBarComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxProgressBar', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxProgressBarComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxProgressBarComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxProgressBarComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxProgressBar(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxProgressBarComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxProgressBarComponent.prototype.setOptions = function (options) {
                    this.host.jqxProgressBar('setOptions', options);
                };
                // jqxProgressBarComponent functions
                jqxProgressBarComponent.prototype.actualValue = function (value) {
                    this.host.jqxProgressBar('actualValue', value);
                };
                jqxProgressBarComponent.prototype.destroy = function () {
                    this.host.jqxProgressBar('destroy');
                };
                jqxProgressBarComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxProgressBar('val', value);
                    }
                    else {
                        return this.host.jqxProgressBar('val');
                    }
                };
                jqxProgressBarComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('complete', function (eventData) { if (self.OnComplete)
                        self.OnComplete.next(eventData); });
                    this.host.bind('invalidvalue', function (eventData) { if (self.OnInvalidvalue)
                        self.OnInvalidvalue.next(eventData); });
                    this.host.bind('valueChanged', function (eventData) { if (self.OnValueChanged)
                        self.OnValueChanged.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxProgressBarComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxProgressBarComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('animationDuration'), 
                    __metadata('design:type', Number)
                ], jqxProgressBarComponent.prototype, "animationDuration", void 0);
                __decorate([
                    core_1.Input('colorRanges'), 
                    __metadata('design:type', Array)
                ], jqxProgressBarComponent.prototype, "colorRanges", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxProgressBarComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('layout'), 
                    __metadata('design:type', String)
                ], jqxProgressBarComponent.prototype, "layout", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Object)
                ], jqxProgressBarComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Object)
                ], jqxProgressBarComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('orientation'), 
                    __metadata('design:type', String)
                ], jqxProgressBarComponent.prototype, "orientation", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxProgressBarComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('renderText'), 
                    __metadata('design:type', Function)
                ], jqxProgressBarComponent.prototype, "renderText", void 0);
                __decorate([
                    core_1.Input('showText'), 
                    __metadata('design:type', Boolean)
                ], jqxProgressBarComponent.prototype, "showText", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxProgressBarComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxProgressBarComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Object)
                ], jqxProgressBarComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxProgressBarComponent.prototype, "OnComplete", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxProgressBarComponent.prototype, "OnInvalidvalue", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxProgressBarComponent.prototype, "OnValueChanged", void 0);
                jqxProgressBarComponent = __decorate([
                    core_1.Component({
                        selector: 'angularProgressBar',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxProgressBarComponent);
                return jqxProgressBarComponent;
                var _a;
            }());
            exports_1("jqxProgressBarComponent", jqxProgressBarComponent); //jqxProgressBarComponent
        }
    }
});
//# sourceMappingURL=angular_jqxprogressbar.js.map