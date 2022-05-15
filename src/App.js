import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UniversePage from './pages/UniversePage';
import HomePage from './pages/HomePage';
import PlanetSystemPage from './pages/PlanetSystemPage';
import PlanetPage from './pages/PlanetPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

//HomePage

function App() {
  const [user, setUser] = useState('user');
  useEffect(() => {
    console.log('user = '+ user)
  })
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/> 
        <Route path="/login" element={<LoginPage/>}/> 
        <Route path="/reg" element={<RegisterPage/>}/> 
        <Route path="home" element={<HomePage/>}/>
        <Route path="universe" element={<UniversePage/>}/>
        <Route path="planetSystem/:id" element={<PlanetSystemPage/>}/>
        <Route path="/planet/:id" element={<PlanetPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

