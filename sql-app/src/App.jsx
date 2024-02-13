import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component.jsx';
import './App.css';
import Add from './routes/add/add.component.jsx';
import Update from './routes/update/update.component.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/update/:id" element={<Update />} />

    </Routes>
  );
}

export default App;
