/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import {jqxRibbonComponent} from '../../../../../jqwidgets-ts/angular_jqxribbon';
import {jqxButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxbutton';
import {jqxTooltipComponent} from '../../../../../jqwidgets-ts/angular_jqxtooltip';
import {jqxDropDownButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxdropdownbutton';
import {jqxColorPickerComponent} from '../../../../../jqwidgets-ts/angular_jqxcolorpicker';
import {jqxDropDownListComponent} from '../../../../../jqwidgets-ts/angular_jqxdropdownlist';
import {jqxGridComponent} from '../../../../../jqwidgets-ts/angular_jqxgrid';
import {jqxToggleButtonComponent} from '../../../../../jqwidgets-ts/angular_jqxtogglebutton';

@Component({
    selector: 'my-app',
    templateUrl: 'app/ribbon/defaultfunctionality/app.component.htm',
    styleUrls: ['app/ribbon/defaultfunctionality/app.component.css'],
    directives: [jqxRibbonComponent, jqxButtonComponent, jqxTooltipComponent, jqxDropDownButtonComponent, jqxColorPickerComponent, jqxDropDownListComponent, jqxGridComponent, jqxToggleButtonComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked {

    // Ribbon component
    @ViewChild(jqxRibbonComponent) ribbon: jqxRibbonComponent;

    // DropDownButtons
    @ViewChild('fileItemButton') fileItemButton: jqxDropDownButtonComponent;
    @ViewChild('bucketColor') bucketColorButton: jqxDropDownButtonComponent;
    @ViewChild('fontColor') fontColorButton: jqxDropDownButtonComponent;
    @ViewChild('highlightColor') highlightColorButton: jqxDropDownButtonComponent;

    //Buttons
    @ViewChild('save') saveButton: jqxButtonComponent;
    @ViewChild('saveAs') saveAsButton: jqxButtonComponent;
    @ViewChild('open') openButton: jqxButtonComponent;
    @ViewChild('close') closeButton: jqxButtonComponent;
    @ViewChild('pasteButton') pasteButton: jqxButtonComponent;
    @ViewChild('help') helpButton: jqxButtonComponent;
    @ViewChild('about') aboutButton: jqxButtonComponent;
    @ViewChild('update') updateButton: jqxButtonComponent;


    //ToggleButtons
    @ViewChild('superscript') superScriptToggleButton: jqxToggleButtonComponent;
    @ViewChild('subscript') subscriptToggleButton: jqxToggleButtonComponent;
    @ViewChild('bold') boldToggleButton: jqxToggleButtonComponent;
    @ViewChild('italic') italicToggleButton: jqxToggleButtonComponent;
    @ViewChild('underline') underlineToggleButton: jqxToggleButtonComponent;
    @ViewChild('strikethrough') striketroughToggleButton: jqxToggleButtonComponent;
    @ViewChild('shrinkFont') shrinkFontButton: jqxToggleButtonComponent
    @ViewChild('copyButton') copyButton: jqxToggleButtonComponent;
    @ViewChild('cutButton') cutButton: jqxToggleButtonComponent;
    @ViewChild('growFont') growFontButton: jqxToggleButtonComponent;
    @ViewChild('formatPainter') formatPainterButton: jqxToggleButtonComponent;
    @ViewChild('clearFormatting') clearFormattingButton: jqxToggleButtonComponent;
    @ViewChild('alignLeft') alignLeftButton: jqxToggleButtonComponent;
    @ViewChild('alignCenter') alignCenterButton: jqxToggleButtonComponent;
    @ViewChild('alignRight') alignRightButton: jqxToggleButtonComponent;
    @ViewChild('alignJustify') alignJustifyButton: jqxToggleButtonComponent;
    @ViewChild('bulletList') bulletListButton: jqxToggleButtonComponent;
    @ViewChild('numberedList') numberedListButton: jqxToggleButtonComponent;
    @ViewChild('decreaseIndent') decreaseIndentButton: jqxToggleButtonComponent;
    @ViewChild('increaseIndent') increaseIndentButton: jqxToggleButtonComponent;
    @ViewChild('Sort') sortButton: jqxToggleButtonComponent;
    @ViewChild('lineSpacing') lineSpacingButton: jqxToggleButtonComponent;
    @ViewChild('showHide') showHideButton: jqxToggleButtonComponent;


    //ToolTip components
    @ViewChild('cutButtonToolTip') cutButtonToolTip: jqxTooltipComponent;
    @ViewChild('copyButtonToolTip') copyButtonToolTip: jqxTooltipComponent;
    @ViewChild('subscriptToolTip') subscriptToolTip: jqxTooltipComponent;
    @ViewChild('superscriptToolTip') superscriptToolTip: jqxTooltipComponent;
    @ViewChild('boldToolTip') boldToolTip: jqxTooltipComponent;
    @ViewChild('italicToolTip') italicToolTip: jqxTooltipComponent;
    @ViewChild('underlineToolTip') underlineToolTip: jqxTooltipComponent;
    @ViewChild('strikethroughToolTip') strikethroughToolTip: jqxTooltipComponent;
    @ViewChild('alignLeftToolTip') alignLeftToolTip: jqxTooltipComponent;
    @ViewChild('alignCenterToolTip') alignCenterToolTip: jqxTooltipComponent;
    @ViewChild('alignRightToolTip') alignRightToolTip: jqxTooltipComponent;
    @ViewChild('alignJustifyToolTip') alignJustifyToolTip: jqxTooltipComponent;
    @ViewChild('bulletListToolTip') bulletListToolTip: jqxTooltipComponent;
    @ViewChild('numberedListToolTip') numberedListToolTip: jqxTooltipComponent;
    @ViewChild('decreaseIndentToolTip') decreaseIndentToolTip: jqxTooltipComponent;
    @ViewChild('increaseIndentToolTip') increaseIndentToolTip: jqxTooltipComponent;
    @ViewChild('SortToolTip') sortToolTip: jqxTooltipComponent;
    @ViewChild('lineSpacingToolTip') lineSpacingToolTip: jqxTooltipComponent;
    @ViewChild('showHideToolTip') showHideToolTip: jqxTooltipComponent;
    @ViewChild('bucketColorToolTip') bucketColorToolTip: jqxTooltipComponent;

    // ColorPicker components
    @ViewChild('bucketColorPicker') bucketColorPicker: jqxColorPickerComponent;
    @ViewChild('fontColorPicker') fontColorPicker: jqxColorPickerComponent;
    @ViewChild('highlightColorPicker') highlightColorPicker: jqxColorPickerComponent;

    //DropDownList
    @ViewChild('font') fontDropDownList: jqxDropDownListComponent;
    @ViewChild('fontSize') fontSizeDropDownList: jqxDropDownListComponent;
    @ViewChild('changeCase') changeCaseDropDownList: jqxDropDownListComponent;
    @ViewChild('pasteDropDown') pasteDropDownList: jqxDropDownListComponent;

    //Grid
    @ViewChild(jqxGridComponent) jqxGrid: jqxGridComponent;

    theme = 'demoTheme';
    ribbonSettings: jqwidgets.RibbonOptions;
    fileItemButtonSettings: jqwidgets.DropDownButtonOptions;
    mainButtonsSettings: jqwidgets.ButtonOptions;
    toggleButtonSettings: jqwidgets.ButtonOptions;
    innerButtonsOptions: jqwidgets.ButtonOptions;
    toolTipSettings: jqwidgets.TooltipOptions;
    bucketColorButtonSettings: jqwidgets.DropDownButtonOptions;
    fontListSettings: jqwidgets.DropDownListOptions;
    fontSizeSettings: jqwidgets.DropDownListOptions;
    changeCaseSettings: jqwidgets.DropDownListOptions;
    fontColorButtonSettings: jqwidgets.DropDownButtonOptions;
    fontColorPickerSettings: jqwidgets.ColorPickerOptions;
    highlightColorSettings: jqwidgets.DropDownButtonOptions;
    highlightColorPickerSettings: jqwidgets.ColorPickerOptions;
    buttonSettings: jqwidgets.ButtonOptions;
    pasteDropDownListSettings: jqwidgets.DropDownListOptions;
    pasteData = new Array();
    jqxGridSettings: {};
    flag: Boolean = false;

    constructor() {

        var self = this;

        this.buttonSettings = {
            theme: 'demoTheme'
        };

        this.fileItemButtonSettings = {
            arrowSize: 0,
            height: 26,
            dropDownWidth: 120,
            width: 50,
            theme: 'demoTheme'
        }

        this.ribbonSettings = {
            width: 802,
            height: 131,
            animationType: "none",
            selectionMode: "click",
            position: "top",
            theme: "demoTheme",
            mode: "default",
            selectedIndex: 1,
            initContent: function (item) {
                switch (item) {
                    case 0:
                        break;
                    case 1:
                        self.toggleButtonSettings = {
                            theme: 'demoTheme',
                        };

                        var toggleType = 'jqxToggleButton';
                        var subscript = (self.subscriptToggleButton.createWidget(self.toggleButtonSettings));
                        var superscript = self.superScriptToggleButton.createWidget(self.toggleButtonSettings);
                        var bold = self.boldToggleButton.createWidget(self.toggleButtonSettings);
                        var italic = self.italicToggleButton.createWidget(self.toggleButtonSettings);
                        var underline = self.underlineToggleButton.createWidget(self.toggleButtonSettings);
                        var strikethrough = self.striketroughToggleButton.createWidget(self.toggleButtonSettings);

                        let innerButtonsOptions = {
                            theme: 'demoTheme'
                        };

                        // creating inner Buttons
                        self.shrinkFontButton.createWidget(innerButtonsOptions);
                        self.copyButton.createWidget(innerButtonsOptions);
                        self.cutButton.createWidget(innerButtonsOptions);
                        self.growFontButton.createWidget(innerButtonsOptions);
                        self.formatPainterButton.createWidget(innerButtonsOptions);
                        self.clearFormattingButton.createWidget(innerButtonsOptions);
                        self.alignLeftButton.createWidget(innerButtonsOptions);
                        self.alignCenterButton.createWidget(innerButtonsOptions);
                        self.alignRightButton.createWidget(innerButtonsOptions);
                        self.alignJustifyButton.createWidget(innerButtonsOptions);
                        self.bulletListButton.createWidget(innerButtonsOptions);
                        self.numberedListButton.createWidget(innerButtonsOptions);
                        self.decreaseIndentButton.createWidget(innerButtonsOptions);
                        self.increaseIndentButton.createWidget(innerButtonsOptions);
                        self.sortButton.createWidget(innerButtonsOptions);
                        self.lineSpacingButton.createWidget(innerButtonsOptions);
                        self.showHideButton.createWidget(innerButtonsOptions);

                        self.toolTipSettings = {
                            position: "mouse",
                            content: "Cut (Ctrl + X)",
                            theme: 'demoTheme'
                        }

                        // craeting toolTips 
                        self.cutButtonToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Copy (Ctrl + C)';
                        self.copyButtonToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Subscript';
                        self.subscriptToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Superscript';
                        self.superscriptToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Bold (Ctrl + B)';
                        self.boldToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Italic (Ctrl + I)';
                        self.italicToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Underline (Ctrl + U)';
                        self.underlineToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Strikethrough';
                        self.strikethroughToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Align Text Left (Ctrl + L)';
                        self.alignLeftToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Center (Ctrl + E)';
                        self.alignCenterToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Align Text Right (Ctrl + R)';
                        self.alignRightToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Justify (Ctrl + J)';
                        self.alignJustifyToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Bulleted List';
                        self.bulletListToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Numbered List';
                        self.numberedListToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Sort Direction';
                        self.sortToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Decrease Indent';
                        self.decreaseIndentToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Increase Indent';
                        self.increaseIndentToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Line and Paragraph Spacing';
                        self.lineSpacingToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Show/Hide special characters';
                        self.showHideToolTip.createWidget(self.toolTipSettings);
                        self.toolTipSettings['content'] = 'Fill style';
                        self.toolTipSettings['theme'] = 'demoTheme';
                        self.bucketColorToolTip.createWidget(self.toolTipSettings);

                        self.bucketColorButtonSettings = {
                            width: 42,
                            height: 19,
                            theme: "demoTheme",
                            dropDownWidth: 180,
                            initContent: function () {
                                let buckerColorPickerSettings = {
                                    color: "000000",
                                    colorMode: 'hue',
                                    width: 180,
                                    theme: 'demoTheme',
                                    height: 180
                                }
                                self.bucketColorPicker.createWidget(buckerColorPickerSettings);
                            }
                        }

                        self.bucketColorButton.createWidget(self.bucketColorButtonSettings);
                        self.bucketColorButton.setContent('<span style="position:relative; display:inline-block; top: 2px"><div class="icon paintcan"></div><span id="bucketColorPreview" style="display: block; position:absolute;  height: 3px; width: 16px; background:#000"></span></span>');

                        self.fontListSettings = {
                            source: [
                                "<span style='font-family: Courier New;'>Courier New</span>",
                                "<span style='font-family: Times New Roman;'>Times New Roman</span>",
                                "<span style='font-family: Arial;'>Arial</span>"
                            ],
                            width: 120,
                            height: 21,
                            theme: 'demoTheme',
                            autoDropDownHeight: true,
                            selectedIndex: 1
                        }
                        self.fontDropDownList.createWidget(self.fontListSettings);

                        self.fontSizeSettings = {
                            source: [8, 9, 10, 11, 12, 14, 18, 20, 22, 24],
                            theme: 'demoTheme',
                            renderer: function (index, label, value) {
                                return '<span style="font-size:' + value + 'px;">' + value + '</span>';
                            },
                            width: 70,
                            height: 21,
                            autoDropDownHeight: true,
                            selectedIndex: 2
                        }

                        self.fontSizeDropDownList.createWidget(self.fontSizeSettings);
                        self.changeCaseSettings = {
                            source: ['Sentence Case', 'lowercase', 'UPPERCASE', 'Capitalize Each Word'],
                            theme: 'demoTheme',
                            selectionRenderer: function (object, index, label) {
                                return '<div class="icon change-case-16" style="top:3px;  position:relative"></div>';
                            },
                            dropDownWidth: 150,
                            autoDropDownHeight: true,
                            selectedIndex: 0,
                            width: 40
                        }
                        self.changeCaseDropDownList.createWidget(self.changeCaseSettings);

                        self.fontColorButtonSettings = {
                            width: 100,
                            height: 21,
                            theme: 'demoTheme',
                            dropDownWidth: 180,
                            initContent: function () {
                                self.fontColorPickerSettings = {
                                    color: "000000",
                                    colorMode: 'hue',
                                    width: 180,
                                    height: 180
                                }
                                self.fontColorPicker.createWidget(self.fontColorPickerSettings);
                            }
                        }
                        self.fontColorButton.createWidget(self.fontColorButtonSettings);
                        self.fontColorButton.setContent('<span style="position:relative; display:inline; top: 2px"><div class="icon FontDialogImage"></div><span id="fontColorPreview" style="display: block; position:absolute;  height: 3px; width: 16px; background:#000"></span></span><span style="position:relative; display: inline; top:3px">Font Color</span>');

                        self.highlightColorSettings = {
                            width: 130,
                            height: 21,
                            dropDownWidth: 180,
                            theme: 'demoTheme',
                            initContent: function () {
                                self.highlightColorPickerSettings = {
                                    color: "FF0000",
                                    colorMode: 'hue',
                                    width: 180,
                                    height: 180
                                }
                                self.highlightColorPicker.createWidget(self.highlightColorPickerSettings);
                            }
                        }
                        self.highlightColorButton.createWidget(self.highlightColorSettings);
                        self.highlightColorButton.setContent('<span style="position:relative; display:inline; top: 2px"><div class="icon pencil"></div><span id="highlightColorPreview" style="display: block; position:absolute;  height: 3px; width: 16px; background:#F00"></span></span><span style="position:relative; display: inline; top:3px">Highlight Color</span>');

                        self.pasteData = [
                            { label: 'Paste', imageClass: 'icon page_paste' },
                            { label: 'Paste Special', imageClass: 'icon paste_plain' },
                            { label: 'Paste text', imageClass: 'icon paste_word' },
                            { label: 'Paste link', imageClass: 'icon PasteImage' }
                        ];

                        self.buttonSettings = {
                            width: 35,
                            height: 56,
                            theme: 'demoTheme'
                        }
                        self.pasteButton.createWidget(self.buttonSettings);

                        self.pasteDropDownListSettings = {
                            source: self.pasteData,
                            width: 22,
                            height: 10,
                            theme: 'demoTheme',
                            animationType: 'none',
                            dropDownWidth: '110px',
                            autoDropDownHeight: true,
                            renderer: function (index: number , label, value) {
                                var imgUrl = self.pasteData[index].imgUrl;
                                var labelEl = '<span style="font-size: 10px">' + label + '</span>';
                                var icon = '<span class="' + self.pasteData[index].imageClass + '" style=""></span>';
                                return '<span>' + icon + labelEl + '</span>';
                            },
                            selectionRenderer: function (object, index, label) {
                                return "";
                            },
                            selectedIndex: 0
                        }
                        self.pasteDropDownList.createWidget(self.pasteDropDownListSettings);
                        break;
                    case 2:
                        self.buttonSettings['width'] = 26;
                        self.buttonSettings['height'] = 26;
                        self.helpButton.createWidget(self.buttonSettings);
                        self.aboutButton.createWidget(self.buttonSettings);
                        self.updateButton.createWidget(self.buttonSettings);
                        break;
                }
            }
        };

        self.mainButtonsSettings = {
            theme: 'demoTheme'
        }

        // jqxGrid code
        // renderer for grid cells.
        var numberrenderer = function (row, column, value) {
            return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
        };
        // create Grid datafields and columns arrays.
        var datafields = [];
        var columns = [];

        for (var i = 0; i < 26; i++) {
            var self = this;
            var text = String.fromCharCode(65 + i);
            if (i == 0) {
                var cssclass = 'jqx-widget-header';
                if (self.theme != '') cssclass += ' jqx-widget-header-' + self.theme;
                columns[columns.length] = {
                    pinned: true,
                    exportable: false,
                    text: "",
                    columntype: 'number',
                    cellclassname: cssclass,
                    cellsrenderer: numberrenderer
                };
            }
            datafields[datafields.length] = { name: text };
            columns[columns.length] = { text: text, datafield: text, width: 60, align: 'center' };
        }
        var source =
            {
                unboundmode: true,
                totalrecords: 100,
                datafields: datafields,
                updaterow: function (rowid, rowdata) {
                    // synchronize with the server - send update command   
                }
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        this.jqxGridSettings = {
            width: 800,
            source: dataAdapter,
            editable: true,
            columnsresize: true,
            selectionmode: 'multiplecellsadvanced',
            columns: columns
        }
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {

            // Styling for all the Buttons 
            for (let i = 0; i < document.getElementsByTagName('angulartooltip').length; i++) {
                (<HTMLElement>document.getElementsByTagName('angulartooltip')[i].firstElementChild).style.display = 'inline-block';
            }
            for (let i = 0; i < document.getElementsByTagName('angularbutton').length; i++) {
                (<HTMLElement>document.getElementsByTagName('angularbutton')[i].firstElementChild).style.display = 'inline-block';
                (<HTMLElement>document.getElementsByTagName('angularbutton')[i].firstElementChild).setAttribute('checked', 'false');
            }
            for (let i = 0; i < document.getElementsByTagName('angulardropdownlist').length; i++) {
                (<HTMLElement>document.getElementsByTagName('angulardropdownlist')[i].firstElementChild).style.display = 'inline-block';
            }
            (<HTMLElement>document.getElementById('fileItemButton').firstElementChild).style.color = 'white';
            (<HTMLElement>document.getElementById('fileItemButton').firstElementChild).style.background = 'transparent';
            this.Initialize();
        }
        this.flag = true;
    }

    OnBucketColorPicker(event) {
        (<HTMLElement>document.getElementById('bucketColorPreview')).style.background = '#' + event.args.color.hex;
    }

    OnSubscriptClick() {
        if (this.superScriptToggleButton.widgetObject.toggled) {
            this.superScriptToggleButton.widgetObject.toggled = false;
            (<HTMLElement>document.getElementById('superscript').firstElementChild).className = 'jqx-rc-all jqx-rc-all-demoTheme jqx-button jqx-button-demoTheme jqx-widget jqx-widget-demoTheme jqx-fill-state-normal jqx-fill-state-normal-demoTheme';
        }
    }

    OnSuperscriptClick() {
        if (this.subscriptToggleButton.widgetObject.toggled) {
            this.subscriptToggleButton.widgetObject.toggled = false;
            (<HTMLElement>document.getElementById('subscript').firstElementChild).className = 'jqx-rc-all jqx-rc-all-demoTheme jqx-button jqx-button-demoTheme jqx-widget jqx-widget-demoTheme jqx-fill-state-normal jqx-fill-state-normal-demoTheme';
        }
    }

    OnFontColorPicker(event): void {
        (<HTMLElement>document.getElementById('fontColorPreview')).style.background = '#' + event.args.color.hex;
    }

    OnHighlightColorPicker(event): void {
        (<HTMLElement>document.getElementById('highlightColorPreview')).style.background = '#' + event.args.color.hex;
    }

    OnPasteButtonClick(event): void {
        var text = (<HTMLElement>document.getElementsByClassName('pasteText')[0]).innerHTML;
        console.log(text + ' clicked');
    }

    OnMouseDownPasteButton(event): void {
        event.preventDefault();
    }

    OnPasteDropDownSelect(event): void {
        let index = event.args.index;
        let icon = '<span class="' + this.pasteData[index].imageClass + '" style="zoom: 1.5"></span>';
        (<HTMLElement>document.getElementById('pasteButton').firstElementChild).innerHTML = (icon + '<span class="pasteText">' + this.pasteData[index].label + '</span>');
        this.pasteButton.render();
    }

    Initialize(): void {
        var self = this;
        this.fileItemButton.createWidget(this.fileItemButtonSettings);
        this.fileItemButton.setContent('<span style="position: relative; line-height: 26px; margin-left:10px;">File</span>');
        this.saveButton.createWidget(this.buttonSettings);
        this.saveAsButton.createWidget(this.buttonSettings);
        this.openButton.createWidget(this.buttonSettings);
        this.closeButton.createWidget(this.buttonSettings);
        this.ribbon.createWidget(this.ribbonSettings);
        this.ribbon.disableAt(0);
        this.jqxGrid.createWidget(this.jqxGridSettings);
    }
}
