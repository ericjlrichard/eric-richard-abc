

//Capitalizes all words of a string
exports.capitalize = (string) => {

  console.log(string)

  if (!string) {
    return "";
  }
  const wordsArray = string.split(" ")

  const wordsArrayReturn = wordsArray.map(word => {
    return word.substring(0, 1).toUpperCase() + word.substring(1, word.length)
  })

  return wordsArrayReturn.join(" ")
}