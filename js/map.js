'use strict';

(function () {
  var Nodes = window.const.Nodes;
  var KeyCode = window.const.KeyCode;

  // отрисовка меток на карте
  var renderPins = function () {

    var pinElements = document.querySelectorAll('.map__pin');

    if (!(pinElements.length > 1)) {

      window.backend.load(function (users) {
        var activeUsers = users.slice(window.const.USER_COUNT);

        var pins = window.utils.createElements(activeUsers, window.pin.createTemplate);
        var cards = window.utils.createElements(activeUsers, window.card.createTemplate);

        for (var i = 0; i < activeUsers.length; i++) {
          window.card.openPopup(pins.children[i], cards.children[i], i);
        }

        Nodes.MAP_PINS_BLOCK.appendChild(pins);
        window.form.activationForm(Nodes.MAP_FILTERS, true);
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
      Nodes.MAP_PIN_MAIN.addEventListener('keydown', window.map.clickMainPinHandler);
      return;
    }

    Nodes.MAP_PIN_MAIN.removeEventListener('keydown', window.map.clickMainPinHandler);
  };

  var clickMainPinHandler = function (evt) {
    if (evt.button === KeyCode.MOUSE_BUTTON_LEFT || evt.keyCode === KeyCode.ENTER) {
      window.form.setAddressPin('move');
      window.map.renderPins();
      window.map.activationMap(true);
      window.form.activationForm(Nodes.const.FORM, true);
    }
  };

  window.map = {
    renderPins: renderPins,
    activationMap: activationMap,
    clickMainPinHandler: clickMainPinHandler,
  };
})();
