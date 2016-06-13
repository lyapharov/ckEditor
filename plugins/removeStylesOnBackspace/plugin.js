(function() {
    CKEDITOR.plugins.add('removeStylesOnBackspace', {
        init: function(editor) {
            editor.on('key', function(e) {
                if (e.data.keyCode === 8) {
                    var sel = window.getSelection();
                    var elem;

                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        caretPos = range.endOffset;
                    }

                    if (caretPos === 0) {
                        elem = _.get(editor.getSelection().getStartElement(), '$');
                        removeIndent(elem);
                    }
                }
            })
        }
    });

    function removeIndent(tag) {
        if (!tag) return;

        var matched = removeAttrs(tag);

        // if we can't find indent check indent un previous tag
        if (matched) return;

        if (tag.previousSibling) {
            matched = removeAttrs(tag.previousSibling);
        }

        if (matched) return;

        // if we can't find indent current and previous tag, try remove indent from parent
        if (tag.parentNode) {
            matched = removeAttrs(tag.parentNode);
        }
    }

    function removeAttrs(tag) {
        if (!tag.getAttribute) return;

        var regexps = [/\s?margin:[\d\sa-z]+;?/, /\s?margin-left:[\d\sa-z]+;?/, /\s?width:[\d\sa-z]+;?/, /\s?padding:[\d\sa-z]+;?/, /\s?padding-left:[\d\sa-z]+;?/];
        var style = tag.getAttribute('style');
        var matched = false;

        for(var i = 0; i < regexps.length; i++) {
            if (regexps[i].test(style)) {
                matched = true;
                style = style.replace(regexps[i], '');
            }
        }

        if (matched) {
            tag.setAttribute('style', style);
        }

        return matched;
    }
})();
