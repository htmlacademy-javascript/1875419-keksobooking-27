import { initSlider } from './slider.js';
import { setMap } from './map.js';
import { setOfferFormSubmit} from './validation.js';
import {getData} from './api.js';


const SIMILAR_OFFER_COUNT = 10;


initSlider();

getData((similarOffers) => {
  setMap(similarOffers.slice(0, SIMILAR_OFFER_COUNT));
});

setOfferFormSubmit();
