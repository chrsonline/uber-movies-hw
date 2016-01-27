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

    var Suggestion = Backbone.Model.extend({
      defaults: {
        term: 'aa',
        type: 'ss'
      }
    });

    app.Suggestions = Backbone.Collection.extend({
      url: function () {
        return '/search/autocomplete?query=' + $('#term').val();
      },
      parse: function(data) {
        return data.suggestions;
      },
      model: Suggestion
    });

    app.SuggestionView = Backbone.View.extend({
      tagName: 'li',
      template: _.template('<%- term %>'),
      initialize: function() {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      }
    });

    app.AutocompleteView = Backbone.View.extend({
      el: '#search',
      initialize: function() {
          this.suggestions = new app.Suggestions();
          this.suggestions.on('reset', this.addAll, this );
      },
      events: {
          "change input": "updateItems",
          "input input": "updateItems"
      },
      updateItems: function () {
          console.log(this.suggestions.url);
          this.suggestions.fetch();
      },
      addOne: function(suggestion) {
        var view = new app.SuggestionView({model: suggestion});
        this.$el.find('ul').append(view.render().el);
      },
      addAll: function () {
        console.log(this.suggestions);
        this.$el.find('ul').empty();
        this.suggestions.each( $.proxy( this.addOne, this ) );
      },
      render: function (suggestions) {

      }
    });

    app.autocompleteView = new app.AutocompleteView();
});
