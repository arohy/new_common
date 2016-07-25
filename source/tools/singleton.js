/**
 * @module tools/singletone
 *
 * @private
 *
 * @description
 * Помощник для создания синглтонов из классов
 *
 * @param {Object} _Class - Класс, из которого делаем сингл
 *
 * @return {Object} Экземпляр класса _Class
 */
module.exports = function (_Class) {
  var instance;

  return {
    getInstance: function () {
      if (!instance) {
        instance = new _Class();
      }

      return instance;
    }
  };
};