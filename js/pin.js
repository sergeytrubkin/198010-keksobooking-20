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

  window.pin = {
    createTemplate: createTemplate,
    resetPosition: resetPosition,
    remove: remove,
  };
})();
