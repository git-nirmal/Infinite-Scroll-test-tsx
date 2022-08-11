import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Details from "./Pages/Details";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (

    <div className="App">
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/details' element={<Details/>} />
      </Routes>
    </div>

  )
}

export default App;
