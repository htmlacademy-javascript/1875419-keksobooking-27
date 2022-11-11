import { showChoosedMarkers, SIMILAR_OFFERS_COUNT } from './map.js';
import { debounce } from './util.js';

const DEFAULT_VALUE = 'any';
const RERENDER_DELAY = 500;

const PriceRange = {
  LOW: {
    min: '0',
    max: '10000'
  },
  MIDDLE: {
    min: '10000',
    max: '50000'
  },
  HIGH: {
    min: '50000',
    max: '100000'
  }
};
const filterTypeField = document.querySelector('#housing-type');
const filterPriceField = document.querySelector('#housing-price');
const filterRoomsField = document.querySelector('#housing-rooms');
const filterGuestsField = document.querySelector('#housing-guests');
const filterFeaturesField = document.querySelector('#housing-features');
const mapFilters = document.querySelector('.map__filters');

const checkType = ({offer}) =>
  offer.type === filterTypeField.value || filterTypeField.value === DEFAULT_VALUE;

const checkPrice = ({offer}) => {
  const choosedPrice = (filterPriceField.value);
  return choosedPrice === DEFAULT_VALUE ||
    (offer.price > PriceRange[choosedPrice.toUpperCase()].min && offer.price < PriceRange[choosedPrice.toUpperCase()].max);

};

const checkCapacity = ({offer}) =>
  String(offer.rooms) === filterRoomsField.value || filterRoomsField.value === DEFAULT_VALUE;

const checkGuests = ({offer}) =>
  String(offer.guests) === filterGuestsField.value || filterGuestsField.value === DEFAULT_VALUE;

const checkFeatures = ({offer}) => {
  const checkedFeatures = filterFeaturesField.querySelectorAll('input:checked');

  if (!checkedFeatures) {
    return true;
  }

  if (offer.features) {
    const offerFeatures = offer.features;
    return Array.from(checkedFeatures).every(
      (input) => offerFeatures.includes(input.value));
  }
};

const filterOffers = (offers) => {
  const filteredOffers = [];

  for (const offer of offers) {
    if (filteredOffers.length >= SIMILAR_OFFERS_COUNT) {
      break;
    }

    if (
      checkType(offer)
      && checkPrice(offer)
      && checkCapacity(offer)
      && checkGuests(offer)
      && checkFeatures(offer)
    )
    {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const onFormFilterChange = (data) => {
  const filteredOffers = filterOffers(data);
  showChoosedMarkers(filteredOffers);
};
const setFilterListener = (data) => {
  mapFilters.addEventListener('change', debounce(()=>onFormFilterChange(data), RERENDER_DELAY));
  mapFilters.addEventListener('reset', debounce(()=>onFormFilterChange(data), RERENDER_DELAY));
};

export { setFilterListener };
