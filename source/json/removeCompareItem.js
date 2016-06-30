/*
 * Удаление товара из сравнения
 */

ISnew.json.removeCompareItem = function (id) {
  var URL = new ISnew.tools.URL();
  var fields = {
    lang: URL.getKeyValue('lang'),
      _method: 'delete',
    };
  var path   = '/compares/'+ _.toInteger(id) +'.json';

  return $.post(path, fields);
};