/* Очень дико извиняюсь что все долго делаю ибо весь месяц я валялся на больничном с жуткой болью в спине и не мог спокойно сидеть, а сейчас пытаюссь все наверстать */


let randomImageNumber = [1,2,3,4,5,6,7,8,9,10];
const TYPE_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
]
const TIME_HOURS = [
  '12:00',
  '13:00',
  '14:00'
]
const TYPE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]

const TYPE_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
]



const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomPositiveFloat (a, b, digits = 1) {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length -1)];
const getRandomElement = (element) => getRandomPositiveInteger(1, element);
const author = () => ({
  avatar: function() {
    const RandomImage = getRandomArrayElement(randomImageNumber);
    randomImageNumber = randomImageNumber.filter(function(number) {return number  !== RandomImage});
    const Rezult = 'img/avatars/user'+ (RandomImage < 10 ? '0' + RandomImage: String(RandomImage)) +  '.png';
    return Rezult;
  }
});
const offer = () => ({
  title : 'Random Zalovok',
  address: '',
  price : getRandomElement(1000),
  type: getRandomArrayElement(TYPE_HOUSING),
  rooms: getRandomElement(5),
  guests: getRandomElement(10),
  checkin: getRandomArrayElement(TIME_HOURS),
  checkout: getRandomArrayElement(TIME_HOURS),
  features: function () {
    const newArray = [];
    const newArrayLength = getRandomPositiveInteger(1, TYPE_FEATURES.length);

    for (let i = 1; i <= newArrayLength; i++) {
      const options = TYPE_FEATURES.shift();
      newArray.push(options);
    }

    return newArray;
  },
  description: 'Random opisanie',
  photos: function () {
    const newArray = [];
    for(let i = 0; i < getRandomArrayElement(TYPE_PHOTOS); i++) {
      newArray.push(TYPE_PHOTOS[i]);
    }
    return newArray;
  }
});

const location = () => ({
  lat: getRandomPositiveFloat(35.65000,35.70000, 5),
  lng: getRandomPositiveFloat(139.70000,139.80000, 5)

});

const Author = Array.from({length: 10}, author);
const Offer = Array.from({length: 10}, offer);

