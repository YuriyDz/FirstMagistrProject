import { useState } from "react";
import axios from "axios";
import {reguestsTypes } from "../data/techData.js";
import { useNavigate } from "react-router-dom";
import { comparator } from "./functions.js";
import { DynamicIcon } from 'lucide-react/dynamic';

export const RegistrComp = ({setData}) => {
const[username, setUN] = useState("");
const[email,setE] = useState("");
const[password, setP] = useState("");
const[passwordConfoirm, setPC] = useState("");

const[isVisiblePassword, setIVP] = useState(false);
const navigate = useNavigate();

async function registr() {
    if(passwordConfoirm !== password){
        alert("Паролі не співпадають");
        setP('');
        setPC('');
        return false;
    }
    try {
    const res = await axios.post(reguestsTypes.Registr, {
      requestType: 1,
      email: email,
      password: password,
      username: username,
    });

    console.log("Успіх:", res.data);
    
        setData(res.data);
        alert("Ви зареєструвалися");
    navigate("/Login");

  } catch (err) {
    if(err.status === 400){
        alert("Невірні ім'я або пароль");
    }else{
    alert("Помилка спробуйте пезніше" + err);
    }  
}
}


    return(
        <div className="mainBody">
             <t className='fontSt'>Імя користувача</t>
             <div className="bodyDiv"> 
                <input  className="lable" value={username} onChange={(e)=>setUN(e.target.value)}/>
                 </div>
                     <t className='fontSt'>Електронна пошта</t>
                 <div className="bodyDiv"> 
            <input   className="lable" value={email} onChange={(e)=>setE(e.target.value)}/>
                </div>
                 <t className='fontSt'>Пароль</t>
             <div className="bodyDiv">     
            <input className="lable"  type={comparator(isVisiblePassword,"password","text")} value={password} onChange={(e)=>setP(e.target.value)}/>
            <button className='button' onClick={()=>setIVP(comparator(isVisiblePassword,true,false))}>
                <DynamicIcon name={comparator(isVisiblePassword,"eye","eye-off")}  size='1rem'></DynamicIcon>
            </button>
            </div>    
             <t className='fontSt'>Підтвердити пароль</t>
             <div className="bodyDiv"> 
            <input  className="lable" type={comparator(isVisiblePassword,"password","text")} value={passwordConfoirm} onChange={(e)=>setPC(e.target.value)}/>
            </div>
            <button className='button' style={{backgroundColor: "green", color: "white", padding: "0.8rem"}} onClick={()=>registr()}>Register</button>
        </div>
    );
}