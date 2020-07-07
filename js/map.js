'use strict';

(function () {
  var Nodes = window.const.Nodes;
  var KeyCode = window.const.KeyCode;

  // функция активация/деактивация карты. *true/false*
  var activationMap = function (stat) {
    var fadedClass = 'map--faded';

    if (stat && Nodes.MAP.classList.contains(fadedClass)) {
      Nodes.MAP.classList.remove(fadedClass);
    } else if (stat && !Nodes.MAP.classList.contains(fadedClass)) {
      return; // выход из функции если карта уже активирована
    } else {
      Nodes.MAP.classList.add(fadedClass);
      Nodes.MAP_PIN_MAIN.addEventListener('keydown', window.map.clickMainPinHandler);
      return;
    }

    Nodes.MAP_PIN_MAIN.removeEventListener('keydown', window.map.clickMainPinHandler);
  };

  // обработчик клика по главной метке
  var clickMainPinHandler = function (evt) {
    if (evt.button === KeyCode.MOUSE_BUTTON_LEFT || evt.keyCode === KeyCode.ENTER && !window.usersData.length) {
      window.form.setAddressPin('move');
      window.pin.addOnMap();
      window.map.activationMap(true);
      window.form.activationForm(Nodes.FORM, true);
    }
  };

  window.map = {
    activationMap: activationMap,
    clickMainPinHandler: clickMainPinHandler,
  };
})();
