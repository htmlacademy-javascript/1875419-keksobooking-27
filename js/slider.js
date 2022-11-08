import { typeElement, typesToMinPrices } from './form-validation.js';
const sliderElement = document.querySelector('.ad-form__slider');
const priceValueElement = document.querySelector('#price');

const MIN_SLIDER_RANGE = 0;
const MAX_SLIDER_RANGE = 100000;
const SLIDER_STEP = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_SLIDER_RANGE,
    max: MAX_SLIDER_RANGE,
  },
  start: typesToMinPrices[typeElement.value],
  step: SLIDER_STEP,
  connect: 'upper',
  format: {
    to: (value) => Number(value.toFixed(0)),
    from: (value) => parseFloat(value),
  },
});

const onSliderChange = () => {
  priceValueElement.value = sliderElement.noUiSlider.get();
};

const initSlider = () => {
  sliderElement.noUiSlider.on('update', onSliderChange);
};


export { initSlider };
