import { useState } from "react";
import { comparator,  changeData} from "../functions";
import '../../conponents/cardTable/cardStyles.css';

export const CardMakeTable = ({mainData,setMainData}) =>{
const[name,setN] = useState("");
const[data,setD] = useState("");
const[type,setT] = useState(true);
const[periodly,setP]=useState(0);

const readyMakingData = () => {
    if(data === '' || name === ''){
        alert("Заповніть всі поля");
    }
    else{
    let dataM = data;
    let typeM = Number(type);
    if(type === true){
        dataM = String(periodly);
        typeM = 2;
    }
    const form = {
			name: name,
			date: dataM,
			type: typeM,
		};
    
    setMainData([mainData[0], changeData(mainData[1],form,'a',-1)]);
    console.log(mainData);
    }
}

return(
    <div className="card">
        <input type="text" value={name} onChange={(e) => setN(e.target.value)}></input>
        <input type={comparator(type,"number","text")} value={comparator(type,periodly,data)} onChange={(e)=>comparator(type,setP,setD)(e.target.value)}></input>
         <button  onClick={()=>setT(comparator(type,true,false))}/>
        <button onClick={()=>readyMakingData()}/>
    </div>
);

}