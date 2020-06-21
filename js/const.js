'use strict';

window.const = (function () {
  var Nodes = {
    MAP: document.querySelector('.map'),
    MAP_PINS_BLOCK: document.querySelector('.map__pins'),
    MAP_FILTERS: document.querySelector('.map__filters'),
    MAP_PIN_MAIN: document.querySelector('.map__pin--main'),
    FORM: document.querySelector('.ad-form'),
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
  var TimeCheck = ['12:00', '13:00', '14:00'];
  var Features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  var USER_COUNT = 8;

  return {
    Nodes: Nodes,
    KeyCode: KeyCode,
    Offset: Offset,
    PinLocation: PinLocation,
    Capacity: Capacity,
    Rooms: Rooms,
    Types: Types,
    MinPriceForNight: MinPriceForNight,
    TimeCheck: TimeCheck,
    Features: Features,
    USER_COUNT: USER_COUNT,
  };
})();
