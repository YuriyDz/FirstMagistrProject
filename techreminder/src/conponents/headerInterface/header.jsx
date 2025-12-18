import './header.css';
import { HexColorPicker } from "react-colorful";
import '../../App.css';
import { LogOrReg } from '../../App';
import { useNavigate } from 'react-router-dom';
import { DynamicIcon } from 'lucide-react/dynamic';
import { comparator } from '../functions';



export const HeaderInterface = ({setColor,color, setTC,colort, userData, setVisible, isVisible, setDTDD, DTDD}) => {

    const navigator = useNavigate();

function getTextColor(bgColor) {
  // bgColor у форматі #RRGGBB
  const r = parseInt(bgColor.substr(1, 2), 16);
  const g = parseInt(bgColor.substr(3, 2), 16);
  const b = parseInt(bgColor.substr(5, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  setColor(bgColor); 
  setTC(brightness > 128 ? "black" : "white");
}

const showColorForm = () =>{
    
    const col = document.getElementById('c');
    if(col){
        col.classList.toggle('on');
    }

}

return(
    <>
   
   
<header className='bodey' style={{backgroundColor: color}}>
<button className='button' style={{backgroundColor: 'pink', height: "2rem"}} onClick={()=>showColorForm()}>Змінити колір</button>
<button className='button' style={{backgroundColor: 'deepskyblue', height: "2rem", color: "white"}} title='Показати лише термінові техогляди' onClick={()=>setVisible(comparator(isVisible,true,false))}><DynamicIcon name={isVisible?'eye':'eye-closed'}/>!</button>

<div style={{height: "2rem", width: "0px"}}>
        <HexColorPicker id="c" className='colorForm'  color={color} onChange={getTextColor} />
     </div>
      <div style={{margin: "0.5rem"}}>
  <input
        type="range"
        min="0"
        max="365"
        value={DTDD}
        onChange={(e) => setDTDD(e.target.value)}
        style={{ width: "calc(100% - 1rem)", margin: "0.5rem" }}
      />
    </div>
    <div style={{color: colort, marginTop: "0.75rem", fontWeight: 900}}>
        <t>{"<"+DTDD} Дн до техогляду</t>
    </div>
     <div style={{marginLeft: "auto", marginTop: "0.5rem"}}>
      <LogOrReg/>
      
      </div>
      <div style={{height: "1rem", marginTop: "0.5rem"}}>
      <button className='button' onClick={()=>navigator("/User")}>{userData[0][0]['username']}</button>
      </div>
</header>
<div style={{position: "absolute"}}>

</div>
</>
);
}