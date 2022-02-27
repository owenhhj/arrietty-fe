import './MyProfile.css'
import MyProfileDisplay from "./MyProfileDisplay";
import MyProfileEdit from "./MyProfileEdit";
import {useState, useEffect} from "react";

function MyProfile(props) {
  const [myProfileData, setMyProfileData] = useState(MyProfile.defaultProps.profileData)
  const [pageShow, setPageShow] = useState(0)  // 0: show disp, 1: show edit

  useEffect(() => {
    fetch("http://localhost:3001/profile")
      .then(res => res.json())
      .then((res) => {
        setMyProfileData(res.body)
      },
        (err) => {
        console.log("useEffect err", err)
        })
  }, [])

  // handle data from children: disp & edit
  function callbackHandler(data) {
    if (data.action === "update") {
      setMyProfileData(data.body)
      setPageShow(0)
    }
    else if (data.action === "switch") {
      setPageShow(1-pageShow)
    }
    else {
      console.log("MyProfile cbHandler unknown action")
      setPageShow(0)
    }
  }

  return (
    <div className="MyProfile">

      <MyProfileDisplay data={myProfileData} callback={callbackHandler} show={pageShow === 0}/>
      <MyProfileEdit data={myProfileData} callback={callbackHandler} show={pageShow === 1}/>
      
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
