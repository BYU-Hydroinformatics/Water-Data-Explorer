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
    var jqxRatingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxRatingComponent = (function () {
                function jqxRatingComponent(containerElement) {
                    // jqxRatingComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxRatingComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxRatingComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRating', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxRatingComponent.prototype.ngAfterViewInit = function () {
                    // if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxRatingComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxRatingComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxRating(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxRatingComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxRatingComponent.prototype.setOptions = function (options) {
                    this.host.jqxRating('setOptions', options);
                };
                // jqxRatingComponent functions
                jqxRatingComponent.prototype.disable = function () {
                    this.host.jqxRating('disable');
                };
                jqxRatingComponent.prototype.enable = function () {
                    this.host.jqxRating('enable');
                };
                jqxRatingComponent.prototype.getValue = function () {
                    return this.host.jqxRating('getValue');
                };
                jqxRatingComponent.prototype.setValue = function (value) {
                    this.host.jqxRating('setValue', value);
                };
                jqxRatingComponent.prototype.val = function (value) {
                    return this.host.jqxRating('val', value);
                };
                jqxRatingComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxRatingComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxRatingComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('count'), 
                    __metadata('design:type', Number)
                ], jqxRatingComponent.prototype, "count", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxRatingComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('itemHeight'), 
                    __metadata('design:type', Number)
                ], jqxRatingComponent.prototype, "itemHeight", void 0);
                __decorate([
                    core_1.Input('itemWidth'), 
                    __metadata('design:type', Number)
                ], jqxRatingComponent.prototype, "itemWidth", void 0);
                __decorate([
                    core_1.Input('precision'), 
                    __metadata('design:type', Number)
                ], jqxRatingComponent.prototype, "precision", void 0);
                __decorate([
                    core_1.Input('singleVote'), 
                    __metadata('design:type', Boolean)
                ], jqxRatingComponent.prototype, "singleVote", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Number)
                ], jqxRatingComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxRatingComponent.prototype, "OnChange", void 0);
                jqxRatingComponent = __decorate([
                    core_1.Component({
                        selector: 'angularRating',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxRatingComponent);
                return jqxRatingComponent;
                var _a;
            }());
            exports_1("jqxRatingComponent", jqxRatingComponent); //jqxRatingComponent
        }
    }
});
//# sourceMappingURL=angular_jqxrating.js.map