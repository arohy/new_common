/**
 * Сравнение товаров
 */

ISnew.Compare = function (options) {
  options = options || {};

  var self = this;
  self.products = [];
  self.maxItems = options.maxItems || 4;

  // Обновляемся
  self._update();
};

/**
 * Добавляем товар
 */
ISnew.Compare.prototype.add = function (task) {
  var self = this;

  task.id = parseInt(task.id);
  task.method = 'add_item';

  // если достигли максимального кол-ва товаров
  // кидаем остановку
  if (self.products.length >= self.maxItems) {
    task.method = 'overload';
    self._events(task);

    return;
  } else {
    self._before(task);
    ISnew.json.addCompareItem(task.id)
      .done(function (response) {
        self._update(task);
      })
      .fail(function (response) {
        console.log('fail: ', response);
        // Завернуто сюда, потому что в done идет ещё один
        // ajax запрос. Нужно сделать удобные ответы на эти запросы
        self._always(task);
      });
  }
};

/**
 * Удаляем товар
 */
ISnew.Compare.prototype.remove = function (task) {
  var self = this;

  task.id = parseInt(task.id);
  task.method = 'remove_item';

  self._before(task);
  ISnew.json.removeCompareItem(task.id)
    .done(function (response) {
      self._update(task);
    })
    .fail(function (response) {
      console.log('fail: ', response);
      // Завернуто сюда, потому что в done идет ещё один
      // ajax запрос. Нужно сделать удобные ответы на эти запросы
      self._always(task);
    });
};

/**
 * Обновляем состояние сравнения
 */
ISnew.Compare.prototype.update = function () {
  var self = this;

  self._update({
    method: 'update_items'
  });
};

/**
 * Получение актуальной инфы с сервера
 */
ISnew.Compare.prototype._update = function (task) {
  var self = this;

  task = task || {};
  task.method = task.method || 'init';

  if (task.method == 'init' || task.method == 'update_items') {
    self._before(task);
  }

  ISnew.json.getCompareItems()
    .done(function (response) {
      self.products = response.products;
      self._events(task);
    })
    .fail(function (response) {
      console.log('fail: ', response);
    })
    .always(function () {
      self._always(task);
    });
};

/**
 * Вызов событий
 */
ISnew.Compare.prototype._events = function (task) {
  var self = this;
  var data = self;
  data.action = task;
  Events(task.method +':insales:compares').publish(data);

  if (data.action.method != 'update_items' && data.action.method != 'overload') {
    Events('update_items:insales:compares').publish(data);
  }
};

/**
 * Событие ПЕРЕД действием
 */
ISnew.Compare.prototype._before = function (task) {
  Events('before:insales:compares').publish(task);
};

/**
 * Мы закончили что-то делать в сравнении
 */
ISnew.Compare.prototype._always = function (task) {
  Events('always:insales:compares').publish(task);
};