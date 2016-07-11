/**
 * Модуль, объединяющий весь ajax
 */

module.exports = {
  cart: require('./ajax.cart'),
  compare: require('./ajax.compare'),
  propduct: require('./ajax.product'),
  checkout: require('./ajax.checkout'),
  collection: require('./ajax.collection'),
  shop: require('./ajax.shop'),
};