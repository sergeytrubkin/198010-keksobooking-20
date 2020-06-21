'use strict';

window.pin = (function () {
  var Nodes = window.const.Nodes;
  var Offset = window.const.Offset;

  // создание шаблона метки
  var createPinTemplate = function (user) {
    var pin = Nodes.MAP_PIN_TEMPLATE.cloneNode(true);

    pin.style.left = (user.location.x - Offset.MAP_PIN_X) + 'px';
    pin.style.top = (user.location.y - Offset.MAP_PIN_Y) + 'px';

    var pinImage = pin.querySelector('img');
    pinImage.src = user.author.avatar;
    pinImage.alt = user.offer.title;

    return pin;
  };

  return {
    createPinTemplate: createPinTemplate,
  };
})();
