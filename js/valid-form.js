import {showSuccessMessage,showErrorMessage } from './message.js';
import {setMainPinCoordinate,resetForm,setAddress} from './markup-generate.js';

const ROOMS_OPTION = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};

const APART_OPTION = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const APART_TYPE = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'hotel': 'Отель',
  'house': 'Дом',
  'palace': 'Дворец'
};


const START_COORDINATE = {
  lat: 35.6895,
  lng: 139.692
};

const MIN_LENGTH_NAME = 30;
const MAX_LENGTH_NAME = 100;
const MAX_PRICE = 100000;

const FILE_TYPES = ['gif','jpg','jpeg','png'];

const addressInServer = 'https://27.javascript.pages.academy/keksobooking';


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
const roomNumber = adFormElement.querySelector('[name ="rooms"]');
const capacity = adFormElement.querySelector('[name="capacity"]');


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

const validateHeading = (value) => value.length >= MIN_LENGTH_NAME && value.length <= MAX_LENGTH_NAME;

pristine.addValidator(
  adFormElement.querySelector('#title'),
  validateHeading,
  'Заголовок от 30 до 100 символов'
);


const onSync = () => pristine.validate([priceElement, typeApart]);
const onChangeProper = () => {
  priceElement.placeholder = APART_OPTION[typeApart.value];
  priceElement.min = APART_OPTION[typeApart.value];
  onSync();
};

typeApart.addEventListener('change', onChangeProper);

const validatePrice = () => priceElement.value >= APART_OPTION[typeApart.value];
const validatePriceFill = () => priceElement.value;
const getPriceOptionErrorMessage = () => `Для типа "${APART_TYPE[typeApart.value]}" цена выше ${APART_OPTION[typeApart.value]}`;

pristine.addValidator(priceElement, validatePrice, getPriceOptionErrorMessage);
pristine.addValidator(typeApart, validatePriceFill);


const validateRooms = () => ROOMS_OPTION[roomNumber.value].includes(capacity.value);

const getRoomsErorMessage = () => `Комната(ы) ${roomNumber.value} не предназначен(ы) для ${capacity.value}`;

pristine.addValidator(roomNumber, validateRooms, getRoomsErorMessage);
pristine.addValidator(capacity, validateRooms, getRoomsErorMessage);


adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValidate = pristine.validate();
  if(isValidate){
    const formData = new FormData(evt.target);

    fetch(addressInServer,
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if(response.ok) {
        onSendDataSuccess();
      } else {
        showErrorMessage();
      }
    }).catch(showErrorMessage);
  }
});

const getSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: MAX_PRICE,
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
};
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
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.maxWidth = '100%';
    image.style.height = 'auto';
    filePreview.append(image);
  }
});


const returnImg = () => {
  avatarPreview.innerHTML = '';
  filePreview.innerHTML = '';
  const image = document.createElement('img');
  avatarPreview.style.padding = '0 15px';
  image.src = './img/muffin-grey.svg';
  image.style.width = '40px';
  image.style.heing = '40px';
  avatarPreview.append(image);
};

export {getSlider,adFormElement,returnImg, onSendDataSuccess,sliderElement};
