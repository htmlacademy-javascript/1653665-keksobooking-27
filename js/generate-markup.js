import {createAd} from './data.js';
const typeApart = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',

};


const innerMap = document.querySelector('#map-canvas');
const generateMarkup = document.querySelector('#card').content.querySelector('.popup');

const moreAd = createAd[0];

const newAd = generateMarkup.cloneNode(true);
const featureList = newAd.querySelectorAll('.popup__feature');
const featureItems = moreAd.offer.features;

newAd.querySelector('.popup__title').textContent = moreAd.offer.title;
newAd.querySelector('.popup__text--address').textContent = moreAd.offer.address;
newAd.querySelector('.popup__text--price').textContent = `${moreAd.offer.price } ₽/ночь`;
newAd.querySelector('.popup__type').textContent = typeApart[moreAd.offer.type];
newAd.querySelector('.popup__text--capacity').textContent = `${moreAd.offer.rooms} комнаты для ${moreAd.offer.guests} гостей`;
newAd.querySelector('.popup__text--time').textContent = `Заезд после ${moreAd.offer.checkin}, выезд до ${moreAd.offer.checkout}`;

newAd.querySelector('.popup__description').textContent = moreAd.offer.description;
newAd.querySelector('.popup__avatar').src = moreAd.author.avatar;
moreAd.offer.photos.forEach((photos) => {
  const photosContainer = document.createElement('img');
  photosContainer.classList.add('popup__photo');
  photosContainer.width = 45;
  photosContainer.height = 40;
  photosContainer.alt = 'Фотография жилья';
  photosContainer.src = photos;
  newAd.querySelector('.popup__photos').append(photosContainer);
});


featureList.forEach((featureListItem) => {
  const isNecessary = featureItems.some(
    (featureItem) => featureListItem.classList.contains(`popup__feature--${ featureItem}`),
  );


  if (!isNecessary) {
    featureListItem.remove();
  }
});

innerMap.appendChild(newAd);

