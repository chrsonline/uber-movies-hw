var ResultsView = Backbone.View.extend({
  initialize: function (options) {
    this.map = options.map;
    this.results = new SearchResultsCollection([], { map: this.map });
    this.results.on('reset', this.updateMovieInfoWindow, this);
  },
  updateItems: function() {
    var remove = [];
    this.results.each(function(result) {
      remove.push(result);
    });
    this.results.remove(remove);

    this.results.fetch();
  },
  updateMovieInfoWindow: function () {
    var info = this.results.at(0);

    if(info) {
      $('#results-for').css('display', 'inline');
      $('#results-for').html(this.movieInfoTemplate(info.toJSON()));
    } else {
      $('#results-for').css('display', 'inline');
      $('#results-for').html('<b class="title-text">No results found!</b>');
    }

    this.centerMapOnMarkers();
  },
  movieInfoTemplate: _.template($('#movie-search-information').html()),
  centerMapOnMarkers: function () {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < this.results.length; i++) {
      var geocodeInfo = this.results.at(i).get('geocode_information');
      if(geocodeInfo) {
          bounds.extend(new google.maps.LatLng(geocodeInfo.latitude, geocodeInfo.longitude));
      }
    }

    if(!bounds.isEmpty()) {
      this.map.fitBounds(bounds);
      this.map.setZoom(this.map.getZoom() - 2);
    }
  }
});
