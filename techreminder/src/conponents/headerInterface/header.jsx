import './header.css';
import { HexColorPicker } from "react-colorful";
import '../../App.css';
import { LogOrReg } from '../../App';

export const HeaderInterface = ({setColor,color, setTC, userData}) => {

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
     <div style={{height: "2rem"}}>
        <HexColorPicker id="c" className='colorForm'  color={color} onChange={getTextColor} />
     </div>
     <div style={{marginLeft: "auto", marginTop: "0.5rem"}}>
      <LogOrReg/>
      
      </div>
      <div style={{height: "1rem", marginTop: "0.5rem"}}>
      <button className='button'>{userData[0][0]['username']}</button>
      </div>
</header>
<div style={{position: "absolute"}}>

</div>
</>
);
}