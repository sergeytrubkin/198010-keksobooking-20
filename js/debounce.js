'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    var timeout;

    return function () {
      var cbCall = function () {
        cb.apply(null, arguments);
      };

      clearTimeout(timeout);

      timeout = setTimeout(cbCall, DEBOUNCE_INTERVAL);
    };
  };
})();
