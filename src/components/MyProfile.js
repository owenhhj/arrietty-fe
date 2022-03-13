import './MyProfile.css'
import MyProfileDisplay from "./MyProfileDisplay";
import MyProfileEdit from "./MyProfileEdit";
import {useState, useEffect} from "react";

function MyProfile(props) {
  const [myProfileData, setMyProfileData] = useState(MyProfile.defaultProps.profileData)
  const [pageShow, setPageShow] = useState(0)  // 0: show disp, 1: show edit
  const ROOT = 'http://localhost:8000/'

  useEffect(() => {
    fetch(ROOT+"profile")
      .then(res => res.json())
      .then((res) => {
        setMyProfileData(res.body)},
        (err) => {
        console.log("useEffect err", err)})
  }, [])

  // handle data from children: disp & edit
  function callbackHandler(data) {
    if (data.action === "update") {
      setMyProfileData(data.body)
      setPageShow(0)
    } else if (data.action === "switch") {
      setPageShow(1-pageShow)
    } else {
      console.log("MyProfile cbHandler unknown action")
      setPageShow(0)
    }
  }

  return (
    <div className="MyProfile">
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
    userName: "My Name",
    schoolYear: "My Year",
    major: "My Major",
    bio: "My Bio",
    numPosts: 0,
    numNoti: 0
  }
}

export default MyProfile
