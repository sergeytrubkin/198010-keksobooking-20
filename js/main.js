'use strict';

(function () {
  var Nodes = window.const.Nodes;

  Nodes.MAP_PIN_MAIN.addEventListener('mousedown', window.move);
  Nodes.MAP_PIN_MAIN.addEventListener('keydown', window.map.clickMainPinHandler);

  Nodes.MAP_FILTERS.addEventListener('change', window.filter.filterChangeHandler);

  Nodes.FORM.addEventListener('change', window.form.changeFormHandler);
  Nodes.FORM.addEventListener('submit', window.form.submitHandler);
  Nodes.FORM_BUTTON_RESET.addEventListener('click', window.form.resetPage);
  Nodes.FIELD_CAPACITY.addEventListener('input', window.form.checkCapacityHandler);
  Nodes.FIELD_ROOM.addEventListener('input', window.form.checkCapacityHandler);

  window.form.changeMinPrice(Nodes.FIELD_TYPE.value);
  window.form.setAddressPin('preload');
  window.form.activationForm(Nodes.FORM, false);
  window.form.activationForm(Nodes.MAP_FILTERS, false);
})();
