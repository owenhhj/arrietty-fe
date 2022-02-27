import './MyProfile.css'

function MyProfileDisplay(props) {
  const handleCallback = (e) => {
    e.preventDefault()
    props.callback({action: "switch"})
  }

  if (!props.show) {
    return null
  }
  return (
    <div className="MyProfileDisplay">
      <div className="MyProfileDisplay1">
        <div className="divAvatarStripe">
          <img className="avatarStripe" src="http://localhost:3001/static/avatar_stripe.jpg" alt=""/>
        </div>
        <div className="divAvatar">
          <img className="avatar" src="http://localhost:3001/static/avatar.jpg" alt=""/>
        </div>
        <div className="MyProfileDisplay1Name">{props.data.userName}</div>
        <div className="MyProfileDisplay1NetId">{props.data.netId}</div>
      </div>

      <div className="MyProfileDisplay2">
        <div className="MyProfileDisplay2Text">
          <div><span className="fieldName">Year:</span>{props.data.schoolYear}</div>
          <div><span className="fieldName">Major:</span>{props.data.major}</div>
          <div><span className="fieldName">Bio:</span>{props.data.bio}</div>
        </div>
        <div className="divEditIcon">
          <img className="editIcon" onClick={handleCallback} src="http://localhost:3001/static/pencil.svg" alt=""/>
        </div>
      </div>

      <div className="MyProfileDisplay3">
        <div><img src="http://localhost:3001/static/post.svg" alt=""/></div>
        <div>{props.data.numPosts}</div>
        <div><img src="http://localhost:3001/static/noti.svg" alt=""/></div>
        <div>{props.data.numNoti}</div>
      </div>

    </div>
  )
}

MyProfileDisplay.defaultProps = {
  data: {
    id: 0,
    netId: "DefaultNetId",
    userName: "DefaultUserName",
    schoolYear: "DefaultSchoolYear",
    major: "DefaultMajor",
    bio: "DefaultBio",
    numPosts: 0,
    numNoti: 0
  }
}

export default MyProfileDisplay