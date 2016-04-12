/**
 * Event bus
 *
 * Шина событий. Построена на $.Callbacks;
 */

Events = function (id) {
  var id = _.toString(id);
  var Event = id && EventsList[id];
  var callbacks;

  // Если у нас новое событие, создаем его и объявляем в системе.
  if (!Event) {
    // Вешаем флаг того, что во вновь подключенные колбеки будет передана инфа
    callbacks = $.Callbacks('memory');

    // Объявляем методы
    Event = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };

    // Объявляем в системе
    if (id) {
      EventsList[id] = Event;
    }
  }

  return Event;
}