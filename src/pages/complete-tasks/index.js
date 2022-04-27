import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { categories, listTodayTasks, setTask } from '../../services/taskService'

const CompleteTasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const todayTasks = listTodayTasks()
    const priorityTasks = todayTasks.filter(task => task.priority != null && task.done == false)
    setTasks(priorityTasks)
  }, [])

  const finishTask = (taskId) => {
    tasks[taskId].done = true
    setTask(tasks[taskId])
    setTasks(tasks)
  }

  const tasksFragment = () => {
    return categories.map(category => {
      const categoryTasks = tasks.filter(task => task.category === category)
      const name = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      if (categoryTasks.length === 0) return null
      return (
        <div className={styles.areaSection} key={`container-${category}`}>
          <h2>{name}</h2>
          <div className={styles.taskSection}>
            {categoryTasks.map((task, taskId) => {
              return (
                <div className={styles.task}>
                  <button className={styles.finishTask} onClick={() => {
                    finishTask(taskId)
                  }} />
                  <span>{task.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <section className={`${containerStyles.page} ${containerStyles.pageWithFooter}`}>
        <div className={containerStyles.header}>
          <h1>📚 Tarefas do dia</h1>
        </div>
        <span>Parabéns por priorizar, essa é a prioridade que você deu para cada área hoje</span>
        {tasksFragment()}
      </section>
      <section className={containerStyles.footer}>
        <div className={containerStyles.footerItem}>
          <Link to="/day-review" className={buttonStyles.backButton}>{`<`} ver foco</Link>
        </div>
        <div />
      </section>
    </>
  )
}

export default CompleteTasks;