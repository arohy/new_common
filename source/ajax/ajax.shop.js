/**
 * @module ajaxAPI/shop
 *
 * @description
 * Ajax-обертки для работы с функиционалом магазина
 */
module.exports = {
  message: require ('./message/send'),
  client: require ('./client/get'),
}