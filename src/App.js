import React from 'react';
import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom"
import styles from './App.module.css';
import AddTasks from './pages/add-tasks';
import Home from './pages/home';
import NewTask from './pages/new-task';

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
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
