/**
 * @module tools/singletone
 *
 * @description
 * Помощник для создания синглтонов из классов
 *
 * @param {Object} _Class - Класс, из которого делаем сингл
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