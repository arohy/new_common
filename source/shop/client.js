/**
 * Класс для работы с клиентом сайта
 */

ISnew.Client = function (_owner) {
  var self = this;

  self._owner = _owner;

  self._init();
}

/**
 * Инициализация
 */
ISnew.Client.prototype._init = function () {
  var self = this;

  self._get();
};

/**
 * Забираем инфу с сервера
 */
ISnew.Client.prototype._get = function () {
  var self = this;
  var result = $.Deferred();

  ISnew.json.getClientInfo()
    .done(function (response) {
      _.merge(self, response);
      result.resolve(self);
    })
    .fail(function (response) {
      console.log('ISnew.Client: _get: fail: ', response);
      result.reject(response);
    });

  return result.promise();
};

/**
 * Обновление данных
 */
ISnew.Client.prototype.get = function () {
  var self = this;

  return self._get();
};