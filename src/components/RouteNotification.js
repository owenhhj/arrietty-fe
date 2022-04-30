import MyProfile from "./myProfile/MyProfile";
import NotificationColumn from "./notification/NotificationColumn";

function RouteNotification() {

  return (
    <div className={'myposts'}>

      <div className={'myposts-grid-container'}>
        <div className={'myposts-grid-profile'}>
          <MyProfile/>
        </div>
        <div className={'myposts-grid-canvas'}>
          <NotificationColumn/>
        </div>
      </div>

    </div>
  );
}

export default RouteNotification;






