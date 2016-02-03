var SuggestionView = Backbone.View.extend({
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
