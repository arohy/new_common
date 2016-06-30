ISnew.json.getClientInfo = function (){
  var URL = new ISnew.tools.URL();
  var fields = {
    lang: URL.getKeyValue('lang')
  };
  var result = $.Deferred();

  $.getJSON('/client_account/contacts.json', fields)
    .done(function (response) {
      switch (response.status) {
        case 'error':
          result.resolve({
            message: response.message,
            url: response.url,
            authorized: false
          });
          break;
        default:
          result.resolve(_.merge(response.client, { authorized: true }));
      }
    })
    .fail(function (response) {
      console.log('json.getClientInfo: fail: ', response);
    });

  return result.promise();
};