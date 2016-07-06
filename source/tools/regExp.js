var _ = require('lodash');

module.exports = RegExp = function () {
  var self = this;

  self._toEscape = /[|\\{}()[\]^$+*?.]/g;
}

RegExp.prototype.escape = function (string) {
  var self = this;

  if (!_.isString(string)) {
    console.warn('not string: ', string);
    return false;
  }

  return string.replace(self._toEscape, '\\$&');
};