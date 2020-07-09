'use strict';

(function () {
  var FIELD_VALUE_ANY = 'any';
  var Field = {
    TYPE: document.querySelector('#housing-type'),
    PRICE: document.querySelector('#housing-price'),
    ROOM: document.querySelector('#housing-rooms'),
    GUEST: document.querySelector('#housing-guests'),
    FEATURE: document.querySelector('#housing-features'),
  };

  var FieldPriceValue = {
    'low': {
      min: '0',
      max: '10000',
    },
    'middle': {
      min: '10000',
      max: '50000',
    },
    'high': {
      min: '50000',
      max: window.const.MAX_PRICE_FOR_NIGHT,
    }
  };

  // фильтрует массив на уникальность данных
  var getUniqueUsers = function (users) {
    return users.filter(function (it, i) {
      return users.indexOf(it) === i;
    });
  };

  var checkFilterItem = function (users, type, item) {
    var filteredUsers = users.filter(function (it) {
      return it.offer[type].toString() === item.value;
    });
    return filteredUsers;
  };

  var updateFilteredPins = function () {
    window.pin.remove();
    var usersData = window.usersData;
    var features = Field.FEATURE.querySelectorAll('input:checked');
    var filteredUsers = [];
    var allFieldValueAny = true;

    // фильтрация по типу
    if (Field.TYPE.value !== FIELD_VALUE_ANY) {
      allFieldValueAny = false;
      filteredUsers = filteredUsers.concat(checkFilterItem(usersData, 'type', Field.TYPE));
    }

    // фильтрация по стоимости
    if (Field.PRICE.value !== FIELD_VALUE_ANY) {
      allFieldValueAny = false;
      var price = FieldPriceValue[Field.PRICE.value];

      var filteredUsersPrice = usersData.filter(function (it) {
        return it.offer.price >= price.min && it.offer.price <= price.max;
      });
      filteredUsers = filteredUsers.concat(filteredUsersPrice);
    }

    // фильтрация по количеству комнат
    if (Field.ROOM.value !== FIELD_VALUE_ANY) {
      allFieldValueAny = false;
      filteredUsers = filteredUsers.concat(checkFilterItem(usersData, 'rooms', Field.ROOM));
    }

    // фильтрация по количеству гостей
    if (Field.GUEST.value !== FIELD_VALUE_ANY) {
      allFieldValueAny = false;
      filteredUsers = filteredUsers.concat(checkFilterItem(usersData, 'guests', Field.GUEST));
    }

    // фильтрация по выбору удобств
    if (features.length) {
      var filteredUsersFeatures = usersData.filter(function (it) {
        return Array.from(features).every(function (feature) {
          return it.offer.features.includes(feature.value);
        });
      });

      filteredUsers = filteredUsers.concat(filteredUsersFeatures);
    }

    var uniqueUsers = filteredUsers.length ? getUniqueUsers(filteredUsers) : filteredUsers;

    // заполняет пустой массив если все фильтры были установлены в значение 'any'
    if (!filteredUsers.length && allFieldValueAny) {
      uniqueUsers = usersData;
    }

    window.pin.render(uniqueUsers);
  };

  var filterChangeHandler = window.debounce(updateFilteredPins);

  window.filter = {
    filterChangeHandler: filterChangeHandler,
  };
})();
