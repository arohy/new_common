# Получение списка сравнения

`getCompareItems()`

Нет входных данных.

Пример.
````javascript
ISnew.json.getCompareItems()
  .done(function (response) {
    console.log('done', response);
  })
  .fail(function (response) {
    console.log('fail', response);
  });
````

Ответ - список товаров в сравнении. Вид - нужно уточнить