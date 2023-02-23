import styles from '../styles/Buttons.module.css'

const Buttons = ({ resetGame, resetPlay }) => {
  return (
    <div className={styles.buttonLayout}>
      <button className={styles.button} onClick={() => resetGame()}>
        new tiles please
      </button>
      <button className={styles.button} onClick={() => resetPlay()}>
        return my tiles please
      </button>
    </div>
  )
}
export default Buttons
