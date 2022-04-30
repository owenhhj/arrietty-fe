import MyProfile from "./myProfile/MyProfile";
import AdDisplayColumn from "./adDisplay/AdDisplayColumn";
import "./common/common.css";
import "./RouteHome.css";
import Bulletin from "./Bulletin";

function RouteHome(){

  return (
    // <div className={"home-page page"}>
    //   <MyProfile/>
    //   <AdDisplayColumn/>
    //   <Bulletin/>
    // </div>

    <>
      <div className={'home'}>


        <div className={'home-cols-container'}>
          <div className={'home-col-profile'}>
            <MyProfile/>
          </div>
          <div className={'home-col-ad'}>
            <AdDisplayColumn/>
          </div>
          <div className={'home-col-bulletin'}>
            <Bulletin/>
          </div>
        </div>



      </div>
    </>
  );
}

export default RouteHome;




