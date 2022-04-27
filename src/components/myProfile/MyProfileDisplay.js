import './MyProfile.css'
import React from "react";
import {MUIButton} from "../common/MUIComponents";

function MyProfileDisplay({
  data=null,
  callback=null
                          }) {
  const ROOT = 'https://localhost:8000/';
  const handleCallback = (e) => {
    e.preventDefault()
    callback({action: "switch"});
  };

  const handleNewAdBtnClick = ()=>{
    callback({action: "addNewAd"});
  };

  return (
    <div className="MyProfileDisplay">
      <div className="MyProfileDisplay1">
        <div className="divAvatarStripe">
          <img className="avatarStripe" src={`./avatar_stripe.jpg`} alt=""/>
        </div>
        <div className="divAvatar">
          {!data.avatarImageId && (
            <img className="avatar" src={"./default_avatar.jpg"} alt=""/>
          )}
          {/* fixme disp fetched avatar? disp updated edit avatar? */}
          {data.avatarImageId && (
            <img className={'avatar'} src={`${ROOT}image?id=${data.avatarImageId}`} alt=""/>
          )}
        </div>
        <div className="MyProfileDisplay1NetId">{data.netId}</div>
      </div>

      <div className="MyProfileDisplay2">
        <div className="MyProfileDisplay2Text">
          <div>
            <p>
              <span className="field-name">Name:</span>
              <span className={"field-value"}>{data.username?data.username:''}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="field-name">Class:</span>
              <span className={"field-value"}>{data.schoolYear?data.schoolYear:''}</span>
            </p>
          </div>
        </div>
        <div className="divEditIcon">
          <img className="profile-edit-icon clickable" onClick={handleCallback} src={"./pencil-icon.svg"} alt=""/>
        </div>
      </div>

      <div className={"new-ad-btn"}>
        <MUIButton variant={1} label={'New Ad'} size={'small'} buttonStyle={{width: '6em'}} onClick={handleNewAdBtnClick}/>
      </div>


    </div>
  )
}


export default MyProfileDisplay