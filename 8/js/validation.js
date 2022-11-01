const adForm = document.querySelector('.ad-form');
const roomNumberElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const priceElement = adForm.querySelector('#price');
const typeElement = adForm.querySelector('#type');

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
function validateCapacity () {
  return roomsToGuests[roomNumberElement.value].includes(capacityElement.value);
}
function getCapacityErrorMessage () {
  return `Указанные комнаты могут вместить ${roomsToGuests[roomNumberElement.value].join(' или ')} гостя(ей)`;
}
function getRoomNumberErrorMessage () {
  return `Для выбранного количества гостей требуется ${guestsToRooms[capacityElement.value].join(' или ')} комнат(ы)`;
}
function validatePrice(value) {
  return (value >= typesToMinPrices[typeElement.value]) && (value <= typesToMinPrices.max);
}
function getPriceErrorMessage() {
  return `Минимальная стоимость для выбранного типа жильа ${typesToMinPrices[typeElement.value]} руб.`;
}

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

adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
