import { Link } from 'react-router-dom'
import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import styles from './styles.module.css'

const AddTasks = () => {
  return <div className={containerStyles.page}>
    <div className={containerStyles.header}>
      <h1>Hoje</h1>
    </div>
    <span>adicione todas as suas atividades para hoje</span>
    <Link to="/new-task" className={buttonStyles.lineButton}><span className={styles.plus}>+</span> <span>adicionar</span></Link>
  </div>
}

export default AddTasks