# Получение информации о посетителе сайта

`getClientInfo()`

Входных данных нет.

Пример.
````javascript
ISnew.json.getClientInfo()
  .done(function (response) {
    console.log('done', response);
  })
  .fail(function (response) {
    console.log('fail', response);
  });
````

Ответ.

В случае, если пользователь залогинен, получаем json с актуальной информацией о покупаетеле
````javascript
{
  status: "ok",
  client: {
    // информация о покупателе, его телефон, e-mail и прочее
  }
}
````

В случае, если пользователь не залогинен, получаем
````javascript
{
  status: "error",
  message: "Not authorized",
  url: "/client_account/session/new" // url формы регистрации
}
````