import{activeForm} from './status-form.js';
import{createAd} from './data.js';


const adressInput = document.querySelector('#address');
const resetButton = document.querySelector('[type="reset"]');
const typeApart = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',

};


const map = L.map('map-canvas')
  .on('load', () => {
    activeForm();
  })
  .setView({
    lat: 35.681217,
    lng : 139.753596
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl:'./img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26,52],

});

const subPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40,40],
  iconAnchor:[23,40]
});

const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');

const createCustomPopup = (newAd) => {
  const popupElement = balloonTemplate.cloneNode(true);
  const featureList = popupElement.querySelectorAll('.popup__feature');
  const featureItems = newAd.offer.features;

  popupElement.querySelector('.popup__avatar').src = newAd.author.avatar;
  popupElement.querySelector('.popup__title').textContent = newAd.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = newAd.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${newAd.offer.price } ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = typeApart[newAd.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${newAd.offer.rooms} комнаты для ${newAd.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${newAd.offer.checkin}, выезд до ${newAd.offer.checkout}`;
  popupElement.querySelector('.popup__description').textContent = newAd.offer.description;
  newAd.offer.photos.forEach((photos) => {
    const photosContainer = document.createElement('img');
    photosContainer.classList.add('popup__photo');
    photosContainer.width = 45;
    photosContainer.height = 40;
    photosContainer.alt = 'Фотография жилья';
    photosContainer.src = photos;
    popupElement.querySelector('.popup__photos').append(photosContainer);
  });

  featureList.forEach((featureListItem) => {
    const isNecessary = featureItems.some(
      (featureItem) => featureListItem.classList.contains(`popup__feature--${featureItem}`),
    );
    if (!isNecessary) {
      featureListItem.classList.add('hidden');
    } else {
      featureListItem.classList.remove('hidden');
    }
  });
  return popupElement;
};


const mainPinMarker = L.marker(
  {
    lat: 35.681217,
    lng: 139.753596
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinate = evt.target.getLatLng();
  adressInput.value = `${coordinate.lat.toFixed(5)},${coordinate.lng.toFixed(5)}`;
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.681217,
    lng: 139.753596
  });

  map.setView({
    lat: 35.681217,
    lng: 139.753596
  }, 12);
});

createAd.forEach((ad) =>{
  const subPinMarker = L.marker({
    lat: ad.newLocation.lat,
    lng: ad.newLocation.lng,
  },
  {
    icon: subPinIcon,
  });
  subPinMarker
    .addTo(map)
    .bindPopup(createCustomPopup(ad));
});
