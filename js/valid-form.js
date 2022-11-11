const roomsOption = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};

const apartOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const apartType = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'hotel': 'Отель',
  'house': 'Дом',
  'palace': 'Дворец'
};

const adFormElement = document.querySelector('.ad-form');
const typeApart = adFormElement.querySelector('[name="type"]');
const priceElement = adFormElement.querySelector('[name="price"]');
const timeIn = adFormElement.querySelector('#timein');
const timeOut = adFormElement.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
},
true,
);

const validateHeading = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  adFormElement.querySelector('#title'),
  validateHeading,
  'Заголовок от 30 до 100 символов'
);


const onSync = () => pristine.validate([priceElement, typeApart]);
const onChangeProper = () => {
  priceElement.placeholder = apartOption[typeApart.value];
  priceElement.min = apartOption[typeApart.value];
  onSync();
};

typeApart.addEventListener('change', onChangeProper);

const validatePrice = () => priceElement.value >= apartOption[typeApart.value];
const validatePriceFill = () => priceElement.value;
const getPriceOptionErrorMessage = () => `Для типа "${apartType[typeApart.value]}" цена выше ${apartOption[typeApart.value]}`;

pristine.addValidator(priceElement, validatePrice, getPriceOptionErrorMessage);
pristine.addValidator(typeApart, validatePriceFill);

const roomNumber = adFormElement.querySelector('[name ="rooms"]');
const capacity = adFormElement.querySelector('[name="capacity"]');

const validateRooms = () => roomsOption[roomNumber.value].includes(capacity.value);

const getRoomsErorMessage = () => `Комната(ы) ${roomNumber.value} не предназначен(ы) для ${capacity.value}`;

pristine.addValidator(roomNumber, validateRooms, getRoomsErorMessage);
pristine.addValidator(capacity, validateRooms, getRoomsErorMessage);

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
