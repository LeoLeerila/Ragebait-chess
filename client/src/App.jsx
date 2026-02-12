import UserPanel from "./components/userPanel";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import Header from "./components/Header";
import GameStart from './components/gameStart';
import Game from './components/Game';
import { Route, Routes } from "react-router-dom";
import './App.css';



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
          <Route path="/user" element={<UserPanel PlayerId="1" />} />
        </Routes>
    </>
  )
}

export default App;
