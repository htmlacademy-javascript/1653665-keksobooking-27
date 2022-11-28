import{activeForm} from './status-form.js';
import{sliderElement,adFormElement,returnImg} from './valid-form.js';
import{
  getAdvertFilter,
  typeFilterElement,
  priceFilterElement,
  roomsFilterElement,
  guestsFilterElement,
  featuresCheckboxes,
  featuresFilterArrays
} from './filter.js';
import{state} from './data.js';
import{debounce} from './util.js';

const ADVERTS_COUNT = 10;
const RERENDER_DELAY = 500;
const MAP_ZOOM = 12;
const LOCATION_TOKYO = {
  lat: 35.6895,
  lng: 139.692,
};
const mapFilters = document.querySelector('.map__filters');
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
    lat: LOCATION_TOKYO.lat,
    lng : LOCATION_TOKYO.lng
  }, MAP_ZOOM);

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
  if(newAd.offer.photos) {
    const fragment = document.createDocumentFragment();
    newAd.offer.photos.forEach((photos) => {
      const photosContainer = document.createElement('img');
      photosContainer.classList.add('popup__photo');
      photosContainer.width = 45;
      photosContainer.height = 40;
      photosContainer.alt = 'Фотография жилья';
      photosContainer.src = photos;
      fragment.append(photosContainer);
    });
    popupElement.querySelector('.popup__photos').append(fragment);
  }

  if(newAd.offer.features) {
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
  }
  return popupElement;
};


const mainPinMarker = L.marker(
  LOCATION_TOKYO,
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

const setMainPinCoordinate = ({lat,lng}) => {
  mainPinMarker.setLatLng({
    lat: lat,
    lng: lng
  });
  map.setView({
    lat: lat,
    lng: lng
  }, MAP_ZOOM);
};

const setAddress = ({lat,lng}) => {
  adressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const markerGroup = L.layerGroup().addTo(map);


const createMarker = () => {
  const filterAdverts = [];
  for (const advert of state.adverts) {
    if (filterAdverts.length >= ADVERTS_COUNT) {
      break;
    }

    if (getAdvertFilter(advert)) {
      filterAdverts.push(advert);
    }
  }

  filterAdverts.forEach(({ location, offer, author }) => {
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: subPinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(createCustomPopup({ offer, author }));
  });
};

const createMarkerWithDebounce = debounce(() => createMarker(state.adverts), RERENDER_DELAY);

const onUpdateMapMarker = () => {
  markerGroup.clearLayers();
  createMarkerWithDebounce();
};

//сброс карты
const updateMap = () => {
  mainPinMarker.setLatLng(LOCATION_TOKYO);
  map.setView(LOCATION_TOKYO, MAP_ZOOM);
  onUpdateMapMarker();
};

const setAddressDefault = () =>
  (adressInput.value = `${LOCATION_TOKYO.lat}, ${LOCATION_TOKYO.lng}`);

typeFilterElement.addEventListener('change', onUpdateMapMarker);
priceFilterElement.addEventListener('change', onUpdateMapMarker);
roomsFilterElement.addEventListener('change', onUpdateMapMarker);
guestsFilterElement.addEventListener('change', onUpdateMapMarker);
featuresCheckboxes.forEach((item) =>
  item.addEventListener('change', () => {
    if (item.checked) {
      featuresFilterArrays.push(item.value);
    } else {
      featuresFilterArrays.splice(featuresFilterArrays.indexOf(item.value, 0), 1);
    }
    onUpdateMapMarker();
  }),
);

const restMarkers = () => {
  setAddressDefault();
  updateMap();
};

const resetForm = () => {
  returnImg();
  adFormElement.reset();
  mapFilters.reset();
  sliderElement.noUiSlider.set(0);
  map.closePopup();
  restMarkers();
};

resetButton.addEventListener('click', () => {
  resetForm();
});


export {setMainPinCoordinate,resetForm,setAddress, createMarker};
