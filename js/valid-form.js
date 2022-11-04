const roomsOption = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};

const adFormElement = document.querySelector('.ad-form');

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

const validatePrice = (price) => price >= 0 && price <= 100000;


pristine.addValidator(
  adFormElement.querySelector('#price'),
  validatePrice,
  'Максимальная цена 100 000'
);

const roomNumber = adFormElement.querySelector('[name ="rooms"]');
const capacity = adFormElement.querySelector('[name="capacity"]');

const validateRooms = () => roomsOption[roomNumber.value].includes(capacity.value);

const getRoomsErorMessage = () => `Комната(ы) ${roomNumber.value} не предназначен(ы) для ${capacity.value}`;

pristine.addValidator(roomNumber, validateRooms, getRoomsErorMessage);
pristine.addValidator(capacity, validateRooms, getRoomsErorMessage);

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
