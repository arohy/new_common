/**
 * Обертка для шаблонизатора
 */

ISnew.Template = function () {
  var self = this;
  self.TemplateList = {};

  self.render = function (data, template_id) {
    return self.TemplateList[template_id](data);
  };

  self.load = function (template_body, template_id) {
    self.TemplateList[template_id] = _.template(template_body);

    return;
  };

  console.log('loaded');

  $(function () {
    $('[data-template-id]').each(function () {
      Template.load($(this).html(), $(this).data('templateId'));
    });
  });
};

var Template = new ISnew.Template();