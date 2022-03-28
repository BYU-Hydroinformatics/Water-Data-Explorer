System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxtextarea'], function(exports_1, context_1) {
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
    var core_1, angular_jqxtextarea_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxtextarea_1_1) {
                angular_jqxtextarea_1 = angular_jqxtextarea_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.quotes = new Array();
                    this.flag = false;
                    this.quotes.push('Life is a dream for the wise, a game for the fool, a comedy for the rich, a tragedy for the poor.');
                    this.quotes.push('Yesterday is not ours to recover, but tomorrow is ours to win or lose.');
                    this.quotes.push('It does not matter how slowly you go as long as you do not stop.');
                    this.quotes.push('Success depends upon previous preparation, and without such preparation there is sure to be failure.');
                    this.quotes.push('Better a diamond with a flaw than a pebble without.');
                    this.quotes.push('To succeed in life, you need two things: ignorance and confidence.');
                    this.quotes.push('A successful man is one who can lay a firm foundation with the bricks others have thrown at him.');
                    this.quotes.push('Sleep is the best meditation.');
                    this.settings = {
                        placeHolder: 'Enter a sentence', height: 90, width: 300, minLength: 1, source: this.quotes
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.textArea.createWidget(this.settings);
                };
                __decorate([
                    core_1.ViewChild(angular_jqxtextarea_1.jqxTextAreaComponent), 
                    __metadata('design:type', angular_jqxtextarea_1.jqxTextAreaComponent)
                ], AppComponent.prototype, "textArea", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: '<angularTextArea></angularTextArea>',
                        directives: [angular_jqxtextarea_1.jqxTextAreaComponent]
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