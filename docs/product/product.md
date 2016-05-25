# Работа с товаром

Данный класс предоставляет инсрументы для работы с товаром и его свойствами.

* выбор модификации товара
* переключение типов цен

## Инициализация

### Liquid

#### Обязательные атрибуты формы
`data-product-id="{{ product.id }}"` — этот атрибут обязательно ставится в тег `form`. <br>
`data-product-variants` — этот атрибут обязательно ставится в тег `select`.

```liquid
<form action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}">
  {% if product.showVariants? %}
    <select name="variant_id" data-product-variants>
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title | escape }}</option>
      {% endfor %}
    </select>
  {% else %}
    <input type="hidden" name="variant_id" value="{{product.variants.first.id}}" >
  {% endif %}

  <input type="number" name="quantity" value="1" />

  <button cart-item-add class="btn">
    Добавить в корзину
  </button>
</form>
```

### ISnew.Products

Данный класс инициализирует все продукты на сайте с атрибутом data-product-id <br>
Скрипт автоматически проходится по всем формам, через ajax получает информацию о товаре и рисует optionSelector.

```js
var ProductsConfig = {
  initOption: true,
  filtered: true,
  showVariants: true,
  options: {
        'Цвет': 'option-image',
        'Размер': 'option-radio',
        'Материал': 'option-select',
        'Жесткий диск': 'option-span'
      }
  }
var Products = new ISnew.Products(ProductsConfig);
```

### ISnew.Product

Инициализация товара в ручную.

```js
var ProductsConfig = {
  initOption: true,
  filtered: true,
  showVariants: true,
  options: {
        'Цвет': 'option-image',
        'Размер': 'option-radio',
        'Материал': 'option-select',
        'Жесткий диск': 'option-span'
      }
  }
var Product = new ISnew.Product({{ product | json }}, ProductsConfig);
```


## Методы

Наиболее общие методы, необходимые для работы с продуктом:

* `product.setQuantity(quantity)` - указывает выбранное кол-во товара. Вызывает смену типа цен.
* `product.variants.setVariant(variant_id)` - задает модификацию товара. Вызывает смену типа цен.
* `product.variants.getVariant()` - получить информацию о выбраной модификации.
* `product.price_kinds.getPrice()`

Остальные, специальные, методы описаны в документации по переключению модификаций и типов цен.

## OptionSelector

[Шаблоны для селекторов](template.md)

## События

* `update_variant:insales:product`

Срабатывает после изменения модификации. Передает выбранную модификацию.

* `update_price:insales:product`

Срабатывает после смены типа цены. Передает актуальную цену за единицу товара и кол-во товара.