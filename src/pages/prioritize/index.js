import {useState} from 'react'
import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import styles from './styles.module.css'
import * as taskService from '../../services/taskService'
import { Link } from 'react-router-dom'

/**
 * 
 * @param {{priorityCategory: string, backLink: string, nextLink: string}} props 
 * @returns 
 */
const Prioritize = (props) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null)

  const renderTasks = () => {
    const tasks = taskService.listTodayTasks()
    return tasks.map((task, idx) => {
      const action = () => {
        if (selectedTaskIndex === idx) setSelectedTaskIndex(null)
        else setSelectedTaskIndex(idx)
      }
      const style = selectedTaskIndex === idx ? buttonStyles.fullButton : buttonStyles.lineButton
      return <button key={`task-btn-${idx}`} className={style} onClick={action}>{task.name}</button>
    })
  }

  return (
    <>
      <section className={`${containerStyles.page} ${containerStyles.pageWithFooter}`}>
        <div className={containerStyles.header}>
          <h1>Priorize</h1>
        </div>
        <span>Qual dessas atividades é mais <b>{props.priorityCategory}</b>?</span>
        <div className={styles.tasks}>
          {renderTasks()}
        </div>
      </section>
      <section className={containerStyles.footer}>
        <div className={containerStyles.footerItem}>
          {props.backLink && <Link to={props.backLink} className={buttonStyles.backButton}>{'<'} voltar</Link>}
        </div>
        <div className={containerStyles.footerItem}>
          {props.nextLink && <Link to={props.nextLink} className={buttonStyles.backButton}>proxima {'>'}</Link>}
        </div>
      </section>
    </>
  )
}

export default Prioritize