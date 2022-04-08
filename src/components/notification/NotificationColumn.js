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
      // setNotis,
      (r) => {
        console.log('/notification fetched:', r);
        setNotis(r);
      },
      (e) => {console.warn(e);}
    );
  }, []);

  return (
    <>
      {notis.map(noti => {
        return (
          <NotificationCard key={noti.id} {...noti}/>
        );
      })}
    </>
  );
}

export default NotificationColumn;











