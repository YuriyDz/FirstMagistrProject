import { useState,useEffect} from "react";
import axios from "axios";
import {reguestsTypes} from '../../data/techData.js';
import '../../conponents/cardTable/cardStyles.css';
import '../../conponents/loginANDregistr.css';
import { DynamicIcon } from 'lucide-react/dynamic';
import { comparator, changeData,addDays , getValidData} from "../functions.js";
import { CardMakeTable } from "./cardMaker.jsx";
import {HeaderInterface } from '../headerInterface/header.jsx';

import { LogOrReg } from "../../App.js";

let requestsInQuere = [];
let nameOld = "";


export const CardTable = ({ TableData, setTB, color, setColor,colorText,setCT,daysToDeadline,setDaysToDeadline }) => {
  
  const[selectItem, setSI] = useState(-1);
  const[name,setN] = useState('');
  const[date,setD] = useState('');
  const[type,setT] = useState(false);
  const[visibleAll, setVA] = useState(true);
 
  const click = (i,n) => {
  const btn = document.getElementById(String(i)+"aa");
  const btn1 = document.getElementById(String(selectItem)+"aa");
  setD((n.type === -1?n.date: n.type));
  setN(n.name);
  setT((n.type === -1? true: false));
  if(i===selectItem){
    if (btn1) {
    btn1.classList.remove("active");
  }
  setSI(-1);
  }
else{
  // видаляємо active зі старого, якщо він існує
  if (btn1) {
    btn1.classList.remove("active");
  }

  // додаємо active новому елементу
  if (btn) {
    btn.classList.add("active");
  }
  setSI(-1);
setTimeout(() => {
  setSI(i);
  nameOld =  n.name;
}, 500);
  
}

}

async function saveInBD(type1,form,oldn) {
  const body = {
    requestType: type1,
      tableName: TableData[0][0].username,
        oldName: oldn,
        name: form.name,
      date: form.date,
      type: form.type,
  };
  console.log(body);
  try{
  await axios.post(reguestsTypes.UserData, body);
  }
  catch(e){
    requestsInQuere.push(body);
    const ansv = window.confirm(e);
    if(ansv){
      for(let i =0;i<requestsInQuere.length;i++){
        const bodyy = requestsInQuere.pop();
        saveInBD(bodyy.requestType,bodyy,oldn);
      }
    }
    

  }
}

const restartTimer = (formI,index,dayFromStart) => {

  
     // const now = new Date();
    const form =  {
      name: formI.name,
      date: addDays(/*now.getFullYear()+"-"+getValidData(now.getMonth()+1)+"-"+getValidData(now.getDate())*/dayFromStart,date*2),//now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate(),
      type: formI.date,
    };
    setTB([TableData[0], changeData(TableData[1],form,'m',index)]);
    saveInBD(2,form,formI.name);
    //console.log(mainData);
  
    }


const readyMakingData = () => {
    if(date === '' || name === ''){
        alert("Заповніть всі поля");
    }
    else{
      const now = new Date();
    const form = (type?

      {
      name: name,
      date: date,
      type: -1,
    }: {
      name: name,
      date: addDays(now.getFullYear()+"-"+getValidData(now.getMonth()+1)+"-"+getValidData(now.getDate()),date),//now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate(),
      type: date,
    });
    setTB([TableData[0], changeData(TableData[1],form,'m',selectItem)]);
    saveInBD(2,form,nameOld);
    //console.log(mainData);
  }
    }

    

const delItem = () =>{
  setSI(-1);
  const btn1 = document.getElementById(String(selectItem)+"aa");
  if (btn1) {
    btn1.classList.remove("active");
  }
  setTB([TableData[0], changeData(TableData[1],{},'d',selectItem)]);
  saveInBD(3,{
    tableName: TableData[0][0].username,
    oldName: TableData[1][selectItem].name,
  });
}

const getNumberDaysToTargetData = (dateG) =>{
    const today = new Date();   // поточна дата пристрою
    
  const targetDate = new Date(dateG);      // дата, яку передали у функцію

  
  const diffMs = targetDate - today;

 
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  return (diffDays<0?-1:diffDays);
}
if(TableData[0]===undefined){
    return <LogOrReg></LogOrReg>
}
  return (
    <div  >
      <HeaderInterface colort={colorText} setColor={setColor} color={color} setTC={setCT}  userData={TableData} setVisible={setVA} isVisible={visibleAll} setDTDD={setDaysToDeadline} DTDD={daysToDeadline}></HeaderInterface>
      <div style={{position: "fixed", zIndex: 15, left: "0%", top: "0%"}}>
      <CardMakeTable mainData={TableData} setMainData={setTB} color={color} colorText={colorText} saveInBDD={saveInBD}></CardMakeTable>
      </div>
      {TableData === undefined || TableData.length === 0 || TableData === null
        ? null
        : TableData[1].map((n, i) => {
          const ttdl = getNumberDaysToTargetData(n.date);
          
          if((ttdl>=daysToDeadline || ttdl === -1)&&visibleAll===false){
              return null;
          }
          if(ttdl===-1 && n.type>-1){
              restartTimer({
                name: n.name,
                date: n.type,
              
              },i, n.date);
          }
          if(i===selectItem){
            return(
               <div key={i} id={String(i)+"aa"} className="card"   style={{margin: "1rem", flexDirection: 'row', backgroundColor: color}}>
                <div style={{ position: "relative" , paddingRight: "1rem"}}>
                  <div style={{textAlign: "left", marginLeft: "0.5rem"}}><t style={{color: colorText}}>Назва техогляду</t></div>
                <div>
              <input className="lable" style={{position: "relative"}} value={name} type="text" onChange={(e)=>setN(e.target.value)} ></input>
              </div>
              <div style={{textAlign: "left", marginLeft: "0.5rem"}} title="Введіть дату в форматі р-м-д, наприклад 2025-10-09 чи 2016-04-12 чи 2003-07-02"><t style={{color: colorText}}>Введіть дату</t></div>
               <div>
              <input className="lable" style={{position: "relative"}} value={date} type={comparator(type,"number","text")} onChange={(e)=>setD(String(e.target.value))} ></input>
               </div>
               <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <button className="button" onClick={()=>setT(comparator(type,true,false))}>{comparator(type,"Нагадування по частоті д.","Нагадування по даті    ")}</button>
              </div>
              </div>
              <div style={{flexDirection: "column"}}>
                <div>
              <button className='button' onClick={()=>click(i,n)}><DynamicIcon name='wrench' /></button>  
              </div>
              <div>
              <button className='button' style={{backgroundColor: "green"}} onClick={()=>readyMakingData()}><DynamicIcon name='check-check' color="white" /></button> 
             </div>
             <div>
              <button className='button' style={{backgroundColor: "red"}} onClick={()=>delItem()}><DynamicIcon name='trash' color="white" /></button> 
             </div>
              </div>
            </div> 
            );
          }
          return(
          
            <div key={i} id={String(i)+"aa"} className="card"   style={{margin: "1rem", display: "flex", flexDirection: 'row', backgroundColor: color}}>
            {ttdl < daysToDeadline  ?<div style={{width: '5rem', height: "3rem", background: ttdl === -1?'linear-gradient(45deg,black, gray)':'linear-gradient(45deg,red, tomato)', position: "relative", left: "-0.5rem", paddingBottom: "0.5rem", paddingTop: '0.5rem', 
              borderTopLeftRadius: "0.5rem", borderBottomLeftRadius: "0.5rem", color: "white"}}>
                  <b style={{fontSize: 35}}>{ttdl === -1?"?":"!"}</b>
              </div>: null}
            <div style={{width: '100%'/*calc(100%-3rem)*/, display: "flex", flexDirection: "column"}}>
              
              <t style={{color: colorText}}>{n.name}</t>
              <t style={{color: colorText}}>До огляду дн.:{ttdl<0?"Недійсний":ttdl}</t>
              </div>
              <div style={{width: "3rem", position: 'sticky', right: "0%"}}>
              <button className='button' onClick={()=>click(i,n)}><DynamicIcon name='wrench' /></button>  
              </div>              
            </div>  
            
          )})}
    </div>
  );
};

