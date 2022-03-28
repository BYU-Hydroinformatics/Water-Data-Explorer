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
    var jqxKanbanComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxKanbanComponent = (function () {
                function jqxKanbanComponent(containerElement) {
                    // jqxKanbanComponent events
                    this.OnColumnAttrClicked = new core_1.EventEmitter();
                    this.OnColumnCollapsed = new core_1.EventEmitter();
                    this.OnColumnExpanded = new core_1.EventEmitter();
                    this.OnItemAttrClicked = new core_1.EventEmitter();
                    this.OnItemMoved = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxKanbanComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxKanbanComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxKanban', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxKanbanComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //    this.initHost({});
                };
                jqxKanbanComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxKanbanComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxKanban(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxKanbanComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxKanbanComponent.prototype.setOptions = function (options) {
                    this.host.jqxKanban('setOptions', options);
                };
                // jqxKanbanComponent functions
                jqxKanbanComponent.prototype.addItem = function (newItem) {
                    this.host.jqxKanban('addItem', newItem);
                };
                jqxKanbanComponent.prototype.destroy = function () {
                    this.host.jqxKanban('destroy');
                };
                jqxKanbanComponent.prototype.getColumn = function (dataField) {
                    return this.host.jqxKanban('getColumn', dataField);
                };
                jqxKanbanComponent.prototype.getColumnItems = function (dataField) {
                    return this.host.jqxKanban('getColumnItems', dataField);
                };
                jqxKanbanComponent.prototype.getItems = function () {
                    return this.host.jqxKanban('getItems');
                };
                jqxKanbanComponent.prototype.removeItem = function (itemId) {
                    this.host.jqxKanban('removeItem', itemId);
                };
                jqxKanbanComponent.prototype.updateItem = function (itemId, newContent) {
                    this.host.jqxKanban('updateItem', itemId, newContent);
                };
                jqxKanbanComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('columnAttrClicked', function (eventData) { if (self.OnColumnAttrClicked)
                        self.OnColumnAttrClicked.next(eventData); });
                    this.host.bind('columnCollapsed', function (eventData) { if (self.OnColumnCollapsed)
                        self.OnColumnCollapsed.next(eventData); });
                    this.host.bind('columnExpanded', function (eventData) { if (self.OnColumnExpanded)
                        self.OnColumnExpanded.next(eventData); });
                    this.host.bind('itemAttrClicked', function (eventData) { if (self.OnItemAttrClicked)
                        self.OnItemAttrClicked.next(eventData); });
                    this.host.bind('itemMoved', function (eventData) { if (self.OnItemMoved)
                        self.OnItemMoved.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('columnRenderer'), 
                    __metadata('design:type', Function)
                ], jqxKanbanComponent.prototype, "columnRenderer", void 0);
                __decorate([
                    core_1.Input('columns'), 
                    __metadata('design:type', Array)
                ], jqxKanbanComponent.prototype, "columns", void 0);
                __decorate([
                    core_1.Input('connectWith'), 
                    __metadata('design:type', String)
                ], jqxKanbanComponent.prototype, "connectWith", void 0);
                __decorate([
                    core_1.Input('headerHeight'), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "headerHeight", void 0);
                __decorate([
                    core_1.Input('headerWidth'), 
                    __metadata('design:type', Number)
                ], jqxKanbanComponent.prototype, "headerWidth", void 0);
                __decorate([
                    core_1.Input('itemRenderer'), 
                    __metadata('design:type', Function)
                ], jqxKanbanComponent.prototype, "itemRenderer", void 0);
                __decorate([
                    core_1.Input('ready'), 
                    __metadata('design:type', Function)
                ], jqxKanbanComponent.prototype, "ready", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxKanbanComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('resources'), 
                    __metadata('design:type', Array)
                ], jqxKanbanComponent.prototype, "resources", void 0);
                __decorate([
                    core_1.Input('template'), 
                    __metadata('design:type', String)
                ], jqxKanbanComponent.prototype, "template", void 0);
                __decorate([
                    core_1.Input('templateContent'), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "templateContent", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxKanbanComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "OnColumnAttrClicked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "OnColumnCollapsed", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "OnColumnExpanded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "OnItemAttrClicked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxKanbanComponent.prototype, "OnItemMoved", void 0);
                jqxKanbanComponent = __decorate([
                    core_1.Component({
                        selector: 'angularKanban',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxKanbanComponent);
                return jqxKanbanComponent;
                var _a;
            }());
            exports_1("jqxKanbanComponent", jqxKanbanComponent); //jqxKanbanComponent
        }
    }
});
//# sourceMappingURL=angular_jqxkanban.js.map