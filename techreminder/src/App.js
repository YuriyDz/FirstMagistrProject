import logo from "./logo.svg";
import "./App.css";
import { Login } from "./conponents/login";
import { RegistrComp } from "./conponents/register";
import { useState, useEffect } from "react";
import { CardTable } from "./conponents/cardTable/cardTable";
import { BrowserRouter, useNavigate, Route, Routes } from "react-router-dom";
import { CardMakeTable } from "./conponents/cardTable/cardMaker";
import { UserUpdateComp } from "./conponents/userSettings";

export function LogOrReg() {
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
  const [color, setColor] = useState("#aabbcc");
  const [colorText, setCT] = useState("black");
  const [dayToDeadline, setDTD] = useState(10);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LogOrReg />} />
          <Route
            path="/Login"
            element={
              <Login setData={setUD} color={color} colorText={colorText} />
            }
          />
          <Route
            path="/Register"
            element={
              <RegistrComp
                setData={setUD}
                color={color}
                colorText={colorText}
              />
            }
          />
          <Route
            path="/User"
            element={
              <UserUpdateComp
                setData={setUD}
                color={color}
                colorText={colorText}
                setDTDD={setDTD}
                DTDD={dayToDeadline}
                userData={userData}
              />
            }
          />
          <Route
            path="/make"
            element={<CardMakeTable mainData={userData} setMainData={setUD} />}
          />
          <Route
            path="/Table"
            element={
              <CardTable
                color={color}
                setColor={setColor}
                TableData={userData}
                setTB={setUD}
                colorText={colorText}
                setCT={setCT}
                daysToDeadline={dayToDeadline}
              ></CardTable>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
