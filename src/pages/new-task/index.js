import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import inputStyles from '../../components/inputs.module.css'
import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import * as taskService from '../../services/taskService'

const emptyString = (string) => {
  return !(string !== null && string.replace(' ', '') !== '')
}

const NewTask = () => {
  let [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null)
  const inputRef = useRef()
  const navigate = useNavigate()

  const renderButtons = () => {
    return taskService.categories.map((category, idx) => {
      const selectButton = () => {
        if (selectedCategoryIndex !== idx) setSelectedCategoryIndex(idx)
        else setSelectedCategoryIndex(null)
      }

      const buttonStyle = selectedCategoryIndex === idx ? buttonStyles.fullButton : buttonStyles.lineButton

      return (
        <div className={styles.buttonContainer} key={`category-button-${idx}`}>
          <button className={buttonStyle} onClick={selectButton}>{category}</button>
        </div>
      )
    })
  }

  const saveItem = () => {
    const taskName = inputRef.current.value
    const task = {
      name: taskName,
      category: taskService.categories[selectedCategoryIndex],
      done: false
    }
    taskService.setTask(task)
    navigate('/add-tasks')
  }

  const isButtonEnabled = selectedCategoryIndex !== null && !emptyString(inputRef.current.value)

  return <main className={containerStyles.page}>
    <Link to="/add-tasks" className={buttonStyles.backButton}>{'<'} voltar</Link>
    <div className={containerStyles.header}>
      <h1>Nova Atividade</h1>
    </div>
    <span>descreva a atividade e sua categoria</span>
    <input type="text" className={inputStyles.input} placeholder="nova atividade..." ref={inputRef}></input>
    <section className={styles.buttons}>
      {renderButtons()}
    </section>
    <section className={styles.save}>
      <button className={buttonStyles.fullButton} onClick={saveItem} disabled={!isButtonEnabled}>salvar</button>
    </section>
  </main>
}

export default NewTask