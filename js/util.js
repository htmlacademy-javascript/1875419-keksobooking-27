const ALERT_SHOW_TIME = 5000;

const getRandomIntInclusive = (min, max) => {
  //функция вычисляет случайное целое число из заданного диапазона включительно
  //аргументами могут быть только неотрицательные числа
  if (typeof min !== 'number' || typeof max !== 'number' || min < 0 || max < 0 || min > max) {
    return NaN;
  } else if ((max - min) < 1) {
    return null;
  }
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}; //Максимум и минимум включаются. Источник:https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random


const getRandomFloatInclusive = (min, max, fractionLenght) => {
  // получение случайного числа с плавающей точкой с заданным количеством знаков после запятой из заданного интервала включительно.
  if (typeof min !== 'number' || typeof max !== 'number' || min < 0 || max < 0 || min >= max) {
    return NaN;
  }

  return +(Math.random() * (max - min) + min).toFixed(fractionLenght);
};

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];//выбор случайного элемента массива
//добавление на страницу сообщения об ошибке размещения объявления
const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {getRandomArrayElement, getRandomIntInclusive, getRandomFloatInclusive, showAlertMessage};


