/*
 * Получение информации о коллекции
 */

ISnew.json.getCollection = function () {
  var URL = new ISnew.tools.URL();
  var path = '/collection/'+ _.toString(arguments[0]) +'.json';
  var fields = {
    lang: URL.getKeyValue('lang')
  };

  _.chain(arguments)
    .drop()
    .compact()
    .each(function (value) {
      _.assign(fields, value);
    })
    .value();

  return $.getJSON(path, fields);
};