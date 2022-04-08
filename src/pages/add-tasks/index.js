import { Link } from 'react-router-dom'
import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import styles from './styles.module.css'
import * as taskService from '../../services/taskService'

const AddTasks = () => {
  const renderTasks = () => {
    const tasks = taskService.listTodayTasks()
    return tasks.map((task, idx) => {
      const link = `/edit-task?name=${encodeURIComponent(task.name)}&category=${encodeURIComponent(task.category)}`
      return <Link to={link} key={`task-link-${idx}`}>{task.name}</Link>
    })
  }
  
  return <div className={containerStyles.page}>
    <div className={containerStyles.header}>
      <h1>Hoje</h1>
    </div>
    <span>adicione todas as suas atividades para hoje</span>
    <Link to="/new-task" className={buttonStyles.lineButton}><span className={styles.plus}>+</span> <span>adicionar</span></Link>
    <section className={styles.tasks}>
      {renderTasks()}
    </section>
  </div>
}

export default AddTasks