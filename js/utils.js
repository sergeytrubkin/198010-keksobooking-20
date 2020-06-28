'use strict';

(function () {
  var getWidthElement = function (element) {
    return element.offsetWidth;
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

  // создание фрагмента с коллекцией элементов
  var createElements = function (data, template) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (user) {
      var newElement = template(user);

      fragment.appendChild(newElement);
    });

    return fragment;
  };

  var renderTemplate = function (element, template) {
    var newTemplate = template.cloneNode(true);
    element.appendChild(newTemplate);
  };

  // активация/деактивация DOM-элементов
  var activationElements = function (elements, stat) {
    var statDisabled = stat ? false : true;

    Array.from(elements).forEach(function (element) {
      element.disabled = statDisabled;
    });
  };

  var coordsBetween = function (coord, min, max) {
    if (coord <= min) {
      var correctCorrd = min;
    } else if (coord >= max) {
      correctCorrd = max;
    } else {
      correctCorrd = coord;
    }

    return correctCorrd;
  };

  window.utils = {
    getWidthElement: getWidthElement,
    getRandomBetween: getRandomBetween,
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements,
    createElements: createElements,
    activationElements: activationElements,
    coordsBetween: coordsBetween,
    renderTemplate: renderTemplate,
  };
})();
