import React from 'react';
import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom"
import styles from './App.module.css';
import AddTasks from './pages/add-tasks';
import Home from './pages/home';
import NewTask from './pages/new-task';
import Prioritize from './pages/prioritize';

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
              <Prioritize priorityCategory='urgente' backLink='/add-tasks' nextLink='/prioritize/2' />
            } />
            <Route path="/prioritize/2" element={
              <Prioritize priorityCategory='satisfação' backLink='/prioritize/1' nextLink='/prioritize/3' />
            } />
            <Route path="/prioritize/3" element={
              <Prioritize priorityCategory='alegria' backLink='/prioritize/2' nextLink='/prioritize/4' />
            } />
            <Route path="/prioritize/4" element={
              <Prioritize priorityCategory='importante' backLink='/prioritize/3' nextLink='/' />
            } />
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
