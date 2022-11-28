const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapFeatures = document.querySelector('.map__features');
const sliderElement = document.querySelector('.ad-form__slider');



const unActiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
  sliderElement.classList.add('ad-form--disabled');
  mapFeatures.disabled = true;
  adFieldsets.forEach((adFieldset) => {
    adFieldset.disabled = true;
  });
};

const activeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');
  sliderElement.classList.remove('ad-form--disabled');
  mapFeatures.disabled = false;
  adFieldsets.forEach((adFieldset) => {
    adFieldset.disabled = false;
  });
};

const unActiveFilter = () => {
  mapFilter.classList.add('ad-form--disabled');
  mapFeatures.disabled = true;
};

const activeFilter = () => {
  mapFilter.classList.remove('ad-form--disabled');
  mapFeatures.disabled = false;
};

unActiveForm();
unActiveFilter();

export{activeForm,activeFilter};
