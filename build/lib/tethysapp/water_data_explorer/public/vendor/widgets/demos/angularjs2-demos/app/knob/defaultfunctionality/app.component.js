System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxknob', '../../../../../jqwidgets-ts/angular_jqxnumberinput'], function(exports_1, context_1) {
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
    var core_1, angular_jqxknob_1, angular_jqxnumberinput_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxknob_1_1) {
                angular_jqxknob_1 = angular_jqxknob_1_1;
            },
            function (angular_jqxnumberinput_1_1) {
                angular_jqxnumberinput_1 = angular_jqxnumberinput_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.settings = {
                        value: 60,
                        min: 0,
                        max: 100,
                        startAngle: 120,
                        endAngle: 420,
                        snapToStep: true,
                        rotation: 'clockwise',
                        style: {
                            stroke: '#dfe3e9', strokeWidth: 3,
                            fill: { color: '#fefefe', gradientType: "linear", gradientStops: [[0, 1], [50, 0.9], [100, 1]] }
                        },
                        marks: {
                            colorRemaining: { color: 'grey', border: 'grey' },
                            colorProgress: { color: '#00a4e1', border: '#00a4e1' },
                            type: 'line',
                            offset: '71%',
                            thickness: 3,
                            size: '6%',
                            majorSize: '9%',
                            majorInterval: 10,
                            minorInterval: 2
                        },
                        labels: {
                            offset: '88%',
                            step: 10,
                            visible: true
                        },
                        progressBar: {
                            style: { fill: '#00a4e1', stroke: 'grey' },
                            size: '9%',
                            offset: '60%',
                            background: { fill: 'grey', stroke: 'grey' }
                        },
                        pointer: { type: 'arrow', style: { fill: '#00a4e1', stroke: 'grey' }, size: '59%', offset: '49%', thickness: 20 }
                    };
                    this.numberInputSettings = {
                        width: 60,
                        height: '40px',
                        decimal: 60,
                        min: 0,
                        max: 100,
                        textAlign: 'center',
                        decimalDigits: 1,
                        inputMode: 'simple'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                        document.getElementById('numberInput').firstElementChild.style.border = 'none';
                        document.getElementById('numberInput').firstElementChild.style.backgroundColor = 'transparent';
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myKnob.createWidget(this.settings);
                    this.numberInput.createWidget(this.numberInputSettings);
                };
                AppComponent.prototype.OnMouseDown = function () {
                    event.stopPropagation();
                };
                AppComponent.prototype.OnKeyup = function () {
                    var val = this.numberInput.val();
                    this.myKnob.val(val);
                };
                AppComponent.prototype.OnChange = function (event) {
                    if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') {
                        return;
                    }
                    this.numberInput.val(event.args.value);
                };
                AppComponent.prototype.OnValueChanged = function () {
                    var val = this.numberInput.val();
                    this.myKnob.val(val);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxknob_1.jqxKnobComponent), 
                    __metadata('design:type', angular_jqxknob_1.jqxKnobComponent)
                ], AppComponent.prototype, "myKnob", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxnumberinput_1.jqxNumberInputComponent), 
                    __metadata('design:type', angular_jqxnumberinput_1.jqxNumberInputComponent)
                ], AppComponent.prototype, "numberInput", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<div id='jqxWidgets'> \n                        <angularKnob (OnChange)=\"OnChange($event)\"></angularKnob>\n                        <div class=\"inputField\">\n                            <angularNumberInput id=\"numberInput\" (mousedown)=\"OnMouseDown($event)\" (keyup)=\"OnKeyup()\" (OnValueChanged)=\"OnValueChanged()\"></angularNumberInput>\n                        </div>\n                   </div>",
                        styleUrls: ['app/knob/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxknob_1.jqxKnobComponent, angular_jqxnumberinput_1.jqxNumberInputComponent],
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