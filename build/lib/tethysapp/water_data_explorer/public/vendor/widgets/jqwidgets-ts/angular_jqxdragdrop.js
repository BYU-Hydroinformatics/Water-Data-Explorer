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
    var jqxDragDropComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxDragDropComponent = (function () {
                function jqxDragDropComponent(containerElement) {
                    // jqxDragDropComponent functions
                    // jqxDragDropComponent events
                    this.OnDragStart = new core_1.EventEmitter();
                    this.OnDragEnd = new core_1.EventEmitter();
                    this.OnDragging = new core_1.EventEmitter();
                    this.OnDropTargetEnter = new core_1.EventEmitter();
                    this.OnDropTargetLeave = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxDragDropComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxDragDropComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDragDrop', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxDragDropComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxDragDropComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxDragDropComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxDragDrop(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxDragDropComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxDragDropComponent.prototype.setOptions = function (options) {
                    this.host.jqxDragDrop('setOptions', options);
                };
                jqxDragDropComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('dragStart', function (eventData) { if (self.OnDragStart)
                        self.OnDragStart.next(eventData); });
                    this.host.bind('dragEnd', function (eventData) { if (self.OnDragEnd)
                        self.OnDragEnd.next(eventData); });
                    this.host.bind('dragging', function (eventData) { if (self.OnDragging)
                        self.OnDragging.next(eventData); });
                    this.host.bind('dropTargetEnter', function (eventData) { if (self.OnDropTargetEnter)
                        self.OnDropTargetEnter.next(eventData); });
                    this.host.bind('dropTargetLeave', function (eventData) { if (self.OnDropTargetLeave)
                        self.OnDropTargetLeave.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('appendTo'), 
                    __metadata('design:type', String)
                ], jqxDragDropComponent.prototype, "appendTo", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxDragDropComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('distance'), 
                    __metadata('design:type', Number)
                ], jqxDragDropComponent.prototype, "distance", void 0);
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Input('dropAction'), 
                    __metadata('design:type', String)
                ], jqxDragDropComponent.prototype, "dropAction", void 0);
                __decorate([
                    core_1.Input('dropTarget'), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "dropTarget", void 0);
                __decorate([
                    core_1.Input('dragZIndex'), 
                    __metadata('design:type', Number)
                ], jqxDragDropComponent.prototype, "dragZIndex", void 0);
                __decorate([
                    core_1.Input('feedback'), 
                    __metadata('design:type', String)
                ], jqxDragDropComponent.prototype, "feedback", void 0);
                __decorate([
                    core_1.Input('initFeedback'), 
                    __metadata('design:type', Function)
                ], jqxDragDropComponent.prototype, "initFeedback", void 0);
                __decorate([
                    core_1.Input('opacity'), 
                    __metadata('design:type', Number)
                ], jqxDragDropComponent.prototype, "opacity", void 0);
                __decorate([
                    core_1.Input('onDragEnd'), 
                    __metadata('design:type', Function)
                ], jqxDragDropComponent.prototype, "onDragEnd", void 0);
                __decorate([
                    core_1.Input('onDrag'), 
                    __metadata('design:type', Function)
                ], jqxDragDropComponent.prototype, "onDrag", void 0);
                __decorate([
                    core_1.Input('onDragStart'), 
                    __metadata('design:type', Function)
                ], jqxDragDropComponent.prototype, "onDragStart", void 0);
                __decorate([
                    core_1.Input('onTargetDrop'), 
                    __metadata('design:type', Function)
                ], jqxDragDropComponent.prototype, "onTargetDrop", void 0);
                __decorate([
                    core_1.Input('onDropTargetEnter'), 
                    __metadata('design:type', Function)
                ], jqxDragDropComponent.prototype, "onDropTargetEnter", void 0);
                __decorate([
                    core_1.Input('onDropTargetLeave'), 
                    __metadata('design:type', Function)
                ], jqxDragDropComponent.prototype, "onDropTargetLeave", void 0);
                __decorate([
                    core_1.Input('restricter'), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "restricter", void 0);
                __decorate([
                    core_1.Input('revert'), 
                    __metadata('design:type', Boolean)
                ], jqxDragDropComponent.prototype, "revert", void 0);
                __decorate([
                    core_1.Input('revertDuration'), 
                    __metadata('design:type', Number)
                ], jqxDragDropComponent.prototype, "revertDuration", void 0);
                __decorate([
                    core_1.Input('tolerance'), 
                    __metadata('design:type', String)
                ], jqxDragDropComponent.prototype, "tolerance", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "OnDragStart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "OnDragEnd", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "OnDragging", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "OnDropTargetEnter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxDragDropComponent.prototype, "OnDropTargetLeave", void 0);
                jqxDragDropComponent = __decorate([
                    core_1.Component({
                        selector: 'angularDragDrop',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxDragDropComponent);
                return jqxDragDropComponent;
                var _a;
            }());
            exports_1("jqxDragDropComponent", jqxDragDropComponent); //jqxDragDropComponent
        }
    }
});
//# sourceMappingURL=angular_jqxdragdrop.js.map