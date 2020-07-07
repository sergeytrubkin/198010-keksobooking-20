'use strict';

(function () {
  var Nodes = window.const.Nodes;
  var Types = window.const.Types;
  var KeyCode = window.const.KeyCode;

  // создание шаблона карточки
  var createTemplate = function (user) {
    var card = Nodes.CARD_TEMPLATE.cloneNode(true);

    var fillOfferCard = function (element, hasContent, content) {
      if (user.offer.hasOwnProperty(hasContent)) {
        element.textContent = content;
      } else {
        element.remove();
      }
    };

    var cardAvatar = card.querySelector('.popup__avatar');
    if (user.author.hasOwnProperty('avatar')) {
      cardAvatar.src = user.author.avatar;
    } else {
      cardAvatar.remove();
    }

    var cardTitle = card.querySelector('.popup__title');
    fillOfferCard(cardTitle, 'title', user.offer.title);

    var cardAddress = card.querySelector('.popup__text--address');
    fillOfferCard(cardAddress, 'address', user.offer.address);

    var cardPrice = card.querySelector('.popup__text--price');
    fillOfferCard(cardPrice, 'price', (user.offer.price + '₽/ночь'));

    var cardType = card.querySelector('.popup__type');
    fillOfferCard(cardType, 'type', Types[user.offer.type]);

    var cardCapacity = card.querySelector('.popup__text--capacity');
    fillOfferCard(cardCapacity, 'rooms' && 'guests', (user.offer.rooms + ' комнаты для ' + user.offer.guests + ' гостей'));

    var cardTime = card.querySelector('.popup__text--time');
    fillOfferCard(cardTime, 'checkin' && 'checkout', ('Заезд после ' + user.offer.checkin + ', выезд до ' + user.offer.checkout));

    var cardDescription = card.querySelector('.popup__description');
    fillOfferCard(cardDescription, 'description', user.offer.description);

    renderFeature(card, user);
    renderPhoto(card, user);

    return card;
  };

  var renderFeature = function (template, user) {
    var featureList = template.querySelector('.popup__features');
    featureList.textContent = '';

    for (var i = 0; i < user.offer.features.length; i++) {
      if (user.offer.features.length === 0) {
        featureList.remove();
      } else {
        var featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', 'popup__feature--' + user.offer.features[i]);
        featureList.appendChild(featureItem);
      }
    }
  };

  var renderPhoto = function (template, user) {
    var cardPhoto = template.querySelector('.popup__photos');
    if (user.offer.hasOwnProperty('photos')) {
      var cardPhotoImg = cardPhoto.querySelector('.popup__photo');
      cardPhotoImg.remove();

      user.offer.photos.forEach(function (photo) {
        var newPhoto = cardPhotoImg.cloneNode(true);
        newPhoto.src = photo;
        cardPhoto.appendChild(newPhoto);
      });
    } else {
      cardPhoto.remove();
    }
  };

  // функция открытия карточки через слушателя на метке
  var openPopup = function (pin, card) {
    pin.addEventListener('click', function () {
      var cardPopup = document.querySelector('.map__card');

      if (cardPopup && cardPopup !== card) {
        closePopup();
      } else if (cardPopup === card) {
        return;
      }

      pin.classList.add('map__pin--active');
      Nodes.MAP_PINS_BLOCK.insertAdjacentElement('afterend', card);
      var popupCloseButton = card.querySelector('.popup__close');

      document.addEventListener('keydown', popupEscPressHandler);
      popupCloseButton.addEventListener('click', closePopup);
    });
  };

  // закрытия карточки
  var closePopup = function () {
    var pins = document.querySelectorAll('.map__pin');
    var cardPopup = document.querySelector('.map__card');

    Array.from(pins).forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });

    if (cardPopup) {
      cardPopup.remove();
    }
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      closePopup();
    }
  };

  window.card = {
    createTemplate: createTemplate,
    openPopup: openPopup,
    closePopup: closePopup,
  };
})();
