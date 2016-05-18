/**
 * Тул валидации настроек продукта
 */
ISnew.tools.Setting = function () {
  var self = this;
};

ISnew.tools.Setting.prototype.validate = function (_settings) {
  var self = this;

  var thisSettings = _settings || {};

  if (!thisSettings.product_id) {
    thisSettings.product_id = 'product-id'
  }

  if (typeof thisSettings.show_variants === 'undefined') {
    thisSettings.show_variants = true;
  }

  if (typeof thisSettings.init_option === 'undefined') {
    thisSettings.init_option = true;
  }

  if (typeof thisSettings.validate === 'undefined') {
    thisSettings.validate = true;
  }

  return thisSettings;
}