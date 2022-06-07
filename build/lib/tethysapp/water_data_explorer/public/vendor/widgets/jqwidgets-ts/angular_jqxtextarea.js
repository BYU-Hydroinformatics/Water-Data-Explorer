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
    var jqxTextAreaComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            jqxTextAreaComponent = (function () {
                function jqxTextAreaComponent(containerElement) {
                    // jqxTextAreaComponent events
                    this.OnChange = new core_1.EventEmitter();
                    this.OnClose = new core_1.EventEmitter();
                    this.OnOpen = new core_1.EventEmitter();
                    this.OnSelect = new core_1.EventEmitter();
                    this.elementRef = containerElement;
                }
                jqxTextAreaComponent.prototype.isHostReady = function () {
                    return (this.host !== undefined && this.host.length == 1);
                };
                jqxTextAreaComponent.prototype.initHost = function (options) {
                    if (this.isHostReady())
                        return true;
                    this.host = $(this.elementRef.nativeElement.firstChild);
                    if (this.isHostReady()) {
                        this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTextArea', options);
                        this.__wireEvents__();
                        this.__updateRect__();
                        return true;
                    }
                    return false;
                };
                jqxTextAreaComponent.prototype.ngAfterViewInit = function () {
                    //if (!this.isHostReady())
                    //   this.initHost();
                };
                jqxTextAreaComponent.prototype.__updateRect__ = function () {
                    this.host.css({ width: this.width, height: this.height });
                };
                jqxTextAreaComponent.prototype.ngOnChanges = function (changes) {
                    if (!this.isHostReady()) {
                        if (!this.initHost({}))
                            return;
                    }
                    for (var i in changes) {
                        if (i == 'settings' || i == 'width' || i == 'height')
                            continue;
                        if (changes[i] && changes[i].currentValue !== undefined) {
                            try {
                                this.host.jqxTextArea(i, changes[i].currentValue);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    this.__updateRect__();
                };
                jqxTextAreaComponent.prototype.createWidget = function (options) {
                    if (!this.isHostReady())
                        this.initHost(options);
                };
                jqxTextAreaComponent.prototype.setOptions = function (options) {
                    this.host.jqxTextArea('setOptions', options);
                };
                // jqxTextAreaComponent functions
                jqxTextAreaComponent.prototype.destroy = function () {
                    this.host.jqxTextArea('destroy');
                };
                jqxTextAreaComponent.prototype.focus = function () {
                    this.host.jqxTextArea('focus');
                };
                jqxTextAreaComponent.prototype.refresh = function () {
                    this.host.jqxTextArea('refresh');
                };
                jqxTextAreaComponent.prototype.render = function () {
                    this.host.jqxTextArea('render');
                };
                jqxTextAreaComponent.prototype.selectAll = function () {
                    this.host.jqxTextArea('selectAll');
                };
                jqxTextAreaComponent.prototype.val = function (value) {
                    return this.host.jqxTextArea('val', value);
                };
                jqxTextAreaComponent.prototype.__wireEvents__ = function () {
                    var self = this;
                    this.host.bind('change', function (eventData) { if (self.OnChange)
                        self.OnChange.next(eventData); });
                    this.host.bind('close', function (eventData) { if (self.OnClose)
                        self.OnClose.next(eventData); });
                    this.host.bind('open', function (eventData) { if (self.OnOpen)
                        self.OnOpen.next(eventData); });
                    this.host.bind('select', function (eventData) { if (self.OnSelect)
                        self.OnSelect.next(eventData); });
                };
                __decorate([
                    core_1.Input('width'), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('height'), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('disabled'), 
                    __metadata('design:type', Boolean)
                ], jqxTextAreaComponent.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input('displayMember'), 
                    __metadata('design:type', String)
                ], jqxTextAreaComponent.prototype, "displayMember", void 0);
                __decorate([
                    core_1.Input('dropDownWidth'), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "dropDownWidth", void 0);
                __decorate([
                    core_1.Input('items'), 
                    __metadata('design:type', Number)
                ], jqxTextAreaComponent.prototype, "items", void 0);
                __decorate([
                    core_1.Input('maxLength'), 
                    __metadata('design:type', Number)
                ], jqxTextAreaComponent.prototype, "maxLength", void 0);
                __decorate([
                    core_1.Input('minLength'), 
                    __metadata('design:type', Number)
                ], jqxTextAreaComponent.prototype, "minLength", void 0);
                __decorate([
                    core_1.Input('opened'), 
                    __metadata('design:type', Boolean)
                ], jqxTextAreaComponent.prototype, "opened", void 0);
                __decorate([
                    core_1.Input('placeHolder'), 
                    __metadata('design:type', String)
                ], jqxTextAreaComponent.prototype, "placeHolder", void 0);
                __decorate([
                    core_1.Input('popupZIndex'), 
                    __metadata('design:type', Number)
                ], jqxTextAreaComponent.prototype, "popupZIndex", void 0);
                __decorate([
                    core_1.Input('query'), 
                    __metadata('design:type', String)
                ], jqxTextAreaComponent.prototype, "query", void 0);
                __decorate([
                    core_1.Input('renderer'), 
                    __metadata('design:type', Function)
                ], jqxTextAreaComponent.prototype, "renderer", void 0);
                __decorate([
                    core_1.Input('roundedCorners'), 
                    __metadata('design:type', Boolean)
                ], jqxTextAreaComponent.prototype, "roundedCorners", void 0);
                __decorate([
                    core_1.Input('rtl'), 
                    __metadata('design:type', Boolean)
                ], jqxTextAreaComponent.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input('scrollBarSize'), 
                    __metadata('design:type', Number)
                ], jqxTextAreaComponent.prototype, "scrollBarSize", void 0);
                __decorate([
                    core_1.Input('searchMode'), 
                    __metadata('design:type', String)
                ], jqxTextAreaComponent.prototype, "searchMode", void 0);
                __decorate([
                    core_1.Input('source'), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "source", void 0);
                __decorate([
                    core_1.Input('theme'), 
                    __metadata('design:type', String)
                ], jqxTextAreaComponent.prototype, "theme", void 0);
                __decorate([
                    core_1.Input('valueMember'), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "valueMember", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "OnChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "OnClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "OnOpen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], jqxTextAreaComponent.prototype, "OnSelect", void 0);
                jqxTextAreaComponent = __decorate([
                    core_1.Component({
                        selector: 'angularTextArea',
                        template: '<div><ng-content></ng-content></div>'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
                ], jqxTextAreaComponent);
                return jqxTextAreaComponent;
                var _a;
            }());
            exports_1("jqxTextAreaComponent", jqxTextAreaComponent); //jqxTextAreaComponent
        }
    }
});
//# sourceMappingURL=angular_jqxtextarea.js.map