import UserPanel from "./components/userPanel"
import GameStart from './gameStart';
import Game from './Game';
import { BrowserRouter, Route, Routes } from "react-router-dom";




function App() {
  return (
    <>
      {/* <Header /> */}

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<GameStart />} />
          <Route path="/game" element={<Game />} />
          <Route path="/user" element={<UserPanel PlayerId="1" />} />
          {/* <Route path="/user" element={<UserPanel />} /> */}
        </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App;
