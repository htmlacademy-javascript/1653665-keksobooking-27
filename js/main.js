const randomImageNumber = [];
const TYPE_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const TIME_HOURS = [
  '12:00',
  '13:00',
  '14:00'
];
const TYPE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const TYPE_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const NEW_AD = 10;
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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const getRandomNumber = (element) => getRandomPositiveInteger(1, element);

const getAvatar = () => {
  let RandomImage = getRandomNumber(10);
  while(randomImageNumber.includes(RandomImage)) {
    RandomImage = getRandomNumber(10);
  }
  randomImageNumber.push(RandomImage);
  return `img/avatars/user${String(RandomImage).padStart(2,0)}.png`;
};

const getFeatures = () => {
  const newArray = [];
  const newArrayLength = getRandomPositiveInteger(1, TYPE_FEATURES.length);

  for (let i = 1; i <= newArrayLength; i++) {
    const options = TYPE_FEATURES.shift();
    newArray.push(options);
  }
  return newArray;
};

const getPhotos = () => {
  const newArray = [];
  for(let i = 0; i < getRandomNumber(TYPE_PHOTOS.length); i++) {;
    newArray.push(TYPE_PHOTOS[i]);
  }
  return newArray;
};

const author = () => ({
  avatar: getAvatar(),
});
const newLocation = () => ({
  lat: getRandomPositiveFloat(35.65000,35.70000, 5),
  lng: getRandomPositiveFloat(139.70000,139.80000, 5)
});
const offer = () => ({
  title : 'Random Zalovok',
  address: `${newLocation().lat}''${newLocation().lng}`,
  price : getRandomNumber(1000),
  type: getRandomArrayElement(TYPE_HOUSING),
  rooms: getRandomNumber(5),
  guests: getRandomNumber(10),
  checkin: getRandomArrayElement(TIME_HOURS),
  checkout: getRandomArrayElement(TIME_HOURS),
  features: getFeatures(),
  description: 'Random opisanie',
  photos: getPhotos(),
});

const Ad = () => ({
  author: author(),
  newLocation:newLocation(),
  offer: offer(),
});

const newAd = Array.from({length: NEW_AD}, Ad);
