ISnew.SearchDOM = function (_owner) {
  var self = this;

  self._owner = _owner;
  self.settings = self._owner.settings;

  self._init();
}

ISnew.SearchDOM.prototype._init = function () {
  var self = this;

  self._setConfig();
  self._keyUp();
  self._events();
};

/**
 * Грузим настройки по готовности DOM
 */
ISnew.SearchDOM.prototype._setConfig = function () {
  var self = this;

  $(function() {
    self._owner._setData({
      data: {
        account_id: Site.account.id,
        locale: Site.language.locale,
        fields: [ 'price_min', 'price_min_available' ],
        hide_items_out_of_stock: Site.account.hide_items
      }
    });

    self.$searchField = $(self._owner.settings.searchSelector);
    self.$searchForm = self.$searchField.parents('form:first');
  });
};

/**
 * Обработчик ввода символов
 */
ISnew.SearchDOM.prototype._keyUp = function () {
  var self = this;

  $(document).on('keyup', self._owner.settings.searchSelector, function () {
    var data = {};
    var $input = $(this);
    var $form = $input.parents('form:first');

    self._owner._get({
      query: $input.val(),
      input: $input,
      form: $form
    });
  });
};

/**
 * Перехват клика за пределами поиска
 */
ISnew.SearchDOM.prototype._outClick = function () {
  var self = AjaxSearch._ui;

  if ($(event.target).closest(self.$searchForm).length) {
    return
  };

  self._owner._update({});

  event.stopPropagation();
  $(document).off('click', 'body', self._outClick);
};

/**
 * Вешаем слушателя на обновление данных из поиска
 */
ISnew.SearchDOM.prototype._events = function () {
  var self = this;

  EventBus.subscribe('update:insales:search', function (data) {
    //  срабатывает на события внутри формы
    if (data.action.form) {
      data.action.form
        .find('[data-search-result]')
          .html(Template.render(data, self._owner.settings.template));
    }
  });

  // вешаем клик за пределами формы
  EventBus.subscribe('update:insales:search', function (data) {
    if (data.action.method == 'close') {
      $(document).off('click', 'body', self._outClick);
    } else {
      $(document).on('click', 'body', self._outClick);
    }
  });
};