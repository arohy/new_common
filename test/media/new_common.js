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
 */

ISnew.Cart = function (options) {
  var self = this;
  var json = ISnew.json;
  var cart = {};

  // Обновить корзину и дернуть события
  self.reload = function () {
    json.getCartItems()
      .done(function (response) {
        console.log('cart:reload:done', response);
        cart = response;
      })
      .fail(function (response) {
        console.log('cart:reload:fail', response);
      });
  };

  // Добавить товар в корзину и дернуть события
  self.add = function (items) {
    json.addCartItems(items)
      .done(function (response) {
        console.log('cart:add:done', response);
      })
      .fail(function (response) {
        console.log('cart:add:fail', response);
      })
  };

  // Удалить товар из корзины и дернуть события
  self.remove = function (item) {

  };

  // Изменить состав корзины и дернуть события
  self.update = function () {

  };

  // получить информацию о заказе
  self.getOrder = function () {

  }

  // обновить информацию о заказе
  self.setOrder = function (order) {

  }
}
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

ISnew.json.addCartItems = function (items) {
  var fields = {};

  _.forIn(items, function (quantity, variant_id) {
    fields['variant_ids['+ variant_id +']'] = quantity;
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
}
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
}
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
}
/**
 * Добавление товара в сравнение
 */

ISnew.json.getCompareItems = function (id) {

  return $.getJSON('/compares.json');
}
/*
 * Получение информации о товаре
 */

ISnew.json.getProduct = function (id) {
  return $.getJSON('/product_by_id/'+ _.toInteger(id) +'.json');
}
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
}
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
}
/*
 * Удаление товара из корзины
 */

ISnew.json.removeCartItem = function (variant_id) {
  var path = '/cart_items/'+ _.toInteger(variant_id) +'.json';
  var fields = {
    '_method': 'delete'
  };

  return $.post(path, fields);
}
/*
 * Удаление товара из сравнения
 */

ISnew.json.removeCompareItem = function (id) {
  var fields = {
      _method: 'delete',
    };
  var path   = '/compares/'+ _.toInteger(id) +'.json';

  return $.post(path, fields);
}
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

ISnew.json.updateCartItems = function (items) {
  var fields = {
    '_method': 'put'
  };

  _.forIn(items, function(quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = quantity;
  });

  return $.post('/cart_items.json', fields);
}