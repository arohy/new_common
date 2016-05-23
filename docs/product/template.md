# Шаблоны селекторов

## Обязательные data атрибуты

`data-option-bind="<%= option.id %>"` — содержит id опции и на этот атрибут вешается EventListener.
`data-value-position="<%= value.position %>"` — содержит поизицию в дереве вариантов.

## Данные доступные в шаблоне

name      | description | property
:-------- |:----------- | :-------
option  | информация о опции  | `handle` — название опции на транслите \. <br> `id` — id опции <br> `position` — позиция в дереве вариантов.<br> `render_type` — id шаблона. <br> `selected` — выбранная в варианте позиция в данной опции <br> `title` — название опции <br> `values` — объект со значениями опции
option.values     | объект со значениями опции | `id` — id значения опции <br> `position` — позиция значения в опции <br> `name` — название значения в lowerCase <br> `option_name_id` — id опции родителя <br> `title` — имя значения опции
images      | объект с картинками продукта | {'белый': {'large_url': 'https://static-eu.insales.ru/**.jpg'}...}
file_url    | объект с картинками из файлов | {'белый': {'https://static-eu.insales.ru/**.jpg'}}
init_option | включена ли в настройках утановка первого доступного варианта? | true/false