/*
 * Инициализация переменных
 */

'use strict';

if (!ISnew) {
  var ISnew = {};
}

// Глобальная информация о сайте.
if (!Site) {
  var Site = {};
}

// Место для всех оберток json
if (!ISnew.json) {
  ISnew.json = {};
}

// Место для всяких утилиток
if (!ISnew.tools) {
  ISnew.tools = {};
}

if (!EventBus) {
  var EventBus;
}
/**
 * Cart
 *
 * Зависит от ISnew.json, Events, ISnew.CartHelper
 */

// TODO: сделать синглтон
ISnew.Cart = function () {
  var self = this;

  self.ui = new ISnew.CartDOM();
  self.order = new ISnew.CartOrder(self);
  self.tasks = new ISnew.CartTasks(self);

  self.init();
};

/**
 * Получить с сервера состав корзины
 */
// TODO: изменить на нормальныйую логику после нормолизации ответов json
// TODO: может не надо? у нас теперь появляется нормальный таск манагер :)
ISnew.Cart.prototype.init = function () {
  var self = this;
  var task = {
    method: 'init'
  };

  self.tasks.send(task);
};

ISnew.Cart.prototype._get = function () {
  var self = this;
  var current_items = {};

  return current_items;
};

/**
 * Добавить в корзину заданное кол-во товаров
 *
 * на вход - объект. смотреть доку
 */
ISnew.Cart.prototype.add = function (task) {
  var self = this;

  task = task || {};
  task.method = 'add_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._add_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) + _.toInteger(quantity);

    current_items[variant_id] = current_quantity;
  });

  return current_items;
};

/**
 * Удадить из корзины заданное кол-во товаров
 * на вход - объект с парами variant_id: quantity
 */
ISnew.Cart.prototype.remove = function (task) {
  var self = this;

  task = task || {};
  task.method = 'remove_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._remove_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) - _.toInteger(quantity);

    current_items[variant_id] = current_quantity > 0 ? current_quantity : 0;
  });

  return current_items;
};

/**
 * Устанавливает кол-во товаров в корзине для каждой позиции
 * на вход - объект с парами variant_id: quantity
 */
ISnew.Cart.prototype.set = function (task) {
  var self = this;
  task = task || {};
  task.method = 'set_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._set_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    current_items[variant_id] = _.toInteger(quantity);
  });

  return current_items;
};

/**
 * Удалить позиции из корзины
 * на вход - массив с variant_id
 */
ISnew.Cart.prototype.delete = function (task) {
  var self = this;
  task = task || {};

  task.method = 'delete_items';

  self.tasks.send(taskUpdate);
};

ISnew.Cart.prototype._delete_items = function (task, current_items) {
  var self = this;

  _.chain(task.items)
    .toArray()
    .forEach(function(variant_id) {
      current_items[variant_id] = 0;
    })
    .value();

  return current_items;
};

/**
 * Полностью очистить корзину
 */
ISnew.Cart.prototype.clear = function (task) {
  var self = this;
  task = task || {};
  task.method = 'clear_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._clear_items = function (task, current_items) {
  var self = this;

  _.forIn(current_items, function(quantity, variant_id) {
    current_items[variant_id] = 0;
  });

  return current_items;
};

/**
 * Устанавливаем купон
 */
ISnew.Cart.prototype.setCoupon = function (task) {
  var self = this;

  task = task || {};
  task.method = 'set_coupon';

  self.tasks.send(task);
};

ISnew.Cart.prototype._set_coupon = function (task, current_items) {
  var self = this;

  return current_items;
};

/**
 * Получить состав корзины
 */
ISnew.Cart.prototype.getOrder = function () {
  var self = this;

  return self.order.get();
};

/**
 * Обновление состава корзины
 */
ISnew.Cart.prototype._update = function (items, task) {
  var self = this;

  self.tasks._before();

  ISnew.json.updateCartItems(items, task)
    .done(function (response) {
      self.tasks._done(response);
    })
    .fail(function (response) {
      self.tasks._fail(response);
    })
    .always(function () {
      self.tasks._always();
    });
};
/**
 * Класс отвечает за работу и форматирование состава корзины
 */

ISnew.CartOrder = function (_cart) {
  var self = this;

  self._owner = _cart;
};

/**
 * обновляем состав корзины
 */
ISnew.CartOrder.prototype.set = function (order) {
  var self = this;

  self._patch(order);

  return self;
};

/**
 * забираем актуальный состав корзины
 */
ISnew.CartOrder.prototype.get = function () {
  var self = this;

  return self;
};

/**
 * Формируем инфу о позициях
 */
ISnew.CartOrder.prototype.getItems = function () {
  var self = this;
  var items = {};

  _.forEach(self.order_lines, function (item) {
    items[item.variant_id] = item.quantity;
  });

  return items;
};

/**
 * Фиксим инфу по корзине
 */
