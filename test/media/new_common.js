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

// Список событий и прикрученных колбеков
if (!EventsList) {
  var EventsList = {};
}

if (!Events) {
  var Events;
}
/**
 * Cart
 *
 * Зависит от ISnew.json, Events, ISnew.CartHelper
 */

ISnew.Cart = function () {
  var self = this;
  var json = ISnew.json;
  var cart = {};
  var Helper = new ISnew.CartHelper();

  /**
   * Добавить в корзину заданное кол-во товаров
   *
   * на вход - объект. смотреть доку
   */
  self.add = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'add_items';

    _.forIn(task.items, function(quantity, variant_id) {
      var current_quantity = _.toInteger(current_items[variant_id]) + _.toInteger(quantity);

      current_items[variant_id] = current_quantity;
    });

    self._update(current_items, task);
  };

  /**
   * Удадить из корзины заданное кол-во товаров
   * на вход - объект с парами variant_id: quantity
   */
  self.remove = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'remove_items';

    _.forIn(task.items, function(quantity, variant_id) {
      var current_quantity = _.toInteger(current_items[variant_id]) - _.toInteger(quantity);

      current_items[variant_id] = current_quantity > 0 ? current_quantity : 0;
    });

    self._update(current_items, task);
  };

  /**
   * Устанавливает кол-во товаров в корзине для каждой позиции
   * на вход - объект с парами variant_id: quantity
   */
  self.set = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'set_items';

    _.forIn(task.items, function(quantity, variant_id) {
      current_items[variant_id] = _.toInteger(quantity);
    });

    self._update(current_items, task);
  };

  /**
   * Удалить позиции из корзины
   * на вход - массив с variant_id
   */
  self.delete = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'delete_items';

    _.chain(task.items)
      .toArray()
      .forEach(function(variant_id) {
        current_items[variant_id] = 0;
      })
      .value();

    self._update(current_items, task);
  };

  /**
   * Полностью очистить корзину
   */
  self.clear = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'clear_items';

    _.forIn(current_items, function(quantity, variant_id) {
      current_items[variant_id] = 0;
    });

    self._update(current_items, task);
  };

  /**
   * Получить состав корзины
   */
  self.getOrder = function () {
    return cart;
  };

  /**
   * Получить с сервера состав корзины
   */
  self._get = function () {
    // TODO: изменить на нормальныйую логику после нормолизации ответов json
    var task = {
      method: 'init'
    };
    self._update({}, task);
  };

  /**
   * Обновление состава корзины
   */
  self._update = function (items, task) {
    self._before(task);
    json.updateCartItems(items, task.comments)
      .done(function (response) {
        self._setOrder(response, task);
      })
      .fail(function (response) {
        console.log('cart:update:fail', response);
      })
      .always(function () {
        self._always(task);
      });
  };

  /**
  * Разбирает ответы и сохраняет в var cart
  */
  self._setOrder = function (order, task) {
    var data = {};
    cart = Helper.patch(cart, order);

    data = cart;
    data.action = task;

    if (task && task.method) {
      Events(task.method +':insales:cart').publish(data);
    }

    Events('update_items:insales:cart').publish(data);
  };

  /**
   * Событие ПЕРЕД действием
   */
  self._before = function (task) {
    Events('before:insales:cart').publish(task);
  };

  /**
   * Мы закончили что-то делать в корзине
   */
  self._always = function (task) {
    Events('always:insales:cart').publish(task);
  };

  /**
   * Формируем инфу о позициях
   */
  self._getItems = function () {
    var items = {};

    _.forEach(cart.order_lines, function (item) {
      items[item.variant_id] = item.quantity;
    });

    return items;
  };

  self._get();
}
/**
 * Помощник для корзины
 *
 * Важно разобраться с json и как они построены.
 */

ISnew.CartHelper = function () {
  var self = this;
  var order = {};

  /**
   * Основной метод
   */
  self.patch = function (cart, current_order) {
    order = {};

    order.order_lines = current_order.order_lines || current_order.items;
    order.order_line_comments = current_order.order_line_comments || current_order.order.order_line_comments;

    order.positions_count = order.order_lines.length;
    order.items_count = current_order.items_count;
    order.items_price = [];

    order.total_price = current_order.total_price;

    order.discounts = current_order.discounts;

    self._itemsPrice();
    self._deliveryPrice(current_order);
    self._url();
    self._images();

    //console.log('order:', order);
    _.assign(cart, order);

    //console.log('cart:', cart);
    return cart;
  };

  /**
   * Добавляем поле с ценой только товаров, без доставки
   */
  self._itemsPrice = function () {
    var items_price = 0;
    items_price = _.reduce(order.order_lines, function (sum, item) {
      return sum + item.sale_price;
    }, 0);

    order.items_price = items_price;
    return;
  };

  /**
   * Добавляем цену доставки
   * NOTE: в разных json лежит в разных местах
   */
  self._deliveryPrice = function (current_order) {
    var delivery_price = _.toString(current_order.delivery_price) || _.toString(current_order.order.delivery_price);

    order.delivery_price = parseFloat(delivery_price);

    return;
  };

  /**
   * Фиксим url с учетом языков
   */
  self._url = function () {
    _.forEach(order.order_lines, function (item) {
      //console.log(item);
      // TODO: пока хз. нужен язык
    });
    return;
  };

  /**
   * Фиксим картинки товаров
   */
  self._images = function () {
    _.forEach(order.order_lines, function (item) {
      item.images = item.product.images;
    });
    return;
  }
};
/**
 * Event bus
 *
 * Шина событий. Построена на $.Callbacks;
 */

Events = function (id) {
  var id = _.toString(id);
  var Event = id && EventsList[id];
  var callbacks;

  // Если у нас новое событие, создаем его и объявляем в системе.
  if (!Event) {
    // Вешаем флаг того, что во вновь подключенные колбеки будет передана инфа
    callbacks = $.Callbacks('memory');

    // Объявляем методы
    Event = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };

    // Объявляем в системе
    if (id) {
      EventsList[id] = Event;
    }
  }

  return Event;
}
/*
 * Добавление товара в корзину
 */

/**
 * Принимаем объект
 *
 * Внезапно, если это объект невалидного вида мы все равно получим ответ!!!
 */

ISnew.json.addCartItems = function (items, comments) {
  var fields = {};

  _.forIn(items, function (quantity, variant_id) {
    fields['variant_ids['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(comments, function (comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

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
  return $.getJSON('/product_by_id/'+ _.toInteger(id) +'.json');
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

ISnew.json.updateCartItems = function (items, comments) {
  var fields = {
    '_method': 'put'
  };

  _.forIn(items, function(quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(comments, function(comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  return $.post('/cart_items.json', fields);
};