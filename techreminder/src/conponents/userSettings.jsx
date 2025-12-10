import { useState } from "react";
import axios from "axios";
import {reguestsTypes } from "../data/techData.js";
import { useNavigate } from "react-router-dom";
import { comparator } from "./functions.js";
import { DynamicIcon } from 'lucide-react/dynamic';



export const UserUpdateComp = ({setData, color, colorText, setDTDD, DTDD, userData}) => {
const[username, setUN] = useState(userData[0][0].username);
const[email,setE] = useState(userData[0][0].email);
const[password, setP] = useState(userData[0][0].password);
const[passwordConfoirm, setPC] = useState(userData[0][0].password);


const[isVisiblePassword, setIVP] = useState(false);
const navigate = useNavigate();

async function updateData() {
    if(passwordConfoirm !== password){
        alert("Паролі не співпадають");
        setP('');
        setPC('');
        return false;
    }
    console.log("Чекати:", userData);
    try {
    const res = await axios.post(reguestsTypes.Registr, {
    requestType: 3,
    email: email,
    password: password,
    username: username,
    colorInterface: color,
    timetodeadline: DTDD,
    oldName: userData[0][0].username,
    });
    setData([[{
        email: email,
    password: password,
    username: username,
    colorInterface: color,
    timetodeadline: DTDD,

    }],userData[1]]);

   // console.log("Успіх:", res.data);
    console.log("Успіх:", userData);
    
        setData(res.data);
        alert("Зміни збережено");
    

  } catch (err) {
    if(err.status === 400){
        alert("Невірні ім'я або пароль");
    }else{
    alert("Помилка спробуйте пезніше" + err);
    }  
}
}

function outWithAccaunt(){
    setData({});
    navigate('/');
}

    return(
        <div className="mainBody" style={{backgroundColor: color}}>
             <t className='fontSt' style={{color: colorText}}>Імя користувача</t>
             <div className="bodyDiv"> 
                <input  className="lable" value={username} onChange={(e)=>setUN(e.target.value)}/>
                 </div>
                     <t className='fontSt' style={{color: colorText}}>Електронна пошта</t>
                 <div className="bodyDiv"> 
            <input   className="lable" value={email} onChange={(e)=>setE(e.target.value)}/>
                </div>
                 <t className='fontSt' style={{color: colorText}}>Пароль</t>
             <div className="bodyDiv">     
            <input className="lable"  type={comparator(isVisiblePassword,"password","text")} value={password} onChange={(e)=>setP(e.target.value)}/>
            <button className='button' onClick={()=>setIVP(comparator(isVisiblePassword,true,false))}>
                <DynamicIcon name={comparator(isVisiblePassword,"eye","eye-off")}  size='1rem'></DynamicIcon>
            </button>
            </div>    
             <t className='fontSt' style={{color: colorText}}>Підтвердити пароль</t>
             <div className="bodyDiv"> 
            <input  className="lable" type={comparator(isVisiblePassword,"password","text")} value={passwordConfoirm} onChange={(e)=>setPC(e.target.value)}/>
            </div>
            <b styles={{color: color}}>{DTDD} Днів до дедлайна</b>
            <input
        type="range"
        min="0"
        max="365"
        value={DTDD}
        onChange={(e) => setDTDD(e.target.value)}
        style={{ width: "calc(100% - 1rem)", margin: "0.5rem" }}
      />
            <div style={{display: "flex", flexDirection: 'row', width: "100%"}}>
            <button className='button' style={{backgroundColor: "green",width: "100%", color: "white", padding: "0.8rem"}} onClick={()=>updateData()} title="Підтвердити зміни"><DynamicIcon name='check-check' color="white"/></button>
        
             <button className='button' style={{backgroundColor: "red",width: "100%", color: "white", padding: "0.8rem"}} onClick={()=>alert('delete')} title="Видалити аккаунт"><DynamicIcon name='trash' color="white"/></button>
             <button className='button' style={{backgroundColor: "red",width: "100%", color: "white", padding: "0.8rem"}} onClick={()=>outWithAccaunt()} title="Вийти з аккаунта"><DynamicIcon name='door-open' color="white"/></button>
            </div>
        </div>
    );
}