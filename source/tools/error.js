/**
 * Тул для вывода ошибок.
 */
var Error = function (name, message) {
  var self = this;
  var errorObject = new Error(message);

  errorObject.name = name || 'Ошибка';

  self.name = errorObject.name;
  self.message = errorObject.message;

  if (errorObject.stack) {
    self.stack = errorObject.stack;
  }

  //Вывод в консоль
  self.toString = function() {
   return self.name + ': ' + self.message;
  };

  return self;
};

module.exports = Error;