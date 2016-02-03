var SearchResultsCollection = Backbone.Collection.extend({
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
  model: Location
});
