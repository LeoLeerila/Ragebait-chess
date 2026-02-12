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
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<GameStart />} />
          <Route path="/game" element={<Game />} />
          <Route path="/user" element={<UserPanel PlayerId="0" />} />
        </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App;
