const Rules = ({ ...props }) => (
  <p className={homeStyles.rules}>
    <span className={homeStyles.boldText}>rules: </span>
    like the dolls. this game's about making real words that keep being real
    words with every sequential letter added. let's take the word{' '}
    <span className={homeStyles.boldText}>"kite"</span> for instance.{' '}
    <span className={homeStyles.valid}>ki</span> (
    <span className={homeStyles.points}>6pts</span>),{' '}
    <span className={homeStyles.valid}>kit</span> (
    <span className={homeStyles.points}>7pts</span>), and{' '}
    <span className={homeStyles.valid}>kite</span> (
    <span className={homeStyles.points}>8pts</span>) are all valid words. so{' '}
    <span className={homeStyles.boldText}>"kite"</span> is a valid play that'll
    score ya <span className={homeStyles.points}>21 points</span>. and now let's
    take a look at the word <span className={homeStyles.boldText}>"earth"</span>
    . <span className={homeStyles.valid}>ea</span> (
    <span className={homeStyles.points}>2pts</span>) and{' '}
    <span className={homeStyles.valid}>ear</span> (
    <span className={homeStyles.points}>3pts</span>) are valid words! but{' '}
    <span className={homeStyles.invalid}>eart</span> (
    <span className={homeStyles.points}>4pts</span>) is not, so the entire word
    becomes invalidated.
  </p>
)

export default Rules
