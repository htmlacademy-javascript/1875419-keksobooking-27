import {getRandomArrayElement, getRandomIntInclusive, getRandomFloatInclusive} from './util';

const OBJECTS_TO_GENERATE = 10;


const createObject = (numb) => {

  const createAuthor = (i) => ({
    avatar : `img/avatars/user${((i.toString()).padStart(2, '0' ))}.png`
  });

  const createLocation = () => ({
    lat : getRandomFloatInclusive(35.65000,35.70000,5),
    lng : getRandomFloatInclusive(139.70000,139.80000,5)
  });

  const location = createLocation();

  const createOffer = () => {

    const offerBase = {
      title : ['Oasis', 'Paradise', 'Heaven', 'House1', 'House2', 'House3'],//строка
      type : ['palace', 'flat', 'house', 'bungalow', 'hotel'],//строка, вернуть одно из 5 значений
      checkin : ['12:00', '13:00', '14:00'],
      checkout : ['12:00', '13:00', '14:00'],
      features : ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],//массив строк случайной длины, значения не повторяются
      description : ['Самое оптимальное предложение', 'Лучшее предложение поблизости', 'Самое часто посещаемое место', 'Выгодное предложение'],
      photos : ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],//массив строк случайной длины
    };

    const createPhotos = () => {
      const photos = [];
      const photoCount = getRandomIntInclusive(1,3);
      for (let i = 1; i <= photoCount; i++) {
        photos.push(getRandomArrayElement(offerBase.photos));
      }
      return photos;
    };

    return {
      title : getRandomArrayElement(offerBase.title),
      type : getRandomArrayElement(offerBase.type),
      address : `${location.lat}, ${location.lng}`,
      price : getRandomIntInclusive(0,3000),
      rooms : getRandomIntInclusive(1,3),
      guests : getRandomIntInclusive(1,10),
      checkin : getRandomArrayElement(offerBase.checkin),
      checkout : getRandomArrayElement(offerBase.checkout),
      features : (offerBase.features).slice(getRandomIntInclusive(0,6)),
      description : getRandomArrayElement(offerBase.description),
      photos : createPhotos(numb)
    };
  };

  return {
    author : createAuthor(numb),
    offer : createOffer(),
    location
  };
};


const generateObjects = (count) => {
  const objects = [];
  for (let i = 1; i <= count; i++){
    objects.push(createObject(i));
  }
  return objects;
};

export {generateObjects, OBJECTS_TO_GENERATE};
