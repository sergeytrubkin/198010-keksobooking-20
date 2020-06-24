'use strict';

(function () {
  var Nodes = window.const.Nodes;

  Nodes.MAP_PIN_MAIN.addEventListener('mousedown', window.move);
  Nodes.MAP_PIN_MAIN.addEventListener('keydown', window.map.clickMainPinHandler);

  Nodes.FORM.addEventListener('change', window.form.changeFormHandler);
  Nodes.FIELD_CAPACITY.addEventListener('input', window.form.checkCapacityHandler);
  Nodes.FIELD_ROOM.addEventListener('input', window.form.checkCapacityHandler);

  window.form.changeMinPrice(Nodes.FIELD_TYPE.value);
  window.form.setAddressPin('preload');
  window.form.activationForm(false);
})();
