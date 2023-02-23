import tileBag from './tileBag'
import _ from 'underscore'

const getTiles = () => {
  const remainingLetters = []
  for (const tile in tileBag) {
    remainingLetters.push(...Array(tileBag[tile].amount).fill(tile))
  }
  const letters = _.sample(remainingLetters, 8)
  const points = letters.map((letter) => tileBag[letter].points)
  return _.zip(letters, points) // same as `letters.map((letter, n) => [letter, points[n]])`
}
export default getTiles
