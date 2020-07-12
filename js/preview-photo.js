'use strict';

(function () {
  var Nodes = window.const.Nodes;
  var PhotoSize = {
    width: '70',
    height: '70',
  };
  var AVATAR_IMG = Nodes.FIELD_AVATAR.querySelector('img');
  var AVATAR_SRC = AVATAR_IMG.getAttribute('src');

  var loadImagePreview = function (input, parentImg) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.const.FileTypes.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var photo = parentImg.querySelector('img');
      var reader = new FileReader();

      if (!photo) {
        var newImage = document.createElement('img');
        newImage.width = PhotoSize.width;
        newImage.height = PhotoSize.height;

        reader.addEventListener('load', function () {
          newImage.src = reader.result;
        });

        parentImg.appendChild(newImage);
      } else {
        reader.addEventListener('load', function () {
          photo.src = reader.result;
        });
      }

      reader.readAsDataURL(file);
    }
  };

  var avatarPreviewChangeHandler = function () {
    loadImagePreview(Nodes.INPUT_AVATAR, Nodes.FIELD_AVATAR);
  };

  var photoPreviewChangeHandler = function () {
    loadImagePreview(Nodes.INPUT_IMAGE, Nodes.FIELD_IMAGE);
  };

  // функция удаления фото из формы
  var remove = function () {
    AVATAR_IMG.src = AVATAR_SRC;
    Nodes.FIELD_IMAGE.textContent = '';
  };

  window.previewPhoto = {
    avatarPreviewChangeHandler: avatarPreviewChangeHandler,
    photoPreviewChangeHandler: photoPreviewChangeHandler,
    remove: remove,
  };

})();
