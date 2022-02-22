import './MyProfile.css'
import MyProfileDisplay from "./MyProfileDisplay";
import MyProfileEdit from "./MyProfileEdit";
import {useState, useEffect} from "react";

function MyProfile(props) {
  const [myProfileData, setMyProfileData] = useState(MyProfile.defaultProps.profileData)

  useEffect(() => {
    fetch("http://localhost:3001/profile")
      .then(res => res.json())
      .then((res) => {
        console.log("res", res)
        setMyProfileData(res.body)
      },
        (err) => {
        console.log("err", err)
        })
  }, [])

  const callbackUpdate = (data) => {
    console.log("callbackUpdate called with data:", data)
  }

  return (
    <div className="MyProfile">
      <h2>{props.title}</h2>

      <MyProfileDisplay data={myProfileData} callback={callbackUpdate}/>

      <MyProfileEdit/>
      
      
    </div>
  )
}

MyProfile.defaultProps = {
  title: "My Profile (containing display & edit component)",
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
