System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxscrollbar'], function(exports_1, context_1) {
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
    var core_1, angular_jqxscrollbar_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxscrollbar_1_1) {
                angular_jqxscrollbar_1 = angular_jqxscrollbar_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.verticalScrollBarSettings = {
                        width: 18,
                        height: 280,
                        min: 0,
                        max: 1000,
                        vertical: true
                    };
                    this.horizontalScrollBarSettings = {
                        width: 280,
                        height: 18,
                        min: 0,
                        max: 1000
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnValueChangedVertical = function (event) {
                    document.getElementById('VerticalDiv').innerHTML = 'Vertical (' + parseInt(event.currentValue) + ')';
                };
                AppComponent.prototype.OnValueChangedHorizontal = function (event) {
                    document.getElementById('HorizontalDiv').innerHTML = 'Horizontal (' + parseInt(event.currentValue) + ')';
                };
                AppComponent.prototype.Initialize = function () {
                    this.verticalScrollBar.createWidget(this.verticalScrollBarSettings);
                    this.horizontalScrollBar.createWidget(this.horizontalScrollBarSettings);
                };
                __decorate([
                    core_1.ViewChild('jqxVerticalScrollBar'), 
                    __metadata('design:type', angular_jqxscrollbar_1.jqxScrollBarComponent)
                ], AppComponent.prototype, "verticalScrollBar", void 0);
                __decorate([
                    core_1.ViewChild('jqxHorizontalScrollBar'), 
                    __metadata('design:type', angular_jqxscrollbar_1.jqxScrollBarComponent)
                ], AppComponent.prototype, "horizontalScrollBar", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n            <div id='jqxWidget'>\n                    <div id='VerticalDiv'>Vertical</div>\n                    <angularScrollBar #jqxVerticalScrollBar id='jqxVerticalScrollBar' (OnValueChanged)=\"OnValueChangedVertical($event)\"></angularScrollBar>\n                    <div id='HorizontalDiv'>Horizontal</div>\n                    <angularScrollBar #jqxHorizontalScrollBar id='jqxHorizontalScrollBar'(OnValueChanged) = \"OnValueChangedHorizontal($event)\"></angularScrollBar>\n            </div>\n                ",
                        styles: ["\n    #jqxWidget{\n        font-size: 13px; \n        font-family: Verdana; \n        float: left;\n    }\n    #VerticalDiv{\n        margin-top: 10px;\n    }\n    #container{\n        margin-top: 10px;\n    }\n    #HorizontalDiv{\n        margin-top: 10px;\n    }\n    "],
                        directives: [angular_jqxscrollbar_1.jqxScrollBarComponent],
                        encapsulation: core_1.ViewEncapsulation.None
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