/**
 * Live search
 *
 * @class
 * @name ISnew.Search
 */
ISnew.Search = function () {
  var self = this;

  // настройки по-умолчанию
  self._default = {
    settings: {
      searchSelector: 'data-search-field',
      resultPlaceholder: 'data-search-result',
      markerClass: 'ajax_search-marked',
      letters: 3,
      template: 'search-default',
      delay: 300
    }
  };

  //
  self.path = '/search_suggestions';
  self.keyupTimeoutID = '';

  self._init();
}

/**
 * Настройка
 *
 * @param  {object} options конфигурация поиска
 */
ISnew.Search.prototype._init = function () {
  var self = this;

  self.setConfig({});

  self._ui = new ISnew.SearchDOM(self);
};

/**
 * Что-то забираем
 * {
 *   query: string
 *   input: jquery(input)
 * }
 */
ISnew.Search.prototype._get = function (options) {
  var self = this;

  EventBus.publish('before:insales:search');

  clearTimeout(self.keyupTimeoutID);

  if (self._isValid(options.query)) {
    self.data.query = options.query;
    self.keyupTimeoutID = setTimeout(function () {
      $.getJSON(self.path, self.data, function (response) {
        var status= 'update';
        if (response.suggestions.length == 0) {
          status = 'empty';
        }
        var data = _.merge(options, response, { status: status });
        self._update(data);
      });
    }, self.settings.delay);
  } else {
    var data = _.merge(options, { status: 'invalid' });
    self._update(data);
  }
};

ISnew.Search.prototype._update = function (options) {
  var self = this;

  var data = {
    suggestions: self._patch(options),
    action: options
  };

  _.unset(data.action, 'suggestions');

  EventBus.publish('update:insales:search', data);

  EventBus.publish('always:insales:search', data);
};

/**
 * Обновляем настройки
 */
ISnew.Search.prototype.setConfig = function (settings) {
  var self = this;

  _.merge(self, self._default, { settings: settings });

  self.settings.replacment = '<span class="'+ self.settings.markerClass +'">$1</span>';
}

/**
 * Параметры запросов
 *
 * Тащим поля из настроек магазина и текущей локали
 * account_id: Site.account.id,
 * locale: Site.language.locale,
 * fields: [ 'price_min', 'price_min_available' ],
 * hide_items_out_of_stock: Site.account.hide_items
 */
ISnew.Search.prototype._setData = function (_data) {
  var self = this;

  _.merge(self, { data: _data });
};

/**
 * приводим в общий порядок список поиска
 */
ISnew.Search.prototype._patch = function (options) {
  var self = this;

  return _.reduce(options.suggestions, function (result, product) {
    var temp = {
      id: product.data,
      url: '/product_by_id/'+ product.data,
      title: product.value,
      markedTitle: product.value
    };

    result.push(_.merge(product, temp));
    return result;
  }, []);
};

ISnew.Search.prototype._isValid = function (query) {
  var self = this;

  return query !== '' && query.length >= self.settings.letters;
};