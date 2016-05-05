CKEDITOR.plugins.add('commentSelection', {
    icons: 'Editor_icons',
    init: function(editor) {
        var html, button;

        editor.addCommand( 'commentSelection', {
            exec: function(editor) {
                html && editor.fire('comment', html);
            }
        });
        editor.ui.addButton('commentSelection', {
            label: 'Write comment to selected part of paragraph',
            command: 'commentSelection',
            toolbar: 'comment'
        });

        !editor.readOnly && editor.on('selectionChange', function() {
            var command = editor.getCommand('commentSelection');

            html = editor.getSelectedHtml().getHtml();
            // enable disable button if need
            // command.setState(CKEDITOR.[html ? 'TRISTATE_ON' : 'TRISTATE_OFF']);
        });
    }
});
