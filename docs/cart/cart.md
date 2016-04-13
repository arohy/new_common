# Корзина. Логика и взаимодействие с сервером.

* [Добавление товаров](#add)
* [Полное удаление товаров](#delete)
* [Удаление кол-ва товаров](#remove)
* [Задание состава](#set)
* [Получение актуального состава корзины](#getOrder)
* [Объект options](#options)
* [События](#events)

Объявление глобального объекта.

`var Cart = new ISnew.Cart();`

Делается один раз. Вся работа с корзиной происходит через данный объект.

## <a name="add"></a>Добавление товаров

`Cart.add(items, options);`

items - объект со списком добавляемых модификаций товаров и их кол-во

````javascript
{
  variant_id: quantity,
  variant_id: quantity,
  variant_id: quantity
}
````

**Важно**

Если данная модификация присутствует в корзине, то ее кол-во увеличится на указанное число.

**Вызывает события**

* `add_items:insales:cart` - товар добавлен
* `update_items:insales:cart` - состав корзины обновлен

## <a name="delete"></a>Полное удаление товаров

`Cart.delete(items, options);`

items - массив с модификациями удаляемых товаров

````javascript
[
  variant_id,
  variant_id,
  variant_id
]
````

**Вызывает события**

* `delete_items:insales:cart`
* `update_items:insales:cart`

## <a name="remove"></a>Удаление кол-ва товаров

`Cart.remove(items, options);`

items - объект со списком модификаций товаров и удаляемым кол-вом

````javascript
{
  variant_id: quantity,
  variant_id: quantity,
  variant_id: quantity
}
````

**Важно**

Если в результате уменьешния кол-во товаров в позиции упадет до 0, то позиция будет удалена.

**Вызывает события**

* `remove_items:insales:cart`
* `update_items:insales:cart`

## <a name="set"></a>Задание состава

`Cart.set(items, options);`

items - объект со списком модификаций товаров и устанавливаемым кол-вом для данной позиции

````javascript
{
  variant_id: quantity,
  variant_id: quantity,
  variant_id: quantity
}
````

**Вызывает события**

* `set_items:insales:cart`
* `update_items:insales:cart`

## <a name="getOrder"></a>Получение актуального состава корзины

`order = Cart.getOrder();`

Возвращает объект с актуальным составом корзины, применившимися скидками.

## <a name="options"></a>Объект options

Каждый метод принимает необязательный объект options, в который возможно добавить кастомные поля. Данный объект пройдет через всю обработку и будет выдан в любом событии внутри поля action.

Например, мы хотим удалить товар из корзины и после обработки запроса удалить кусок разметки

````html
<div class="wrapper">
  <button class="button js-cart-remove_item" data-item-id="123456789">Удали меня!</button>
</div>
````

````javascript
// Объявляем обработку нажатия на кнопку
$('.js-cart-remove_item').on('click', function (e) {
  var options = {target: $(this)};
  var items = [$(this).data('item-id')];

  Cart.delete(items, options);
});

// Обработка события "товар удален"
Events('delete_items:insales:cart').subscribe(function (data) {
  // вытаскиваем из ответа цель, которая вызвала текущую задачу
  var $target = data.action.target;

  $target.parents('.wrapper')
    .remove();
});
````

## <a name="events"></a>События

Все события возвращают объект. Данный объект всегда содержит поле action, котрый содержит options (если задавался при вызове метода корзины) и поля

* method - указывает, что делали с корзиной
* items - входной список, который передавали в метод корзины.

Список событий

* `before:insales:cart` - всегда срабатывает перед любыми действиями с корзиной
* `add_items:insales:cart` - срабатывает после успешного добавления товаров в корзину
* `remove_items:insales:cart` - срабатывает после успешного уменьшения кол-ва товаров в корзине
* `delete_items:insales:cart` - срабаотывает после успешного удаления позиций из корзины
* `set_items:insales:cart` - срабатывает после успешного задания состава корзины
* `update_items.insales:cart` - всегда срабатывает после любого успешного действия с корзиной
* `always:insales:cart` - всегда срабатывает после любого действия с корзиной