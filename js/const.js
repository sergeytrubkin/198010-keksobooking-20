'use strict';

(function () {
  var Nodes = {
    MAIN: document.querySelector('main'),
    MAP: document.querySelector('.map'),
    MAP_PINS_BLOCK: document.querySelector('.map__pins'),
    MAP_FILTERS: document.querySelector('.map__filters'),
    MAP_PIN_MAIN: document.querySelector('.map__pin--main'),
    FORM: document.querySelector('.ad-form'),
    FORM_BUTTON_SUBMIT: document.querySelector('.ad-form__submit'),
    FORM_BUTTON_RESET: document.querySelector('.ad-form__reset'),
    FIELD_ADDRESS: document.querySelector('#address'),
    FIELD_TYPE: document.querySelector('#type'),
    FIELD_PRICE: document.querySelector('#price'),
    FIELD_CAPACITY: document.querySelector('#capacity'),
    FIELD_ROOM: document.querySelector('#room_number'),
    FIELD_TIMEOUT: document.querySelector('#timeout'),
    FIELD_TIMEIN: document.querySelector('#timein'),
    MAP_PIN_TEMPLATE: document.querySelector('#pin')
      .content
      .querySelector('.map__pin'),
    CARD_TEMPLATE: document.querySelector('#card')
      .content
      .querySelector('.map__card'),
    SUCCESS_TEMPLATE: document.querySelector('#success')
      .content
      .querySelector('.success'),
    ERROR_TEMPLATE: document.querySelector('#error')
      .content
      .querySelector('.error'),
  };
  var KeyCode = {
    ENTER: 13,
    ESC: 27,
    MOUSE_BUTTON_LEFT: 0,
  };
  var Offset = {
    MAP_PIN_X: 25,
    MAP_PIN_Y: 70,
    MAIN_PIN_Y: 84,
  };
  var PinLocation = {
    MIN_X: 0,
    MIN_Y: 130,
    MAX_Y: 630,
    MAIN_LEFT: Nodes.MAP_PIN_MAIN.offsetLeft,
    MAIN_TOP: Nodes.MAP_PIN_MAIN.offsetTop,
  };
  var Capacity = {
    MIN: 0,
    MAX: 3,
  };
  var Rooms = {
    MIN: 1,
    MAX: 3,
    NOT_GUEST: 100,
  };
  var Types = {
    'palace': 'Дворец',
    'flat': 'Квартиа',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };
  var MinPriceForNight = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };
  var MAX_PRICE_FOR_NIGHT = '1000000';
  var AvailableTime = ['12:00', '13:00', '14:00'];
  var Features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  var USER_COUNT = 5;

  window.const = {
    Nodes: Nodes,
    KeyCode: KeyCode,
    Offset: Offset,
    PinLocation: PinLocation,
    Capacity: Capacity,
    Rooms: Rooms,
    Types: Types,
    MinPriceForNight: MinPriceForNight,
    MAX_PRICE_FOR_NIGHT: MAX_PRICE_FOR_NIGHT,
    AvailableTime: AvailableTime,
    Features: Features,
    USER_COUNT: USER_COUNT,
  };
})();
