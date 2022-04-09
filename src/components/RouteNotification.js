import MyProfile from "./myProfile/MyProfile";
import NotificationColumn from "./notification/NotificationColumn";

// page component for RouteNotification
function RouteNotification() {

  return (
    <div className={'RouteNotification page'}>

      <MyProfile/>
      <NotificationColumn/>

    </div>
  );
}

export default RouteNotification;






