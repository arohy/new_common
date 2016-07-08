var _ = require('lodash');

var RegTools = function () {
  var self = this;

  self._toEscape = /[|\\{}()[\]^$+*?.]/g;
}

RegTools.prototype.escape = function (string) {
  var self = this;

  if (!_.isString(string)) {
    console.warn('not string: ', string);
    return false;
  }

  return string.replace(self._toEscape, '\\$&');
};

module.exports = RegTools;