# Сравнение товаров

`var Compare = new ISnew.Compare(options)`

`options` - объект с настройками

* maxItems - максимальное кол-во товаров в сравнении. Предел равен 10 (ограничение на стороне платформы). По-умолчанию - 4.

## Входные данные

Каждый метод принимает объект (здесь и далее - входной параметр `task`) состояший из полей

* id - id товара.
* кастомные поля, содержащие дополнительную информацию.

Данный объект пройдет через всю обработку и будет выдан в любом событии внутри поля action.

Например, мы хотим удалить товар из списка сравнения и после обработки запроса удалить кусок разметки

````html
<div class="wrapper">
  <button class="button js-compare-remove_item" data-item-id="123456789">Удали меня!</button>
</div>
````

````javascript
// Объявляем обработку нажатия на кнопку
$('.js-compare-remove_item').on('click', function (e) {
  var task = {
    item: [$(this).data('item-id')],
    target: $(this)
  }
  Compare.remove(task);
});

// Обработка события "товар удален"
Events('remove_item:insales:compares').subscribe(function (data) {
  // вытаскиваем из ответа цель, которая вызвала текущую задачу
  var $target = data.action.target;

  $target.parents('.wrapper')
    .remove();
});
````

## Добавить товар

`Compare.add(task)`.

## Удалить товар

`Compare.remove(task)`

## Обновить состав

`Compare.update()`

## Получить актуальный состав

`Compare.getCompare()`

## События

* 'init:insales:compares' - вызывается при инициализации сравнения.
* 'before:insales:compares' - вызывается перед любым действием.
* 'add_item:insales:compares' - вызывается после удачного добавления товара в сравнение.
* 'remove_item:insales:compares' - вызывается после удачного удаления товара из сравнения.
* 'update_items:insales:compares' - вызывается после любой успешной операции.
* 'overload:insales:compares' - вызывается, если кол-во товаров в сравнении перышает лимит.
* 'always:insales:compares' - вызывается после любого действия со сравнением.