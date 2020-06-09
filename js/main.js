'use strict';

var MAP_PIN_TEMPLATE = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var MAP = document.querySelector('.map');
var MAP_PINS_BLOCK = MAP.querySelector('.map__pins');
var OFFSET_MAP_PIN_X = 25;
var OFFSET_MAP_PIN_Y = 70;
var USER_COUNT = 8;
var MIN_LOCATION_X = 0;
var MIN_LOCATION_Y = 150;
var MAX_LOCATION_Y = 650;
var MIN_COUNT_ROOM = 1;
var MAX_COUNT_ROOM = 100;
var MIN_COUNT_GUEST = 1;
var MAX_COUTN_GUEST = 3;
var MIN_PRICE = 0;
var MAX_PRICE = 15000;

var Types = ['palace', 'flat', 'house', 'bungalo'];
var TimeCheck = ['12:00', '13:00', '14:00'];
var Features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
var Photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


var getWidthElement = function (element) {
  return element.offsetWidth;
};

var generateUrl = function (number) {
  var urlImg = '';
  var startUrl = 'img/avatars/user';
  var endUrl = number + '.png';
  var endUrlWithZero = endUrl.padStart(6, 0);

  urlImg = startUrl + endUrlWithZero;
  return urlImg;
};

var getRandomBetween = function (min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

var getRandomElement = function (array) {
  return array[getRandomBetween(0, array.length - 1)];
};

var getRandomElements = function (array) {
  var number = Math.floor(Math.random() * (array.length + 1));
  var newArray = array.slice();

  return newArray.splice(0, number);
};

var createUserData = function (number) {
  var timeCheck = getRandomElement(TimeCheck);
  var userData = [];

  var author = {
    avatar: generateUrl(number)
  };

  var location = {
    x: getRandomBetween(MIN_LOCATION_X, getWidthElement(MAP)),
    y: getRandomBetween(MIN_LOCATION_Y, MAX_LOCATION_Y),
  };

  var offer = {
    title: 'заголовок предложения',
    address: location.x + ', ' + location.y,
    price: getRandomBetween(MIN_PRICE, MAX_PRICE),
    type: getRandomElement(Types),
    rooms: getRandomBetween(MIN_COUNT_ROOM, MAX_COUNT_ROOM),
    guests: getRandomBetween(MIN_COUNT_GUEST, MAX_COUTN_GUEST),
    checkin: timeCheck,
    checkout: timeCheck,
    features: getRandomElements(Features),
    description: 'строка с описанием',
    photos: getRandomElements(Photos),
  };

  userData.author = author;
  userData.offer = offer;
  userData.location = location;

  return userData;
};

var createUsers = function () {
  var users = [];

  for (var i = 1; i <= USER_COUNT; i++) {
    var userData = createUserData(i);
    users.push(userData);
  }

  return users;
};

// функция активация/деактивация карты. true - активация, false - деактивация
var activationMap = function (active) {
  var fadedClass = 'map--faded';

  if (active || MAP.classList.contains(fadedClass)) {
    MAP.classList.remove(fadedClass);
  } else {
    MAP.classList.add(fadedClass);
  }
};

// функция создания шаблона метки на карте
var createPin = function (user) {
  var pin = MAP_PIN_TEMPLATE.cloneNode(true);
  pin.style.left = (user.location.x - OFFSET_MAP_PIN_X) + 'px';
  pin.style.top = (user.location.y - OFFSET_MAP_PIN_Y) + 'px';

  var pinImage = pin.querySelector('img');
  pinImage.src = user.author.avatar;
  pinImage.alt = user.offer.title;

  return pin;
};

// создание фрагметна с метками
var createPins = function () {
  var fragment = document.createDocumentFragment();
  var users = createUsers();

  users.forEach(function (user) {
    var newPinElement = createPin(user);
    fragment.appendChild(newPinElement);
  });

  return fragment;
};

// отрисовка меток на карте и активация карты
var renderPins = function () {
  var pins = createPins();
  MAP_PINS_BLOCK.appendChild(pins);
  activationMap(true);
};

renderPins();
