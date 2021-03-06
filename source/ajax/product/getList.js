/** @private */
var URL = require('../../tools/url/');
/** @private */
var $ = require('jquery/dist/jquery.min');
/** @private */
var _ = require('lodash');

/**
 * @memberof module:ajaxAPI/product
 * @alias getList
 *
 * @description
 * Получение информации о списке товаров.
 *
 * Важно! Отсутствует поле "подробное описание".
 *
 * @param {array} ids - список id товаров, за раз моно получить информацию не более чем о 100 товарах
 *
 * @return {$.ajax}

 * @example
 * {@lang javascript}
 * ajaxAPI.product.getList([123456,123457,123458,123459])
 *  .done(function (onDone) {console.log('onDone: ', onDone) })
 *  .fail(function (onFail) {console.log('onFail: ', onFail) });
 */

module.exports = function (id_array) {
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    format: 'json'
  };
  // указваем, сколько id нужно отправить за раз
  var query_limit = 25;

  /*
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
    return $.getJSON(path, fields).then(function (response) {
        return response;
      });
  });

  /*
   * Склеиваем ответы.
   *
   * Проходимся по всем получившимся промисам, дергаем их
   */
  return $.when.apply(this, promises)
    .then(function () {
      /*
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
        .forEach(function (product) {
          if (product && _lang) {
            product.url += '?lang='+ _lang;
          }
        })
        .value()
    });
};