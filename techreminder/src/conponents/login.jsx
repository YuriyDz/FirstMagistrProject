import { useState } from "react";
import axios from "axios";
import {reguestsTypes } from "../data/techData.js";
import { useNavigate } from "react-router-dom";
import { comparator } from "./functions.js";
import '../App.css';
import { DynamicIcon } from 'lucide-react/dynamic';
import '../../src/conponents/loginANDregistr.css';

export const Login = ({setData, color, colorText}) => {
const[username, setUN] = useState("");
const[password, setP] = useState("");
const[isVisiblePassword, setIVP] = useState(false);
const navigate = useNavigate();
  

async function getData() {
   
    try {
    const res = await axios.post(reguestsTypes.login, {
      email: username,
      password: password,
      username: username,
    });

    console.log("Успіх:", res.data);
    
        setData(res.data);
        alert("Ви ввійшли в акаунт");
        navigate("/Table");

  } catch (err) {
    if(err.status === 400){
        alert("Невірні ім'я або пароль");
    }else{
    alert("Помилка спробуйте пезніше" + err);
    }  
}
}

//comparator(isVisiblePassword,"eye","eye-off")
    return(
        <div className="mainBody" style={{backgroundColor: color}}>
            <t className='fontSt' style={{color: colorText}}>Імя/Електронна пошта</t>
                <div className="bodyDiv"> 
        
            <input className="lable" value={username} onChange={(e)=>setUN(e.target.value)}/>
            </div>
            <t className='fontSt' style={{color: colorText}}>Пароль</t>
                <div className="bodyDiv">     
            <input className="lable"  type={comparator(isVisiblePassword,"password","text")} value={password} onChange={(e)=>setP(e.target.value)}/>
            <button className='button' onClick={()=>setIVP(comparator(isVisiblePassword,true,false))}>
                <DynamicIcon name={comparator(isVisiblePassword,"eye","eye-off")}  size='1rem'></DynamicIcon>
            </button>
            </div>  
                  <button className='button' style={{backgroundColor: "green", color: "white", padding: "0.8rem"}} onClick={()=>getData()}>Login</button>
        </div>
    );
}