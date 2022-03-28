System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdragdrop', '../../../../../jqwidgets-ts/angular_jqxpanel'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdragdrop_1, angular_jqxpanel_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdragdrop_1_1) {
                angular_jqxdragdrop_1 = angular_jqxdragdrop_1_1;
            },
            function (angular_jqxpanel_1_1) {
                angular_jqxpanel_1 = angular_jqxpanel_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.DragDropSettings = {
                        restricter: '#draggable-parent', dropTarget: '.drop-target', appendTo: '#draggable-parent'
                    };
                    this.PanelSettings = {
                        width: 260, height: 330
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                        var dragDropElement = document.getElementsByClassName('jqx-draggable')[0];
                        var panelElement = document.getElementsByClassName('jqx-panel')[0];
                        dragDropElement.style.border = '1px solid #bbb';
                        dragDropElement.style.backgroundColor = '#C9ECFF';
                        dragDropElement.style.width = '100px';
                        dragDropElement.style.height = '100px';
                        dragDropElement.style.left = '30px';
                        dragDropElement.style.top = '50px';
                        dragDropElement.style.padding = '5px';
                        dragDropElement.style.zIndex = '2';
                        panelElement.style.cssFloat = 'right';
                        panelElement.style.padding = '10px';
                        panelElement.style.fontFamily = 'Tahoma';
                        panelElement.style.fontSize = '13px';
                        this.centerLabels();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.addEvent = function (type, position) {
                    position.left = position.left.toString().match(/([^.]+)/);
                    position.top = position.top.toString().match(/([^.]+)/);
                    position.left[0] === '-0' ? position.left[0] = 0 : position.left[0] = position.left[0];
                    position.top[0] === '-0' ? position.top[0] = 0 : position.top[0] = position.top[0];
                    this.myPanel.prepend('<div class="row">Event: ' + type + ', (' + position.left[0] + ', ' + position.top[0] + ')</div>');
                };
                AppComponent.prototype.centerLabels = function () {
                    var labels = document.getElementsByClassName('label');
                    for (var i = 0; i < labels.length; i++) {
                        var parentHeight = labels[i].parentElement.offsetHeight;
                        var elementheight = labels[i].clientHeight;
                        var top = (parentHeight - elementheight) / 2;
                        labels[i].style.top = top + 'px';
                    }
                };
                AppComponent.prototype.OnDragStart = function (event) {
                    this.addEvent(event.type, event.args.position);
                };
                AppComponent.prototype.OnDragEnd = function (event) {
                    this.addEvent(event.type, event.args.position);
                };
                AppComponent.prototype.OnDropTargetEnter = function (event) {
                    this.addEvent(event.type, event.args.position);
                };
                AppComponent.prototype.OnDropTargetLeave = function (event) {
                    this.addEvent(event.type, event.args.position);
                };
                AppComponent.prototype.Initialize = function () {
                    this.myDragDrop.createWidget(this.DragDropSettings);
                    this.myPanel.createWidget(this.PanelSettings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxdragdrop_1.jqxDragDropComponent), 
                    __metadata('design:type', angular_jqxdragdrop_1.jqxDragDropComponent)
                ], AppComponent.prototype, "myDragDrop", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxpanel_1.jqxPanelComponent), 
                    __metadata('design:type', angular_jqxpanel_1.jqxPanelComponent)
                ], AppComponent.prototype, "myPanel", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/dragdrop/defaultfunctionality/app.component.htm',
                        styleUrls: ['app/dragdrop/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxdragdrop_1.jqxDragDropComponent, angular_jqxpanel_1.jqxPanelComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map