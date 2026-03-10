import { useState } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
// pages and components
import UserPanel from "./components/userPanel";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import Header from "./components/Header";
import GameStart from './components/gameStart';
import Game from './components/Game';

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(() => {const user = JSON.parse(localStorage.getItem("user"))
return user && user.token ? true:false});
  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div className="content">
      <Routes>
        <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? (<Navigate to="/" />) : (<RegisterForm setIsAuthenticated={setIsAuthenticated} />)} />
        <Route path="/login" element={isAuthenticated ? (<Navigate to="/" />) : (<LoginForm setIsAuthenticated={setIsAuthenticated} />)} />
        <Route path="/start" element={isAuthenticated ? <GameStart /> : <Navigate to="/login" />} />
        <Route path="/game" element={isAuthenticated ? <Game /> : <Navigate to="/login" />} />
        <Route path="/user/:PlayerId" element={isAuthenticated ? <UserPanel /> : <Navigate to="/login" />} />
      </Routes>
      </div>
    </div>
  )
}

export default App;
