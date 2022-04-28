import './MyProfile.css'
import '../common/common.css'
import MyProfileDisplay from "./MyProfileDisplay";
import MyProfileEdit from "./MyProfileEdit";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useState, useEffect} from "react";
import {dataFetch} from "../common/common";
import {getSiteInfo} from "../common/SiteInfoProvider";

function MyProfile({callback}) {
  const ROOT = 'https://localhost:8000/';
  const [myProfileData, setMyProfileData] = useState(getSiteInfo());
  const [avatarSrc, setAvatarSrc] = useState(  // pass state hook between components
    myProfileData.avatarImageId ? `${ROOT}image?id=${myProfileData.avatarImageId}` : "./default_avatar.jpg"
  );
  const [pageShow, setPageShow] = useState(0);  // 0: show disp, 1: show edit

  useEffect(() => {
    refreshData();
  }, []);

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({action: "add", body: {msg: msg, good: good}});
  };

  const refreshData = () => {
    dataFetch(
      `${ROOT}profile?userId=`,
      {method:"GET"},
      (res) => {
        setMyProfileData(res);
        setAvatarSrc(res.avatarImageId ? `${ROOT}image?id=${res.avatarImageId}` : "./default_avatar.jpg");
      },
      null
    );
  };

  // handle data from children: disp & edit
  function callbackHandler(data) {
    if (data.action === "update") {
      setMyProfileData(data.body);
      setPageShow(0);
      handleShowNoti('Profile edit success', true);
    } else if (data.action === "switch") {
      setPageShow(1-pageShow)
    } else if (data.action === "addNewAd") {
      callback(true);
    }
  }

  return (
    <div className="MyProfile card non-text">
      {pageShow === 0 && (
        <MyProfileDisplay data={myProfileData} avatarSrc={avatarSrc} callback={callbackHandler}/>
      )}
      {pageShow === 1 && (
        <MyProfileEdit
          prevProfile={myProfileData} avatarSrc={avatarSrc} setAvatarSrc={setAvatarSrc}
          callback={callbackHandler}
        />
      )}
    </div>
  );
}

export default MyProfile;