ISnew.CartOrder.prototype._patch = function (current_order) {
  var self = this;

  self.order_lines = current_order.order_lines || current_order.items;
  self.order_line_comments = current_order.order_line_comments || current_order.order.order_line_comments;

  self.positions_count = self.order_lines.length;

  self.items_count = current_order.items_count;
  self.items_price = 0;

  self.total_price = current_order.total_price;

  self.discounts = current_order.discounts;

  self._itemsPrice();
  self._deliveryPrice(current_order);
  self._url();
  self._images();

  return;
};

/**
 * Добавляем поле с ценой только товаров, без доставки
 */
ISnew.CartOrder.prototype._itemsPrice = function () {
  var self = this;

  self.items_price = _.reduce(self.order_lines, function (sum, item) {
    return sum + item.sale_price * item.quantity;
  }, 0);

  return;
};

/**
 * Добавляем цену доставки
 * NOTE: в разных json лежит в разных местах
 */
ISnew.CartOrder.prototype._deliveryPrice = function (current_order) {
  var self = this;
  var delivery_price = _.toString(current_order.delivery_price) || _.toString(current_order.order.delivery_price);

  self.delivery_price = parseFloat(delivery_price);

  return;
};

/**
 * Фиксим url с учетом языков
 */
ISnew.CartOrder.prototype._url = function () {
  var self = this;
  _.forEach(self.order_lines, function (item) {
    //console.log(item);
    // TODO: пока хз. нужен язык
  });
  return;
};

/**
 * Фиксим картинки товаров
 */
ISnew.CartOrder.prototype._images = function () {
  var self = this;

  _.forEach(self.order_lines, function (item) {
    item.images = item.product.images;
  });
  return;
};
/**
 * Менеджер задач для корзины
 * Занимается контролем за задачами, склейкой и отправкой
 */
ISnew.CartTasks = function (_owner) {
  var self = this;

  self._owner = _owner;

  self._lock = false;

  self._taskToWork = [];
  self._taskInWork = [];
};

/**
 * Точка входа
 *
 * Если параметр передан, то добавляем таску в очередь.
 *
 * Если нет - пинаем оставшуюся очередь, может прилететь только от CART()!!!
 * После получения ответа от сервера.
 */
ISnew.CartTasks.prototype.send = function (task) {
  var self = this;

  if (task) {
    self._add(task);
  } else {
    self._push();
  }

  return;
};

/**
 * Добавляем таску в очередь
 */
ISnew.CartTasks.prototype._add = function (task) {
  var self = this;

  self._taskToWork.push(task);

  self._push();
  return;
};

/**
 * Пушим очередь на сервер
 */
ISnew.CartTasks.prototype._push = function () {
  var self = this;
  var tasks = self._taskToWork;
  var items_set = self._owner.order.getItems();
  var result_task = {};

  // если залокано запросом - посылаем в утиль
  if (self._lock || tasks.length == 0) {
    return false;
  }

  // не залочен? решаем этот вопрос )
  self._lock = true;

  // перебрасываем накопившиеся таски в обработку
  self._taskInWork = self._taskToWork;
  self._taskToWork = [];

  // проходим по таскам
  _.forEach(self._taskInWork, function(task) {
    // применяем таски на актуальный состав
    items_set = self._task(task, items_set);

    // комбайним комменты и купоны
    _.assign(result_task.comments, task.comments);
    result_task.coupon = task.coupon;
  }, items_set);

  self._send(items_set, result_task);
  return;
};

/**
 * Отсылаем на сервак
 */
ISnew.CartTasks.prototype._send = function (items_set, task) {
  var self = this;

  self._owner._update(items_set, task);
  return;
};

/**
 * Применяем таски на местность
 */
ISnew.CartTasks.prototype._task = function (task, current_items) {
  var self = this;
  var method = '_'+ task.method;

  // если такого метода нет - тягаем обновление корзины.
  if (!_.isFunction(self._owner[method])) {
    method = '_get';
  }

  return self._owner[method](task, current_items);
};

/**
 * Действия при успешном обновлении
 */
ISnew.CartTasks.prototype._done = function (order) {
  var self = this;
  var data = {};

  // ставим актуальные данные в корзину
  self._owner.order.set(order);

  data = _.clone(self._owner.order.get());

  _.forEach(self._taskInWork, function (task) {
    data.action = task || {};
    EventBus.publish(task.method +':insales:cart', data);
  });

  EventBus.publish('update_items:insales:cart', data);
  return;
};

/**
 * Действия при фейле
 */
ISnew.CartTasks.prototype._fail = function (response) {
  var self = this;

  console.log('cart:update:fail', response);

  // если не прокатило - заливаем обратно таски
  if (self._taskInWork.length != 0) {
    _.concat(self._taskToWork, self._taskInWork);
  }

  return;
};

/**
 * Действия "всегда"
 */
