import logo from "./logo.svg";
import "./App.css";
import { Login } from "./conponents/login";
import { RegistrComp } from "./conponents/register";
import { useState, useEffect } from "react";
import { CardTable } from "./conponents/cardTable/cardTable";
import { BrowserRouter, useNavigate, Route, Routes } from "react-router-dom";
import { CardMakeTable } from "./conponents/cardTable/cardMaker";

function LogOrReg() {
  const navigator = useNavigate();
  return (
    <header style={{ display: "flex" }}>
      <button className="button" onClick={() => navigator("/Login")}>
        Sign in
      </button>
      <button className="button" onClick={() => navigator("/Register")}>
        Sign up
      </button>
    </header>
  );
}

function App() {
  const [userData, setUD] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LogOrReg />} />
          <Route path="/Login" element={<Login setData={setUD} />} />
          <Route path="/Register" element={<RegistrComp setData={setUD} />} />
          <Route
            path="/Table"
            element={<CardTable TableData={userData} setTB={setUD}></CardTable>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
