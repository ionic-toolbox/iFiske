var Area = Object.freeze({
    go: function(id) {
                Navigate.to('area', Area.onLoad);
    },
    onload: function() {
        Database.getArea(id, function(area) {
            if(area != null) {
        API.getPhotos(area.org_id, function(photos) {
            area.photos = photos;
        });
            } else {
                throw Error('Tried going to an Area that did not exist');
            };
        });
    }
});
target = "Area";
window[target].onload();
