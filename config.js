/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'lite', groups: [ 'lite' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others', groups: [ 'others' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Subscript,Superscript,Cut,Copy,Paste,PasteText,PasteFromWord,Redo,Undo,Scayt,Link,Unlink,Anchor,Table,Source,HorizontalRule,SpecialChar';
	config.removePlugins = 'elementspath';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre;div';
	config.title = false;

	// '*(*);*{*}' allows any class and any inline style.
	config.extraAllowedContent = '*[data-id, par-style, start, type, contenteditable]; *(*); *{*}; table[cellspacing, cellpadding]; tr; td; tbody; div;h1;h2;h3;h4;h5;h6;';
	config.extraPlugins = 'commentSelection';

	// Disable auto remove empty span
	CKEDITOR.dtd.$removeEmpty.span = 0;

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	var lite = config.lite = config.lite || {};

	lite.isTracking = false;
	lite.userStyles = {
			"21": 3,
			"15": 1,
			"18": 2
		};
	lite.tooltips = {
		show: false
	}
};
