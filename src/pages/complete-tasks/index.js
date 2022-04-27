import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { categories, listTodayTasks, setTask } from '../../services/taskService'
import { Toast } from 'react-bootstrap';

const CompleteTasks = () => {
  const [tasks, setTasks] = useState([])
  const [showUndo, setShowUndo] = useState(false)
  const [finishedTask, setFinishedTask] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const todayTasks = listTodayTasks()
    const priorityTasks = todayTasks.filter(task => task.priority != null && task.done == false)
    setTasks(priorityTasks)
  }, [])

  const finishTask = (task) => {
    console.log('finishing task: ', task.name)
    const modifiedTask = tasks.filter(t => t.name === task.name)[0]
    modifiedTask.done = true
    setTask(modifiedTask)
    setTasks([...tasks])
    setFinishedTask(modifiedTask)
    setShowUndo(true)
  }

  const unfinishLastTask = () => {
    if (finishedTask === null) return
    const modifiedTask = tasks.filter(t => t.name === finishedTask.name)[0]
    modifiedTask.done = false
    setTask(modifiedTask)
    setTasks([...tasks])
    setFinishedTask(null)
    setShowUndo(false)
  }

  const closePopup = () => {
    setShowUndo(false)
    setFinishedTask(null)
  }

  const tasksFragment = () => {
    console.log('rendering tasks')
    return categories.map(category => {
      const categoryTasks = tasks.filter(task => task.category === category && !task.done)
      const name = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      if (categoryTasks.length === 0) return null
      return (
        <div className={styles.areaSection} key={`container-${category}`}>
          <h2>{name}</h2>
          <div className={styles.taskSection}>
            {categoryTasks.map((task, taskId) => {
              return (
                <div className={styles.task} key={`category-${category}-task-${taskId}`}>
                  <button className={styles.finishTask} onClick={() => {
                    finishTask(task)
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

  const finishDay = () => {
    navigate('/finish-day')
  }

  const tasksText = () => {
    if (tasks.filter(task => !task.done).length === 0) {
      return (
        <>
          <h2>Parabéns! você terminou todas as tarefas que priorizou para seu dia! 🥳</h2>
          <span>Finalize o dia para poder visualizar o seu progresso!</span>
          <button className={buttonStyles.fullButton} onClick={finishDay}>finalizar dia</button>
        </>
      )
    }

    return <span>Parabéns por priorizar, essa é a prioridade que você deu para cada área hoje</span>
  }

  return (
    <>
      <section className={`${containerStyles.page} ${containerStyles.pageWithFooter}`}>
        <div className={containerStyles.header}>
          <h1>📚 Tarefas do dia</h1>
        </div>
        {tasksText()}
        {tasksFragment()}
      </section>
      <section className={containerStyles.footer}>
        <div className={containerStyles.footerItem}>
          <Link to="/day-review" className={buttonStyles.backButton}>{`<`} ver foco</Link>
        </div>
        <div />
        <div className={containerStyles.footerItem}>
          <Link to="/finish-day" className={buttonStyles.backButton}>finalizar dia {`>`}</Link>
        </div>
      </section>
      <section className={styles.toastSection}>
        <Toast show={showUndo} onClose={closePopup}>
          <Toast.Header>
            <span>✅ Tarefa Finalizada!</span>
          </Toast.Header>
          <Toast.Body>
            <button className={buttonStyles.fullButton} onClick={unfinishLastTask}>
              desfazer
            </button>
          </Toast.Body>
        </Toast>
      </section>
    </>
  )
}

export default CompleteTasks;