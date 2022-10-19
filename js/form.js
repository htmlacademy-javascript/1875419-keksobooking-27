const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formField = adForm.querySelectorAll('fieldset');
const mapSelect = mapFilters.querySelectorAll('select');

const turnInactiveMode = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  formField.forEach((formFieldItem) => {
    formFieldItem.setAttribute('disabled',true);
  });
  mapSelect.forEach((mapSelectItem) => {
    mapSelectItem.setAttribute('disabled',true);
  });
};

const turnActiveMode = () =>{
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  formField.forEach((formFieldItem) => {
    formFieldItem.removeAttribute('disabled',true);
  });
  mapSelect.forEach((mapSelectItem) => {
    mapSelectItem.removeAttribute('disabled',true);
  });
};

//turnInactiveMode();

export {turnInactiveMode, turnActiveMode};
