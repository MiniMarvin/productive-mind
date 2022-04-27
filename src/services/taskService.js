/**
 * @typedef {{name: string, done: boolean, category: string, priority: string}} task
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
  if (task == null) {
    return false
  } else {
    const tasks = getTodayTasks()
    const index = getTodayIndex()
    // console.log('tasks:', tasks)
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

/**
 * 
 * @returns {task[]}
 */
const listTasks = (index) => {
  const tasks = getTasks(index)
  if (tasks === null) return []
  return Object.keys(tasks).map(key => tasks[key])
}

/**
 * 
 * @returns {task[]}
 */
const listTodayTasks = () => {
  const index = getTodayIndex()
  return listTasks(index)
}

/**
 * 
 * @param {string} priority 
 * @returns {{task: task, index: number}}
 */
const getTaskPriorityCategory = (priority) => {
  const todayTasks = listTodayTasks()
  const filteredTasks = todayTasks
    .map((task, index) => ({task, index}))
    .filter((task) => task.task.priority === priority)
  if (filteredTasks.length === 0) return null
  return filteredTasks[0]
}

// TODO: validate if there's an issue with two tasks coliding with each other
const setTaskPriorityCategory = (taskName, priority) => {
  const todayTasks = listTodayTasks()
  
  const newTasks = todayTasks
    .filter(task => task.name === taskName || task.priority === priority)
    .map(task => {
      console.log(taskName, task.name)
      if (task.name === taskName) return {...task, priority: priority}
      return {...task, priority: null}
    })
  newTasks.forEach(task => setTask(task))
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
  getCategoryNumber,
  getTaskPriorityCategory,
  setTaskPriorityCategory
}
