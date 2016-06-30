/**
 * Добавление товара в сравнение
 */

ISnew.json.getCompareItems = function (id) {
  var URL = new ISnew.tools.URL();
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang
  };
  var result = $.Deferred();

  $.getJSON('/compares.json', fields)
    .done(function (response) {
      result.resolve(response);
    })
    .fail(function (response) {
      result.reject(response);
    });

  return result.promise();
};