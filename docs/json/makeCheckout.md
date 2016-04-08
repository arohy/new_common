# Оформление заказа

**В корзине должен быть хотя бы один товар**

`makeCheckout(client, order)`

`client` - объект с информацией о покупателе. Поля

* email - почта
* name - имя
* phone - телефон

`order` - объект с информацией о способе доставки и оплаты заказа. Поля

* delivery - id способа доставки
* payment - id способа оплаты

## Пример

````javascript
var client = {
  name: 'Митя Булкин',
  email: 'test@test.ru',
  phone: '+70000000000'
};
var order = {
  delivery: 12000123,
  payment: 1231123
}

ISnew.json.makeCheckout(client, order)
  .done(function (response) {
    console.log('done', response);
  })
  .fail(function (response) {
    console.log('fail', response);
  });
````