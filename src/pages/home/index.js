import { Link } from "react-router-dom"
import styles from './styles.module.css'

const Home = () => {
  return <section className={styles.app}>
    <div className={styles.floatArea}>
      <h1>Productive Mind</h1>
      <span>Faça mais com menos</span>
      <Link to={"/app"} />
    </div>
  </section>
}

export default Home