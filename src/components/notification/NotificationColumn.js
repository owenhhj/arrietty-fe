import './NotificationColumn.css';
import NotificationCard from "./NotificationCard";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";

function NotificationColumn() {
  const ROOT = 'https://localhost:8000/';
  const [notis, setNotis] = useState([]);

  useEffect(() => {
    dataFetch(
      `${ROOT}notification`,
      {method: 'GET'},
      setNotis,
      (e) => {console.warn(e);}
    );
  }, []);

  return (
    <div className={'NotificationColumn'}>

      {/* todo refactor this for other routes */}
      <div className={'NotificationTitle card'}>
        <p>Notifications</p>
      </div>

      {notis.map(noti => {
        return (
          <NotificationCard key={noti.id} {...noti}/>
        );
      })}

    </div>
  );
}

export default NotificationColumn;











