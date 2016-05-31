ISnew.ProductQuantity = function (_owner) {
  var self = this;

  self._owner = _owner;
  self.selectors = self._owner.selectors;
  self.variant = self._owner.variants.getVariant();

  self.quantity = {
    current: 0,
    toCheck: 0,
    max: 10000000,
    min: 0
  };

  self.unit = 'pce';

  self._init();
};

ISnew.ProductQuantity.prototype._init = function () {
  var self = this;

  self.$input = self._owner.$form.find('['+ self.selectors.quantity +']');

  if (self.variant.quantity) {
    self.quantity.max = self.variant.quantity;
  };

  self.quantity.current = _.toInteger(self.$input.val());
  self.unit = self.variant.unit;

  self._bindEvents();
};

ISnew.ProductQuantity.prototype._setQuantity = function () {
  var self = this;

  self.$input.val(self.quantity.current);
  self._update();
};

ISnew.ProductQuantity.prototype._check = function () {
  var self = this;

  self.quantity.current = self.quantity.toCheck;

  self._setQuantity();
};

ISnew.ProductQuantity.prototype._changeQuantity = function (value) {
  var self = this;

  self.quantity.toCheck += _.toInteger(value);

  self._check();
};

ISnew.ProductQuantity.prototype.setVariant = function (variant) {
  var self = this;
  console.log('set');

  self.variant = variant;
  self._check();
};

ISnew.ProductQuantity.prototype._update = function () {
  var self = this;

  var status = _.cloneDeep(self);

  status.action = {
    method: 'change_quantity',
    quantity: self.quantity,
    input: self.$input
  };

  self._owner._updateStatus(status);
};

ISnew.ProductQuantity.prototype._bindEvents = function () {
  var self = this;

  if (document.ProductQuantity) {
    return false;
  };

  self._bindQuantityButtons();

  document.ProductQuantity = true;
};

ISnew.ProductQuantity.prototype._bindQuantityButtons = function () {
  var self = this;

  // слушаем клики на +-
  $(document).on('click', '['+ self.selectors.quantityButton +']', function (event) {
    event.preventDefault();

    var $quantityButton = $(this);
    var product = $quantityButton.parents('['+ self.selectors.product+']')[0].product;

    product.quantity._changeQuantity($quantityButton.data('quantity-change'));
  });
};

ISnew.ProductQuantity.prototype.get = function () {
  var self = this;

  return self.quantity.current;
};