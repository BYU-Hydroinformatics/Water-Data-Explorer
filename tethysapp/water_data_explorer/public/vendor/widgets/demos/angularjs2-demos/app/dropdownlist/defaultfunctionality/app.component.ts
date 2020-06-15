/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxDropDownListComponent} from '../../../../../jqwidgets-ts/angular_jqxdropdownlist';

@Component({
    selector: 'my-app',
    template: `<angularDropDownList></angularDropDownList>`,
    directives: [jqxDropDownListComponent]
}) 

export class AppComponent implements AfterViewChecked { 
    @ViewChild(jqxDropDownListComponent) myDropDownList: jqxDropDownListComponent;

    settings: jqwidgets.DropDownListOptions;
    flag: Boolean = false;
    source = [
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

    constructor() {        

        this.settings = {
            source: this.source, selectedIndex: 1, width: '200', height: '25'
        }    
    }

    public ngAfterViewChecked(): void
    {
        if (this.flag === false)
        {
            this.Initialize();
        }
        this.flag = true;
    }   
    
    Initialize() : void
    {
        this.myDropDownList.createWidget(this.settings);
    }
}
