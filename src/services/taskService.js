/**
 * @typedef {{name: string, done: boolean, category: string}} task
 */

const storage = window.localStorage
const categories = [
  'carreira',
  'pessoal',
  'estudo'
]

/**
 * 
 * @param {Date} date 
 * @returns {string}
 */
const getIndex = (date) => {
  console.log('date:', date)
  const year = `${date.getFullYear()}`
  const month = `${date.getMonth()}`.padStart(2, '0')
  const day = `${date.getDay()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 *  
 * @returns {string}
 */
const getTodayIndex = () => {
  const date = new Date()
  return getIndex(date)
}

/**
 * 
 * @param {string} index 
 * @param {string} taskName 
 * @returns {task}
 */
const getTask = (index, taskName) => {
  const tasks = listTasks(index)
  if (tasks === null) return null
  return tasks[taskName]
}

/**
 * 
 * @param {string} taskName 
 * @returns boolean
 */
const hasTask = (taskName) => {
  const index = getTodayIndex()
  const task = getTask(index, taskName)
  return task !== null
}

/**
 * @param {task} task
 * @returns {boolean}
 */
const setTask = (task) => {
  if (task !== null && hasTask(task.name)) {
    return false
  } else {
    const tasks = listTodayTasks()
    const index = getTodayIndex()
    if (tasks !== null) {
      tasks[task.name] = task
      storage.setItem(index, JSON.stringify(tasks))
    } else {
      const newTasks = {}
      newTasks[task.name] = task
      storage.setItem(index, JSON.stringify(newTasks))
    }
  }
}

const listTasks = (index) => {
  const item = storage.getItem(index)
  if (item === null) return null
  const data = JSON.parse(storage.getItem(index))
  const tasks = data[index]
  return tasks
}

const listTodayTasks = () => {
  const index = getTodayIndex()
  return listTasks(index)
}

export {
  getTask,
  hasTask,
  setTask,
  listTasks,
  listTodayTasks,
  categories
}
