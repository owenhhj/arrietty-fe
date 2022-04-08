

function NotificationCard({
  id=1,
  username='RandomUser',
  netId='ca1555',
  avatarImageId=2,
  adTitle='RandomAdTitle',
  createTime="Apr 5, 2022, 12:00:00 PM"
                          }) {
  const ROOT = 'https://localhost:8000/';


  return (
    <div className={'NotificationCard card'}>

      <img src={`${ROOT}image?id=${avatarImageId}`} alt=""/>
      <p>{username}</p>
      <p>{netId}</p>
      <p>{adTitle}</p>



    </div>
  );
}

export default NotificationCard;







