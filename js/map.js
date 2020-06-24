'use strict';

(function () {
  var Nodes = window.const.Nodes;
  var KeyCode = window.const.KeyCode;

  // отрисовка меток на карте
  var renderPins = function () {

    var pinElements = document.querySelectorAll('.map__pin');

    if (!(pinElements.length > 1)) {

      window.load(function (users) {
        var pins = window.utils.createElements(users, window.pin.createTemplate);
        var cards = window.utils.createElements(users, window.card.createTemplate);

        for (var i = 0; i < users.length; i++) {
          window.card.openPopup(pins.children[i], cards.children[i], i);
        }

        Nodes.MAP_PINS_BLOCK.appendChild(pins);

      }, function () {});

    } else {
      return;
    }
  };

  // функция активация/деактивация карты. *true/false*
  var activationMap = function (stat) {
    var fadedClass = 'map--faded';

    if (stat && Nodes.MAP.classList.contains(fadedClass)) {
      Nodes.MAP.classList.remove(fadedClass);
    } else if (stat && !Nodes.MAP.classList.contains(fadedClass)) {
      return; // выход из функции если карта уже активирована
    } else {
      Nodes.MAP.classList.add(fadedClass);
    }

    Nodes.MAP_PIN_MAIN.removeEventListener('keydown', window.map.clickMainPinHandler);
  };

  var clickMainPinHandler = function (evt) {
    if (evt.button === KeyCode.MOUSE_BUTTON_LEFT || evt.keyCode === KeyCode.ENTER) {
      window.form.setAddressPin('move');
      window.map.renderPins();
      window.map.activationMap(true);
      window.form.activationForm(true);
    }
  };

  window.map = {
    renderPins: renderPins,
    activationMap: activationMap,
    clickMainPinHandler: clickMainPinHandler,
  };
})();
