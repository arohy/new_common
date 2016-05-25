/**
 * Live search
 *
 * @class
 * @name ISnew.Search
 */
ISnew.Search = function ( options ) {
  var self = this;

  self._default = {
    options: {
      searchSelector: '[data-search-field]',
      markerClass: 'ajax_search-marked',
      letters: 3,
      template: 'search-default',
    },
    path: '/search_suggestions'
  };

  self._init(options);
}
/**
 * Настройка
 *
 * @param  {object} options конфигурация поиска
 */
ISnew.Search.prototype._init = function (options) {
  var self = this;

  self.setConfig(options);

  self.$searchField = $(self.options.earchSelector);
  self.$searchForm = self.$searchField.parents('form:first');

  /*
  self.data = {
    account_id: Site.account.id,
    locale: Site.language.locale,
    fields: [ 'price_min', 'price_min_available' ],
    hide_items_out_of_stock: Site.account.hide_items,
  };
  */

  self._binding();
};

/**
 * Обработчик ввода символов
 */
ISnew.Search.prototype._binding = function () {
  var self = this;

  self.keyupTimeoutID = '';

  $(document).on( 'keyup', self.options.searchSelector, function (){
    var data = {};
    var $input = $(this);

    self.data.query = $input.val();

    clearTimeout(self.keyupTimeoutID);

    if (self.data.query !== '' && self.data.query.length >= self.options.letters) {
      self.keyupTimeoutID = setTimeout( function () {
        $.getJSON(self.path, self.data,
          function (response) {
            data = self._patch (response, self.$searchField.val());

            data.action = {
              method: 'update',
              input: $input
            };

            EventBus.publish('update_suggestions:insales:search', data);
          });
      }, 300 );

      $(document).on('click', 'body', self._outClick);
    } else {
      // возвращаем пустой объект, чтобы спрятать результат поиска
      data = {
        suggestions: [],
        action: {
          method: 'update',
          input: $input
        }
      }
      EventBus.publish('update_suggestions:insales:search', data);

      $(document).off('click', 'body', self._outClick);
    }
  });
};

/**
 * Удаление данных из выдачи
 */
ISnew.Search.prototype._outClick = function () {
  var self = this;
  var data = {
    suggestions: [],
    action: {
      method: 'close',
      input: false
    }
  };

  if ($(event.target).closest(self.$searchForm).length) {
    return
  };
  EventBus.publish('update_suggestions:insales:search', data);
  event.stopPropagation();
  $(document).off('click', 'body', self._outClick);
};

/**
 * приводим в общий порядок список поиска
 */
ISnew.Search.prototype._patch = function (data, keyword) {
  var self = this;
  var replacment = '<span class="'+ self.options.markerClass +'">$1</span>';

  console.log(data);

  _.forEach(data.suggestions, function (product) {
    product.id = product.data;
    product.url = '/product_by_id/'+ product.id;
    product.title = product.value;
    product.markedTitle = product.value.replace(new RegExp('('+ keyword +')', 'gi'), replacment);
  });

  return data;
};

/**
 * Обновляем настройки
 */
ISnew.Search.prototype.setConfig = function(options) {
  var self = this;

  _.merge(self, self._default, options);
}