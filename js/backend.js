'use strict';

(function () {
  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking',
  };
  var StatusCode = {
    OK: 200,
  };
  var Method = {
    LOAD: 'GET',
    UPLOAD: 'POST',
  };
  var TIME_IN_MS = '1000';

  var connectToServer = function (onSuccess, onError, method, url, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    connectToServer(onSuccess, onError, Method.LOAD, Url.LOAD);
  };

  var upload = function (onSuccess, onError, data) {
    connectToServer(onSuccess, onError, Method.UPLOAD, Url.UPLOAD, data);
  };

  window.backend = {
    load: load,
    upload: upload,
  };
})();
