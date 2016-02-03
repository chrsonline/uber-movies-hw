'use strict';

var Location = Backbone.Model.extend({
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
    var view = new LocationView({model: this, map: this.map});
    view.render();
  }
});
