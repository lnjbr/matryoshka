import getTiles from '../utils/getTiles'
import Tile from './Tile'
import styles from '../styles/Tile.module.css'
import React, { useState, useEffect } from 'react'
import _ from 'underscore'
import dictionary from '../utils/dict'
import getLetterDisplay from './LetterDisplay'
const Tiles = () => {
  const [setOfTiles, setSetOfTiles] = useState({})
  const [tileIndex, setTileIndex] = useState({ a: 0 })
  const [selectedLetters, setSelectedLetters] = useState({})
  const [isValidWord, setIsValidWord] = useState(null)
  const [pressedKey, setPressedKey] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key in tileIndex) console.log('match')
      if (tileIndex && selectedLetters && e.key in tileIndex) {
        // if (e.key.concat(tileIndex[e.key]) in selectedLetters) ? remove it : add it
      }
      setPressedKey(e.key.toUpperCase())
    }
    const handleKeyUp = () => setPressedKey('')

    setSetOfTiles(getTiles())
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    const cleanup = () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
    return cleanup
  }, [])
  useEffect(() => {
    getLetterDisplay()
    console.log('validity changed')
  }, [isValidWord])

  const getIsValidWord = () => {
    if (!(_.size(selectedLetters) > 1)) {
      console.log('setting to false')
      return false
    } else {
      const newWord = Object.keys(selectedLetters)
        .map((letter) => letter.at(0))
        .join('')
      const firstLetter = newWord.at(0)
      console.log('dict', dictionary[firstLetter][newWord.length])
      if (dictionary[firstLetter][newWord.length].indexOf(newWord) < 0)
        console.log(newWord, 'is fake')
      else console.log(newWord, 'is real')
      return dictionary[firstLetter][newWord.length].indexOf(newWord) >= 0
    }
  }

  return (
    <div>
      <div>
        <h3>Selected letter(s):</h3>{' '}
        {getLetterDisplay(selectedLetters, isValidWord)}
      </div>
      <div className={styles.tiles}>
        {_.size(setOfTiles) &&
          setOfTiles.map((t, index) => (
            <div
              key={t[0].concat(index)}
              onClick={() => {
                const newLetter = {}
                newLetter[t[0].concat(index)] = { letter: t[0], index: index }
                if (
                  _.size(selectedLetters) &&
                  t[0].concat(index) in selectedLetters
                ) {
                  delete selectedLetters[t[0].concat(index)]
                } else {
                  selectedLetters = {
                    ...selectedLetters,
                    ...newLetter,
                  }
                  console.log(t[0].concat(index), ' is being added')
                }
                setIsValidWord(getIsValidWord(selectedLetters))
              }}
              tabIndex={0}
            >
              {t[0] === pressedKey ? <p>a match</p> : <p>not a match</p>}
              <Tile
                altClassName={t[0] === pressedKey ? true : false}
                tile={{ letter: t[0], points: t[1] }}
                key={t[0].concat(index)}
              />
            </div>
          ))}
      </div>
      {_.size(selectedLetters) ? console.log(selectedLetters) : ''}

      <div className={styles.buttonSelection}>
        <button
          className={styles.newTilesButton}
          onClick={() => {
            setSetOfTiles(getTiles())
            setSelectedLetters({})
            setIsValidWord(null)
          }}
        >
          new tiles please
        </button>
        <button
          className={styles.returnTilesButton}
          onClick={() => {
            setSelectedLetters({})
            setIsValidWord(null)
          }}
        >
          return my tiles please
        </button>
      </div>
    </div>
  )
}
export default Tiles
