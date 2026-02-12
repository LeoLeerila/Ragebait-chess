import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameStart from './gameStart';
import Game from './Game';
import UserPanel from './components/userPanel';
import Header from './components/Header';
function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/start" element={<GameStart />} />
          <Route path="/game" element={<Game />} />
          <Route path="/user/:PlayerId" element={<UserPanel />} />
        </Routes>
    </>
  )
}

export default App;
