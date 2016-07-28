/** @private */
var $ = require('jquery/dist/jquery.min');
/** @private */
var _ = require('lodash');
/* @private */
var EventBus = require('../events/events');
/** @private */
var _regTools = new (require('../tools/regTools')) ();
/** @private */
var _Singleton = require('../tools/singleton');

/**
 * Живой поиск по сайту
 *
 * @class
 *
 * @fires before:insales:search
 * @fires update:insales:search
 * @fires always:insales:search
 */
var Search = function () {
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
 * @private
 * @param  {object} options конфигурация поиска
 */
Search.prototype._init = function () {
  var self = this;

  self.setConfig({});

  self._ui = new (require('./search.ui')) (self);
};

/**
 * Что-то забираем
 * @private
 *
 * @param {Object}
 * @param {string} query - запрос для поиска
 * @param {Object} input - jquery(input)
 */
Search.prototype._get = function (options) {
  var self = this;

  EventBus.publish('before:insales:search');

  clearTimeout(self.keyupTimeoutID);

  if (self._isValid(options.query)) {
    self.data.query = options.query;
    self.keyupTimeoutID = setTimeout(function () {
      $.getJSON(self.path, self.data, function (response) {
        self._update(_.merge(options, response));
      });
    }, self.settings.delay);
  } else {
    self._update(options);
  }
};

/**
 * Обновление состояния
 * @private
 */
Search.prototype._update = function (options) {
  var self = this;

  var data = {
    suggestions: self._patch(options),
    action: options
  };

  data.invalid = !self._isValid(options.query);
  data.empty = !_.size(options.suggestions);
  data.letters = self.settings.letters;

  _.unset(data.action, 'suggestions');

  EventBus.publish('update:insales:search', data);
};

/**
 * Обновляем настройки
 * @param {Object} settings - объект с настройками
 * @param {Object} settings.letters - минимальное кол-во символов для поиска, 3 символа
 * @param {Object} settings.template - шаблон вывода результатов, 'search-default'
 * @param {Object} settings.delay - задержка начала поиска после нажатия, 300 мс
 */
Search.prototype.setConfig = function (settings) {
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
 * @private
 */
Search.prototype._setData = function (_data) {
  var self = this;

  _.merge(self, { data: _data });
};

/**
 * приводим в общий порядок список поиска
 * @private
 */
Search.prototype._patch = function (options) {
  var self = this;
  var _regExp = new RegExp('('+ _regTools.escape(options.query) +')', 'gi');

  return _.reduce(options.suggestions, function (result, product) {
    var temp = {
      id: product.data,
      url: '/product_by_id/'+ product.data,
      title: product.value,
      markedTitle: product.value.replace(_regExp, self.settings.replacment)
    };

    result.push(_.merge(product, temp));
    return result;
  }, []);
};

/**
 * Является ли строка поиска достойной для поиска??
 * @private
 */
Search.prototype._isValid = function (query) {
  var self = this;

  return query !== '' && query.length >= self.settings.letters;
};

module.exports = _Singleton(Search).getInstance();