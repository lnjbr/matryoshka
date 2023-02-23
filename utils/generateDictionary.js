const fs = require('fs')
const words = fs
  .readFileSync('./utils/wordList.txt', 'utf8')
  .toString()
  .split('\n')

const dict = {}

words.forEach((word) => {
  const firstLetter = word.charAt(0)
  const length = word.length
  // TODO: in the same vein as cutting out the greater than 8s,
  //  I could probably cut out every word that is impossible in this game
  //  e.g. cramp—where 'cr' will always invalidate it
  if (length > 8) return
  if (firstLetter in dict) {
    length in dict[firstLetter]
      ? dict[firstLetter][length].push(word)
      : (dict[firstLetter][length] = [word])
  } else {
    let wordLength = {}
    wordLength[length] = [word]
    dict[firstLetter] = wordLength
  }
})
fs.writeFile('dict.json', JSON.stringify(dict), function (err) {
  if (err) throw err
  console.log('complete')
})
