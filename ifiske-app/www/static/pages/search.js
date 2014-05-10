var search = Object.freeze({
    go: function() {
        if($("#search").length == 0)
            Navigate.to('search', this.onload);
        else
            this.onload($("#content"));
    },
    onload: function(text) {
        var searchstring = $("#searchfield").val();
        Database.search(searchstring, function(result) {
            var list = $(text).find("#search-list")
            list.empty();
            var newlist = [];
            for(var i = 0; i < result.rows.length; ++i) {
                newlist.push(search.createButton(result.rows.item(i)));
            }
            list.html(newlist.join(''));
            $(text).find('.button').bind('touchend', search.buttonclick);
        });

    },
    createButton: function (props) {
        return [
            '<div class="button" data-id="',
            props.id,
            '">',
            props.name,
            '</div>'
        ].join('');
    },
    buttonclick: function(e) {
        area.go(parseInt($(e.target).attr('data-id')));
    }
});
