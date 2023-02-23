import styles from '../styles/LetterDisplay.module.css'

const LetterDisplay = ({ selectedLetters, isValid }) => {
  if (selectedLetters)
    return (
      <>
        <div className={styles.LetterDisplay}>
          {Object.keys(selectedLetters).map((k, index) => (
            <div
              className={
                isValid
                  ? styles.validWord
                  : isValid !== null
                  ? styles.invalidWord
                  : styles.selectedLetter
              }
              key={index}
            >
              {selectedLetters[k].letter}
            </div>
          ))}
        </div>
      </>
    )
}
export default LetterDisplay
