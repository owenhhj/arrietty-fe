import React, {useEffect} from "react";
import './GeneralNoti.css';

// https://github.com/daryanka/notification-component/blob/master/src/Notifications/Notification.js
function GeneralNoti({
  msg="GeneralNoti default prop",
  good=true,
  dispatch  // function to toggleShow
                     }) {
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        action: "del"
      });
    }, 2000);
  }, []);

  return (
      <div className={"GeneralNoti"}>
        <p>{msg}</p>
        {good && <img src="./done_outline_black_48dp.svg" alt="" className={"img-green"}/>}
        {!good && <img src="./dangerous_black_48dp.svg" alt="" className={"img-red"}/>}
      </div>
  );
}

export default GeneralNoti;

