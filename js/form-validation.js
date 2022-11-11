import { sendData } from './api.js';
import { setMap } from './map.js';
import { sliderElement } from './slider.js';
import { showSuccessMessage, showErrorMessage } from './modal.js';
import { clearPhotos } from './avatar.js';


const adForm = document.querySelector('.ad-form');
const roomNumberElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const priceElement = adForm.querySelector('#price');
const typeElement = adForm.querySelector('#type');
const checkinElement = adForm.querySelector('#timein');
const checkoutElement = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const mapFilters = document.querySelector('.map__filters');
const resetButton = document.querySelector('.ad-form__reset');

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const guestsToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3']
};

const typesToMinPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  max: 100000,
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
}, true);

//функции валидации и сообщений об ошибках
const validateCapacity = () => (
  roomsToGuests[roomNumberElement.value].includes(capacityElement.value)
);
const getCapacityErrorMessage = () => (
  `Указанные комнаты могут вместить ${roomsToGuests[roomNumberElement.value].join(' или ')} гостя(ей)`
);
const getRoomNumberErrorMessage = () => (
  `Для выбранного количества гостей требуется ${guestsToRooms[capacityElement.value].join(' или ')} комнат(ы)`
);
const validatePrice = (value) => (
  (value >= typesToMinPrices[typeElement.value]) && (value <= typesToMinPrices.max)
);
const getPriceErrorMessage = () =>(
  `Минимальная стоимость для выбранного типа жильа ${typesToMinPrices[typeElement.value]} руб.`
);

//автоматическое изменение полей времени заезда/выезда
const onCheckinChange = () => {
  checkinElement.value = checkoutElement.value;
};
const onCheckoutChange = () => {
  checkoutElement.value = checkinElement.value;
};
//изменеие цены в зависимости от выбранного типа жилья
const onTypeChange = () => {
  const minPrice = typesToMinPrices[typeElement.value];
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  pristine.validate(priceElement);
};
//проверка формы при изменеии ее полей
const onFormChange = () => {
  pristine.validate();
};

pristine.addValidator(
  capacityElement,
  validateCapacity,
  getCapacityErrorMessage
);
pristine.addValidator(
  roomNumberElement,
  validateCapacity,
  getRoomNumberErrorMessage
);
pristine.addValidator(
  priceElement,
  validatePrice,
  getPriceErrorMessage
);
//блокировка/разблокировка кнопки отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const resetPage = () => {
  adForm.reset();
  mapFilters.reset();
  setMap();
  sliderElement.noUiSlider.reset();
  clearPhotos();
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetPage();
};
resetButton.addEventListener('click', onResetButtonClick);

const onSendSuccess = () => {
  showSuccessMessage();
  resetPage();
  unblockSubmitButton();
};

const onSendError = () => {
  showErrorMessage();
  unblockSubmitButton();
};
//валидация полей при их изменении пользователем
adForm.addEventListener('change', onFormChange);
checkinElement.addEventListener('change', onCheckoutChange);
checkoutElement.addEventListener('change', onCheckinChange);
typeElement.addEventListener('change', onTypeChange);

const setOfferFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        onSendSuccess,
        onSendError,
        new FormData(evt.target),
      );
    }
  });
};

export { typeElement, typesToMinPrices, setOfferFormSubmit};