ISnew.CartTasks.prototype._always = function () {
  var self = this;
  var data = {};

  // снимаем лок
  self._lock = false;

  _.forEach(self._taskInWork, function (task) {
    data.action = task || {};
    EventBus.publish('always:insales:cart', data);
  });

  // всё ок, удаляем задачи
  self._taskInWork = [];

  // погнали все кругом
  self.send();
  return;
};

ISnew.CartTasks.prototype._before = function () {
  var self = this;
  var data = {};

  _.forEach(self._taskInWork, function (task) {
    data.action = task || {};
    EventBus.publish('before:insales:cart', data);
  })
  return;
};
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
    update: 'cart-itme-update',
    submit: 'cart-form-submit',
    clear: 'cart-form-clear',
    coupon: 'cart-coupon-submit'
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

  // складываем данные в объект
  // если в форме был стандартный селектор модификаций, кладем отдельно
  if ($one_variant.length == 1) {
    task.items[parseInt($one_variant.val())] = parseFloat($quantity.val());
  }
  _.assign(task.items, self._getItems($fields));

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
  var $form = $('['+ self.options.form +']');

  // обработчик нажатия enter в форме корзины
  $(document).on('keypress', $form, function (event) {
    if (event.keyCode == '13') {
      // блочим отправку формы и запускаем обработку
      event.preventDefault();

      self.updateOrder();
    }
  });

  $(document).on('click', '['+ self.options.update +']', function (event) {
    event.preventDefault()

    var $button = $(this);
    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self.updateOrder();
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'set_items');
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

ISnew.CartDOM.prototype._unlockButton = function (data, eventName) {
  var self = this;

  if (data.action && data.action.button && data.action.method == eventName) {
    data.action.button.prop(self.options.inProcess, false);
  }

  return;
};
/**
 * Сравнение товаров
 */

// TODO: сделать синглтон
ISnew.Compare = function (options) {
  options = options || {};

  var self = this;
  self.products = [];
  self.maxItems = options.maxItems || 4;

  self.ui = new ISnew.CompareDOM(options);

  // Обновляемся
  self._update();
};

/**
 * Добавляем товар
 */
ISnew.Compare.prototype.add = function (task) {
  var self = this;

  task.item = parseInt(task.item);
  task.method = 'add_item';

  // если достигли максимального кол-ва товаров
  // кидаем остановку
  if (self.products.length >= self.maxItems) {
    task.method = 'overload';
    self._events(task);
    self._always(task);

    return;
  } else if (_.findIndex(self.products, task.item) != -1) {
    task.method = 'in_list';
    self._events(task);
    self._always(task);

    return;
  } else {
    self._before(task);
    ISnew.json.addCompareItem(task.item)
      .done(function (response) {
        self._update(task);
      })
      .fail(function (response) {
        console.log('fail: ', response);
        // Завернуто сюда, потому что в done идет ещё один
        // ajax запрос. Нужно сделать удобные ответы на эти запросы
        self._always(task);
      });
  }
};

/**
 * Удаляем товар
 */
ISnew.Compare.prototype.remove = function (task) {
  var self = this;

  task.item = parseInt(task.item);
  task.method = 'remove_item';

  self._before(task);
  ISnew.json.removeCompareItem(task.item)
    .done(function (response) {
      self._update(task);
    })
    .fail(function (response) {
      console.log('fail: ', response);
      // Завернуто сюда, потому что в done идет ещё один
      // ajax запрос. Нужно сделать удобные ответы на эти запросы
      self._always(task);
    });
};

/**
 * Обновляем состояние сравнения
 */
ISnew.Compare.prototype.update = function () {
  var self = this;

  self._update({
    method: 'update_items'
  });
};

/**
 *
 */
ISnew.Compare.prototype.getCompare = function () {
  var self = this;

  return self;
};

/**
 * Получение актуальной инфы с сервера
 */
ISnew.Compare.prototype._update = function (task) {
  var self = this;

  task = task || {};
  task.method = task.method || 'init';

  if (task.method == 'init' || task.method == 'update_items') {
    self._before(task);
  }

  ISnew.json.getCompareItems()
    .done(function (response) {
      self.products = response.products;
      self._events(task);
    })
    .fail(function (response) {
      console.log('fail: ', response);
    })
    .always(function () {
      self._always(task);
    });
};

/**
 * Вызов событий
 */
ISnew.Compare.prototype._events = function (task) {
  var self = this;
  var data = self;
  data.action = task;
  EventBus.publish(task.method +':insales:compares', data);

  if (data.action.method != 'update_items' && data.action.method != 'overload') {
    EventBus.publish('update_items:insales:compares', data);
  }
};

/**
 * Событие ПЕРЕД действием
 */
ISnew.Compare.prototype._before = function (task) {
  EventBus.publish('before:insales:compares', task);
};

/**
 * Мы закончили что-то делать в сравнении
 */
ISnew.Compare.prototype._always = function (task) {
  EventBus.publish('always:insales:compares', task);
};
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
    add: 'compare-item-add',
    delete: 'compare-item-delete',

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
/**
 * Event bus
 *
 * Шина событий. Построена на $.Callbacks;
 */

/**
 * Класс Шины Событий
 */

// TODO: сделать синглтон
ISnew.EventBus = function () {
  var self = this;

  self.eventsList = {};
  self.logger = new ISnew.EventsLogger();

  return;
};

/**
 * Публикация события с данными
 */
ISnew.EventBus.prototype.publish = function (eventId, data) {
  var self = this;

  self.logger.addListner(eventId);

  return self._selectEvent(eventId).fire(data);
};

/**
 * Подписаться на событие
 */
ISnew.EventBus.prototype.subscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).add(callback);
};

