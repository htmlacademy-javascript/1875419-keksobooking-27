import {generateMarkup} from './popup.js';
import { turnActiveMode, turnFormActive, turnInactiveMode} from './form-mode.js';
import { showAlertMessage } from './util.js';
import { getData } from './api.js';

const SIMILAR_OFFERS_COUNT = 10;
const START_COORDINATE = {
  LAT: 35.65283,
  LNG: 139.83947
};
const ZOOM = 12;
const OFFER_ICON_SIZE = [40, 40];
const OFFER_ICON_ANCHOR = [20, 40];
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];

const mapCanvas = document.querySelector('#map-canvas');
const addressField = document.querySelector('#address');


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: OFFER_ICON_SIZE,
  iconAnchor: OFFER_ICON_ANCHOR,
});

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: START_COORDINATE.LAT,
    lng: START_COORDINATE.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


turnInactiveMode();
const map = L.map(mapCanvas)
  .setView({
    lat: START_COORDINATE.LAT,
    lng: START_COORDINATE.LNG
  },
  ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


//устанавливаем отображение координат метки в поле адреса объявления
addressField.value = `${START_COORDINATE.LAT}, ${START_COORDINATE.LNG}`;
const onMarkerMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  const addressValue = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  addressField.value = addressValue;
};

const markerGroup = L.layerGroup().addTo(map);
//добавление метки на карту
const createMarker = (item) => {
  const {
    location:{
      lat,
      lng
    }
  } = item;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(generateMarkup(item));
};
//создание меток похожих объявлений
const showMarkers = (offers) => {
  offers.forEach(createMarker);
};

//загрузка карты
const setMap = () => {
  //определение координат карты и главной метки
  mainPinMarker.setLatLng({
    lat: START_COORDINATE.LAT,
    lng: START_COORDINATE.LNG
  });

  map.setView({
    lat: START_COORDINATE.LAT,
    lng: START_COORDINATE.LNG
  },
  ZOOM);
  //устанавливаем отображение главной метки
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onMarkerMove);

  turnFormActive();
};


const onDataLoad = (similarOffers) => {
  showMarkers(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
  turnActiveMode();
};

const onDataFailed = () => {
  showAlertMessage('Ошибка:( Не удалось получить информацию о других объявлениях');
};

const renderOffersOnMap = () => {
  map.whenReady( () => {
    getData(onDataLoad, onDataFailed);
  });
};


export {setMap, renderOffersOnMap};
