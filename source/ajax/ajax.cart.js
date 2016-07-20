/**
 * @module ajaxAPI/cart
 *
 * @description
 * ajax-обертки для работы с корзиной
 */
module.exports = {
  /**
   * @member add
   * @see module:ajaxAPI/cart/add
   */
  add: require ('./cart/add'),
  /**
   * @member update
   * @see module:ajaxAPI/cart/update
   */
  update: require ('./cart/update'),
  /**
   * @member get
   * @see module:ajaxAPI/cart/get
   */
  get: require ('./cart/get'),
  /**
   * @member remove
   * @see module:ajaxAPI/cart/remove
   */
  remove: require ('./cart/remove'),
};