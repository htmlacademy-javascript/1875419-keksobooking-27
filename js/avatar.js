const TYPES_OF_FILE = ['jpg', 'jpeg', 'png'];
const AVATAR_DEFAULT = 'img/muffin-grey.svg';

const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPlace = document.querySelector('#images');
const previewPlace = document.querySelector('.ad-form__photo');
const container = document.querySelector('.ad-form__photo-container');

const checkType = (fileName) =>
  TYPES_OF_FILE.some((it) => fileName.endsWith(it));


fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  if(checkType(file.name.toLowerCase())) {
    previewAvatar.style.objectFit = 'cover';
    previewAvatar.src = URL.createObjectURL(file);
  }

});

fileChooserPlace.addEventListener('change', () => {
  const files = fileChooserPlace.files;
  const fragment = document.createDocumentFragment();
  for (const file of files) {
    if (checkType(file.name.toLowerCase())) {
      previewPlace.remove();
      const div = document.createElement('div');
      div.classList.add('ad-form__photo');
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = 'Фото жилья';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      div.appendChild(img);
      fragment.appendChild(div);
    }
  }
  container.appendChild(fragment);
});

const clearPhotos = () => {
  const clearField = (element) => {
    element.remove();
  };
  const photos = container.querySelectorAll('.ad-form__photo');
  photos.forEach(clearField);
  previewAvatar.src = AVATAR_DEFAULT;
  container.appendChild(previewPlace);
};

export { clearPhotos };
