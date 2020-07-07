'use strict';

(function () {
  var Nodes = window.const.Nodes;
  var Offset = window.const.Offset;

  // создание шаблона метки
  var createTemplate = function (user) {
    var pin = Nodes.MAP_PIN_TEMPLATE.cloneNode(true);

    pin.style.left = (user.location.x - Offset.MAP_PIN_X) + 'px';
    pin.style.top = (user.location.y - Offset.MAP_PIN_Y) + 'px';

    var pinImage = pin.querySelector('img');
    pinImage.src = user.author.avatar;
    pinImage.alt = user.offer.title;

    return pin;
  };

  // сброс положения главной метки
  var resetPosition = function () {
    Nodes.MAP_PIN_MAIN.style.left = window.const.PinLocation.MAIN_LEFT + 'px';
    Nodes.MAP_PIN_MAIN.style.top = window.const.PinLocation.MAIN_TOP + 'px';
  };

  // отрисовка меток на карте
  var render = function (users) {
    var activeUsers = users.slice(0, Math.min(users.length, window.const.USER_COUNT));
    var pins = window.utils.createElements(activeUsers, window.pin.createTemplate);
    var cards = window.utils.createElements(activeUsers, window.card.createTemplate);

    for (var i = 0; i < activeUsers.length; i++) {
      window.card.openPopup(pins.children[i], cards.children[i], i);
    }

    Nodes.MAP_PINS_BLOCK.appendChild(pins);
    window.form.activationForm(Nodes.MAP_FILTERS, true);
  };

  var remove = function () {
    var pins = document.querySelectorAll('.map__pin');
    var card = document.querySelector('.map__card');

    Array.from(pins).forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });

    if (card) {
      card.remove();
    }
  };

  // var onError = function (message) {
  //   console.log(message);
  // };

  var onSuccess = function (users) {
    window.usersData = users;
    render(window.usersData);
  };

  var addOnMap = function () {

    if (!window.usersData.length) {
      window.backend.load(onSuccess, function () {});
    }
  };

  window.pin = {
    createTemplate: createTemplate,
    resetPosition: resetPosition,
    render: render,
    remove: remove,
    addOnMap: addOnMap,
  };
})();
