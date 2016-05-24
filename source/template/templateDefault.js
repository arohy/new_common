/**
 * прибиваем дефолтный селект для вывода опций
 */
ISnew.Template.prototype._setDefault = function () {
  var self = this;

  var option_default = '<div class="option-<%= option.handle %>">\n<label><%= option.title %></label>\n<select data-option-bind="<%= option.id %>">\n<% _.forEach(option.values, function (value){ %>\n<option\ndata-value-position="<%= value.position %>"\nvalue="<%= value.position %>"\n<% if (option.selected == value.position & init_option) { %>selected<% } %>\n>\n<%= value.title %>\n</option>\n<% }) %>\n</select>\n</div>';

  var search_default = '<% if (suggestions.length > 0){ %>\n<ul class="ajax_search-results">\n<% _.forEach(suggestions, function (product){ %>\n<li class="ajax_search-item">\n<a href="<%- product.url %>" class="ajax_search-link"><%= product.marked_title %></a>\n</li><% }) %>\n</ul>\n<% } %>';

  self.load(option_default, 'option-default');
  self.load(search_default, 'search-default');
}