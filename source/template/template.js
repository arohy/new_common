/**
 * Обертка для шаблонизатора
 */

ISnew.Template = function () {
  var self = this;

  self._init(self);
};

/**
 * Вытаскиваем нужный шаблон
 */
ISnew.Template.prototype.render = function (data, template_id) {
  var self = this;

  var templateHtml = self._templateList[template_id];
  var result;

  if (templateHtml !== undefined) {
    result = self._templateList[template_id](data);
  } else {
    result = false;
  }

  return result;
};

/**
 * Складываем шаблоны по местам, подготавливаем для работы
 */
ISnew.Template.prototype.load = function (template_body, template_id) {
  var self = this;

  self._templateList[template_id] = _.template(template_body);

  return;
};

/**
 * Автоматический сбор шаблонов в верстке
 */
ISnew.Template.prototype._init = function (_owner) {
  var self = this;
  self._owner = _owner;

  //  устанавливаем lock пока не собирем все шаблоны
  self._lock = true;
  self._templateList = {};

  $(function () {
    var templateCount = $('script[data-template-id]').length - 1;

    $('[data-template-id]').each(function (index, el) {

      self.load($(el).html(), $(el).data('templateId'));
      if (templateCount === index) {
        self._lock = false;
      }

    });

  });
};
