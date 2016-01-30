'use strict';

jQuery(document).ready(function () {
    var map;

    var options = {
        zoom: 11,
        center:  new google.maps.LatLng(37.793, -122.394),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    map = new google.maps.Map($('#map')[0], options);

    var app = {};

    app.Suggestion = Backbone.Model.extend({
      defaults: {
        title: 'Unknown',
        location: 'Location name unknown'
      }
    });

    app.SuggestionView = Backbone.View.extend({
      tagName: 'li',
      className: 'suggestionBox',
      template: _.template('<%- title %> - <%- location %>'),
      initialize: function() {
        this.model.on('destroy', this.remove, this);
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      }
    });

    app.Suggestions = Backbone.Collection.extend({
      initialize: function() {
        this.selected = null;
      },
      url: function () {
        return '/search/autocomplete?query=' + $('#search-term').val();
      },
      parse: function(data) {
        return data.suggestions;
      },
      model: app.Suggestion
    });

    app.AutocompleteView = Backbone.View.extend({
      el: '#search',
      initialize: function() {
          this.suggestions = new app.Suggestions();
          this.suggestions.on('reset', this.addAll, this );
      },
      events: {
          "input #search-term": "updateItems",
      },
      updateItems: function () {
          this.suggestions.fetch();
      },
      addAll: function () {
        var autocomplete = [];
        this.suggestions.each(function(suggestion) {
          autocomplete.push(suggestion.get('title'));
        });

        $('#search-term').autocomplete({
          source: autocomplete,
          select: function(event, ui) {
             $(this).val(ui.item.value);
             app.resultsView.updateItems();
           }
        });
      }
    });



    app.Location = Backbone.Model.extend({
      defaults: {
        title: '',
        release_year: '',
        production_company: '',
        distributor: '',
        director: '',
        writer: '',
        facts: '',
        location: '',
        latitude: '',
        longitude: '',
        actors: []
      },
      initialize: function(attributes) {
        this.map = attributes.map;
        var view = new app.LocationView({model: this, map: this.map});
        view.render();
      }
    });

    app.LocationView = Backbone.View.extend({
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
              icon: '../img/film.png'
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

    app.SearchResults = Backbone.Collection.extend({
      initialize: function (models, options) {
        this.map = options.map;
      },
      url: function () {
        return '/search?query=' + $('#search-term').val();
      },
      parse: function(data) {
        var index;
        for (index = 0; index < data.results.length; ++index) {
            data.results[index].map = this.map;
        }
        return data.results;
      },
      model: app.Location
    });

    app.ResultsView = Backbone.View.extend({
      initialize: function (options) {
        this.map = options.map;
        this.results = new app.SearchResults([], { map: this.map });
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

        $('#results-for').html(this.buildMovieInfo(info));
        $('#results-for').css('display', 'inline');

        this.centerMapOnMarkers();
      },
      buildMovieInfo: function (info) {
        return '<b class="title-text">' + info.get('title') + '</b><br /><br />' +
                '<b>Production Company:</b> ' + info.get('production_company') + ' <br />' +
                '<b>Release Year:</b> ' + info.get('release_year') + ' <br />' +
                '<b>Distributor:</b> ' + info.get('distributor') + ' <br />' +
                '<b>Director:</b> ' + info.get('director') + ' <br />' +
                '<b>Writer:</b> ' + info.get('writer');

      },
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


    app.autocompleteView = new app.AutocompleteView();
    app.resultsView = new app.ResultsView({ map: map });


});