/**
 * Отписаться от события
 */
ISnew.EventBus.prototype.unsubscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).remove(callback);
};

/**
 * Выбор нужного события
 */
ISnew.EventBus.prototype._selectEvent = function (eventId) {
  var self = this;
  var Event;

  eventId = _.toString(eventId);
  Event = self.eventsList[eventId];

  // Если у нас новое событие, создаем его и объявляем в системе.
  if (!Event) {
    // Объявляем методы
    Event = $.Callbacks('memory');
    self.eventsList[eventId] = Event;
  }

  return Event;
};
/**
 * Logger на шине событий
 *
 * Позволяет одной командой перехватывать все события, порождаемые компонентом
 */
ISnew.EventsLogger = function () {
  var self = this;

  self.loggersList = {};
};

/**
 * Добавляем прослушку компонента
 */
ISnew.EventsLogger.prototype.add = function (component) {
  var self = this;

  self.loggersList[component] = {};
  self._init(component);

  return;
};

/**
 * Проходим по уже существующим событиям и вешаемся на них
 */
ISnew.EventsLogger.prototype._init = function (component) {
  var self = this;

  _.forEach(EventBus.eventsList, function (item, eventName) {
    self.addListner(eventName)
  });

  return;
};

/**
 * Вешаем слушателя на событие
 */
ISnew.EventsLogger.prototype.addListner = function (eventName) {
  var self = this;
  var component = self._component(eventName);

  // если такой
  if (self._inList(component) && !self._isListen(eventName)) {
    self.loggersList[component][eventName] = true;

    EventBus.subscribe(eventName, function (data) {
      console.log('LISTNER: ', eventName, data);
    });
  }

  return;
};

/**
 * Проверяем, слушаем ли мы такой компонент?
 */
ISnew.EventsLogger.prototype._inList = function (component) {
  var self = this;

  return _.has(self.loggersList, component) ? true : false;
};

/**
 * Проверка
 */
ISnew.EventsLogger.prototype._isListen = function (eventName) {
  var self = this;
  var component = self._component(eventName);
  var status = false;

  if (self._inList(component)) {
    status = _.has(self.loggersList[component], eventName);
  }

  return status;
};

/**
 * Вытаскиваем название компонента из события
 */
ISnew.EventsLogger.prototype._component = function (eventName) {
  return _.last(eventName.split(':'));
};

EventBus = new ISnew.EventBus();
/*
 * Добавление товара в корзину
 */

/**
 * Принимаем объект
 *
 * Внезапно, если это объект невалидного вида мы все равно получим ответ!!!
 */

