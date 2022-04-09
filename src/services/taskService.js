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
 * @param {string} category 
 */
const getCategoryNumber = (category) => {
  if (category == null) return null
  let num = null
  for (let i = 0; i < categories.length; i++) {
    if (categories[i] === category) {
      num = i
      break
    }
  }

  return num
}

/**
 * 
 * @param {Date} date 
 * @returns {string}
 */
const getIndex = (date) => {
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
  const tasks = getTasks(index)
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
  return task != null
}

/**
 * @param {task} task
 * @returns {boolean}
 */
const setTask = (task) => {
  const existingTask = hasTask(task.name)
  console.log('task exists?', existingTask)
  if (task !== null && hasTask(task.name)) {
    return false
  } else {
    const tasks = getTodayTasks()
    const index = getTodayIndex()
    console.log('tasks:', tasks)
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

const removeTask = (taskName) => {
  const index = getTodayIndex()
  const tasks = getTasks(index)
  if (tasks[taskName]) {
    delete tasks[taskName]
    storage.setItem(index, JSON.stringify(tasks))
    return true
  }
  return false
}

const getTasks = (index) => {
  const item = storage.getItem(index)
  if (item === null) return null
  const tasks = JSON.parse(item)
  return tasks
}

const getTodayTasks = () => {
  const index = getTodayIndex()
  return getTasks(index)
}

const listTasks = (index) => {
  const tasks = getTasks(index)
  if (tasks === null) return []
  return Object.keys(tasks).map(key => tasks[key])
}

const listTodayTasks = () => {
  const index = getTodayIndex()
  return listTasks(index)
}

export {
  getTask,
  hasTask,
  setTask,
  getTasks,
  getTodayTasks,
  removeTask,
  listTasks,
  listTodayTasks,
  categories,
  getCategoryNumber
}
