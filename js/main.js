import './markup-generate.js';
import {activeFilter} from './status-form.js';
import './valid-form.js';
import {createMarker} from './markup-generate.js';
import {showAlert} from './util.js';
import {setAdverts} from './data.js';


fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json(),activeFilter()
  ).then((adverts) => {
    setAdverts(adverts);
    createMarker();
  }).catch(showAlert.message);

