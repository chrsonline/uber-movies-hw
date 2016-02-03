var SuggestionsCollection = Backbone.Collection.extend({
  initialize: function() {
    this.selected = null;
  },
  url: function () {
    return '/search/autocomplete?query=' + $('#search-term').val();
  },
  parse: function(data) {
    return data.suggestions;
  },
  model: Suggestion
});
