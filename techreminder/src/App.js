import logo from "./logo.svg";
import "./App.css";
import { Login } from "./conponents/login";
import { useState } from "react";
import { CardTable } from "./conponents/cardTable/cardTable";

function App() {
  const [userData, setUD] = useState([]);

  return (
    <div className="App">
      <Login setData={setUD}></Login>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CardTable TableData={userData} setTB={setUD}></CardTable>
      </header>
    </div>
  );
}

export default App;
