System.register(['@angular/core', '../../../../../jqwidgets-ts/angular_jqxribbon', '../../../../../jqwidgets-ts/angular_jqxbutton', '../../../../../jqwidgets-ts/angular_jqxtooltip', '../../../../../jqwidgets-ts/angular_jqxdropdownbutton', '../../../../../jqwidgets-ts/angular_jqxcolorpicker', '../../../../../jqwidgets-ts/angular_jqxdropdownlist', '../../../../../jqwidgets-ts/angular_jqxgrid', '../../../../../jqwidgets-ts/angular_jqxtogglebutton'], function(exports_1, context_1) {
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
    var core_1, angular_jqxribbon_1, angular_jqxbutton_1, angular_jqxtooltip_1, angular_jqxdropdownbutton_1, angular_jqxcolorpicker_1, angular_jqxdropdownlist_1, angular_jqxgrid_1, angular_jqxtogglebutton_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_jqxribbon_1_1) {
                angular_jqxribbon_1 = angular_jqxribbon_1_1;
            },
            function (angular_jqxbutton_1_1) {
                angular_jqxbutton_1 = angular_jqxbutton_1_1;
            },
            function (angular_jqxtooltip_1_1) {
                angular_jqxtooltip_1 = angular_jqxtooltip_1_1;
            },
            function (angular_jqxdropdownbutton_1_1) {
                angular_jqxdropdownbutton_1 = angular_jqxdropdownbutton_1_1;
            },
            function (angular_jqxcolorpicker_1_1) {
                angular_jqxcolorpicker_1 = angular_jqxcolorpicker_1_1;
            },
            function (angular_jqxdropdownlist_1_1) {
                angular_jqxdropdownlist_1 = angular_jqxdropdownlist_1_1;
            },
            function (angular_jqxgrid_1_1) {
                angular_jqxgrid_1 = angular_jqxgrid_1_1;
            },
            function (angular_jqxtogglebutton_1_1) {
                angular_jqxtogglebutton_1 = angular_jqxtogglebutton_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.theme = 'demoTheme';
                    this.pasteData = new Array();
                    this.flag = false;
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
                    };
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
                                    var innerButtonsOptions = {
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
                                    };
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
                                            var buckerColorPickerSettings = {
                                                color: "000000",
                                                colorMode: 'hue',
                                                width: 180,
                                                theme: 'demoTheme',
                                                height: 180
                                            };
                                            self.bucketColorPicker.createWidget(buckerColorPickerSettings);
                                        }
                                    };
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
                                    };
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
                                    };
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
                                    };
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
                                            };
                                            self.fontColorPicker.createWidget(self.fontColorPickerSettings);
                                        }
                                    };
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
                                            };
                                            self.highlightColorPicker.createWidget(self.highlightColorPickerSettings);
                                        }
                                    };
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
                                    };
                                    self.pasteButton.createWidget(self.buttonSettings);
                                    self.pasteDropDownListSettings = {
                                        source: self.pasteData,
                                        width: 22,
                                        height: 10,
                                        theme: 'demoTheme',
                                        animationType: 'none',
                                        dropDownWidth: '110px',
                                        autoDropDownHeight: true,
                                        renderer: function (index, label, value) {
                                            var imgUrl = self.pasteData[index].imgUrl;
                                            var labelEl = '<span style="font-size: 10px">' + label + '</span>';
                                            var icon = '<span class="' + self.pasteData[index].imageClass + '" style=""></span>';
                                            return '<span>' + icon + labelEl + '</span>';
                                        },
                                        selectionRenderer: function (object, index, label) {
                                            return "";
                                        },
                                        selectedIndex: 0
                                    };
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
                    };
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
                            if (self.theme != '')
                                cssclass += ' jqx-widget-header-' + self.theme;
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
                    var source = {
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
                    };
                }
                AppComponent.prototype.ngAfterViewChecked = function () {
                    if (this.flag === false) {
                        // Styling for all the Buttons 
                        for (var i = 0; i < document.getElementsByTagName('angulartooltip').length; i++) {
                            document.getElementsByTagName('angulartooltip')[i].firstElementChild.style.display = 'inline-block';
                        }
                        for (var i = 0; i < document.getElementsByTagName('angularbutton').length; i++) {
                            document.getElementsByTagName('angularbutton')[i].firstElementChild.style.display = 'inline-block';
                            document.getElementsByTagName('angularbutton')[i].firstElementChild.setAttribute('checked', 'false');
                        }
                        for (var i = 0; i < document.getElementsByTagName('angulardropdownlist').length; i++) {
                            document.getElementsByTagName('angulardropdownlist')[i].firstElementChild.style.display = 'inline-block';
                        }
                        document.getElementById('fileItemButton').firstElementChild.style.color = 'white';
                        document.getElementById('fileItemButton').firstElementChild.style.background = 'transparent';
                        this.Initialize();
                    }
                    this.flag = true;
                };
                AppComponent.prototype.OnBucketColorPicker = function (event) {
                    document.getElementById('bucketColorPreview').style.background = '#' + event.args.color.hex;
                };
                AppComponent.prototype.OnSubscriptClick = function () {
                    if (this.superScriptToggleButton.widgetObject.toggled) {
                        this.superScriptToggleButton.widgetObject.toggled = false;
                        document.getElementById('superscript').firstElementChild.className = 'jqx-rc-all jqx-rc-all-demoTheme jqx-button jqx-button-demoTheme jqx-widget jqx-widget-demoTheme jqx-fill-state-normal jqx-fill-state-normal-demoTheme';
                    }
                };
                AppComponent.prototype.OnSuperscriptClick = function () {
                    if (this.subscriptToggleButton.widgetObject.toggled) {
                        this.subscriptToggleButton.widgetObject.toggled = false;
                        document.getElementById('subscript').firstElementChild.className = 'jqx-rc-all jqx-rc-all-demoTheme jqx-button jqx-button-demoTheme jqx-widget jqx-widget-demoTheme jqx-fill-state-normal jqx-fill-state-normal-demoTheme';
                    }
                };
                AppComponent.prototype.OnFontColorPicker = function (event) {
                    document.getElementById('fontColorPreview').style.background = '#' + event.args.color.hex;
                };
                AppComponent.prototype.OnHighlightColorPicker = function (event) {
                    document.getElementById('highlightColorPreview').style.background = '#' + event.args.color.hex;
                };
                AppComponent.prototype.OnPasteButtonClick = function (event) {
                    var text = document.getElementsByClassName('pasteText')[0].innerHTML;
                    console.log(text + ' clicked');
                };
                AppComponent.prototype.OnMouseDownPasteButton = function (event) {
                    event.preventDefault();
                };
                AppComponent.prototype.OnPasteDropDownSelect = function (event) {
                    var index = event.args.index;
                    var icon = '<span class="' + this.pasteData[index].imageClass + '" style="zoom: 1.5"></span>';
                    document.getElementById('pasteButton').firstElementChild.innerHTML = (icon + '<span class="pasteText">' + this.pasteData[index].label + '</span>');
                    this.pasteButton.render();
                };
                AppComponent.prototype.Initialize = function () {
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
                };
                __decorate([
                    core_1.ViewChild(angular_jqxribbon_1.jqxRibbonComponent), 
                    __metadata('design:type', angular_jqxribbon_1.jqxRibbonComponent)
                ], AppComponent.prototype, "ribbon", void 0);
                __decorate([
                    core_1.ViewChild('fileItemButton'), 
                    __metadata('design:type', angular_jqxdropdownbutton_1.jqxDropDownButtonComponent)
                ], AppComponent.prototype, "fileItemButton", void 0);
                __decorate([
                    core_1.ViewChild('bucketColor'), 
                    __metadata('design:type', angular_jqxdropdownbutton_1.jqxDropDownButtonComponent)
                ], AppComponent.prototype, "bucketColorButton", void 0);
                __decorate([
                    core_1.ViewChild('fontColor'), 
                    __metadata('design:type', angular_jqxdropdownbutton_1.jqxDropDownButtonComponent)
                ], AppComponent.prototype, "fontColorButton", void 0);
                __decorate([
                    core_1.ViewChild('highlightColor'), 
                    __metadata('design:type', angular_jqxdropdownbutton_1.jqxDropDownButtonComponent)
                ], AppComponent.prototype, "highlightColorButton", void 0);
                __decorate([
                    core_1.ViewChild('save'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "saveButton", void 0);
                __decorate([
                    core_1.ViewChild('saveAs'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "saveAsButton", void 0);
                __decorate([
                    core_1.ViewChild('open'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "openButton", void 0);
                __decorate([
                    core_1.ViewChild('close'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "closeButton", void 0);
                __decorate([
                    core_1.ViewChild('pasteButton'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "pasteButton", void 0);
                __decorate([
                    core_1.ViewChild('help'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "helpButton", void 0);
                __decorate([
                    core_1.ViewChild('about'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "aboutButton", void 0);
                __decorate([
                    core_1.ViewChild('update'), 
                    __metadata('design:type', angular_jqxbutton_1.jqxButtonComponent)
                ], AppComponent.prototype, "updateButton", void 0);
                __decorate([
                    core_1.ViewChild('superscript'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "superScriptToggleButton", void 0);
                __decorate([
                    core_1.ViewChild('subscript'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "subscriptToggleButton", void 0);
                __decorate([
                    core_1.ViewChild('bold'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "boldToggleButton", void 0);
                __decorate([
                    core_1.ViewChild('italic'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "italicToggleButton", void 0);
                __decorate([
                    core_1.ViewChild('underline'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "underlineToggleButton", void 0);
                __decorate([
                    core_1.ViewChild('strikethrough'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "striketroughToggleButton", void 0);
                __decorate([
                    core_1.ViewChild('shrinkFont'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "shrinkFontButton", void 0);
                __decorate([
                    core_1.ViewChild('copyButton'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "copyButton", void 0);
                __decorate([
                    core_1.ViewChild('cutButton'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "cutButton", void 0);
                __decorate([
                    core_1.ViewChild('growFont'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "growFontButton", void 0);
                __decorate([
                    core_1.ViewChild('formatPainter'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "formatPainterButton", void 0);
                __decorate([
                    core_1.ViewChild('clearFormatting'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "clearFormattingButton", void 0);
                __decorate([
                    core_1.ViewChild('alignLeft'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "alignLeftButton", void 0);
                __decorate([
                    core_1.ViewChild('alignCenter'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "alignCenterButton", void 0);
                __decorate([
                    core_1.ViewChild('alignRight'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "alignRightButton", void 0);
                __decorate([
                    core_1.ViewChild('alignJustify'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "alignJustifyButton", void 0);
                __decorate([
                    core_1.ViewChild('bulletList'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "bulletListButton", void 0);
                __decorate([
                    core_1.ViewChild('numberedList'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "numberedListButton", void 0);
                __decorate([
                    core_1.ViewChild('decreaseIndent'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "decreaseIndentButton", void 0);
                __decorate([
                    core_1.ViewChild('increaseIndent'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "increaseIndentButton", void 0);
                __decorate([
                    core_1.ViewChild('Sort'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "sortButton", void 0);
                __decorate([
                    core_1.ViewChild('lineSpacing'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "lineSpacingButton", void 0);
                __decorate([
                    core_1.ViewChild('showHide'), 
                    __metadata('design:type', angular_jqxtogglebutton_1.jqxToggleButtonComponent)
                ], AppComponent.prototype, "showHideButton", void 0);
                __decorate([
                    core_1.ViewChild('cutButtonToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "cutButtonToolTip", void 0);
                __decorate([
                    core_1.ViewChild('copyButtonToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "copyButtonToolTip", void 0);
                __decorate([
                    core_1.ViewChild('subscriptToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "subscriptToolTip", void 0);
                __decorate([
                    core_1.ViewChild('superscriptToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "superscriptToolTip", void 0);
                __decorate([
                    core_1.ViewChild('boldToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "boldToolTip", void 0);
                __decorate([
                    core_1.ViewChild('italicToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "italicToolTip", void 0);
                __decorate([
                    core_1.ViewChild('underlineToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "underlineToolTip", void 0);
                __decorate([
                    core_1.ViewChild('strikethroughToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "strikethroughToolTip", void 0);
                __decorate([
                    core_1.ViewChild('alignLeftToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "alignLeftToolTip", void 0);
                __decorate([
                    core_1.ViewChild('alignCenterToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "alignCenterToolTip", void 0);
                __decorate([
                    core_1.ViewChild('alignRightToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "alignRightToolTip", void 0);
                __decorate([
                    core_1.ViewChild('alignJustifyToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "alignJustifyToolTip", void 0);
                __decorate([
                    core_1.ViewChild('bulletListToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "bulletListToolTip", void 0);
                __decorate([
                    core_1.ViewChild('numberedListToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "numberedListToolTip", void 0);
                __decorate([
                    core_1.ViewChild('decreaseIndentToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "decreaseIndentToolTip", void 0);
                __decorate([
                    core_1.ViewChild('increaseIndentToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "increaseIndentToolTip", void 0);
                __decorate([
                    core_1.ViewChild('SortToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "sortToolTip", void 0);
                __decorate([
                    core_1.ViewChild('lineSpacingToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "lineSpacingToolTip", void 0);
                __decorate([
                    core_1.ViewChild('showHideToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "showHideToolTip", void 0);
                __decorate([
                    core_1.ViewChild('bucketColorToolTip'), 
                    __metadata('design:type', angular_jqxtooltip_1.jqxTooltipComponent)
                ], AppComponent.prototype, "bucketColorToolTip", void 0);
                __decorate([
                    core_1.ViewChild('bucketColorPicker'), 
                    __metadata('design:type', angular_jqxcolorpicker_1.jqxColorPickerComponent)
                ], AppComponent.prototype, "bucketColorPicker", void 0);
                __decorate([
                    core_1.ViewChild('fontColorPicker'), 
                    __metadata('design:type', angular_jqxcolorpicker_1.jqxColorPickerComponent)
                ], AppComponent.prototype, "fontColorPicker", void 0);
                __decorate([
                    core_1.ViewChild('highlightColorPicker'), 
                    __metadata('design:type', angular_jqxcolorpicker_1.jqxColorPickerComponent)
                ], AppComponent.prototype, "highlightColorPicker", void 0);
                __decorate([
                    core_1.ViewChild('font'), 
                    __metadata('design:type', angular_jqxdropdownlist_1.jqxDropDownListComponent)
                ], AppComponent.prototype, "fontDropDownList", void 0);
                __decorate([
                    core_1.ViewChild('fontSize'), 
                    __metadata('design:type', angular_jqxdropdownlist_1.jqxDropDownListComponent)
                ], AppComponent.prototype, "fontSizeDropDownList", void 0);
                __decorate([
                    core_1.ViewChild('changeCase'), 
                    __metadata('design:type', angular_jqxdropdownlist_1.jqxDropDownListComponent)
                ], AppComponent.prototype, "changeCaseDropDownList", void 0);
                __decorate([
                    core_1.ViewChild('pasteDropDown'), 
                    __metadata('design:type', angular_jqxdropdownlist_1.jqxDropDownListComponent)
                ], AppComponent.prototype, "pasteDropDownList", void 0);
                __decorate([
                    core_1.ViewChild(angular_jqxgrid_1.jqxGridComponent), 
                    __metadata('design:type', angular_jqxgrid_1.jqxGridComponent)
                ], AppComponent.prototype, "jqxGrid", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/ribbon/defaultfunctionality/app.component.htm',
                        styleUrls: ['app/ribbon/defaultfunctionality/app.component.css'],
                        directives: [angular_jqxribbon_1.jqxRibbonComponent, angular_jqxbutton_1.jqxButtonComponent, angular_jqxtooltip_1.jqxTooltipComponent, angular_jqxdropdownbutton_1.jqxDropDownButtonComponent, angular_jqxcolorpicker_1.jqxColorPickerComponent, angular_jqxdropdownlist_1.jqxDropDownListComponent, angular_jqxgrid_1.jqxGridComponent, angular_jqxtogglebutton_1.jqxToggleButtonComponent],
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