ISnew.ProductQuantity = function (_owner) {
  var self = this;

  self._owner = _owner;
  self.settings = _owner.settings;
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

  if (self.variant.quantity && self.settings.max) {
    self.quantity.max = self.variant.quantity;
  };

  if (self.settings.quantity == 'int') {
    self.quantity.min = 1;
  }

  self.quantity.toCheck = self._getQuantity();

  self.unit = self.variant.unit;

  self._check();
  self._bindEvents();
};

ISnew.ProductQuantity.prototype._getQuantity = function () {
  var self = this;

  return parseFloat(self.$input.val());
};

ISnew.ProductQuantity.prototype._changeQuantity = function (value) {
  var self = this;

  self.quantity.toCheck += parseFloat(value);

  self._check();
};

ISnew.ProductQuantity.prototype.setVariant = function (variant) {
  var self = this;

  self.variant = variant;
  self._check();
};

ISnew.ProductQuantity.prototype._setQuantity = function () {
  var self = this;

  self.quantity.toCheck = self._getQuantity();

  self._check();
};

ISnew.ProductQuantity.prototype._check = function () {
  var self = this;

  if (self.settings.max && self.quantity.toCheck > self.quantity.max) {
    self.quantity.toCheck = self.quantity.max;
  }

  if (self.quantity.toCheck < self.quantity.min) {
    self.quantity.toCheck = self.quantity.min;
  }

  self.quantity.current = self.quantity.toCheck;
  self.$input.val(self.quantity.current);

  self._update();
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

  // очередной костыль в мой гроб
  if (document.ProductQuantity) {
    return false;
  };

  self._bindQuantityButtons();
  self._bindQuantityInput();

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

ISnew.ProductQuantity.prototype._bindQuantityInput = function () {
  var self = this;

  $(document).on('change blur', '['+ self.selectors.quantity +']', function (event) {
    event.preventDefault();
    console.log('blur');

    var $quantity = $(this);
    var product = $quantity.parents('['+ self.selectors.product+']')[0].product;

    product.quantity._setQuantity($quantity.val());
  });
};