import {useState, useEffect} from "react"


function MyProfileDisplay(props) {

  return (
    <div className="MyProfileDisplay">
      <h3>MyProfileDisplay</h3>

      <div className="MyProfileDisplayUpper">
        <div>
          {/* avatar */}
        </div>
        <div>
          {/* netid & name, or maybe no netid just name */}
          username: {props.data.userName}
        </div>
      </div>
      <div className="MyProfileDisplayLower">
        <div>
          grad year: {props.data.schoolYear}
        </div>
        <div>
          bio: {props.data.bio}
        </div>
        <div>
          {props.data.numPosts} posts
          {props.data.numNoti} notifications
        </div>
      </div>
      <div className="MyProfileDisplayBottom">
        <button onClick={props.callback("UPDATEthis!!!")}>CallbackButtonTest</button>
      </div>
    </div>
  )
}

MyProfileDisplay.defaultProps = {
  data: {
    id: 0,
    netId: "DefaultNetId",
    userName: "DefaultName",
    schoolYear: "DefaultSchoolYear",
    major: "DefaultMajor",
    bio: "DefaultBio",
    numPosts: 0,
    numNoti: 0
  }
}

export default MyProfileDisplay