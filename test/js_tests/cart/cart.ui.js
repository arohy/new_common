$(document).on('click', 'button', function (event) {
  event.preventDefault();
  console.log('click');
});

EventBus.subscribe('always:insales:cart', function (data) {
  console.log(data);
})