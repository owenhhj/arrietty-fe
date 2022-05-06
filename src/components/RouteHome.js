import MyProfile from "./myProfile/MyProfile";
import AdDisplayColumn from "./adDisplay/AdDisplayColumn";
import "./RouteHome.css";
import Bulletin from "./bulletinDisplay/Bulletin";

function RouteHome() {

  return (
    <div className={'home'}>

      <div className={'home-grid-container'}>
        <div className={'home-grid-profile'}>
          <MyProfile/>
        </div>
        <div className={'home-grid-ad'}>
          <AdDisplayColumn/>
        </div>
        <div className={'home-grid-bulletin'}>
          <Bulletin/>
        </div>
      </div>

    </div>
  );
}

export default RouteHome;




