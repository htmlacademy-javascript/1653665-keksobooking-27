import './data.js';
import './markup-generate.js';
import './status-form.js';
import './valid-form.js';

fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ad) => {
    console.log(ad);
  });

