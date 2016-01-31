'use strict';

jQuery(document).ready(function () {
    var map;

    var options = {
        zoom: 11,
        center:  new google.maps.LatLng(37.793, -122.394),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // disable default UI and add an icon
    };

    map = new google.maps.Map($('#map')[0], options);

    var app = {};

    app.Suggestion = Backbone.Model.extend({
      defaults: {
        title: 'aa',
        location: 'ss',
        selected: false
      }
    });

    app.SuggestionView = Backbone.View.extend({
      tagName: 'li',
      className: 'suggestionBox',
      template: _.template('<%- title %> - <%- location %>'),
      initialize: function() {
        this.model.on('destroy', this.remove, this);
        this.model.on('change:selected', this.setSelected, this);
      },
      setSelected: function() {
        this.$el.toggleClass('suggestionBoxSelected', this.model.get('selected'));
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
      navigateUp: function() {
        var index = this.indexOf(this.selected);
        if(index < 0) {
            return false;
        }
        if(index == 0) {
            this.selected.set({ selected: false });
            this.selected = null;
        } else {
            this.setSelected(this.at(index - 1));
        }
      },
      navigateDown: function() {
        if(this.length > 0 && this.selected == null) {
            this.setSelected(this.at(0));
        } else {
          var index = this.indexOf(this.selected);
          if(index < this.length - 1) {
              this.setSelected(this.at(index + 1));
          }
        }
      },
      setSelected: function(suggestion) {
        if(this.selected != null) {
          this.selected.set({ selected: false });
        }
        suggestion.set({ selected: true });
        this.selected = suggestion;
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
          this.ignoreKey = false;
      },
      events: {
          "input #search-term": "updateItems",
          'keydown :input': 'handleKeyPress',
          'keypress :input': 'handleKeyPress',
          'keyup :input': 'handleEnterUp'
      },
      handleKeyPress: function(e) {
        if (e.keyCode == 40) {
            this.suggestions.navigateDown();
            return false;
        }
        if (e.keyCode == 38) {
           this.suggestions.navigateUp();
           return false;
        }

        return true;
      },
      handleEnterUp: function(e) {
        if(e.keyCode == 13) {
          this.suggestions.reset();

          if(this.suggestions.selected != null) {
            var term = this.suggestions.selected.get('title');
            $('#search-term').val( term );
            this.updateSearchText( term );

            app.resultsView.updateItems();
          }
        }
      },
      updateSearchText: function (term) {
          $('#results-for').html(term);
      },
      updateItems: function () {
          this.suggestions.fetch();
      },
      addOne: function(suggestion) {
        var view = new app.SuggestionView({model: suggestion});
        this.$el.find('ul').append(view.render().el);
      },
      addAll: function () {
        this.$el.find('ul').empty();
        this.suggestions.each( $.proxy( this.addOne, this ) );
      },
      render: function (suggestions) {

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

        // Move to a better place
        var actorList = '<ul>';
        actorList += '<li>' + this.model.get('actor_1') + '</li>';
        actorList += '<li>' + this.model.get('actor_2') + '</li>';
        actorList += '<li>' + this.model.get('actor_3') + '</li>';
        actorList += '</ul>';

        var markerInfo = '<br />' +
                    '<p style="float: center"><b>' + this.model.get('location') + '</b></p><br />' +
                    '<p><b>Fun Facts:</b><br />' + this.model.get('facts') + '<br /><br />' +
                    '<p><b>Actors:</b></p>' + actorList;


        this.marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(this.model.get('geocode_information').latitude, this.model.get('geocode_information').longitude),
            animation: google.maps.Animation.DROP,
            info: markerInfo
        });

        this.marker.infowindow = new google.maps.InfoWindow({
          content: this.marker.info
        });

        google.maps.event.addListener(this.marker, 'mouseover', this.showPopover);
        google.maps.event.addListener(this.marker, 'mouseout', this.hidePopover);

        this.model.on('remove', this.removeMarker, this);
      },
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
        $('#movie-info').html(info.get('title') + ' <br /> ' + info.get('production_company'));
      }
    });

    app.autocompleteView = new app.AutocompleteView();
    app.resultsView = new app.ResultsView({ map: map });

});
