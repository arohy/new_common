/*
 * Инициализация переменных
 */

if (!ISnew) {
  var ISnew = {};
}

if (!Site) {
  var Site = {};
}

if (!ISnew.json) {
  ISnew.json = {};
}
/*
 * Получение информации о товаре
 */

if (!ISnew.json) {
  ISnew.json = {}
};

ISnew.json.getProduct = function (id) {
  var path = '/product_by_id/'+ id +'.json';

  return $.getJSON(path);
}
/*
 * Получение информации о списке товаров
 */

if (!ISnew.json) {
  ISnew.json = {}
};

ISnew.json.getProductsList = function(id_array) {
  var end = 0;
  var paths = [];
  var ids = [];
  var productsList;

  /*
   * хелпер для склейки результатов
   * target - целевой массив
   * from - массив из ответа
   */
  var concatHelper = function(target, from) {
    // делаем проверку, к нам пришло описание одного товара или пачки
    // console.log(from);
    if (from.product) {
      target.push(from.product);
    } else {
      $.each(from.products, function(index, value) {
        target.push(value);
      });
    }

    return target;
  };

  // если у водной массив вообще не задан - превращаем его в тыкву.
  // В результате нам все равно нужен Deferred объект ответа
  if (id_array === null) {
    id_array = [];
  }

  // Распиливаем входной массив на пачки по 25 id'ника
  paths = id_array.reduce(function(p, c, i) {
    if (i % 25 === 0) {
      p.push([]);
    }

    p[p.length - 1].push(c);
    return p;
  }, []);

  // и генерим массив путей для json
  $.each(paths, function(index, id_list) {
    paths[index] = '/products_by_id/'+ id_list.join() +'.json';
  });

  // собираем задачи
  promises = $.map(paths, function(path) {
    var temp = $.ajax(path).then(function(response) {
        return response;
      });

    return temp;
  });

  // в качель. микро чит. максимум в запрос - 100 товаров
  // ну кто еще хочет забрать инфу о более чем 100 товарах,
  // если в шаблон коллекции за раз отдается максимум 100??
  // склеиваем ответы
  productsList = $.when.apply(this, promises)
    .then(function(response_1, response_2, response_3, response_4) {
      var result = {
        products: []
      };

      //console.log( response_1, response_2, response_3, response_4 );
      if (response_1) {
        result.products = concatHelper(result.products, response_1);
      }

      if (response_2) {
        result.products = concatHelper(result.products, response_2);
      }

      if (response_3) {
        result.products = concatHelper(result.products, response_3);
      }

      if (response_4) {
        result.products = concatHelper(result.products, response_4);
      }

      return result;
    });

  return productsList;
}