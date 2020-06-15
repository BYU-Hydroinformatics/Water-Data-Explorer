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
    var jqxSortableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxSortableComponent = (function () {
                function jqxSortableComponent(containerElement) {
                    // jqxSortableComponent events
                    this.OnActivate = new core_1.EventEmitter();
                    this.OnBeforeStop = new core_1.EventEmitter();
                    this.OnChange = new core_1.EventEmitter();
                    this.OnCreate = new core_1.EventEmitter();
                    this.OnDeactivate = new core_1.EventEmitter();
                    this.OnOut = new core_1.EventEmitter();
                    this.OnOver = new core_1.EventEmitter();
                    this.OnReceive = new core_1.EventEmitter();
                    this.OnRemove = new core_1.EventEmitter();
                    this.OnSort = new core_1.EventEmitter();
                    this.OnStart = new core_1.EventEmitter();
                    this.OnStop = new core_1.EventEmitter();
                    this.OnUpdate = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxSortableComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxSortableComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSortable', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxSortableComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxSortableComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxSortableComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxSortable(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxSortableComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxSortableComponent.prototype.setOptions = function (options) {
                    this.host.jqxSortable('setOptions', options);
                };
                // jqxSortableComponent functions
                jqxSortableComponent.prototype.cancelMethod = function () {
                    this.host.jqxSortable('cancelMethod');
                };
                jqxSortableComponent.prototype.destroy = function () {
                    this.host.jqxSortable('destroy');
                };
                jqxSortableComponent.prototype.disable = function () {
                    this.host.jqxSortable('disable');
                };
                jqxSortableComponent.prototype.enable = function () {
                    this.host.jqxSortable('enable');
                };
                jqxSortableComponent.prototype.refresh = function () {
                    this.host.jqxSortable('refresh');
                };
                jqxSortableComponent.prototype.refreshPositions = function () {
                    this.host.jqxSortable('refreshPositions');
                };
                jqxSortableComponent.prototype.serialize = function () {
                    this.host.jqxSortable('serialize');
                };
                jqxSortableComponent.prototype.toArray = function () {
                    this.host.jqxSortable('toArray');
                };
                jqxSortableComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('activate', function (eventData) { if (self.OnActivate)
                        self.OnActivate.next(eventData); });
                    this.host.bind('beforeStop', function (eventData) { if (self.OnBeforeStop)
                        self.OnBeforeStop.next(eventData); });
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('create', function (eventData) { if (self.OnCreate)
                        self.OnCreate.next(eventData); });
                    this.host.bind('deactivate', function (eventData) { if (self.OnDeactivate)
                        self.OnDeactivate.next(eventData); });
                    this.host.bind('out', function (eventData) { if (self.OnOut)
                        self.OnOut.next(eventData); });
                    this.host.bind('over', function (eventData) { if (self.OnOver)
                        self.OnOver.next(eventData); });
                    this.host.bind('receive', function (eventData) { if (self.OnReceive)
                        self.OnReceive.next(eventData); });
                    this.host.bind('remove', function (eventData) { if (self.OnRemove)
                        self.OnRemove.next(eventData); });
                    this.host.bind('sort', function (eventData) { if (self.OnSort)
                        self.OnSort.next(eventData); });
                    this.host.bind('start', function (eventData) { if (self.OnStart)
                        self.OnStart.next(eventData); });
                    this.host.bind('stop', function (eventData) { if (self.OnStop)
                        self.OnStop.next(eventData); });
                    this.host.bind('update', function (eventData) { if (self.OnUpdate)
                        self.OnUpdate.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('appendTo'), 
                    __metadata('design:type', String)
                ], jqxSortableComponent.prototype, "appendTo", void 0);
                __decorate([
                    core_1.Input('axis'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "axis", void 0);
                __decorate([
                    core_1.Input('cancel'), 
                    __metadata('design:type', String)
                ], jqxSortableComponent.prototype, "cancel", void 0);
                __decorate([
                    core_1.Input('connectWith'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "connectWith", void 0);
                __decorate([
                    core_1.Input('containment'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "containment", void 0);
                __decorate([
                    core_1.Input('cursor'), 
                    __metadata('design:type', String)
                ], jqxSortableComponent.prototype, "cursor", void 0);
                __decorate([
                    core_1.Input('cursorAt'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "cursorAt", void 0);
                __decorate([
                    core_1.Input('delay'), 
                    __metadata('design:type', Number)
                ], jqxSortableComponent.prototype, "delay", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxSortableComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('distance'), 
                    __metadata('design:type', Number)
                ], jqxSortableComponent.prototype, "distance", void 0);
                __decorate([
                    core_1.Input('dropOnEmpty'), 
                    __metadata('design:type', Boolean)
                ], jqxSortableComponent.prototype, "dropOnEmpty", void 0);
                __decorate([
                    core_1.Input('forceHelperSize'), 
                    __metadata('design:type', Boolean)
                ], jqxSortableComponent.prototype, "forceHelperSize", void 0);
                __decorate([
                    core_1.Input('forcePlaceholderSize'), 
                    __metadata('design:type', Boolean)
                ], jqxSortableComponent.prototype, "forcePlaceholderSize", void 0);
                __decorate([
                    core_1.Input('grid'), 
                    __metadata('design:type', Array)
                ], jqxSortableComponent.prototype, "grid", void 0);
                __decorate([
                    core_1.Input('handle'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "handle", void 0);
                __decorate([
                    core_1.Input('helper'), 
                    __metadata('design:type', String)
                ], jqxSortableComponent.prototype, "helper", void 0);
                __decorate([
                    core_1.Input('items'), 
                    __metadata('design:type', String)
                ], jqxSortableComponent.prototype, "items", void 0);
                __decorate([
                    core_1.Input('opacity'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "opacity", void 0);
                __decorate([
                    core_1.Input('placeholderShow'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "placeholderShow", void 0);
                __decorate([
                    core_1.Input('revert'), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "revert", void 0);
                __decorate([
                    core_1.Input('scroll'), 
                    __metadata('design:type', Boolean)
                ], jqxSortableComponent.prototype, "scroll", void 0);
                __decorate([
                    core_1.Input('scrollSensitivity'), 
                    __metadata('design:type', Number)
                ], jqxSortableComponent.prototype, "scrollSensitivity", void 0);
                __decorate([
                    core_1.Input('scrollSpeed'), 
                    __metadata('design:type', Number)
                ], jqxSortableComponent.prototype, "scrollSpeed", void 0);
                __decorate([
                    core_1.Input('tolerance'), 
                    __metadata('design:type', String)
                ], jqxSortableComponent.prototype, "tolerance", void 0);
                __decorate([
                    core_1.Input('zIndex'), 
                    __metadata('design:type', Number)
                ], jqxSortableComponent.prototype, "zIndex", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnActivate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnBeforeStop", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnCreate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnDeactivate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnOut", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnOver", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnReceive", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnRemove", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnSort", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnStop", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxSortableComponent.prototype, "OnUpdate", void 0);
                jqxSortableComponent = __decorate([
                    core_1.Component({
                        selector: 'angularSortable',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxSortableComponent);
                return jqxSortableComponent;
                var _a;
            }());
            exports_1("jqxSortableComponent", jqxSortableComponent); //jqxSortableComponent
        }
    }
});
//# sourceMappingURL=angular_jqxsortable.js.map