const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((similarOffers) => {
      onSuccess(similarOffers);
      //setMap(similarOffers.slice(0, SIMILAR_OFFER_COUNT));

    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось установить соединение с сервером. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось загрузить объявление. Попробуйте ещё раз');
    });
};

export {getData, sendData};
