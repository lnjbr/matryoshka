import homeStyles from '../styles/Home.module.css'
import Tile from '../components/Tile'
import tileStyles from '../styles/Tile.module.css'
import React, { useState, useEffect } from 'react'
import getTiles from '../utils/getTiles'
import validateAndScoreWord from '../utils/validateAndScoreWord'
import LetterDisplay from '../components/LetterDisplay'
import buttonStyles from '../styles/Buttons.module.css'
import Button from '../components/Button'
import Head from 'next/head'
import _ from 'underscore'

export default function Home() {
  const [handOfTiles, setHandOfTiles] = useState({})
  const [selectedLetters, setSelectedLetters] = useState({})
  const [wordStats, setWordStats] = useState(null)
  const [pressedKey, setPressedKey] = useState('')

  useEffect(() => {
    setHandOfTiles(getTiles())
    // TODO: add ability to play with keyboard
    const handleKeyDown = (e) => setPressedKey(e.key.toUpperCase())
    const handleKeyUp = () => setPressedKey('')

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    const cleanup = () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
    return cleanup
  }, [])

  const handleTileClick = (t, index) => {
    const newLetter = {}
    newLetter[t[0].concat(index)] = { letter: t[0], points: t[1], index: index }
    if (_.size(selectedLetters) && t[0].concat(index) in selectedLetters) {
      delete selectedLetters[t[0].concat(index)]
    } else {
      selectedLetters = {
        ...selectedLetters,
        ...newLetter,
      }
    }
    setSelectedLetters({ ...selectedLetters })
    setWordStats(validateAndScoreWord(selectedLetters))
  }

  const clearCurrentSelection = () => {
    setSelectedLetters({})
    setWordStats(null)
  }
  const newHand = () => {
    setHandOfTiles(getTiles())
    clearCurrentSelection()
  }

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Matryoshka</title>
        <link rel="icon" href="/matryoshka.png" />
      </Head>
      <div className={homeStyles.title}>
        <img
          className={homeStyles.logo}
          src="/matryoshka.png"
          alt="red scribble logo"
          width="50px"
          height="50px"
        />
        <h1 className={homeStyles.name}>Matryoshka</h1>
      </div>
      <p className={homeStyles.rules}>
        <span className={homeStyles.boldText}>rules: </span>
        like the dolls. this game's about making real words that keep being real
        words with every sequential letter added.
        {/* </p>

      <p className={homeStyles.rules}> */}
        let's take the word <span className={homeStyles.boldText}>"kite"</span>{' '}
        for instance. <span className={homeStyles.valid}>ki</span> (
        <span className={homeStyles.points}>6pts</span>),{' '}
        <span className={homeStyles.valid}>kit</span> (
        <span className={homeStyles.points}>7pts</span>), and{' '}
        <span className={homeStyles.valid}>kite</span> (
        <span className={homeStyles.points}>8pts</span>) are all valid words. so{' '}
        <span className={homeStyles.boldText}>"kite"</span> is a valid play
        that'll score ya <span className={homeStyles.points}>21 points</span>.
        {/* </p>

      <p className={homeStyles.rules}> */}
        and now let's take a look at the word{' '}
        <span className={homeStyles.boldText}>"earth"</span>.{' '}
        <span className={homeStyles.valid}>ea</span> (
        <span className={homeStyles.points}>2pts</span>) and{' '}
        <span className={homeStyles.valid}>ear</span> (
        <span className={homeStyles.points}>3pts</span>) are valid words! but{' '}
        <span className={homeStyles.invalid}>eart</span> (
        <span className={homeStyles.points}>4pts</span>) is not, so the entire
        word becomes invalidated.
      </p>
      <h6>
        score:{' '}
        {wordStats ? wordStats.score : 'play at least two letters to find out'}
      </h6>
      <h3>Selected letter(s):</h3>

      {/* Letter Display */}
      <LetterDisplay
        selectedLetters={selectedLetters}
        isValid={wordStats ? wordStats.isValid : null}
        // getScore={getScore(selectedLetters)}
      />

      {/*  Tiles */}
      <div className={tileStyles.tiles}>
        {_.size(handOfTiles) &&
          handOfTiles.map((t, index) => (
            <div
              key={t[0].concat(index)}
              onClick={() => handleTileClick(t, index)}
              tabIndex={0}
            >
              <Tile
                altClassName={t[0] === pressedKey ? true : false}
                tile={{ letter: t[0], points: t[1], index: index }}
                key={t[0].concat(index)}
              />
            </div>
          ))}
      </div>

      {/* Buttons */}
      <div className={buttonStyles.buttonLayout}>
        <Button onClick={() => newHand()}> new tiles please</Button>
        <Button onClick={() => clearCurrentSelection()}>
          return my tiles please
        </Button>
      </div>
    </div>
  )
}
