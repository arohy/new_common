/*
 * Получение информации о коллекции
 */

ISnew.json.getCollection = function () {
  var URL = new ISnew.tools.URL();
  var path = '/collection/'+ _.toString(arguments[0]) +'.json';
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang
  };
  var result = $.Deferred();

  _.chain(arguments)
    .drop()
    .compact()
    .forEach(function (value) {
      _.assign(fields, value);
    })
    .value();

  $.getJSON(path, fields)
    .done(function (response) {
      _.forEach(response.products, function (product) {
        if (product && _lang) {
          product.url += '?lang='+ _lang;
        }
      });

      result.resolve(response);
    })
    .fail(function (response) {
      result.reject(response);
    })

  return result.promise();
};