'use strict';

(function () {
  var Nodes = window.const.Nodes;

  window.move = function (evt) {
    evt.preventDefault();

    var pin = Nodes.MAP_PIN_MAIN;
    var pinZIndex = pin.style.zIndex;

    pin.style.zIndex = 10;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var map = Nodes.MAP;
      var coordXMin = Math.floor(-pin.offsetWidth / 2);
      var coordXMax = map.offsetWidth - Math.floor(pin.offsetWidth / 2);
      var coordYMin = window.const.PinLocation.MIN_Y - window.const.Offset.MAIN_PIN_Y;
      var coordYMax = window.const.PinLocation.MAX_Y - window.const.Offset.MAIN_PIN_Y;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var coordX = parseInt(pin.style.left, 10) - shift.x;
      var coordY = parseInt(pin.style.top, 10) - shift.y;

      pin.style.left = window.utils.coordsBetween(coordX, coordXMin, coordXMax) + 'px';
      pin.style.top = window.utils.coordsBetween(coordY, coordYMin, coordYMax) + 'px';

      window.form.setAddressPin('move');
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      pin.style.zIndex = pinZIndex;

      window.map.renderPins();
      window.form.setAddressPin('move');
      window.form.activationForm(true);

      pin.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.map.activationMap(true);

    pin.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
})();
