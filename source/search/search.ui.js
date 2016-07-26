/** @private */
var $ = require('jquery');
/** @private */
var _ = require('lodash');
/** @private */
var EventBus = require('../events/events');

/**
 * Связка с DOM для поиска
 * @memberof Search
 * @alias ui
 * @class
 */
var SearchDOM = function (_owner) {
  var self = this;

  self._owner = _owner;
  self.settings = self._owner.settings;

  self.settings.inProcess = 'inProcess';

  self._init();
}

/**
 * Инициализация
 * @private
 */
SearchDOM.prototype._init = function () {
  var self = this;

  self._setConfig();
  self._keyUp();
  self._events();
  self._outFocus();
};

/**
 * Грузим настройки по готовности DOM
 * @private
 */
SearchDOM.prototype._setConfig = function () {
  var self = this;

  $(function () {
    self._owner._setData({
      account_id: Site.account.id,
      locale: Site.language.locale,
      fields: ['price_min', 'price_min_available'],
      hide_items_out_of_stock: Site.account.hide_items
    });

    self.$searchField = $('['+ self.settings.searchSelector +']');
    self.$searchForm = self.$searchField.parents('form:first');

    self.$searchField.attr(self.settings.inProcess, false);
  });
};

/**
 * Получаем форму, с которой работаем
 * @private
 * @param {Object} $object - jQuery-нода
 */
SearchDOM.prototype._getInstance = function ($object) {
  var self = this;
  var $search;
  var _target = $object.data('target');

  if (_target) {
    $search = $(_target);
  } else {
    $search = $object.parents('form:first');
  }

  return $search;
};

/**
 * Обработчик ввода символов
 * @private
 */
SearchDOM.prototype._keyUp = function () {
  var self = this;

  $(document).on('keyup', '['+ self.settings.searchSelector +']', function () {
    var $input = $(this);
    var $form = self._getInstance($input);
    var _query = $input.val();
    var _inProcess = $input.prop(self.settings.inProcess);

    document._searchActive = true;

    // блокировка ввода
    if (_inProcess) {
      return;
    }

    if ($input[0]._queryLength == _query.length) {
      return
    }

    $input[0]._queryLength = _query.length;
    $input.prop(self.settings.inProcess, true);

    self._owner._get({
      query: _query,
      input: $input,
      form: $form
    });
  });
};

/**
 * Вешаем слушателя на обновление данных из поиска
 * @private
 */
SearchDOM.prototype._events = function () {
  var self = this;

  EventBus.subscribe('update:insales:search', function (data) {
    var $node;

    if (data.action.form) {
      // срабатывает на события внутри формы
      $node = data.action.form
        .find('['+ self.settings.resultPlaceholder +']');
    } else {
      // убиваем потраха во всех формах
      $node = $('['+ self.settings.resultPlaceholder +']')
    }

    $node.html(Template.render(data, self.settings.template));

    document._searchActive = false;

    // если указан инпут, который надо разлочить
    if (data.action.input) {
      data.action.input
        .prop(self.settings.inProcess, false)
        .trigger('keyup');
    }
  });
};

/**
 * Перехватываем клик вне поиска
 * @private
 */
SearchDOM.prototype._outFocus = function () {
  var self = this;

  $(document).on('click', function (event) {
    var $input = $('['+ self.settings.searchSelector +']');
    var $form = $input.parents('form:first');

    if (document._searchActive && !$(event.target).closest($form).length) {
      self._owner._get({
        query: '',
      });
    }
  });
};

module.exports = SearchDOM;