const OFFER_COUNTS = 10;
const Price = {
  MIDDLE: 10000,
  HIGHT: 50000
};

const filterElement = document.querySelector('.map__filters');
const housingTypeField = filterElement.querySelector('#housing-type');
const housingPriceField = filterElement.querySelector('#housing-price');
const housingRoomsField = filterElement.querySelector('#housing-rooms');
const housingGuestsField = filterElement.querySelector('#housing-guests');
const featureCheckboxes = filterElement.querySelectorAll('.map__feature');

const offers = [];

const filterByType = (offer, type) => type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch(price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return (offer.offer.price < Price.HIGHT && offer.offer.price > Price.MIDDLE);
    case 'hight':
      return offer.offer.price >= Price.HIGHT;
  }
};

const filterByRooms = (offer, rooms) => rooms === 'any' || offer.offer.rooms === Number(rooms);

const filterByGuests = (offer, guests) => guests === 'any' || offer.offer.guests === Number(guests);

const filterByFeatures = (offer, features) => {
  if(!features.length) {
    return true;
  }

  if(!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};

const getFilteredOffers = () => {
  const selectedType = housingTypeField.value;
  const selectedPrice = housingPriceField.value;
  const selectedRooms = housingRoomsField.value;
  const selectedGuests = housingGuestsField.value;

  const selectedFeatures = [];
  featureCheckboxes.forEach((checkbox) => {
    if(checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];
  for(const offer of offers) {
    if(filteredOffers.length >= OFFER_COUNTS) {
      break;
    }
    if(
      filterByType(offer, selectedType) &&
      filterByPrice(offer, selectedPrice) &&
      filterByRooms(offer, selectedRooms) &&
      filterByGuests(offer, selectedGuests) &&
      filterByFeatures(offer, selectedFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const setOnFilterChange = (cb) => {
  filterElement.addEventListener('change', () => cb());
};

export{setOnFilterChange,getFilteredOffers};

