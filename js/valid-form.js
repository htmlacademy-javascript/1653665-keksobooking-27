import {showSuccessMessage,showErrorMessage } from './message.js';
import {setMainPinCoordinate,resetForm,setAddress} from './markup-generate.js';
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


const START_COORDINATE = {
  lat: 35.681217,
  lng: 139.753596
};

const FILE_TYPES = ['gif','jpg','jpeg','png'];

const sliderElement = document.querySelector('.ad-form__slider');
const avatarElement = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const avatarImage = document.querySelector('.ad-form-header__preview img');
const fileElement = document.querySelector('#images');
const filePreview = document.querySelector('.ad-form__photo');
const adFormElement = document.querySelector('.ad-form');
const typeApart = adFormElement.querySelector('[name="type"]');
const priceElement = adFormElement.querySelector('[name="price"]');
const timeIn = adFormElement.querySelector('#timein');
const timeOut = adFormElement.querySelector('#timeout');


const resetCoordinate = () => {
  setMainPinCoordinate(START_COORDINATE);
  setAddress(START_COORDINATE);
};

const onSendDataSuccess = () => {
  resetForm();
  resetCoordinate();
  showSuccessMessage();
};


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
  const isValidate = pristine.validate();
  if(isValidate){
    const formData = new FormData(evt.target);

    fetch(
      'https://27.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    ).then(onSendDataSuccess).catch(showErrorMessage);
  }
});


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed();
    },
    from: function (value) {
      return parseFloat(value);
    }
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('input', () => {
  sliderElement.noUiSlider.updateOptions({
    start: priceElement.value,
  });
});

avatarElement.addEventListener('change', () =>{
  const file = avatarElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    avatarImage.remove();
    avatarPreview.innerHTML = '';
    const image = document.createElement('img');
    avatarPreview.style.padding = '0';
    image.src = URL.createObjectURL(file);
    image.style.width = '60px';
    image.style.heing = '60px';
    avatarPreview.append(image);
  }
});

fileElement.addEventListener('change', () => {
  const file = fileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    filePreview.innerHTML = '';
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.maxWidth = '100%';
    image.style.height = 'auto';
    filePreview.append(image);
  }
});

export {sliderElement,adFormElement};
