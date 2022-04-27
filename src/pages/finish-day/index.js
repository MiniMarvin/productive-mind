import '@fortawesome/fontawesome-free/css/all.min.css';  
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import containerStyles from '../../components/containers.module.css'
import buttonStyles from '../../components/buttons.module.css'
import styles from './styles.module.css'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getIndex, listTasks } from '../../services/taskService'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const previousDays = 5
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

const FinishDay = () => {
  const [dailySplit, setDailySplit] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(() => {
    const taskSplit = []
    const dayLabels = []
    for (let i = 0; i < previousDays; i++) {
      const date = new Date((new Date()).getTime() - i*24*60*60*1000)
      const index = getIndex(date)
      const tasks = listTasks(index)
      const tasksFinished = tasks.filter(task => task.priority != null && task.done === true).length
      taskSplit.push(tasksFinished)
      dayLabels.push(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`)
    }
    setDailySplit(taskSplit.reverse())
    setLabels(dayLabels.reverse())
  }, [])

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Progresso nos últimos dias',
        data: dailySplit,
        backgroundColor: 'rgba(165, 176, 254, 0.5)'
      }
    ]
  }

  return (
    <>
      <section className={`${containerStyles.page} ${containerStyles.pageWithFooter}`}>
        <div className={containerStyles.header}>
          <h1>🎉 Parabéns! Você finalizou mais um dia com sucesso</h1>
        </div>
        <span>Veja como foi seu avanço ao longo dos últimos dias:</span>
        <Bar options={options} data={data} />
      </section>
      <section className={containerStyles.footer}>
        <div />
        <div className={containerStyles.footerItem}>
          <Link to="/complete-tasks" className={buttonStyles.backButton}>tarefas {`>`}</Link>
        </div>
      </section>
    </>
  )
}

export default FinishDay;