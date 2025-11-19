import { useState } from "react";
import axios from "axios";
import {reguestsTypes } from "../data/techData.js";


const comparator =(n,retT,retF) =>{
    if(n === true) return retF;
    return retT;
}

export const Login = ({setData}) => {
const[username, setUN] = useState("");
const[password, setP] = useState("");
const[isVisiblePassword, setIVP] = useState(false);


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
    

  } catch (err) {
    if(err.status === 400){
        alert("Невірні ім'я або пароль");
    }else{
    alert("Помилка спробуйте пезніше" + err);
    }  
}
}


    return(
        <div>
            <input value={username} onChange={(e)=>setUN(e.target.value)}/>
            <button style={{backgroundColor: comparator(isVisiblePassword,"red","white")}} onClick={()=>setIVP(comparator(isVisiblePassword,true,false))}>Hide password</button>
            <input  type={comparator(isVisiblePassword,"password","text")} value={password} onChange={(e)=>setP(e.target.value)}/>
            <button onClick={()=>getData()}>Login</button>
        </div>
    );
}