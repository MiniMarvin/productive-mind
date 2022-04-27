import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

const DayReview = () => {
  return (
    <>
      <section className={`${containerStyles.page} ${containerStyles.pageWithFooter}`}>
        <div className={containerStyles.header}>
          <h1>📊 Foco do dia</h1>
        </div>
        <span>Parabéns por priorizar, essa é a prioridade que você deu para cada área hoje</span>
        <div className={styles.areaSection}>
          <h2>Estudo</h2>
          <div className={styles.valueSection}>
            <ProgressBar now={60} animated={true} />
          </div>
        </div>
        <div className={styles.areaSection}>
          <h2>Carreira</h2>
          <div className={styles.valueSection}>
            <ProgressBar now={60} animated={true} />
          </div>
        </div>
        <div className={styles.areaSection}>
          <h2>Pessoal</h2>
          <div className={styles.valueSection}>
            <ProgressBar now={60} animated={true} />
          </div>
        </div>
      </section>
      <section className={containerStyles.footer}>
        <div />
        <div className={containerStyles.footerItem}>
          <Link to="/prioritize/1" className={buttonStyles.backButton}>avançar {`>`}</Link>
        </div>
      </section>
    </>
  )
}

export default DayReview;