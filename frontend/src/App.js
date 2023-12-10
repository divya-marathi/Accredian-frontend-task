import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./Pages/User/Login";
import SignUp from "./Pages/User/SignUp";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage/Homepage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Homepage/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
