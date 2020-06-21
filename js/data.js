'use strict';

window.data = (function () {
  var Nodes = window.const.Nodes;
  var PinLocation = window.const.PinLocation;
  var TimeCheck = window.const.TimeCheck;
  var Features = window.const.Features;
  var Types = window.const.Types;
  var Rooms = window.const.Rooms;
  var Capacity = window.const.Capacity;
  var Price = {
    MIN: 0,
    MAX: 15000,
  };
  var Photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var createImageName = function (number) {
    return 'img/avatars/user' + ('' + (number + 1)).padStart(2, 0) + '.png';
  };
  var generateUserData = function (number) {
    var locationX = window.utils.getRandomBetween(PinLocation.MIN_X, window.utils.getWidthElement(Nodes.MAP));
    var locationY = window.utils.getRandomBetween(PinLocation.MIN_Y, PinLocation.MAX_Y);

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
        price: window.utils.getRandomBetween(Price.MIN, Price.MAX),
        type: window.utils.getRandomElement(Object.keys(Types)),
        rooms: window.utils.getRandomElement(Object.values(Rooms)),
        guests: window.utils.getRandomBetween(Capacity.MIN, Capacity.MAX),
        checkin: window.utils.getRandomElement(TimeCheck),
        checkout: window.utils.getRandomElement(TimeCheck),
        features: window.utils.getRandomElements(Features),
        description: 'строка с описанием',
        photos: window.utils.getRandomElements(Photos),
      }
    };

    return userData;
  };
  var createUsers = function (count) {
    var users = [];

    for (var i = 0; i < count; i++) {
      var userData = generateUserData(i);
      users.push(userData);
    }

    return users;
  };
  return {
    createUsers: createUsers,
  };
})();
