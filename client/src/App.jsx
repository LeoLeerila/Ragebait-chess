import UserPanel from "./components/userPanel"
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserPanel PlayerId="0" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
