function getRandomInRange(min, max,decimalPoint) {
    if(min < 0 || max < 0) {
      return NaN;
    }
  return (Math.random() * (max - min + 1) + min).toFixed(decimalPoint);

}

console.log(getRandomInRange(0, 100,4));
