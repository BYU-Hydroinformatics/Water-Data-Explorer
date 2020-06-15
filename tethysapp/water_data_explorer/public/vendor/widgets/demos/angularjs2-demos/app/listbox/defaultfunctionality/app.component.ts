/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />

import { Component, ViewChild, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { jqxListBoxComponent } from '../../../../../jqwidgets-ts/angular_jqxlistbox';

@Component({
    selector: 'my-app',
    template: `<div id='jqxWidgets'> 
                       <angularListBox></angularListBox>
                   </div>`,
    directives: [jqxListBoxComponent]
})

export class AppComponent implements AfterViewChecked
{
    @ViewChild(jqxListBoxComponent) myListBox: jqxListBoxComponent;

    settings: jqwidgets.ListBoxOptions;
    flag: Boolean = false;

    constructor()
    {
        var source = [
            "Affogato",
            "Americano",
            "Bicerin",
            "Breve",
            "Café Bombón",
            "Café au lait",
            "Caffé Corretto",
            "Café Crema",
            "Caffé Latte",
            "Caffé macchiato",
            "Café mélange",
            "Coffee milk",
            "Cafe mocha",
            "Cappuccino",
            "Carajillo",
            "Cortado",
            "Cuban espresso",
            "Espresso",
            "Eiskaffee",
            "The Flat White",
            "Frappuccino",
            "Galao",
            "Greek frappé coffee",
            "Iced Coffee﻿",
            "Indian filter coffee",
            "Instant coffee",
            "Irish coffee",
            "Liqueur coffee"
        ];

        this.settings = {
            width: 200,
            height: 250,
            source: source,
            selectedIndex: 3
        };
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void
    {
        this.myListBox.createWidget(this.settings);
    }
}