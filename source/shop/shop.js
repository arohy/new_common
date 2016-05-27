/**
 * Класс для работы с Магазином??
 */

ISnew.Shop = function () {
  var self = this;

  self.client = new ISnew.Client(self);

  self._init();
}

ISnew.Shop.prototype._init = function () {
  var self = this;
};

/**
 * Отправка сообщений
 */
ISnew.Shop.prototype.sendMessage = function (message) {
  var self = this;

  return ISnew.json.sendMessage(message);
};