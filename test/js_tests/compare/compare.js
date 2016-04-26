var Compare = new ISnew.Compare({
  //maxItems: 2
});

EventBus.subscribe('init:insales:compares', function (data) {
  //console.log('init:insales:compares', data);
});

EventBus.subscribe('update_items:insales:compares', function (data) {
  //console.log('update_items:insales:compares', data);
});

EventBus.subscribe('add_item:insales:compares', function (data) {
  //console.log('add_item:insales:compares', data);
});

EventBus.subscribe('remove_item:insales:compares', function (data) {
  //console.log('remove_item:insales:compares', data);
});

EventBus.subscribe('overload:insales:compares', function (data) {
  //console.log('overload:insales:compares', data);
});