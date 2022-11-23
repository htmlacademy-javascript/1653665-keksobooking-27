import './data.js';
import './markup-generate.js';
import './status-form.js';
import './valid-form.js';
import {renderingAds} from './markup-generate.js';
import {showAlert} from './util.js';
import {setOnFilterChange,getFilteredOffers} from './filter.js';


fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ad) => {
    renderingAds(ad);
    setOnFilterChange(() => getFilteredOffers(ad));
  }).catch(showAlert.message);