ISnew.json.addCartItems = function (items, options) {
  var fields = {};
  options = options || {};

  _.forIn(items, function (quantity, variant_id) {
    fields['variant_ids['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(options.comments, function (comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  if (options.coupon) {
    fields['cart[coupon]'] = options.coupon;
  }

  return $.post('/cart_items.json', fields);
}
/**
 * Добавление товара в сравнение
 */

ISnew.json.addCompareItem = function (id) {
  var fields = {
    'product[id]': _.toInteger(id)
  };

  return $.post('/compares.json', fields);
};
/*
 * Получение состава корзины
 */

ISnew.json.getCartItems = function () {
  var result = $.Deferred();
  var cookieCart = $.cookie('cart');

  /*
   * В куке состав корзины хранится, если там не более 4х РАЗНЫХ модификаций
   * Кука может быть пустой - дергаем инфу с сервера
   * Если кука содержит строку 'json' - дергаю инфу с сервера
   */
  if (cookieCart && cookieCart != 'json') {
    order = $.parseJSON(cookieCart) || null;
    result.resolve(order);
    // reject??
  } else {
    $.getJSON('/cart_items.json')
      .done(function (order) {
        result.resolve(order);
      })
      .fail(function (response) {
        result.reject(response);
      });
  }

  return result.promise();
};
ISnew.json.getClientInfo = function (){
  return $.getJSON('/client_account/contacts.json');
};
/*
 * Получение информации о коллекции
 */

ISnew.json.getCollection = function () {
  var path = '/collection/'+ _.toString(arguments[0]) +'.json';
  var fields = {};

  _.chain(arguments)
    .drop()
    .compact()
    .each(function (value) {
      _.assign(fields, value)
    })
    .value();

  return $.getJSON(path, fields);
};
/**
 * Добавление товара в сравнение
 */

ISnew.json.getCompareItems = function (id) {

  return $.getJSON('/compares.json');
};
/*
 * Получение информации о товаре
 */

ISnew.json.getProduct = function (id) {
  return $.getJSON('/product_by_id/'+ _.toInteger(id) +'.json', {format: 'json'});
};
/*
 * Получение информации о списке товаров
 */

ISnew.json.getProductsList = function (id_array) {
  // указваем, сколько id нужно отправить за раз
  var query_limit = 25;

  /**
   * Генерим адреса для запросов
   *
   * Приводим к типу массив (мало ли что там прилетело)
   * Разбиваем на пачки, делаем из них правильные адреса для запросов
   */
  var paths = _.chain(id_array)
    .toArray()
    .compact()
    .chunk(query_limit)
    .map(function (ids_list) {
      return '/products_by_id/'+ ids_list.join() +'.json';
    })
    .value();

  // собираем задачи
  var promises = $.map(paths, function (path) {
    return $.ajax(path).then(function (response) {
        return response;
      });
  });

  /**
   * Склеиваем ответы.
   *
   * Проходимся по всем получившимся промисам, дергаем их
   */
  return $.when.apply(this, promises)
    .then(function () {
      /**
       * Получаем ответы ото ВСЕХ промисов.
       * Приводим к типу массив, на случай если ответы все кривые и там - пустота
       * Вытаскиваем массив с продуктами, склеиваем все массивы и выдаем наружу
       */
      return _.chain(arguments)
        .toArray()
        .map(function (response) {
          return response.products;
        })
        .flatten()
        .union()
        .value()
    });
};
/**
 * Оформление заказа
 */

ISnew.json.makeCheckout = function (client, order) {
  console.log(client, order);
  var dfd = $.Deferred();
  var checkout = {
    pid: 1,
    'order[delivery_variant_id]': _.toInteger(order.delivery),
    'order[payment_gateway_id]': _.toInteger(order.payment)
  };

  _.forIn(client, function (value, field) {
    checkout['client['+ field +']'] = value;
  });

  console.log(checkout);

  $.post('/fast_checkout.json', checkout)
    .done(function (response) {
      if (response.status == 'ok') {
        dfd.resolve(response);
      } else {
        dfd.reject(response);
      }
    })
    .fail(function (response) {
      dfd.reject(response)
    })

  return dfd.promise();
};
/*
 * Удаление товара из корзины
 */

ISnew.json.removeCartItem = function (variant_id) {
  var path = '/cart_items/'+ _.toInteger(variant_id) +'.json';
  var fields = {
    '_method': 'delete'
  };

  return $.post(path, fields);
};
/*
 * Удаление товара из сравнения
 */

ISnew.json.removeCompareItem = function (id) {
  var fields = {
      _method: 'delete',
    };
  var path   = '/compares/'+ _.toInteger(id) +'.json';

  return $.post(path, fields);
};
/*
 * Отправление сообщения
 */

ISnew.json.sendMessage = function (input) {
  var result = $.Deferred();
  var message = {};

  _.forIn(input, function (value, key) {
    message['feedback['+ key +']'] = value;
  });

  $.post('/client_account/feedback.json', message)
    .done(function (response) {
      if (message && response.status == 'ok') {
        result.resolve(response);
      } else {
        response.message = message;
        result.reject(response);
      }
    });

  return result.promise();
};
/**
 * Обновление корзины
 */

ISnew.json.updateCartItems = function (items, options) {
  var fields = {
    '_method': 'put'
  };
  options = options || {};

  _.forIn(items, function(quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(options.comments, function(comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  if (options.coupon) {
    fields['cart[coupon]'] = options.coupon;
  }

  return $.post('/cart_items.json', fields);
};
/**
 * OptionSelector
 */
ISnew.OptionSelector = function (product, _owner) {
  var self = this;

  self._init(product, _owner);
}

/**
 * Настройки
 */
ISnew.OptionSelector.prototype._init = function (_product, _owner) {
  var self = this;

  self.selector = {
    product_selector: '[data-product-id="'+ _product.id +'"] [data-option-select]',
    product: 'data-product-id',
    native_select: 'data-product-variants',

    option_selector: 'data-option-selector',
    option: 'data-product-option'
  };

  self._owner = _owner;

  // находим опорный DOM-узел, который описывает товар
  self.$product = $('['+ self.selector.product +'="'+ _product.id +'"]');

  // если DOM-узла нет, выходим
  if (self.$product.length == 0) {
    return;
  }

  // находим там нативный селектор/точку для рендера
  self.$native_select = self.$product.find('['+ self.selector.native_select +']');

  // если нативного селектора нет, выходим
  if (self.$native_select.length == 0) {
    return;
  }

  // создаем контейнер и сохраняем линк на него
  self.$native_select.after('<div class="option-selector" '+ self.selector.option_selector +'/>');
  self.$option_selector = self.$product.find('['+ self.selector.option_selector +']');

  // привязываем экземпляр Класса к товару
  self.$product[0]['OptionSelector'] = self;

  self._renderSelector();

  self._bindSelect(self.selector.product_selector);

  return;
};

/**
 * Основная обертка
 */
ISnew.OptionSelector.prototype._renderSelector = function () {
  var self = this;

  if (Template._lock) {
    setTimeout(function(){
      self._renderSelector();
    }, 300)
  }

  var variants = self._owner.variants;
  var deep = variants.options.length;


  var optionsHTML = '';

  for(var i = 0; i < deep; i++) {
    optionsHTML += self._renderOption({
      option: variants.getOption(i),
      values: variants.getLevel(i)
    });
  }

  self.$option_selector.html(optionsHTML);
};

/**
 * Рендер разметки
 */
ISnew.OptionSelector.prototype._renderOption = function (option) {
  var self = this;

  var optionHTML = '';

  //console.log(option);

  optionHTML = Template.render(option, 'option-select');

  return optionHTML;
};

ISnew.OptionSelector.prototype._bindSelect = function (_productSelector) {
  var self = this;

  $(document).on('click change', _productSelector , function (event) {
    event.preventDefault();

    var $select = $(this);
    var $product = $select.parents('['+ self.selector.product +']:first');
    var OptionSelector = $product[0]['OptionSelector'];

    var option = {
      option_name_id: $select.data('option_name_id'),
      position: $select.data('position-id')
    };

    if ($select.is('select')) {
      option.position = parseInt($select.val());
    }

    OptionSelector._owner.variants.setOption(option);
  });

  EventBus.subscribe('update_variant:insales:product', function (data) {
    var $product = $('['+ self.selector.product +'='+ data.product_id +']');
    var OptionSelector = $product[0]['OptionSelector'];

    if ( OptionSelector ) {
      OptionSelector.$native_select.val(data.id);
      OptionSelector._renderSelector();
    }
  });
};
/**
 * Типы цен
 */
ISnew.ProductPriceType = function (product, _owner) {
  var self = this;
  self._owner = _owner;
  self.variant_id = product.variants[0].id;

  self.price_kinds = self._initPrices(product);

  return self;
};

/**
 * Инициализация
 */
ISnew.ProductPriceType.prototype._initPrices = function (product) {
  var self = this;
  var price_kinds = product.price_kinds;
  var price_types = {};

  _.forEach(product.variants, function (variant) {
    price_types[variant.id] = [];

    price_types[variant.id].push({
      min_quantity: 0,
      price: parseFloat(variant.price)
    });

    _.forEach(variant.prices, function (price, index) {
      price_types[variant.id].push({
        min_quantity: price_kinds[index].value,
        price: parseFloat(variant.prices[index])
      });
    })
  });

  return price_types;
};

/**
 * Обновление после любых действий
 */
ISnew.ProductPriceType.prototype._update = function () {
  var self = this;
  var status = {
    action: 'update_price',
    price: self.getPrice(),
    quantity: self._owner.quantity
  };

  self._owner._updateStatus(status);
  return;
};

/**
 * Получение актуальной цены за штуку
 */
ISnew.ProductPriceType.prototype.getPrice = function () {
  var self = this;
  var price = 0;

  _.forEach(self.price_kinds[self.variant_id], function (price_type) {
    if (self._owner.quantity < price_type.min_quantity) {
      return false;
    }

    price = price_type.price;
  });

  return price;
};

/**
 * Задать актуальное кол-во товара
 */
ISnew.ProductPriceType.prototype.setQuantity = function () {
  var self = this;

  self._update();
  return;
};

/**
 * Выбираем модификацию товара
 */
ISnew.ProductPriceType.prototype.setVariant = function (variant_id) {
  var self = this;
  variant_id = parseInt(variant_id);

  if (self.variant_id == variant_id) {
    return false;
  }

  self.variant_id = variant_id;

  self._update();
  return;
};
/**
 * Product
 */
ISnew.Product = function (product) {
  var self = this;

  if (!product) {
    throw new ISnew.tools.Error('ErrorProduct', 'ошибка в передаче аргумента');
  }

  self._init(product, self);
};

/**
 * Настройки
 */
ISnew.Product.prototype._init = function (_product, _owner){
  var self = this;

  self.product = _product;
  self._owner = _owner;

  self.quantity = 0;
  self.price_kinds = new ISnew.ProductPriceType(_product, _owner);

  if (self._owner._isVariants(_product)) {
    self.variants = new ISnew.ProductVariants(_product, _owner);
    self.OptionSelector = new ISnew.OptionSelector(_product, _owner);
  }
}

/**
 * Обновления состояний товара
 */
ISnew.Product.prototype._updateStatus = function (status) {
  var self = this;

  status.product_id = self.product.id;

  // Если у нас переключался вариант - обновляем тип цен
  if (status.action == 'update_variant') {
    self.price_kinds.setVariant(status.id);
  };

  // Трегирим нужное событие и сбрасываем состояние
  EventBus.publish(status.action +':insales:product', status);
  return;
};

/**
 * Установка кол-ва товара
 */
ISnew.Product.prototype.setQuantity = function (quantity) {
  var self = this;

  self.quantity = parseFloat(quantity);

  self.price_kinds.setQuantity(self.quantity);
  return;
};

/**
 * Проверка на наличие модификаций
 */
ISnew.Product.prototype._isVariants = function (_product) {
  var optionCount = _product.option_names.length;

  return optionCount > 0;
};
/**
 * Variants tree
 */
ISnew.ProductVariants = function (product, _owner) {
  var self = this;
  self._owner = _owner;

  self.variants = product.variants;
  self.tree = self._initTree(product.variants);
  self.options = self._initOptions(product.option_names);

  self._update();
};

/**
 * Строим дерево вариантов
 */
ISnew.ProductVariants.prototype._initTree = function (variants) {
  var self = this;
  var tree = {};

  // Проходимся по вариантам
  _.forEach(variants, function (variant) {
    var variant_id = variant.id;
    var leaf = tree;

    // Разбираем опции
    _.forEach(variant.option_values, function(option, index) {
      var id;
      var isAvailable;

      // Если дошли до последней опции - выставляем вариант и доступность
      if (index == (variant.option_values.length - 1)) {
        id = variant_id;
        isAvailable = variant.available;
      }

      // Если такую опцию мы еще не вносили - вбиваем все, что есть.
      if (!leaf[option.position]) {
        leaf[_.toInteger(option.position)] = {
          id: _.toInteger(option.id),
          tree: {},
          title: option.title,
          variant_id: id,
          position: _.toInteger(option.position)
        };

        // Выставляем доступность
        if( isAvailable !== undefined ){
          leaf[option.position].available = isAvailable;
        };
      }

      leaf = leaf[option.position].tree;
    });
  });

  _.forEach(tree, function (leaf) {
    self._nodeAvailable(leaf);
  });

  return tree;
};

/**
 * Установка доступности вариантов
 *
 * Если все потомки узла недоступны - узел недоступен
 */
ISnew.ProductVariants.prototype._nodeAvailable = function (leaf) {
  var self = this;

  if (leaf.variant_id === undefined) {
    var isAvailable = false;

    _.forEach(leaf.tree, function (child){
      if (self._nodeAvailable(child)) {
        isAvailable = true;
      };
    });

    leaf.available = isAvailable;
  };

  return leaf.available;
};

/**
 * Обновляем состояние вариантов
 */
ISnew.ProductVariants.prototype._update = function () {
  var self = this;
  var status = self.getVariant();

  status.action = 'update_variant';

  self._owner._updateStatus(status);
  return;
};

/**
 * Получить значения с уровня
 */
ISnew.ProductVariants.prototype.getLevel = function (level) {
  var self = this;
  var leaf = self.tree;

  _.forEach(self.options, function(option, option_level) {
    if (level == option_level) {
      return false;
    }
    leaf = leaf[option.selected].tree;
  });

  return leaf;
};

/**
 * Получить первый элемент на уровне
 */
ISnew.ProductVariants.prototype.getFirst = function (leaf) {
  var self = this;

  var first = _.chain(leaf)
    .toArray()
    .first()
    .value();

  return first;
};

/**
 * Получаем выбранный вариант
 */
ISnew.ProductVariants.prototype.getVariant = function () {
  var self = this;
  var branch = _.get(self, self._getSelectedVector());
  var id;

  id = _.findKey(self.variants, function(variant) {
    return variant.id == branch.variant_id;
  });

  return self.variants[id];
};

/**
 * Устанавливаем вариант
 */
ISnew.ProductVariants.prototype.setVariant = function (variant_id) {
  var self = this;

  self._setOptionByVariant(variant_id);

  self._update();
  return;
};

// ====================================================================================

/**
 * Подготовка опций
 */
ISnew.ProductVariants.prototype._initOptions = function (options) {
  var self = this;
  var leaf = self.tree;

  _.forEach(options, function(option, index) {
    var first = self.getFirst(leaf);

    options[index].selected = first.position;
    leaf = first.tree;
  });

  return options;
};

/**
 * Устанавливаем опцию внешним обработчиком.
 * АХТУНГ!!! Влечет обновление актуального варианта!
 */
ISnew.ProductVariants.prototype.setOption = function (option) {
  var self = this;

  var index = _.findKey(self.options, function (_option) {
    return _option.id == option.option_name_id;
  });

  // Если не опцию не меняли - на выход
  if (self.options[index].selected == option.position) {
    return;
  }

  self.options[index].selected = option.position;

  /**
   * Проходим по выбранным опциям и фиксим неприавльно выбранные.
   * Неправильные - если при текущем варианте мы уходм в лес.
   */
  _.forEach(self.options, function (_option, index) {
    var isLeaf = _.get(self, self._getSelectedVector(index + 1));

    // Если мы не можем найти такую ветку - вытаскиваем строение уровня
    // и помечаем первое свойство как выбранное
    if (isLeaf === undefined) {
      var leaf = self.getLevel(index);
      var first = self.getFirst(leaf);

      _option.selected = first.position;
    }
  });

  self._update();
  return;
};

/**
 * Получить опцию
 */
ISnew.ProductVariants.prototype.getOption = function (index) {
  var self = this;

  return self.options[index];
};

/**
 * Установить опции по варианту
 */
ISnew.ProductVariants.prototype._setOptionByVariant = function (variant_id) {
  var self = this;

  var index = _.findKey(self.variants, function (variant) {
    return variant.id == variant_id;
  });

  _.forEach(self.variants[index].option_values, function(option, option_index) {
    self.options[option_index].selected = option.position;
  });

  return;
};

/**
 * генерим путь по выбранным опциям
 */
ISnew.ProductVariants.prototype._getSelectedVector = function (_length) {
  var self = this;
  var vector = '';
  _length = (_length || self.options.length) - 1;

  _.forEach(self.options, function(option, index) {
    vector += '.tree['+ (option.selected) +']';
    if (_length == index) {
      return false;
    }
  });

  return vector;
};
/**
 * Обертка для шаблонизатора
 */

ISnew.Template = function () {
  var self = this;

  self._init(self);
};

/**
 * Вытаскиваем нужный шаблон
 */
ISnew.Template.prototype.render = function (data, template_id) {
  var self = this;

  var templateHtml = self._templateList[template_id];
  var result;

  if (templateHtml !== undefined) {
    result = self._templateList[template_id](data);
  } else {
    result = false;
  }

  return result;
};

/**
 * Складываем шаблоны по местам, подготавливаем для работы
 */
ISnew.Template.prototype.load = function (template_body, template_id) {
  var self = this;

  self._templateList[template_id] = _.template(template_body);

  return;
};

/**
 * Автоматический сбор шаблонов в верстке
 */
ISnew.Template.prototype._init = function (_owner) {
  var self = this;
  self._owner = _owner;

  self._lock = true;
  self._templateList = {};

  $(function () {
    self._templateCount = $('script[data-template-id]').length - 1;
    $('[data-template-id]').each(function (index, el) {
      self.load($(el).html(), $(el).data('templateId'));
      if (self._templateCount === index) {
        self._lock = false;
      }
    });
  });
};

/**
 * Тул для вывода ошибок.
 */
ISnew.tools.Error = function (name, message) {
  var self = this;
  var errorObject = new Error(message);

  errorObject.name = name || 'Ошибка';

  self.name = errorObject.name;
  self.message = errorObject.message;

  if (errorObject.stack) {
    self.stack = errorObject.stack;
  }

  //Вывод в консоль
  self.toString = function() {
   return self.name + ': ' + self.message;
  };
};
/**
 * Класс для работы с валютой.
 */
ISnew.Money = function () {
  var self = this;
};

/**
 * Разбиралка настроек
 */
ISnew.Money.prototype._init = function (params) {
  var self = this;
  self.options = $.parseJSON(params);
  return;
};

ISnew.Money.prototype.set = function (params) {
  var self = this;
  self._init(params);
};

ISnew.Money.prototype.format = function (amount) {
  var self = this;
  var value = amount;
  var patern = /(\d)(?=(\d\d\d)+(?!\d))/g;

  if (amount === null || amount === undefined) {
    return '';
  }

  value = value.toString().replace(',', '.');
  value = parseFloat(value).toFixed(2) || 0;
  value = value.toString().split('.');
  value[0] = value[0].replace(patern, '$1'+ self.options.delimiter);

  if (self.options.show_price_without_cents) {
    value = value[0];
  } else {
    value = value.join(self.options.separator);
  }

  return self.options.format.replace('%n', value).replace('%n', self.options.unit);
};
/**
 * Тул для разбора url.
 */
ISnew.tools.URL = function () {
  var self = this;

  self._init();
};

/**
 * Разбор урла
 */
ISnew.tools.URL.prototype._init = function () {
  var self = this;
  var self = window.location;
  var temp;

  //self.search = self.search;
  self.keys = {};

  _.chain(self.search.replace('?', ''))
    .split('&')
    .forEach(function (part) {
      if (part !== '') {
        part = part.split('=');
        self.keys[part[0]] = part[1];
      }
    })
    .value();

  return;
};

/**
 * Вытаскиваем значение ключа
 */
ISnew.tools.URL.prototype.getKeyValue = function (key) {
  var self = this;

  return self.keys[key];
};