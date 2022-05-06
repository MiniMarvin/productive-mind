import React from 'react';
import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom"
import styles from './App.module.css';
import AddTasks from './pages/add-tasks';
import CompleteTasks from './pages/complete-tasks';
import DayReview from './pages/day-review';
import FinishDay from './pages/finish-day';
import Home from './pages/home';
import NewTask from './pages/new-task';
import Prioritize from './pages/prioritize';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-KLBL79S'
}

TagManager.initialize(tagManagerArgs)

function App() {
  // TODO: define the render of the page here
  return (
    <main className={styles.appContainer}>
      <section className={styles.app}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-tasks" element={<AddTasks />} />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/edit-task" element={<NewTask edit={true} />} />
            <Route path="/prioritize/1" element={
              <Prioritize priorityCategory='urgente' backLink='/add-tasks' nextLink='/prioritize/2'>
                <span>Quais das atividades abaixo <b>precisam ser concluídas hoje</b>?</span>
              </Prioritize>
            } />
            <Route path="/prioritize/2" element={
              <Prioritize priorityCategory='satisfação' backLink='/prioritize/1' nextLink='/prioritize/3'>
                <span>Quais das atividades você <b>mais quer fazer</b>?</span>
              </Prioritize>
            } />
            <Route path="/prioritize/3" element={
              <Prioritize priorityCategory='alegria' backLink='/prioritize/2' nextLink='/prioritize/4'>
                <span>Quais das atividades vão te deixar <b>mais feliz</b>?</span>
              </Prioritize>
            } />
            <Route path="/prioritize/4" element={
              <Prioritize priorityCategory='importante' backLink='/prioritize/3' nextLink='/day-review'>
                <span>Quais das atividades <b>vão facilitar a vida</b> do seu eu do futuro?</span>
              </Prioritize>
            } />
            <Route path="/day-review" element={
              <DayReview />
            } />
            <Route path="/complete-tasks" element={
              <CompleteTasks />
            } />
            <Route path="/finish-day" element={
              <FinishDay />
            } />
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
