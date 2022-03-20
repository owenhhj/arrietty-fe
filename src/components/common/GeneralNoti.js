import './GeneralNoti.css';
import Button from './Button';


// from the caller: msg to display, btn text, callback function onClick
function GeneralNoti({
  msg="Are you still there?",
  btnText="OK",
  onClick=null,
                     }) {
  return (
    <div className={"GeneralNoti"}>
      <div>
        <p>{msg}</p>
      </div>
      <div>
        <Button text={btnText} buttonStyle={"btn--primary"} buttonSize={"btn--medium"} onClick={onClick}/>
      </div>
    </div>
  );
}


export default GeneralNoti;

