import React, {useEffect} from "react";
import './GeneralNoti.css';

// https://github.com/daryanka/notification-component/blob/master/src/Notifications/Notification.js
function GeneralNoti({
                       msg = 'ok',
                       good = 1,
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
      {good === 1 && <img src="./done_FILL0_wght400_GRAD0_opsz48.svg" alt="" className={"img-green"}/>}
      {good === -1 && <img src="./dangerous_black_48dp.svg" alt="" className={"img-red"}/>}
      {good === 0 && <img src="./priority_high_FILL0_wght400_GRAD0_opsz48.svg" alt="" className={"img-yellow"}/>}
    </div>
  );
}

export default GeneralNoti;

