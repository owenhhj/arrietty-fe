import './NotificationCard.css';
import {translateTimeAgo} from "../common/common";

function NotificationCard({
                            id,
                            username,
                            netId,
                            avatarImageId,
                            adTitle,
                            createTime
                          }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const IMAGE = process.env.REACT_APP_API_IMAGE;

  return (
    <div className={'NotificationCard card'}>

      <div className={'NotiCard-col-1'}>
        {avatarImageId && <img src={`${ROOT}${IMAGE}?id=${avatarImageId}`} alt=""/>}
        {!avatarImageId && <img src="./default_avatar.jpg" alt=""/>}
      </div>

      <div className={'NotiCard-col-2'}>
        <p>
          <span className={'username'}>{username}</span> <span className={'netId'}>({netId})</span> tapped on your
          advertisement <span className={'adTitle'}>"{adTitle}"</span>
        </p>
      </div>

      <div className={'NotiCard-col-3'}>
        {createTime && <p>{translateTimeAgo(createTime)}</p>}
      </div>

    </div>
  );
}

export default NotificationCard;







