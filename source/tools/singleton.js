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