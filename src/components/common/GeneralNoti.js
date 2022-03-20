import './GeneralNoti.css';
import Button from './Button';


function GeneralNoti({
  msg,
  onClick
                     }) {

  return (
    <div className={"GeneralNoti"}>
      <div>
        <p>{msg}</p>
      </div>
      <div>
        <Button text={"OK"} buttonStyle={"btn--primary"} buttonSize={"btn--medium"} onClick={onClick}/>
      </div>
    </div>
  );
}


export default GeneralNoti;

