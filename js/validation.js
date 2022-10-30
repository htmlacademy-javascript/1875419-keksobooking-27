const adForm = document.querySelector('.ad-form');
const roomNumberElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const priceElement = adForm.querySelector('#price');
const typeElement = adForm.querySelector('#type');
const submitButton = adForm.querySelector('.ad-form__submit');

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

function onRoomNumberChange() {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
}
function onCapacityChange() {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
}
function onPriceChange() {
  pristine.validate(priceElement);
}
function onTypeChange() {
  const minPrice = typesToMinPrices[typeElement.value];
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  pristine.validate(priceElement);
}

roomNumberElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onCapacityChange);
typeElement.addEventListener('change', onTypeChange);
priceElement.addEventListener('change', onPriceChange);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
});
