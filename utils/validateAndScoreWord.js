import dictionary from './dict'
import _ from 'underscore'

const validateAndScoreWord = (selectedLetters) => {
  if (!(_.size(selectedLetters) > 1)) return
  else {
    const word = Object.keys(selectedLetters).map((letter) => letter.at(0))
    const points = {}
    Object.keys(selectedLetters).map((letter) => {
      points[letter.at(0)] = selectedLetters[letter]['points']
    })

    const firstLetter = word.at(0)
    const subWord = word
    let isValid = true
    let score = 0

    while (isValid && subWord.length >= 2) {
      subWord.forEach((letter) => {
        score += points[letter]
      })
      const index = dictionary[firstLetter][subWord.length]?.indexOf(
        subWord.join('')
      )
      isValid = index !== undefined && index !== -1
      subWord.pop()
    }
    return isValid && subWord.length === 1
      ? { isValid: true, score: score }
      : { isValid: false, score: 'your play counts for jack shit! try again' }
  }
}

export default validateAndScoreWord
