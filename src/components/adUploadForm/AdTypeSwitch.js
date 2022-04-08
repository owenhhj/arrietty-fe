import {useState} from "react";
import './AdTypeSwitch.css'

function AdTypeSwitch({
  adType='textbook',
  callback
}) {
  const [switchState, setSwitchState] = useState(adType);
  const handleClick = (event)=>{
    if(event.target.innerText==="Textbook" && switchState==="other"){
      setSwitchState("textbook");
      callback("textbook");
    }
    else if(event.target.innerText==="Other" && switchState==="textbook"){
      setSwitchState("other");
      callback("other");
    }
  }

  return(
    <div className={"ad-type-switch"}>
      <div className={switchState==="textbook"?"option-active":"option"} onClick={handleClick}>Textbook</div>
      <div className={switchState==="other"?"option-active":"option"} onClick={handleClick}>Other</div>
    </div>
  );
}

export default AdTypeSwitch;