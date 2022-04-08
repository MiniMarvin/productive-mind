import { Link } from "react-router-dom"
import styles from './styles.module.css'
import buttonStyles from '../../components/buttons.module.css'

const Home = () => {
  return <section className={styles.app}>
    <div className={styles.floatArea}>
      <h1>Productive Mind</h1>
      <span>Faça mais com menos</span>
      <div className={styles.buttonContainer}>
        <Link to={"/app"} className={buttonStyles.fullButton}>Seguir para o app</Link>
      </div>
    </div>
  </section>
}

export default Home