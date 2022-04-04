import './MyProfile.css'
import Button from "./common/Button";

function MyProfileDisplay(props) {

  const handleCallback = (e) => {
    e.preventDefault()
    props.callback({action: "switch"})
  }

  const handleNewAdBtnClick = ()=>{
    props.callback({action: "addNewAd"})
  }


  return (
    <div className="MyProfileDisplay">
      <div className="MyProfileDisplay1">
        <div className="divAvatarStripe">
          <img className="avatarStripe" src={`./avatar_stripe.jpg`} alt=""/>
        </div>
        <div className="divAvatar">
          <img className="avatar" src={props.data.avatarImageUrl==null?"./avatar":props.data.avatarImageUrl} alt=""/>
        </div>
        <div className="MyProfileDisplay1Name">{props.data.username}</div>
        <div className="MyProfileDisplay1NetId">{props.data.netId}</div>
      </div>

      <div className="MyProfileDisplay2">
        <div className="MyProfileDisplay2Text">
          <div>
            <span className="fieldName">School year:</span>
            <span className={"field-value"}>{props.data.schoolYear}</span>
          </div>
          <div>
            <span className="fieldName">Major:</span>
            <span className={"field-value"}>{props.data.major}</span>
          </div>
          <div>
            <span className="fieldName">Bio:</span>
            <span className={"field-value"}>{props.data.bio}</span>
          </div>
        </div>
        <div className="divEditIcon">
          <img className="editIcon" onClick={handleCallback} src={"./pencil-icon.svg"} alt=""/>
        </div>
      </div>

      <div className="MyProfileDisplay3">
        <img src={"./profile-posts-icon.svg"} alt=""/>
        <div>{props.data.numPosts}</div>
        <div><img src={"./profile-notification-icon.svg"} alt=""/></div>
        <div>{props.data.numNoti}</div>
      </div>

      <div className={"new-ad-btn"}>
        <Button buttonStyle={"btn--primary"} buttonSize={"btn--medium"} text={"+ Add a new ad"}  onClick={handleNewAdBtnClick}/>
      </div>


    </div>
  )
}


export default MyProfileDisplay