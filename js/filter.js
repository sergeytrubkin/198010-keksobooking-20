'use strict';

(function () {
  window.const.Nodes.MAP_FILTERS.addEventListener('change', function (evt) {
    window.map.updatePins(evt.target.value);
  });
})();
