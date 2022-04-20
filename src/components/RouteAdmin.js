import AdminTagInputWidget from "./admin/AdminTagInputWidget";
import "./RouteAdmin.css";
import {useState} from "react";
import AdminBulletinManageWidget from "./admin/AdminBulletinManageWidget";
import AdminBlacklist from "./admin/AdminBlacklist";

function RouteAdmin(){

  const [tabId, setTabId] = useState(0);

  return (
    <div className={"admin-page page"}>
      <div className={"admin-control-board card"}>
        <div className={"control-board-title"}>
          <p>Admin home</p>
        </div>
        <hr/>
        <div className={"control-board-item"} onClick={()=>{setTabId(0)}}>
          <img src="./pie_chart_black_48dp.svg" alt=""/>
          <p>Site statistics</p>
        </div>
        <hr/>
        <div className={"control-board-item"} onClick={()=>{setTabId(1)}}>
          <img src="./label_black_48dp.svg" alt=""/>
          <p>Manage tags</p>
        </div>
        <hr/>
        <div className={"control-board-item"} onClick={()=>{setTabId(2)}}>
          <img src="./feed_black_48dp.svg" alt=""/>
          <p>Bulletin</p>
        </div>
        <hr/>
        <div className={"control-board-item"} onClick={()=>{setTabId(3)}}>
          <img src="./phone_disabled_black_48dp.svg" alt=""/>
          <p>Blacklist</p>
        </div>
      </div>

      {tabId===1 && <AdminTagInputWidget/>}
      {tabId===2 && <AdminBulletinManageWidget/>}
      {tabId===3 && <AdminBlacklist/>}
    </div>

  );
}

export default RouteAdmin;