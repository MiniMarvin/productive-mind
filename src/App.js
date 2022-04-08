import React from 'react';
import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom"
import './App.css';
import Home from './pages/home';
import NewTask from './pages/new-task';

function App() {
  // TODO: define the render of the page here
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-task" element={<NewTask />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
