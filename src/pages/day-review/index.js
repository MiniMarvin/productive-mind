import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { categories, listTodayTasks } from '../../services/taskService'

const DayReview = () => {
  const [categorySplit, setCategorySplit] = useState({})

  useEffect(() => {
    const todayTasks = listTodayTasks()
    const priorityTasks = todayTasks.filter(task => task.priority != null)
    const fraction = Math.round(100/priorityTasks.length)
    const categoryParts = priorityTasks.reduce(
      (acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + fraction
        return acc
      }, {})
      setCategorySplit(categoryParts)
  }, [])

  const categoriesFragment = () => {
    return categories.map(category => {
      const name = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      const percentage = categorySplit[category] || 0
      return (
        <div className={styles.areaSection} key={`container-${category}`}>
          <h2>{name}</h2>
          <div className={styles.valueSection}>
            <ProgressBar now={percentage} label={`${percentage}%`} animated={true} />
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <section className={`${containerStyles.page} ${containerStyles.pageWithFooter}`}>
        <div className={containerStyles.header}>
          <h1>📊 Foco do dia</h1>
        </div>
        <span>Parabéns por priorizar, essa é a prioridade que você deu para cada área hoje</span>
        {categoriesFragment()}
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