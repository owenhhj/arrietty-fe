import './MyProfile.css'
import './common/common.css'
import MyProfileDisplay from "./MyProfileDisplay";
import MyProfileEdit from "./MyProfileEdit";
import GeneralNoti from "./common/GeneralNoti";
import {useState, useEffect} from "react";
import {dataFetch} from "./common/common";

function MyProfile({callback}) {
  const [myProfileData, setMyProfileData] = useState(MyProfile.defaultProps.profileData)
  const [pageShow, setPageShow] = useState(0)  // 0: show disp, 1: show edit
  const ROOT = 'https://localhost:8000/'

  useEffect(() => {
    dataFetch(
        ROOT+"profile?userId=",
        {method:"GET"},
        setMyProfileData,
        null
    );
  }, [])

  // handle data from children: disp & edit
  function callbackHandler(data) {
    if (data.action === "update") {
      setMyProfileData(data.body)
      setPageShow(0)
    } else if (data.action === "switch") {
      setPageShow(1-pageShow)
    }
    else if (data.action === "addNewAd") {
      callback(true);
    }
  }

  const [showNoti, setShowNoti] = useState(false);

  const handleNoti = (e) => {
    e.preventDefault();
    setShowNoti(false);
  }

  return (
    <div className="MyProfile card">
      {showNoti && <GeneralNoti onClick={handleNoti}/>}
      {pageShow === 0 && <MyProfileDisplay data={myProfileData} callback={callbackHandler}/>}
      {pageShow === 1 && <MyProfileEdit data={myProfileData} callback={callbackHandler}/>}
    </div>
  )
}

MyProfile.defaultProps = {
  title: "MyProfile (display & edit)",
  profileData: {
    id: 1,
    netId: "abc1234",
    username: "My Name",
    schoolYear: "My Year",
    major: "My Major",
    bio: "My Bio",
    avatarImageUrl:"./avatar",
    numPosts: 0,
    numNoti: 0
  },
}

export default MyProfile
