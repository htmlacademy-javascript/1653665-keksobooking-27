/*const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://27.javascript.pages.academy/keksobooking'
    );
    if(!response.ok) {
      throw new Error('Не удалось загрузить объявления');
    }

    const offers = await response.json;
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};*/
