ISnew.tools.Image = function (url) {
  var self = this;

  self._init();
}

ISnew.tools.Image.prototype._init = function () {
  var self = this;

  $(function () {
    $('img').on('error', function(event) {
      var $image = $(this);
      var _url = $image.attr('src');

      $image
        .attr('src', self.fixUrl(_url))
        .off('error');
    });
  });
};

/**
 * Исправление url
 */
ISnew.tools.Image.prototype.fixUrl = function (url) {
  var self = this;

  return encodeURI(url);
};