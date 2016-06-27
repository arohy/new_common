/**
 * Связка с DOM
 */
ISnew.CartDOM = function (options) {
  var self = this;

  self.options = {
    inProcess: 'inProcess',
    disabled: 'disabled',

    form: 'data-cart-form',
    add: 'data-item-add',
    delete: 'data-item-delete',
    update: 'data-cart-update',
    submit: 'data-cart-submit',
    clear: 'data-cart-clear',
    coupon: 'data-coupon-submit'
  };

  self._init(options);
};

/**
 * Инициализация
 */
ISnew.CartDOM.prototype._init = function (options) {
  var self = this;

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

  var $form = $button.parents('form:first');
  var $fields = $form.find('[name*="variant_ids"]');
  var $one_variant = $form.find('[name="variant_id"]');
  var $quantity = $form.find('input[name="quantity"]');
  var $comment = $form.find('[name="comment"]');

  var task = {
    items: {},
    comments: {},
    button: $button,
    form: $form,
    coupon: self._getCoupon($form)
  };

  // складываем данные в объект
  // если в форме был стандартный селектор модификаций, кладем отдельно
  if ($one_variant.length == 1) {
    task.items[_.toInteger($one_variant.val())] = parseFloat($quantity.val());
    task.comments[_.toInteger($one_variant.val())] = $comment.val();
  }
  _.assign(task.items, self._getItems($fields));

  _.assign(task.comments, self._getComments($form));

  // посылаем данные в корзину
  Cart.add(task);
  return;
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
        // вешаем на кнопку метку "В обработке"
        $button.prop(self.options.inProcess, true);
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
    self._unlockButton(data, 'add_items');
  });
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

  // посылаем данные в корзину
  Cart.delete(task);
  return;
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
      // Вешаем метку "в обработке"
      $button.prop(self.options.inProcess, true);
      self._deleteItem($button);
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'delete_items');
  });
};

/**
 * Пересчет корзины из формы
 */
ISnew.CartDOM.prototype.updateOrder = function ($button) {
  var self = this;
  var $form = $('['+ self.options.form +']');
  var $fields = $form.find('input[name*="cart[quantity]"]');

  var task = {
    items: {},
    form: $form,
    coupon: self._getCoupon($form)
  };

  if ($button && $button.length != 0) {
    task.button = $button;
  }

  task.items = self._getItems($fields);

  Cart.set(task);
  return;
};

/**
 * Обновление корзины
 */
ISnew.CartDOM.prototype._bindUpdateCart = function () {
  var self = this;
  var form = '['+ self.options.form +']';

  // обработчик нажатия enter в форме корзины
  $(document).on('keypress', form, function (event) {
    if (event.keyCode == '13') {
      // блочим отправку формы и запускаем обработку
      event.preventDefault();

      self.updateOrder();
      // TODO: удалить
      self.updateOrder($(event.target));
    }
  });

  $(document).on('click', '['+ self.options.update +']', function (event) {
    event.preventDefault()

    var $button = $(this);
    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self.updateOrder($button);
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'set_items');
  });

  // Слушаем изменение кол-ва товара в корзине
  $(function () {
    // находим форму
    var $form = $(form);

    // есть ли она?
    if ($form.length) {
      // подписываемся на событие
      EventBus.subscribe('change_quantity:insales:item', function (data) {
        // а оно было в форме?
        if (data.action.product.closest($form).length) {
          // все ок, пинаем
          self.updateOrder();
        }
      });
    }
  });
};

/**
 * Очистить корзину (через форму)
 */
ISnew.CartDOM.prototype.clearOder = function ($button) {
  var self = this;
  var $form = $('['+ self.options.form +']')
  var $fields = $form.find('input[name*="cart[quantity]"]');

  var task = {
    items: [],
    form: $form,
  };

  // вешаем метку на кнопку, добавляем ее в таску
  if ($button && $button.length != 0) {
    task.button = $button;
  }

  task.items = _.keys(self._getItems($fields));

  Cart.delete(task);
  return;
};

/**
 * Обработка полной очистки корзины
 */
ISnew.CartDOM.prototype._bindClearOrder = function () {
  var self = this;

  // вешаем глобальный обработчик
  $(document).on('click', '['+ self.options.clear +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self.clearOder($button);
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'delete_items');
  });
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

  Cart.setCoupon(task);
  return;
};

/**
 * Обработчики работы с купоном
 */
ISnew.CartDOM.prototype._bindCoupon = function () {
  var self = this;

  // вешаем глобальный обработчик
  $(document).on('click', '['+ self.options.coupon +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    self.setCoupon($button.parents('form:first'), $button);
  });

  // снимаем метку "в процессе" с формы
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'set_coupon');
  });
  return;
};

/**
 * Вытаскиваем id из строки
 */
ISnew.CartDOM.prototype._getId = function (string) {
  return _.toInteger(string.replace(/\D+/g, ''));
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

ISnew.CartDOM.prototype._unlockButton = function (data, eventName) {
  var self = this;

  if (data.action && data.action.button && data.action.method == eventName) {
    data.action.button.prop(self.options.inProcess, false);
  }

  return;
};

ISnew.CartDOM.prototype._getComments = function ($form) {
  var self = this;
  var comments = {};
  var $comments = $form.find('[name*="cart[order_line_comments]"]');

  $comments.each(function () {
    var $comment = $(this);
    comments[self._getId($comment.attr('name'))] = $comment.val();
  });

  return comments;
};
