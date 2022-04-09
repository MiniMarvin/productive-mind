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
      return <Link to={link} key={`task-link-${idx}`} className={buttonStyles.lineButton}>{task.name}</Link>
    })
  }
  
  return (
    <>
      <section className={`${containerStyles.page} ${containerStyles.pageWithFooter}`}>
        <div className={containerStyles.header}>
          <h1>Hoje</h1>
        </div>
        <span>adicione todas as suas atividades para hoje</span>
        <Link to="/new-task" className={buttonStyles.lineButton}><span className={styles.plus}>+</span> <span>adicionar</span></Link>
        <div className={styles.tasks}>
          {renderTasks()}
        </div>
      </section>
      <section className={containerStyles.footer}>
        <div />
        <div className={containerStyles.footerItem}>
          <Link to="/prioritize/1" className={buttonStyles.backButton}>próximo {`>`}</Link>
        </div>
      </section>
    </>
  )
}

export default AddTasks