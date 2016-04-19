/**
 * Обертка для шаблонизатора
 */

ISnew.Template = function () {
  var self = this;
  self.TemplateList = {};

  self._init();
};

/**
 * Вытаскиваем нужный шаблон
 */
ISnew.Template.prototype.render = function (data, template_id) {
  var self = this;

  return self.TemplateList[template_id](data);
};

/**
 * Складываем шаблоны по местам, подготавливаем для работы
 */
ISnew.Template.prototype.load = function (template_body, template_id) {
  var self = this;

  self.TemplateList[template_id] = _.template(template_body);

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