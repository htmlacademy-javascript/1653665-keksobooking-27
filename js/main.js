function getRandomInRange(min, max,decimalPoint = 0) {
  if(min < 0 || max < 0) {
    return NaN;
  }
  return Number((Math.random() * (max - min + 1) + min).toFixed(decimalPoint));

}

getRandomInRange(0, 100);
