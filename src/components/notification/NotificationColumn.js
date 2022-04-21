import './NotificationColumn.css';
import RoutePageTitleCard from "../common/RoutePageTitleCard";
import NotificationCard from "./NotificationCard";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";

function NotificationColumn() {
  const ROOT = 'https://localhost:8000/';
  const pageTitle = 'Notifications';
  const [notis, setNotis] = useState([]);

  useEffect(() => {
    dataFetch(
      `${ROOT}getNotification`,
      {method: 'GET'},
      setNotis,
      (e) => {console.warn(e);}
    );
  }, []);

  return (
    <div className={'NotificationColumn'}>

      <RoutePageTitleCard pageTitle={pageTitle}/>

      {notis.map(noti => {
        return (
          <NotificationCard key={noti.id} {...noti}/>
        );
      })}

    </div>
  );
}

export default NotificationColumn;











