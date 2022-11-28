import {slider} from './valid-form.js';

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFieldsets = adForm.querySelectorAll('fieldset');
const formElement = document.querySelector('.map__features');
const fieldsetElements = formElement.querySelectorAll('input, select, div.ad-form__slider');


const unActiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFieldsets.forEach((adFieldset) => {
    adFieldset.disabled = true;
  });
};

const activeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  slider();
  adFieldsets.forEach((adFieldset) => {
    adFieldset.disabled = false;
  });
};

const unActiveFilter = () => {
  mapFilter.classList.add('ad-form--disabled');
  for(const fieldsetElement of fieldsetElements ) {
    fieldsetElement.disabled = true;
  }
};

const activeFilter = () => {
  mapFilter.classList.remove('ad-form--disabled');
  for(const fieldsetElement of fieldsetElements ) {
    fieldsetElement.disabled = false;
  }
};

unActiveForm();
unActiveFilter();

export{activeForm,activeFilter};
