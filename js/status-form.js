const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelectorAll('.map__filter');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapFeatures = document.querySelector('.map__features');


const unActiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFieldsets.forEach((adFieldset) => {
    adFieldset.disabled = true;
  });
};

const activeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFieldsets.forEach((adFieldset) => {
    adFieldset.disabled = false;
  });
};

const unActiveFilter = () => {
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = true;
  });
  mapFeatures.disabled = true;
};

const activeFilter = () => {
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = false;
  });
  mapFeatures.disabled = false;
};

unActiveForm();
unActiveFilter();

export{activeForm,activeFilter};
