

export function getRandom (array) {
  return !!array && array[Math.floor(Math.random() * array.length)]
}

export function getRandomPercentage() {
  return Math.floor(Math.random()*100)
}

export function countItemInArray (array, item) {
  return array.filter( itemArray => item === itemArray).length;
}

//returns an array of random instances from array. length of array will range from min to max
export function getRandomRange(array, min, max) {

}

// skewPercentage% of the time, returns an item from "array" that are indexed at skewedIndexesArray. In concrete terms means that

//if array  [a, b, c, d, e, f]  skewedIndexesArray [1, 2] skewPercentage 90%
//90% of the time it will return either a or b. The rest of the time, it will return from the REST of the array. So you get 10% random from cdeg, not abcdef
export function getSkewedRandom(array, skewedIndexesArray, skewPercentage) {
  const skewedItems = array.filter(item => skewedIndexesArray.indexOf(array.indexOf(item)) > -1)
  const unSkewedItems = array.filter(item => skewedIndexesArray.indexOf(array.indexOf(item)) === -1)


    return getRandomPercentage() <= skewPercentage ? getRandom(skewedItems) : getRandom(unSkewedItems)


}

//makes sure that an array roughly respects the randomization rules. Returns a string that's a "report" of sorts
export function checkRandomizer(arrayOrigin, arrayResults, skewedIndexesArray, skewPercentage) {
  const arrayPercentages = [];

  arrayOrigin.forEach(item => arrayPercentages.push(arrayResults.filter(instance => instance === item).length))

  return arrayPercentages;
}