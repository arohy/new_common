/**
 * Связка с DOM
 */

ISnew.CartDOM = function (options) {
  var self = this;

  self._init(options);
};

/**
 * Инициализация
 */
ISnew.CartDOM.prototype._init = function (options) {
  var self = this;

  self.options = {
    inProcess: 'inProcess',
    disabled: 'disabled',

    form: 'cart-form',
    add: 'cart-item-add',
    delete: 'cart-item-delete',
    update: 'cart-form-submit',
    clear: 'cart-form-clear',
    coupon: 'cart-coupon-submit',
  };

  _.assign(self.options, options);

  // Прибиваем все обработчики
  self._bindAddItem();
  self._bindDeleteItem();
  self._bindUpdateCart();
  self._bindClearOrder();
  self._bindCoupon();

  return;
};

/**
 * Добавляем товары из формы
 */
ISnew.CartDOM.prototype._addItem = function ($button) {
  var self = this;
  var add = self.options.add;

  var $form = $button.parents('form:first');
  var $fields = $form.find('[name*="variant_ids"]');
  var $one_variant = $form.find('[name="variant_id"]');
  var $quantity = $form.find('input[name="quantity"]');

  var task = {
    items: {},
    button: $button,
    form: $form,
    coupon: self._getCoupon($form)
  };

  // вешаем на кнопку метку "В обработке"
  $button.prop(self.options.inProcess, true);

  // складываем данные в объект
  // если в форме был стандартный селектор модификаций, кладем отдельно
  if ($one_variant.length == 1) {
    task.items[parseInt($one_variant.val())] = parseFloat($quantity.val());
  }
  _.assign(task.items, self._getItems($fields));

  console.log('add_items:', task);
  // посылаем данные в корзину
  Cart.add(task);
  return;
};

/**
 * Удаляем один элемент из корзины по клику на кнопке "Удалить"
 */
ISnew.CartDOM.prototype._deleteItem = function ($button) {
  var self = this;
  var task = {
    items: [self._getId($button.attr(self.options.delete))],
    button: $button
  };

  // Вешаем метку "в обработке"
  $button.prop(self.options.inProcess, true);

  // посылаем данные в корзину
  Cart.delete(task);
  return;
};

/**
 * Пересчет корзины из формы
 */
ISnew.CartDOM.prototype.updateOrder = function () {
  var self = this;
  var $form = $('['+ self.options.form +']');
  var $fields = $form.find('input[name*="cart[quantity]"]');
  var task = {
    items: {},
    form: $form,
    coupon: self._getCoupon($form)
  };

  // т.к. этот метод можно дергать из разных мест
  // проверку на метку ставим тут
  if (!$form.prop(self.options.inProcess)) {
    $form.prop(self.options.inProcess, true);
    task.items = self._getItems($fields);
    Cart.set(task);
  };

  return;
};

/**
 * Очистить корзину (через форму)
 */
ISnew.CartDOM.prototype.clearOder = function ($button) {
  var self = this;
  var $form = $(self.options.form);
  var $fields = $form.find('input[name*="cart[quantity]"]');
  var task = {
    items: [],
    form: $form,
  };

  // лочим форму, собираем инфу по товарам
  if (!$form.prop(self.options.inProcess)) {
    // вешаем метку на кнопку, добавляем ее в таску
    if ($button && $button.length != 0) {
      $button.prop(self.options.inProcess, true);
      task.button = $button;
    }

    $form.prop(self.options.inProcess, true);
    task.items = _.keys(self._getItems($fields));

    Cart.delete(task);
  }

  return;
};

/**
 * Отправка купона
 */
ISnew.CartDOM.prototype.setCoupon = function ($form) {
  var self = this;
  var task = {
    items: {},
    form: $form,
    coupon: self._getCoupon($form)
  };

  if (!$form.prop(self.options.inProcess)) {
    $form.prop(self.options.inProcess, true);
    Cart.setCoupon(task);
  }

  return;
};

/**
 * Вытаскиваем id из строки
 */
ISnew.CartDOM.prototype._getId = function (string) {
  return parseInt(string.replace(/\D+/g, ''));
};

/**
 * Собираем items из $form
 */
ISnew.CartDOM.prototype._getItems = function ($fields) {
  var self = this;
  var items = {};

  $fields.each(function (index, item) {
    var $item = $(item);
    items[self._getId($item.attr('name'))] = parseFloat($item.val());
  });

  return items;
};

/**
 * Lurk for coupon
 */
ISnew.CartDOM.prototype._getCoupon = function ($form) {
  return $form.find('[name="cart[coupon]"]').val() || false;
};

/**
 * Обработка добавления товара в корзину
 */
ISnew.CartDOM.prototype._bindAddItem = function () {
  var self = this;

  $(document).on('click', '['+ self.options.add +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      // если эту кнопку еще не жали
      if (!$button.prop(self.options.disabled)) {
        // если кнопка не заблочена - делаем добавление
        self._addItem($button);
      } else {
        // иначе - дергаем событие
        EventBus.publish('add_disabled:insales:product', {
          button: $button,
        });
      }
    }
  });

  // снимаем с кнопки метку после операций с корзиной
  EventBus.subscribe('always:insales:cart', function (data) {
    if (data.method == 'add_items' && data.button) {
      data.button.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Обработка удаления товара из корзины
 */
ISnew.CartDOM.prototype._bindDeleteItem = function () {
  var self = this;

  // вешаем глобальный обработчик
  $(document).on('click', '['+ self.options.delete +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      // если не в обработке,
      // то удаляем товар
      self._deleteItem($button);
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    if (data.button && data.method == 'delete_items') {
      data.button.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Обновление корзины
 */
ISnew.CartDOM.prototype._bindUpdateCart = function () {
  var self = this;
  var $form = $('['+ self.options.form +']');

  // обработчик нажатия enter в форме корзины
  $(document).on('keypress', $form, function (event) {
    if (event.keyCode == '13') {
      // блочим отправку формы и запускаем обработку
      event.preventDefault();
      self.updateOrder();
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    if (data.form && data.method == 'set_items') {
      $form.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Обработка полной очистки корзины
 */
ISnew.CartDOM.prototype._bindClearOrder = function () {
  var self = this;
  var $form = $(self.options.form);

  // вешаем глобальный обработчик
  $(document).on('click', '['+ self.options.clear +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    self.clearOder($button);
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    if (data.method == 'delete_items') {
      $form.prop(self.options.inProcess, false);

      // если дернули через стандартную кнопку - отжать её
      if (data.button) {
        data.button.prop(self.options.inProcess, false);
      }
    }
  });
};

/**
 * Обработчики работы с купоном
 */
ISnew.CartDOM.prototype._bindCoupon = function () {
  var self = this;
  var $form = $(self.options.form);

  // вешаем глобальный обработчик
  $(document).on('click', '['+ self.options.coupon +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    self.setCoupon($button.parents('form:first'));
  });

  // снимаем метку "в процессе" с формы
  EventBus.subscribe('always:insales:cart', function (data) {
    if (data.method == 'set_coupon') {
      $form.prop(self.options.inProcess, false);
    }
  });
  return;
};