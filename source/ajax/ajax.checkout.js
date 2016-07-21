/**
 * @module ajaxAPI/checkout
 *
 * @description
 * Ajax-обертки для работы с оформлением заказа
 */
module.exports = {
  order: require ('./checkout/order'),
  quick: require ('./checkout/quick'),
};