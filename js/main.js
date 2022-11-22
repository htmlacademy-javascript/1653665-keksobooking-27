import './data.js';
import './markup-generate.js';
import './status-form.js';
import './valid-form.js';
import {renderingAds} from './markup-generate.js';
import {showAlert} from './util.js';

const NEW_AD = 10;
fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ad) => {
    renderingAds(ad.slice(0, NEW_AD));
  }).catch(showAlert.message);

