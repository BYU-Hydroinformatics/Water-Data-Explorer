System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxdraw'], function(exports_1, context_1) {
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
    var core_1, angular_jqxdraw_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxdraw_1_1) {
                angular_jqxdraw_1 = angular_jqxdraw_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.flag = false;
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.Initialize = function () {
                    this.myDraw.createWidget({});
                    this.myDraw.circle(250, 150, 50, { fill: 'lightblue', stroke: 'darkblue' });
                    this.myDraw.rect(0, 0, 150, 150, { stroke: '#777777', fill: 'transparent' });
                };
                __decorate([
                    core_1.ViewChild(angular_jqxdraw_1.jqxDrawComponent), 
                    __metadata('design:type', angular_jqxdraw_1.jqxDrawComponent)
                ], AppComponent.prototype, "myDraw", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<angularDraw style=\"width:850px; height:500px\"></angularDraw>",
                        directives: [angular_jqxdraw_1.jqxDrawComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//var renderer = this.myDraw.widgetObject.getInstance();
//renderer.rect(0, 0, 100, 100, { stroke: '#777777', fill: 'transparent' });
////create a circle
////params: cx, cy, radius, params
//var circleElement = renderer.circle(250, 150, 50, {});
//// set the fill color and border color of the circle
//// params: element, attributes
//renderer.attr(circleElement, { fill: 'lightblue', stroke: 'darkblue' });
//// draw a rectangle around the entire area
//// params: x, y, width, height, attributes
//var borderElement = renderer.rect(0, 0, size.width, size.height, { stroke: '#777777', fill: 'transparent' });
//// draw a path
//// params: line command, attributes
//var pathElement = renderer.path("M 100,100 L 150, 130 C 130,130 180,190 150,150", { stroke: '#777777', fill: 'red' });
//// draw an area
//// params: line command, attributes
//var areaElement = renderer.path("M 300,300 L 350, 330 C 330,330 380,390 350,350 Z", { stroke: '#777777', fill: 'yellow' });
//// draw a line
//// params: x1, y1, x2, y2, attributes
//renderer.line(600, 100, 600, 200, { stroke: 'blue', 'stroke-width': 6 });
//renderer.line(550, 50, 650, 90, { stroke: 'green', 'stroke-width': 6 });
//// draw text
//// params: text, x, y, width, height, angle, params, clip, halign, valign, rotateAround
//renderer.text("Drawing shapes", 50, 20, undefined, undefined, 0, { 'class': 'largeText', fill: 'yellow', stroke: 'orange' }, false, 'center', 'center', 'centermiddle');
//renderer.text("This is rotated text", 600, 300, undefined, undefined, 45, { 'class': 'smallText' }, false, 'center', 'center', 'centermiddle');
//// add an event handler to the circle element
//var circleUp = renderer.circle(50, 450, 30, { fill: '#DEDEDE', stroke: '#777777' });
//var pathUp = renderer.path("M30 460 L 70 460 L50 430 Z", { fill: 'transparent', stroke: '#777777', 'stroke-width': 1 });
//var circleDown = renderer.circle(120, 450, 30, { fill: '#DEDEDE', stroke: '#777777' });
//var pathDown = renderer.path("M100 440 L 140 440 L120 470 Z", { fill: 'transparent', stroke: '#777777', 'stroke-width': 1 });
//renderer.text("Click these buttons:", 20, 390);
//var moveCircle = function (moveUp)
//{
//    var circleY = parseInt(renderer.getAttr(circleElement, 'cy'));
//    renderer.attr(circleElement, { cy: circleY + (moveUp ? -10 : 10) });
//}
//renderer.on(circleUp, 'click', function () { moveCircle(true); });
//renderer.on(pathUp, 'click', function () { moveCircle(true); });
//renderer.on(circleDown, 'click', function () { moveCircle(false); });
//renderer.on(pathDown, 'click', function () { moveCircle(false); });
//this.myDraw.refresh();
//styles: [`
//    .smallText
//    {
//        font-size:16px;
//        font-family: Sans-Serif;
//    }
//    .largeText
//    {
//        font-size:36px;
//        font-family: Sans-Serif;
//    }
//`], 
//# sourceMappingURL=app.component.js.map