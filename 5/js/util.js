
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


export {getRandomArrayElement};
export {getRandomIntInclusive};
export {getRandomFloatInclusive};

