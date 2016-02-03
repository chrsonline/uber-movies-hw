var AutocompleteView = Backbone.View.extend({
  el: '#search',
  initialize: function(options) {
      this.suggestions = new SuggestionsCollection();
      this.resultsView = options.resultsView;
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
         this.resultsView.updateItems();
       }
    });
  }
});
