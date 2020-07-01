'use strict';

(function () {
  var Nodes = window.const.Nodes;
  var Offset = window.const.Offset;
  var MinPriceForNight = window.const.MinPriceForNight;
  var Capacity = window.const.Capacity;
  var Rooms = window.const.Rooms;
  var ClassName = {
    SUCCESS: 'success',
    ERROR: 'error',
  };

  // получение адреса метки *'preload'/'move'*
  var getLocationPin = function (stat) {
    var location = '';
    var pin = Nodes.MAP_PIN_MAIN;
    var pinOffsetX = parseInt(pin.style.left, 10);
    var pinOffsetY = parseInt(pin.style.top, 10);
    var pinWidth = pin.offsetWidth;
    var pinHeight = pin.offsetHeight;

    switch (stat) {
      case 'preload':
        var pinLocationX = pinOffsetX + pinWidth / 2;
        var pinLocationY = pinOffsetY + pinHeight / 2;
        break;
      case 'move':
        pinLocationX = pinOffsetX + pinWidth / 2;
        pinLocationY = pinOffsetY + Offset.MAIN_PIN_Y;
        break;
    }

    location = '' + Math.floor(pinLocationX) + ' , ' + Math.floor(pinLocationY);

    return location;
  };

  // функция подстановки адреса метки в поле формы *'preload'/'move'*
  var setAddressPin = function (stat) {
    var address = getLocationPin(stat);
    Nodes.FIELD_ADDRESS.value = address;
  };

  // определение минимальной стоимости в зависимости от типа жилья
  var changeMinPrice = function () {
    var type = document.querySelector('#type').value;
    var pricePerNight = MinPriceForNight[type];
    Nodes.FIELD_PRICE.min = pricePerNight;
    Nodes.FIELD_PRICE.placeholder = pricePerNight;
  };


  // функция установки даты въезда/выезда
  var changeTimeCheck = function (evt) {
    var timein = Nodes.FIELD_TIMEIN.value;
    var timeout = Nodes.FIELD_TIMEOUT.value;

    if (evt.target === Nodes.FIELD_TIMEIN) {
      Nodes.FIELD_TIMEOUT.value = timein;
    } else if (evt.target === Nodes.FIELD_TIMEOUT) {
      Nodes.FIELD_TIMEIN.value = timeout;
    }
  };

  // валидация полей количества комнат и гостей
  var checkCapacityHandler = function () {
    var roomNumber = parseInt(Nodes.FIELD_ROOM.value, 10);
    var capacityNumber = parseInt(Nodes.FIELD_CAPACITY.value, 10);
    var message = '';

    if (capacityNumber > roomNumber && capacityNumber > 0) {
      message = 'количество мест должно быть меньше либо равно количеству комнат';
    } else if (roomNumber === Rooms.NOT_GUEST && capacityNumber > Capacity.MIN) {
      message = 'такое количество комнат наверное не для гостей';
    } else if (capacityNumber === Capacity.MIN && roomNumber < Rooms.NOT_GUEST) {
      message = 'Для данного количества комнат необходимо выбрать количество мест';
    } else {
      message = '';
    }

    Nodes.FIELD_CAPACITY.setCustomValidity(message);
  };

  // обработчики событий
  var changeFormHandler = function (evt) {
    if (evt.target === Nodes.FIELD_TYPE) {
      changeMinPrice();
    } else if (evt.target === Nodes.FIELD_TIMEIN || evt.target === Nodes.FIELD_TIMEOUT) {
      changeTimeCheck(evt);
    }
  };

  // функция активации полей форм *true/false*
  var activationForm = function (form, stat) {
    var fieldsForm = form.children;
    var disabledClass = 'ad-form--disabled';

    if (stat) {
      form.classList.remove(disabledClass);
    } else {
      form.classList.add(disabledClass);
    }

    window.utils.activationElements(fieldsForm, stat);
  };

  // функция сброса страницы в неактивное состояние
  var resetPage = function () {
    window.pin.remove();
    activationForm(Nodes.FORM, false);
    activationForm(Nodes.MAP_FILTERS, false);
    window.pin.resetPosition();
    window.map.activationMap(false);
    Nodes.FORM.reset();
    setAddressPin('preload');
    changeMinPrice();
  };

  var getHandlerForPopup = function (className) {
    var handler;
    switch (className) {
      case ClassName.SUCCESS:
        handler = popupSuccessClickHandler;
        break;
      case ClassName.ERROR:
        handler = popupErrorClickHandler;
        break;
    }
    return handler;
  };

  var popupOpen = function (template) {
    var className = template.className;
    var handler = getHandlerForPopup(className);

    window.utils.renderTemplate(Nodes.MAIN, template);
    Nodes.FORM_BUTTON_SUBMIT.disabled = true;
    Nodes.FORM_BUTTON_RESET.disabled = true;

    window.addEventListener('click', handler);
    window.addEventListener('keydown', handler);
  };

  var popupClose = function (evt, className) {
    var handler = getHandlerForPopup(className);
    var popupElement = document.querySelector('.' + className);
    var popupMessage = document.querySelector('.' + className + '__message');
    var popupButtonClose = document.querySelector('.' + className + '__button');


    if (evt.target === popupButtonClose || evt.target === popupElement && evt.target !== popupMessage || evt.keyCode === window.const.KeyCode.ESC) {
      popupElement.remove();
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
      Nodes.FORM_BUTTON_SUBMIT.disabled = false;
      Nodes.FORM_BUTTON_RESET.disabled = false;
    }
  };

  var popupSuccessClickHandler = function (evt) {
    popupClose(evt, ClassName.SUCCESS);
  };

  var popupErrorClickHandler = function (evt) {
    popupClose(evt, ClassName.ERROR);
  };

  var submitHandler = function (evt) {
    window.backend.upload(function () {
      popupOpen(Nodes.SUCCESS_TEMPLATE);
      resetPage();
    }, function () {
      popupOpen(Nodes.ERROR_TEMPLATE);
    }, new FormData(Nodes.FORM));

    evt.preventDefault();
  };

  window.form = {
    setAddressPin: setAddressPin,
    changeMinPrice: changeMinPrice,
    checkCapacityHandler: checkCapacityHandler,
    changeFormHandler: changeFormHandler,
    activationForm: activationForm,
    resetPage: resetPage,
    submitHandler: submitHandler,
  };
})();
