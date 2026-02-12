
//only for testing purpose

import { useState } from 'react'
import UserPanel from "./components/userPanel"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameStart from './gameStart';
import Game from './Game';

function App() {
  return (
    <>
      {/* <Header /> */}

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<GameStart />} />
          <Route path="/game" element={<Game />} />
          {/* <Route path="/user" element={<UserPanel />} /> */}
        </Routes>
      {/* <Footer /> */}
      <UserPanel PlayerId="0"/>
    </>
  )
}

export default App
