'use strict';

(function () {
  var FILTER_ANY = 'any';
  var Nodes = window.const.Nodes;
  var KeyCode = window.const.KeyCode;
  var usersData = [];

  var renderPins = function (users) {
    var activeUsers = users.slice(0, Math.min(users.length, window.const.USER_COUNT));
    var pins = window.utils.createElements(activeUsers, window.pin.createTemplate);
    var cards = window.utils.createElements(activeUsers, window.card.createTemplate);

    for (var i = 0; i < activeUsers.length; i++) {
      window.card.openPopup(pins.children[i], cards.children[i], i);
    }

    Nodes.MAP_PINS_BLOCK.appendChild(pins);
    window.form.activationForm(Nodes.MAP_FILTERS, true);
  };

  // отрисовка меток на карте
  var updatePins = function (filter) {

    if (!usersData.length && !filter) {

      window.backend.load(function (users) {
        usersData = users;
        renderPins(usersData);
      }, function () {});

    } else if (usersData.length && filter) {
      window.pin.remove();
      var filteredUsers = [];

      if (filter === FILTER_ANY) {
        filteredUsers = usersData;
      } else {
        filteredUsers = usersData.filter(function (it) {
          return it.offer.type === filter;
        });

      }
      renderPins(filteredUsers);
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
      window.map.updatePins();
      window.map.activationMap(true);
      window.form.activationForm(Nodes.const.FORM, true);
    }
  };

  window.map = {
    updatePins: updatePins,
    activationMap: activationMap,
    clickMainPinHandler: clickMainPinHandler,
  };
})();
