/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxTextAreaComponent} from '../../../../../jqwidgets-ts/angular_jqxtextarea';

@Component({
    selector: 'my-app',
    template: '<angularTextArea></angularTextArea>',
    directives: [jqxTextAreaComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxTextAreaComponent) textArea: jqxTextAreaComponent;

    settings: {};
    quotes = new Array();
    flag: Boolean = false;

    constructor() {

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
        }
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void {
        this.textArea.createWidget(this.settings);
    }
}
