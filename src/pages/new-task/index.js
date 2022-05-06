import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import styles from './styles.module.css'
import inputStyles from '../../components/inputs.module.css'
import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import * as taskService from '../../services/taskService'

const emptyString = (string) => {
  return !(string !== null && string.replace(' ', '') !== '')
}

const NewTask = (props) => {
  let [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null)
  const inputRef = useRef()
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();
  const defaultTask = {
    name: searchParams.get('name'),
    category: searchParams.get('category'),
    done: false
  }

  useEffect(() => {
    const taskNumber = taskService.getCategoryNumber(searchParams.get('category'))
    setSelectedCategoryIndex(taskNumber)
  }, [searchParams])

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
    console.log('will save task:', task)
    taskService.setTask(task)
    navigate('/add-tasks')
  }

  const deleteItem = () => {
    taskService.removeTask(defaultTask.name)
    navigate('/add-tasks')
  }

  const updateItem = () => {
    taskService.removeTask(defaultTask.name)
    saveItem()
  }

  const isButtonEnabled = selectedCategoryIndex != null && !emptyString(inputRef.current.value)

  return <main className={containerStyles.page}>
    <Link to="/add-tasks" className={buttonStyles.backButton}>{'<'} voltar</Link>
    <div className={containerStyles.header}>
      <h1>Nova Atividade</h1>
    </div>
    <span>descreva a atividade e sua categoria</span>
    <input type="text" className={inputStyles.input}
      placeholder="nova atividade..." ref={inputRef}
      defaultValue={defaultTask.name}></input>
    <div className={styles.buttons}>
      {renderButtons()}
    </div>
    <div className={styles.save}>
      <button className={buttonStyles.fullButton} onClick={props.edit ? updateItem : saveItem}
        disabled={!isButtonEnabled}>salvar</button>
    </div>

    {props.edit && <div className={styles.delete}>
      <button className={`${buttonStyles.fullButton} ${buttonStyles.destroy}`} onClick={deleteItem}
        disabled={!isButtonEnabled}>remover</button>
    </div>}
  </main>
}

export default NewTask