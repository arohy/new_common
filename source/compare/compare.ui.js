/**
 * DOM + ISnew.Compare
 */

ISnew.CompareDOM = function (options) {
  var self = this;

  self._init(options);
}

ISnew.CompareDOM.prototype._init = function (options) {
  var self = this;

  self.options = {
    add: 'data-compare-add',
    delete: 'data-compare-delete',

    disabled: 'disabled',
    inProcess: 'inProcess'
  };

  self._bindAddItem();
  self._bindDelteItem();
};

/**
 * Обработчик добавления
 */
ISnew.CompareDOM.prototype._bindAddItem = function () {
  var self = this;

  $(document).on('click', '['+ self.options.add +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self._addItem($button);
    }
  });

  EventBus.subscribe('always:insales:compares', function (data) {
    var try_added = (data.method == 'add_item' || data.method == 'overload');
    if (data.button && try_added) {
      data.button.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Основаня логика добавления товара в сравнение по кнопке
 */
ISnew.CompareDOM.prototype._addItem = function ($button) {
  var self = this;
  var task = {
    button: $button,
    item: parseInt($button.attr(self.options.add))
  };

  Compare.add(task);
  return;
};

/**
 * Обработчик удаления
 */
ISnew.CompareDOM.prototype._bindDelteItem = function () {
  var self = this;

  $(document).on('click', '['+ self.options.delete +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self._deleteItem($button);
    }
  });

  EventBus.subscribe('always:insales:compares', function (data) {
    if (data.button && data.method == 'remove_item') {
      data.button.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Основаня логика удаления товара из сравнения по кнопке
 */
ISnew.CompareDOM.prototype._deleteItem = function ($button) {
  var self = this;
  var task = {
    button: $button,
    item: parseInt($button.attr(self.options.delete))
  };

  Compare.remove(task);
};