import './NotificationColumn.css';
import RoutePageTitleCard from "../common/RoutePageTitleCard";
import NotificationCard from "./NotificationCard";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";

const fakeNotis = [
  {id: 1, username:'aejf', netId: 'ca12343', adTitle: 'faoefj ', createTime: 'Apr 5, 2022, 12:00:00 PM'},
  {id: 2, username:'aejfojawef feaw fae ', netId: 'ca12343', adTitle: 'faoefj oawf oiajewoi fjoiawjeo', createTime: 'Apr 5, 2022, 12:00:00 PM'},
  {id: 3, username:'aejfojawef feaw fae ', netId: 'ca12343', adTitle: 'faoefj oawf oia fawejifoiawefj ojaweoi fjoi faewoi foiawej foafwe ijioawej fiojajewoi fjoiawjeo', createTime: 'Apr 5, 2022, 12:00:00 PM'},
  {id: 4, username:'aejfojawef feaw fae ', netId: 'ca12343', adTitle: 'faoefj oawf oiajewoi fjoiawjeo', createTime: 'Apr 5, 2022, 12:00:00 PM'},
];

function NotificationColumn() {
  const ROOT = 'https://localhost:8000/';
  const pageTitle = 'Notifications';
  const [notis, setNotis] = useState(fakeNotis);

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











