import styles from '../styles/Buttons.module.css'

const Button = ({ ...props }) => (
  <button className={styles.button} onClick={props.onClick}>
    {props.children}
  </button>
)

export default Button
