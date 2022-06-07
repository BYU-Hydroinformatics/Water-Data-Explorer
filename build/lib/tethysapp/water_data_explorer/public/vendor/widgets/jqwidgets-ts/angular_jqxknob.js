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
    var jqxKnobComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxKnobComponent = (function () {
                function jqxKnobComponent(containerElement) {
                    // jqxKnobComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxKnobComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxKnobComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxKnob', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxKnobComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost();
                };
                jqxKnobComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxKnobComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxKnob(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxKnobComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxKnobComponent.prototype.setOptions = function (options) {
                    this.host.jqxKnob('setOptions', options);
                };
                // jqxKnobComponent functions
                jqxKnobComponent.prototype.destroy = function () {
                    this.host.jqxKnob('destroy');
                };
                jqxKnobComponent.prototype.val = function (value) {
                    var hasArguments = value !== undefined;
                    if (hasArguments) {
                        return this.host.jqxKnob('val', value);
                    }
                    else {
                        return this.host.jqxKnob('val');
                    }
                };
                jqxKnobComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('allowValueChangeOnClick'), 
                    __metadata('design:type', Boolean)
                ], jqxKnobComponent.prototype, "allowValueChangeOnClick", void 0);
                __decorate([
                    core_1.Input('allowValueChangeOnDrag'), 
                    __metadata('design:type', Boolean)
                ], jqxKnobComponent.prototype, "allowValueChangeOnDrag", void 0);
                __decorate([
                    core_1.Input('allowValueChangeOnMouseWheel'), 
                    __metadata('design:type', Boolean)
                ], jqxKnobComponent.prototype, "allowValueChangeOnMouseWheel", void 0);
                __decorate([
                    core_1.Input('changing'), 
                    __metadata('design:type', Function)
                ], jqxKnobComponent.prototype, "changing", void 0);
                __decorate([
                    core_1.Input('dragEndAngle'), 
                    __metadata('design:type', Number)
                ], jqxKnobComponent.prototype, "dragEndAngle", void 0);
                __decorate([
                    core_1.Input('dragStartAngle'), 
                    __metadata('design:type', Number)
                ], jqxKnobComponent.prototype, "dragStartAngle", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxKnobComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('dial'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "dial", void 0);
                __decorate([
                    core_1.Input('endAngle'), 
                    __metadata('design:type', Number)
                ], jqxKnobComponent.prototype, "endAngle", void 0);
                __decorate([
                    core_1.Input('labels'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "labels", void 0);
                __decorate([
                    core_1.Input('marks'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "marks", void 0);
                __decorate([
                    core_1.Input('min'), 
                    __metadata('design:type', Number)
                ], jqxKnobComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input('max'), 
                    __metadata('design:type', Number)
                ], jqxKnobComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input('progressBar'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "progressBar", void 0);
                __decorate([
                    core_1.Input('pointer'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "pointer", void 0);
                __decorate([
                    core_1.Input('pointerGrabAction'), 
                    __metadata('design:type', String)
                ], jqxKnobComponent.prototype, "pointerGrabAction", void 0);
                __decorate([
                    core_1.Input('rotation'), 
                    __metadata('design:type', String)
                ], jqxKnobComponent.prototype, "rotation", void 0);
                __decorate([
                    core_1.Input('startAngle'), 
                    __metadata('design:type', Number)
                ], jqxKnobComponent.prototype, "startAngle", void 0);
                __decorate([
                    core_1.Input('spinner'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "spinner", void 0);
                __decorate([
                    core_1.Input('style'), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "style", void 0);
                __decorate([
                    core_1.Input('step'), 
                    __metadata('design:type', Number)
                ], jqxKnobComponent.prototype, "step", void 0);
                __decorate([
                    core_1.Input('snapToStep'), 
                    __metadata('design:type', Boolean)
                ], jqxKnobComponent.prototype, "snapToStep", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Number)
                ], jqxKnobComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxKnobComponent.prototype, "OnChange", void 0);
                jqxKnobComponent = __decorate([
                    core_1.Component({
                        selector: 'angularKnob',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxKnobComponent);
                return jqxKnobComponent;
                var _a;
            }());
            exports_1("jqxKnobComponent", jqxKnobComponent); //jqxKnobComponent
        }
    }
});
//# sourceMappingURL=angular_jqxknob.js.map