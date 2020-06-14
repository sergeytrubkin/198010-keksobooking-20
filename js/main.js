'use strict';

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
var Price = {
  MIN: 0,
  MAX: 15000,
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
var Photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var MOUSE_BUTTON_LEFT = 0;
var KEY_CODE_ENTER = 13;
var USER_COUNT = 8;

var getWidthElement = function (element) {
  return element.offsetWidth;
};

var createImageName = function (number) {
  return 'img/avatars/user' + ('' + (number + 1)).padStart(2, 0) + '.png';
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

var activationElements = function (elements, stat) {
  switch (stat) {
    case true:
      Array.from(elements).forEach(function (element) {
        element.disabled = false;
      });
      break;
    case false:
      Array.from(elements).forEach(function (element) {
        element.disabled = true;
      });
      break;
  }
};

var generateUserData = function (number) {
  var locationX = getRandomBetween(PinLocation.MIN_X, getWidthElement(Nodes.MAP));
  var locationY = getRandomBetween(PinLocation.MIN_Y, PinLocation.MAX_Y);

  var userData = {
    author: {
      avatar: createImageName(number)
    },

    location: {
      x: locationX,
      y: locationY,
    },

    offer: {
      title: 'заголовок предложения',
      address: locationX + ', ' + locationY,
      price: getRandomBetween(Price.MIN, Price.MAX),
      type: getRandomElement(Object.keys(Types)),
      rooms: getRandomElement(Object.values(Rooms)),
      guests: getRandomBetween(Capacity.MIN, Capacity.MAX),
      checkin: getRandomElement(TimeCheck),
      checkout: getRandomElement(TimeCheck),
      features: getRandomElements(Features),
      description: 'строка с описанием',
      photos: getRandomElements(Photos),
    }
  };

  return userData;
};
var createUsers = function () {
  var users = [];

  for (var i = 0; i < USER_COUNT; i++) {
    var userData = generateUserData(i);
    users.push(userData);
  }

  return users;
};

// функция создания шаблона метки на карте
var createPinTemplate = function (user) {
  var pin = Nodes.MAP_PIN_TEMPLATE.cloneNode(true);

  pin.style.left = (user.location.x - Offset.MAP_PIN_X) + 'px';
  pin.style.top = (user.location.y - Offset.MAP_PIN_Y) + 'px';

  var pinImage = pin.querySelector('img');
  pinImage.src = user.author.avatar;
  pinImage.alt = user.offer.title;

  return pin;
};

// функция создания карточки
// var createCardTemplate = function (user) {
//   var card = Nodes.CARD_TEMPLATE.cloneNode(true);

//   var cardAvatar = card.querySelector('.popup__avatar');
//   if (user.author.hasOwnProperty('avatar')) {
//     cardAvatar.src = user.author.avatar;
//   } else {
//     cardAvatar.remove();
//   }

//   var cardTitle = card.querySelector('.popup__title');
//   if (user.offer.hasOwnProperty('title')) {
//     cardTitle.textContent = user.offer.title;
//   } else {
//     cardTitle.remove();
//   }

//   var cardAddress = card.querySelector('.popup__text--address');
//   if (user.offer.hasOwnProperty('address')) {
//     cardAddress.textContent = user.offer.address;
//   } else {
//     cardAddress.remove();
//   }

//   var cardPrice = card.querySelector('.popup__text--price');
//   if (user.offer.hasOwnProperty('price')) {
//     cardPrice.textContent = user.offer.price + '₽/ночь';
//   } else {
//     cardPrice.remove();
//   }

//   var cardType = card.querySelector('.popup__type');
//   if (user.offer.hasOwnProperty('type')) {
//     cardType.textContent = Types[user.offer.type];
//   } else {
//     cardType.remove();
//   }

//   var cardCapacity = card.querySelector('.popup__text--capacity');
//   if (user.offer.hasOwnProperty('rooms') && user.offer.hasOwnProperty('guests')) {
//     cardCapacity.textContent = user.offer.rooms + ' комнаты для ' + user.offer.guests + ' гостей';
//   } else {
//     cardCapacity.remove();
//   }

//   var cardTime = card.querySelector('.popup__text--time');
//   if (user.offer.hasOwnProperty('checkin') && user.offer.hasOwnProperty('checkout')) {
//     cardTime.textContent = 'Заезд после ' + user.offer.checkin + ', выезд до ' + user.offer.checkout;
//   } else {
//     cardTime.remove();
//   }

//   var cardFeaturesList = card.querySelector('.popup__features');
//   if (user.offer.hasOwnProperty('features')) {
//     cardFeaturesList.textContent = user.offer.features;
//   } else {
//     cardFeaturesList.remove();
//   }

//   var cardDescription = card.querySelector('.popup__description');
//   if (user.offer.hasOwnProperty('description')) {
//     cardDescription.textContent = user.offer.description;
//   } else {
//     cardDescription.remove();
//   }

//   var cardPhoto = card.querySelector('.popup__photos');
//   if (user.offer.hasOwnProperty('photos')) {
//     var cardPhotoImg = cardPhoto.querySelector('.popup__photo');
//     cardPhotoImg.remove();

//     user.offer.photos.forEach(function (photo) {
//       var newPhoto = cardPhotoImg.cloneNode(true);
//       newPhoto.src = photo;
//       cardPhoto.appendChild(newPhoto);
//     });
//   } else {
//     cardPhoto.remove();
//   }

//   return card;
// };

// создание фрагмента
var createElements = function (data, template) {
  var fragment = document.createDocumentFragment();

  data.forEach(function (user) {
    var newElement = template(user);

    fragment.appendChild(newElement);
  });

  return fragment;
};

// отрисовка меток на карте
var renderPins = function () {
  var users = createUsers();
  var pins = createElements(users, createPinTemplate);
  // var cards = createElements(users, createCardTemplate);
  Nodes.MAP_PINS_BLOCK.appendChild(pins);
  // Nodes.MAP_PINS_BLOCK.insertAdjacentElement('afterend', cards.children[2]);
};

// функция активации полей форм *true/false*
var activationForm = function (stat) {
  var fieldFilter = Nodes.MAP_FILTERS.children;
  var fieldForm = Nodes.FORM.children;
  var disabledClass = 'ad-form--disabled';

  if (stat) {
    Nodes.FORM.classList.remove(disabledClass);
  } else {
    Nodes.FORM.classList.add(disabledClass);
  }

  activationElements(fieldFilter, stat);
  activationElements(fieldForm, stat);
};

// функция активация/деактивация карты. *true/false*
var activationMap = function (stat) {
  var fadedClass = 'map--faded';

  if (stat && Nodes.MAP.classList.contains(fadedClass)) {
    renderPins();
    Nodes.MAP.classList.remove(fadedClass);
  } else if (stat && !Nodes.MAP.classList.contains(fadedClass)) {
    return;
  } else {
    Nodes.MAP.classList.add(fadedClass);
  }

  activationForm(stat);
};

// функция получения адреса метки *'preload'/'move'*
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

// функция определения минимальной стоимости в зависимости от типа жилья
var changeMinPrice = function (type) {
  var pricePerNight = MinPriceForNight[type];
  Nodes.FIELD_PRICE.min = pricePerNight;
  Nodes.FIELD_PRICE.placeholder = pricePerNight;
};

// функция валидация полей количества комнат и гостей
var validationRoomsAndCapacity = function () {
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

Nodes.MAP_PIN_MAIN.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_BUTTON_LEFT) {
    setAddressPin('move');
    activationMap(true);
  }
});

Nodes.MAP_PIN_MAIN.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    setAddressPin('move');
    activationMap(true);
  }
});

Nodes.FORM.addEventListener('change', function (evt) {
  if (evt.target === Nodes.FIELD_TYPE) {
    changeMinPrice(evt.target.value);
  } else if (evt.target === Nodes.FIELD_TIMEIN || evt.target === Nodes.FIELD_TIMEOUT) {
    changeTimeCheck(evt);
  }
});

Nodes.FIELD_CAPACITY.addEventListener('input', function () {
  validationRoomsAndCapacity();
});

Nodes.FIELD_ROOM.addEventListener('input', function () {
  validationRoomsAndCapacity();
});

changeMinPrice(Nodes.FIELD_TYPE.value);
setAddressPin('preload');
activationForm(false);
