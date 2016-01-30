'use strict';

jQuery(document).ready(function () {
    var map;

    var options = {
        zoom: 7,
        center:  new google.maps.LatLng(45.50867, -73.553992),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
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
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
        this.model.on('change:selected', this.setSelected, this);
      },
      setSelected: function() {
        console.log("set selected was called");
        console.log(this.$el);
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
      startNav: function() {
      },
      navigateUp: function() {
        var index = this.indexOf(this.selected);
        if(index > 0) {
            this.setSelected(this.at(index - 1));
        }
      },
      navigateDown: function() {
        console.log("Selected set to ");
        console.log(this.selected);
        if(this.length > 0 && this.selected == null) {
            console.log("Setting selection to 0");
            this.setSelected(this.at(0));
        } else {
          console.log("Navigating Down");
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
        console.log("Selected set to ");
        console.log(this.selected);
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

        }
      },
      navigate: function() {
          if(this.suggestions.selected == null) {
             this.suggestions.startNav()
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

    app.SearchResult = Backbone.Model.extend({

    });

    app.SearchResults = Backbone.Collection.extend({
        // Add a single popover for the selected element
    });

    app.SearchResultView = Backbone.View.extend({

    });

    app.autocompleteView = new app.AutocompleteView();
    $('#search-term').keydown(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 40) {
          // Set suggestions view to navigation mode
          app.autocompleteView.navigate();
      }
      if (code == 13) {
            // request selections
            // also have a little search button to be pressed
            // Display the current search term - no results if nothing
            // Display aggregate information in panel overlayed on the left side
            // Clear current search results if necessary
            // Kick off searchresults collection with call of type/term
      }

    });
});
