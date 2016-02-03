var LocationView = Backbone.View.extend({
  tagName:  "li",
  initialize: function(options) {
    this.map = options.map;
    this.model = options.model;


    var geocodeInfo = this.model.get('geocode_information');
    if(geocodeInfo) {
      this.marker = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(geocodeInfo.latitude, geocodeInfo.longitude),
          animation: google.maps.Animation.DROP,
          info: this.buildMarkerInfo(),
          icon: 'img/film.png'
      });

      this.marker.infowindow = new google.maps.InfoWindow({
        content: this.marker.info
      });

      google.maps.event.addListener(this.marker, 'mouseover', this.showPopover);
      google.maps.event.addListener(this.marker, 'mouseout', this.hidePopover);

      this.model.on('remove', this.removeMarker, this);
    }
  },
  buildMarkerInfo: function() {
    var modelJson = this.model.toJSON();
    return this.markerInfoTemplate(modelJson) + this.actorList(modelJson);
  },
  actorList : _.template($('#actor-list').html()),
  markerInfoTemplate: _.template($('#marker-info').html()),
  hidePopover : function() {
    this.infowindow.close();
  },
  showPopover : function() {
    this.infowindow.open(this.map, this);
  },
  removeMarker : function() {
    this.marker.setMap(null);
    this.marker = null;
  }
});
