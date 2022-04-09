import './NotificationCard.css';
import {translateTimeAgo} from "../common/common";

function NotificationCard({
  id=1,
  username='CenturyAve',
  netId='ca1555',
  avatarImageId=2,
  adTitle='Random Ad Title to Sell Something',
  // adTitle='',
  createTime="Apr 5, 2022, 12:00:00 PM"
                          }) {
  const ROOT = 'https://localhost:8000/';

  return (
    <div className={'NotificationCard card'}>

      <div className={'NotiCard-col-1'}>
        <img src={`${ROOT}image?id=${avatarImageId}`} alt=""/>
        {/*<img src="./default_avatar.jpg" alt=""/>*/}
      </div>

      <div className={'NotiCard-col-2'}>
        <p>
          <span className={'username'}>{username}</span> <span className={'netId'}>{netId}</span> tapped on your advertisement <span className={'adTitle'}>"{adTitle}"</span>
        </p>
      </div>

      <div className={'NotiCard-col-3'}>
        <p>{translateTimeAgo(createTime)}</p>
      </div>

    </div>
  );
}

export default NotificationCard;







