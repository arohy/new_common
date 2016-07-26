/**
 * @module ajaxAPI/cart
 *
 * @description
 * Ajax-обертки для работы с корзиной
 */
module.exports = {
  add: require ('./cart/add'),
  update: require ('./cart/update'),
  get: require ('./cart/get'),
  remove: require ('./cart/remove'),
};