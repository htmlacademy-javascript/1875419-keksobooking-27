import { initSlider } from './slider.js';
import { setMap, setMapOnFail } from './map.js';
import { setOfferFormSubmit} from './validation.js';
import {getData} from './api.js';
import { showAlertMessage } from './util.js';

const SIMILAR_OFFER_COUNT = 10;


initSlider();

getData((similarOffers) => {
  setMap(similarOffers.slice(0, SIMILAR_OFFER_COUNT));
},
() => {
  showAlertMessage('не удалось загрузить данные о похожих объявлениях');
  setMapOnFail();
});

setOfferFormSubmit();
