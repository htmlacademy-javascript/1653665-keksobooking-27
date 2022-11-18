const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFieldsets = adForm.querySelectorAll('fieldset');


const unActiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
  adFieldsets.forEach((adFieldset) => {
    adFieldset.disabled = true;
  });
};

const activeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');
  adFieldsets.forEach((adFieldset) => {
    adFieldset.disabled = false;
  });
};

unActiveForm();

export{activeForm};
