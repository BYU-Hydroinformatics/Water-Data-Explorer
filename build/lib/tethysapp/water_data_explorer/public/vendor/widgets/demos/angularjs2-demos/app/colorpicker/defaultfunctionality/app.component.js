System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdropdownbutton', '../../../../../jqwidgets-ts/angular_jqxscrollview', '../../../../../jqwidgets-ts/angular_jqxcolorpicker'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdropdownbutton_1, angular_jqxscrollview_1, angular_jqxcolorpicker_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdropdownbutton_1_1) {
                angular_jqxdropdownbutton_1 = angular_jqxdropdownbutton_1_1;
            },
            function (angular_jqxscrollview_1_1) {
                angular_jqxscrollview_1 = angular_jqxscrollview_1_1;
            },
            function (angular_jqxcolorpicker_1_1) {
                angular_jqxcolorpicker_1 = angular_jqxcolorpicker_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.DropDownSettings = {
                        width: 150, height: 22
                    };
                    this.ScrollViewSettings = {
                        slideShow: true, width: 500, height: 350, showButtons: false
                    };
                    this.ColorPickerSettings = {
                        colorMode: 'hue', width: 220, height: 220
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                        document.getElementsByClassName('jqx-scrollview')[0].style.border = '15px solid #ffaabb';
                        document.getElementsByClassName('jqx-scrollview')[0].style.borderRadius = '10px';
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myDropDown.createWidget(this.DropDownSettings);
                    this.myScrollView.createWidget(this.ScrollViewSettings);
                    this.myColorPicker.createWidget(this.ColorPickerSettings);
                    this.myDropDown.setContent(this.getTextElementByColor({ hex: "FFAABB" }));
                };
                AppComponent.prototype.getTextElementByColor = function (color) {
                    if (color == 'transparent' || color.hex == "") {
                        return '<div style="text-shadow: none; position: relative; padding-bottom: 2px; margin-top: 2px;">transparent</div>';
                    }
                    var nThreshold = 105;
                    var bgDelta = (color.r * 0.299) + (color.g * 0.587) + (color.b * 0.114);
                    var foreColor = (255 - bgDelta < nThreshold) ? 'Black' : 'White';
                    var element = '<div style="text-shadow: none; position: relative; padding-bottom: 2px; margin-top: 2px;color:' + foreColor + '; background: #' + color.hex + '">#' + color.hex + '</div>';
                    return element;
                };
                AppComponent.prototype.ColorPickerEvent = function (event) {
                    this.myDropDown.setContent(this.getTextElementByColor(event.args.color));
                    document.getElementsByClassName('jqx-scrollview')[0].style.borderColor = '#' + event.args.color.hex;
                };
                __decorate([
                    core_1.ViewChild('dropDownButton'), 
                    __metadata('design:type', angular_jqxdropdownbutton_1.jqxDropDownButtonComponent)
                ], AppComponent.prototype, "myDropDown", void 0);
                __decorate([
                    core_1.ViewChild('photoGallery'), 
                    __metadata('design:type', angular_jqxscrollview_1.jqxScrollViewComponent)
                ], AppComponent.prototype, "myScrollView", void 0);
                __decorate([
                    core_1.ViewChild('colorPicker'), 
                    __metadata('design:type', angular_jqxcolorpicker_1.jqxColorPickerComponent)
                ], AppComponent.prototype, "myColorPicker", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: "app/colorpicker/defaultfunctionality/app.component.htm",
                        styleUrls: ['app/colorpicker/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxdropdownbutton_1.jqxDropDownButtonComponent, angular_jqxscrollview_1.jqxScrollViewComponent, angular_jqxcolorpicker_1.jqxColorPickerComponent]
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