'use strict';



jQuery(document).ready(function () {
    var map;

    var options = {
        zoom: 11,
        center:  new google.maps.LatLng(37.793, -122.394),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // disable default UI
    };

    map = new google.maps.Map($('#map')[0], options);

    var app = {};

    app.Suggestion = Backbone.Model.extend({
      defaults: {
        term: 'aa',
        type: 'ss',
        selected: false
      }
    });

    app.SuggestionView = Backbone.View.extend({
      tagName: 'li',
      className: 'suggestionBox',
      template: _.template('<%- term %>'),
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
        if(index == 0) {

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
      },
      events: {
          "change input": "updateItems",
          "input #search-term": "updateItems",
          'keyup :input': 'handleKeyPress',
          'keypress :input': 'handleKeyPress'
      },
      handleKeyPress: function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 40) {
            this.suggestions.navigateDown();
        }
        if (code == 38) {
            this.suggestions.navigateUp();
        }
        if (code == 13) {
            this.suggestions.reset();

            if(this.suggestions.selected != null) {
              $('#search-term').val( this.suggestions.selected.get('term') );
              var e = jQuery.Event("keydown");
              e.which = 13;
              $('#search-term').trigger(e);
            }
        }
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
      }
    });


    app.LocationView = Backbone.View.extend({
      tagName:  "li",
      initialize: function(options) {
        this.map = options.map;

        this.marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(this.model.get('geocode_information').latitude, this.model.get('geocode_information').longitude),
            animation: google.maps.Animation.DROP,
            title: this.model.get('location'),
            facts: this.model.get('facts'),
            actors: this.model.get('actors'),
            id : this.model.get('id')
        });

        console.log("marker");
        this.marker.infowindow = new google.maps.InfoWindow({
          content: this.marker.title
        });

        google.maps.event.addListener(this.marker, 'mouseover', this.showPopover);
        google.maps.event.addListener(this.marker, 'mouseout', this.hidePopover);

        this.model.on('destroy', this.remove, this);
      },
      hidePopover : function() {
        this.infowindow.close();
      },
      showPopover : function() {
        this.infowindow.open(this.map, this);
      },
      render: function() { },
      remove : function() {
        console.log('marker removed');
        this.marker.setMap(null);
        this.marker = null;
      }
    });

    app.SearchResults = Backbone.Collection.extend({
      url: function () {
        return '/search/movies?query=' + $('#search-term').val();
      },
      parse: function(data) {
        return data;
      },
      model: app.Location
    });

    app.ResultsView = Backbone.View.extend({
      initialize: function (options) {
        this.map = options.map;
        this.results = new app.SearchResults();
        this.results.on('reset', this.addAll, this );
      },
      updateItems: function() {
        this.results.fetch({reset: true});
      },
      addOne: function(searchResult) {
        var view = new app.LocationView({model: searchResult, map: this.map});

        view.render();
      },
      addAll: function () {
        this.results.each( $.proxy( this.addOne, this ) );
      },
    });

    app.autocompleteView = new app.AutocompleteView();
    app.resultsView = new app.ResultsView({ map: map });

    $('#search-term').keydown(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 13) {
            app.resultsView.updateItems();
            // also have a little search button to be pressed
            // Display the current search term - no results if nothing
            // Display aggregate information in panel overlayed on the left side
            // Clear current search results if necessary
            // Kick off searchresults collection with call of type/term
      }

    });
});
