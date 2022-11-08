const TYPES_OF_APARTMENTS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const generateMarkup = (item) => {
  const similarOffer = similarOfferTemplate.cloneNode(true);
  const popupOfferTitle = similarOffer.querySelector('.popup__title');
  const popupOfferAddress = similarOffer.querySelector('.popup__text--address');
  const popupOfferPrice = similarOffer.querySelector('.popup__text--price');
  const popupOfferType = similarOffer.querySelector('.popup__type');
  const popupOfferCapacity = similarOffer.querySelector('.popup__text--capacity');
  const popupOfferTime = similarOffer.querySelector('.popup__text--time');
  const popupOfferAvatar = similarOffer.querySelector('.popup__avatar');
  const popupOfferDescription = similarOffer.querySelector('.popup__description');
  const popupOfferFeatures = similarOffer.querySelector('.popup__features');
  const popupFeatureList = similarOffer.querySelectorAll('.popup__feature');
  const popupOfferPhotos = similarOffer.querySelector('.popup__photos');


  const {author:{avatar}, offer:{address, checkin, checkout, description, features, guests, photos, price, rooms, title, type} } = item;
  //удаление элемента, если он не заполнен пользователем
  if (!avatar){
    popupOfferAvatar.remove();
  }
  if (!address){
    popupOfferAddress.remove();
  }
  if (!checkin || !checkout){
    popupOfferTime.remove();
  }
  if (!description){
    popupOfferDescription.remove();
  }
  if (!guests || !rooms){
    popupOfferCapacity.remove();
  }
  if (!price){
    popupOfferPrice.remove();
  }
  if (!title){
    popupOfferTitle.remove();
  }
  if (!type){
    popupOfferType.remove();
  }
  if (!features){
    popupOfferFeatures.remove();
  } else {
    //создаём модификатор, на основе входных данных пользователя (удобства), который будем сравнивать с соответствующим классом в разметке.
    const modifiers = features.map((offerFeature) => `popup__feature--${offerFeature}`);

    popupFeatureList.forEach((featureListItem) => {
      const modifier = featureListItem.classList[1]; //1 - это индекс нужного класса в атрибуте class
      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });
  }

  popupOfferTitle.textContent = title;
  popupOfferAddress.textContent = address;
  popupOfferPrice.textContent = `${price} ₽/ночь`;
  popupOfferType.textContent = TYPES_OF_APARTMENTS[type];
  popupOfferCapacity.textContent = `${rooms} комнаты для  ${guests} гостей`;
  popupOfferTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  popupOfferDescription.textContent = description;
  popupOfferAvatar.src = avatar;


  const offerPhotos = photos;
  if (!photos){
    popupOfferPhotos.remove();
  } else {
    offerPhotos.forEach((photoAddress) => {
      const photoItem = popupOfferPhotos.querySelector('img').cloneNode(true);
      photoItem.src = photoAddress;
      popupOfferPhotos.appendChild(photoItem);
    });
    popupOfferPhotos.children[0].remove();
  }


  return similarOffer;
};


export { generateMarkup };
