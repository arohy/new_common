/**
 * ajaxAPI.cart
 */
module.exports = {
  add: require ('./addCartItems'),
  update: require ('./updateCartItems'),
  get: require ('./getCartItems'),
  remove: require ('./removeCartItem'),
};