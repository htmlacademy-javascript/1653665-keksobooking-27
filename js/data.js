import {getRandomPositiveInteger,getRandomPositiveFloat,getRandomArrayElement,getRandomNumber} from './util.js';

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

const randomImageNumber = [];

const getAvatar = () => {
  let randomImage = getRandomNumber(10);
  while(randomImageNumber.includes(randomImage)) {
    randomImage = getRandomNumber(10);
  }
  randomImageNumber.push(randomImage);
  return `img/avatars/user${String(randomImage).padStart(2,0)}.png`;
};

const getFeatures = () => {
  const newArray = [];
  const cloneTypeFeature = TYPE_FEATURES.slice();
  const newArrayLength = getRandomPositiveInteger(1, cloneTypeFeature.length);
  for (let i = 1; i <= newArrayLength; i++) {
    const options = cloneTypeFeature.shift();
    newArray.push(options);
  }
  return newArray;
};


const getPhotos = () => {
  const newPhotoArray = [];
  for(let i = 0; i < getRandomNumber(TYPE_PHOTOS.length); i++) {
    newPhotoArray.push(TYPE_PHOTOS[i]);
  }
  return newPhotoArray;
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
  address: `${newLocation().lat},${newLocation().lng}`,
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

const getAd = () => ({
  author: author(),
  newLocation:newLocation(),
  offer: offer(),
});

const createAd = Array.from({length: NEW_AD}, getAd);

export{createAd};
