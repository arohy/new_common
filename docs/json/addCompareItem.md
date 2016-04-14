# Добавление товара в сравнение

`addCompareItem(id)`

Добавляет товар с указанным id в список

````javascript
ISnew.json.addCompareItem(123456)
  .done(function (response) {
    console.log('done', response);
  })
  .fail(function (response) {
    console.log('fail', response);
  });
````

Ответ
````javascript
{
  status: "ok"
}
````