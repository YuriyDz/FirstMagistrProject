import { useState } from "react";
import { comparator,  changeData,addDays,getValidData} from "../functions";
import { DynamicIcon } from 'lucide-react/dynamic';
import '../../conponents/cardTable/cardStyles.css';
import '../../conponents/loginANDregistr.css';


export const CardMakeTable = ({mainData,setMainData, color, colorText}) =>{
const[name,setN] = useState("");
const[data,setD] = useState("");
const[type,setT] = useState(true);
const[periodly,setP]=useState(0);
const[act,setAct] = useState(false);

const readyMakingData = () => {
    if((periodly === '' && data === '') || name === ''){
        alert("Заповніть всі поля");
    }
    else{
      const now = new Date();
    const form = (type?

      {
      name: name,
      date: data,
      type: -1,
    }: {
      name: name,
      date: addDays(now.getFullYear()+"-"+getValidData(now.getMonth()+1)+"-"+getValidData(now.getDate()),periodly),
      type: periodly,
    });
    setMainData([mainData[0], changeData(mainData[1],form,'a',-1)]);
    //console.log(mainData);
  }
    }

const cancelMakeData = ()=>{
    const btn = document.getElementById("aa");
    
    if (btn) {
    btn.classList.add("act");
  }
  setAct(false);
}

const makeData = ()=>{
    const btn = document.getElementById("aa");
    
    if (btn) {
    btn.classList.remove("act");
  }
  setAct(true);

}

return(
    <div className={"fullScreen "+comparator(act, 'disActiveChildren','activeChildren')}>
      
     <div id={"aa"} className="mainBody activeChildren"    style={{transformOrigin: "50% 50%",margin: "1rem", flexDirection: 'row', position: "fixed", backgroundColor: color}}>
            <div style={{display: "flex", flexDirection: "column", paddingRight: "1rem"}}>
             <div style={{textAlign: "left", marginLeft: "0.5rem"}}><t style={{color: colorText}}>Назва техогляду</t></div>
             <div> 
        <input className="lable" type="text" value={name} onChange={(e) => setN(e.target.value)}></input>
        </div> 
        <div style={{textAlign: "left", marginLeft: "0.5rem"}} title="Введіть дату в форматі р-м-д, наприклад 2025-10-09 чи 2016-04-12 чи 2003-07-02"><t style={{color: colorText}}>Введіть дату</t></div> 
         <div>
        <input className="lable" type={comparator(type,"number","text")} value={comparator(type,periodly,data)} onChange={(e)=>comparator(type,setP,setD)(e.target.value)}></input>
         </div>
        <div>
         <button className="button" onClick={()=>setT(comparator(type,true,false))}>{comparator(type,"Нагадування по частоті д.","Нагадування по даті    ")}</button>
       </div>
       </div>
        <div style={{display: "flex", flexDirection: "column"}}>
        <button className="button" style={{backgroundColor: "green"}} onClick={()=>readyMakingData()}><DynamicIcon name='check-check' color="white" /></button>
       
              <button className='button' style={{backgroundColor: "red"}} onClick={()=>cancelMakeData()}><DynamicIcon name='cross' style={{rotate: '45deg'}} color="white" /></button> 
            </div>
    </div>
      <button className="button activeChildren" style={{backgroundColor: "green", position: "fixed", margin: "1rem", color: "white", bottom: "0%", left: "0%", paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem"}} onClick={()=>makeData()}><DynamicIcon name='cross'  color="white" /></button>
    </div>
);

}