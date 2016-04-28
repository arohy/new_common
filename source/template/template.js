/**
 * Обертка для шаблонизатора
 */

ISnew.Template = function () {
  var self = this;
  self._templateList = {};

  self._init();
};

/**
 * Вытаскиваем нужный шаблон
 */
ISnew.Template.prototype.render = function (data, template_id) {
  var self = this;
  var template = self._templateList[template_id];
  var result;

  if (template !== undefined) {
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
ISnew.Template.prototype._init = function () {
  var self = this;

  $(function () {
    $('[data-template-id]').each(function () {
      self.load($(this).html(), $(this).data('templateId'));
    });
  });
};