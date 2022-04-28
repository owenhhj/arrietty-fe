import MyProfile from "./myProfile/MyProfile";
import AdDisplayColumn from "./adDisplay/AdDisplayColumn";
import "./common/common.css";
import "./RouteHome.css";
import Bulletin from "./Bulletin";

function RouteHome(){

  return (
    <div className={"home-page page"}>
      <MyProfile/>
      <AdDisplayColumn/>
      <Bulletin/>
    </div>
  );
}

export default RouteHome;




