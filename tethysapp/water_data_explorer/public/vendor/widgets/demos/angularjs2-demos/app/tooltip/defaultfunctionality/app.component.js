System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxtooltip'], function(exports_1, context_1) {
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
    var core_1, angular_jqxtooltip_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxtooltip_1_1) {
                angular_jqxtooltip_1 = angular_jqxtooltip_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                    this.toolTipSettings = {
                        content: '<b>Title:</b> <i>The Amazing Spider-man</i><br /><b>Year:</b> 2012',
                        position: 'mouse',
                        name: 'movieTooltip'
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        for (var i = 0; i < 9; i++) {
                            document.getElementsByTagName('angularTooltip')[i].getElementsByTagName('div')[0].style.display = 'inline-block';
                        }
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.toolTip1.createWidget(this.toolTipSettings);
                    this.toolTipSettings['content'] = '<b>Title:</b> <i>The Avengers</i><br /><b>Year:</b> 2012';
                    this.toolTip2.createWidget(this.toolTipSettings);
                    this.toolTipSettings['content'] = '<b>Title:</b> <i>The Dark Knight Rises</i> <br /><b>Year:</b> 2012';
                    this.toolTip3.createWidget(this.toolTipSettings);
                    this.toolTipSettings['content'] = '<b>Title:</b> <i>Harry Potter and the Deathly Hallows - Part 1</i><br /><b>Year:</b> 2010';
                    this.toolTip4.createWidget(this.toolTipSettings);
                    this.toolTipSettings['content'] = '<b>Title:</b> <i>Harry Potter and the Deathly Hallows - Part 2</i><br /><b>Year:</b> 2011';
                    this.toolTip5.createWidget(this.toolTipSettings);
                    this.toolTipSettings['content'] = '<b>Title:</b> <i>Inception</i><br /><b>Year:</b> 2010';
                    this.toolTip6.createWidget(this.toolTipSettings);
                    this.toolTipSettings['content'] = '<b>Title:</b> <i>Star Trek</i><br /><b>Year:</b> 2009';
                    this.toolTip7.createWidget(this.toolTipSettings);
                    this.toolTipSettings['content'] = '<b>Title:</b> <i>Star Wars</i> Episode III: <i>Revenge of the Sith</i><br /><b>Year:</b> 2005';
                    this.toolTip8.createWidget(this.toolTipSettings);
                    this.toolTipSettings['content'] = '<b>Title:</b> <i>Thor</i><br /><b>Year:</b> 2011';
                    this.toolTip9.createWidget(this.toolTipSettings);
                };
                __decorate([
                    core_1.ViewChild('filmPicture1'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip1", void 0);
                __decorate([
                    core_1.ViewChild('filmPicture2'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip2", void 0);
                __decorate([
                    core_1.ViewChild('filmPicture3'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip3", void 0);
                __decorate([
                    core_1.ViewChild('filmPicture4'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip4", void 0);
                __decorate([
                    core_1.ViewChild('filmPicture5'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip5", void 0);
                __decorate([
                    core_1.ViewChild('filmPicture6'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip6", void 0);
                __decorate([
                    core_1.ViewChild('filmPicture7'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip7", void 0);
                __decorate([
                    core_1.ViewChild('filmPicture8'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip8", void 0);
                __decorate([
                    core_1.ViewChild('filmPicture9'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "toolTip9", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/tooltip/defaultfunctionality/app.component.htm',
                        styleUrls: ['app/tooltip/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxtooltip_1.jqxTooltipComponent]
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