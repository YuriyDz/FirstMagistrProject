import { useState } from "react";
import axios from "axios";
import reguestsTypes from '../../data/techData.js';
import '../../conponents/cardTable/cardStyles.css';
import '../../conponents/loginANDregistr.css';
import { DynamicIcon } from 'lucide-react/dynamic';
import { comparator, changeData } from "../functions.js";

export const CardTable = ({ TableData, setTB }) => {
  console.log(TableData);
  const[selectItem, setSI] = useState(-1);
  const[name,setN] = useState('');
  const[date,setD] = useState('');
  const[type,setT] = useState(false);
 
  const click = (i,n) => {
  const btn = document.getElementById(String(i)+"aa");
  const btn1 = document.getElementById(String(selectItem)+"aa");
  setD(n.date);
  setN(n.name);
  setT((n.type === 1? true: false));
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
}, 500);
  
}

}

const readyMakingData = () => {
    if(date === '' || name === ''){
        alert("Заповніть всі поля");
    }
    else{
    
    const form = {
      name: name,
      date: date,
      type: type,
    };
    
    setTB([TableData[0], changeData(TableData[1],form,'m',selectItem)]);
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
  
}


  return (
    <div  >
      {TableData === undefined || TableData.length === 0 || TableData === null
        ? null
        : TableData[1].map((n, i) => {

          if(i===selectItem){
            return(
               <div key={i} id={String(i)+"aa"} className="card"   style={{margin: "1rem", flexDirection: 'row'}}>
                <div style={{ position: "relative" , paddingRight: "1rem"}}>
                <div>
              <input className="lable" style={{position: "relative"}} value={name} type="text" onChange={(e)=>setN(e.target.value)} ></input>
              </div>
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
          
            <div key={i} id={String(i)+"aa"} className="card"   style={{margin: "1rem"}}>
              <t>{n.name}</t>
              <t>{n.date}</t>
              <button className='button' onClick={()=>click(i,n)}><DynamicIcon name='wrench' /></button>  
            </div>  
          )})}
    </div>
  );
};

