import './MyProfile.css'

function MyProfileDisplay(props) {
  const ROOT = 'http://localhost:8000/'

  const handleCallback = (e) => {
    e.preventDefault()
    props.callback({action: "switch"})
  }

  return (
    <div className="MyProfileDisplay">
      <div className="MyProfileDisplay1">
        <div className="divAvatarStripe">
          <img className="avatarStripe" src={`${ROOT}static/avatar_stripe.jpg`} alt=""/>
        </div>
        <div className="divAvatar">
          <img className="avatar" src={`${ROOT}static/avatar.jpg`} alt=""/>
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
          <img className="editIcon" onClick={handleCallback} src={`${ROOT}static/pencil.svg`} alt=""/>
        </div>
      </div>

      <div className="MyProfileDisplay3">
        <div><img src={`${ROOT}static/post.svg`} alt=""/></div>
        <div>{props.data.numPosts}</div>
        <div><img src={`${ROOT}static/noti.svg`} alt=""/></div>
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