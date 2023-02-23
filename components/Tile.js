import styles from '../styles/Tile.module.css'

const Tile = ({ ...props }) => {
  return (
    <div className={props.altClassName ? styles.downKey : styles.tile}>
      <div className={styles.letter}>
        {props.tile.letter}
        <span className={styles.points}>{props.tile.points}</span>
      </div>
    </div>
  )
}
export default Tile
