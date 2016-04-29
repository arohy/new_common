/**
 * Менеджер задач для корзины
 * Занимается контролем за задачами, склейкой и отправкой
 */
ISnew.CartTasks = function (_owner) {
  var self = this;

  self._owner = _owner;

  self._lock = false;

  self._taskToWork = [];
  self._taskInWork = [];
};

/**
 * Точка входа
 *
 * Если параметр передан, то добавляем таску в очередь.
 *
 * Если нет - пинаем оставшуюся очередь, может прилететь только от CART()!!!
 * После получения ответа от сервера.
 */
ISnew.CartTasks.prototype.send = function (task) {
  var self = this;

  if (task) {
    self._add(task);
  } else {
    self.push();
  }

  return;
};

/**
 * Добавляем таску в очередь
 */
ISnew.CartTasks.prototype._add = function (task) {
  var self = this;

  self._taskToWork.push(task);

  self._push();
  return;
};

/**
 * Пушим очередь на сервер
 */
ISnew.CartTasks.prototype._push = function () {
  var self = this;
  var tasks = self._taskToWork;
  var new_items_set;

  // если залокано запросом - посылаем в утиль
  if (self._lock) {
    return false;
  }

  // не залочен? решаем этот вопрос )
  self._lock = true;

  // перебрасываем накопившиеся таски в обработку
  self._taskInWork = self._taskToWork;
  self._taskToWork = [];

  new_items_set = _.forEach(self._taskToWork, function(task) {

  });

  self._send();
  return;
};

/**
 * Отсылаем на сервак
 */
ISnew.CartTasks.prototype._send = function (task) {
  var self = this;

  return;
};

ISnew.CartTasks.prototype._task = function (task) {
  var self = this;
  var result;
  
  return result;
};