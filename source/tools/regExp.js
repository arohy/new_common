ISnew.tools.RegExp = function () {
  var self = this;

  self._toEscape = /[|\\{}()[\]^$+*?.]/g;
}

ISnew.tools.RegExp.prototype.escape = function (string) {
  var self = this;

  if (!_.isString(string)) {
    console.warn('not string: ', string);
    return false;
  }

  return string.replace(self._toEscape, '\\$&');
};