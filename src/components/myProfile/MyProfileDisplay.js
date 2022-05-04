import './MyProfile.css'
import React from "react";
import {MUIButton} from "../common/MUIComponents";

function MyProfileDisplay({
  data,
  avatarSrc,
  callback
                          }) {
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
          <img className="avatarStripe" src={`./avatar_stripe.png`} alt=""/>
        </div>
        <div className="divAvatar">
          <img className={'avatar'} src={avatarSrc} alt=""/>
        </div>
        <div className="MyProfileDisplay1NetId">{data.netId}</div>
      </div>

      <div className="MyProfileDisplay2">
        <div className="MyProfileDisplay2Text">
          <div>
            <p>
              <span className="field-name">Name:</span>
              <span className={"field-value"}>{data.username ? data.username : ''}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="field-name">Class:</span>
              <span className={"field-value"}>{data.schoolYear ? `CO ${data.schoolYear}` : ''}</span>
            </p>
          </div>
        </div>
        <div className="divEditIcon">
          <img className="profile-edit-icon clickable-icon" onClick={handleCallback} src={"./pencil-icon.svg"} alt=""/>
        </div>
      </div>

      <div className={"new-ad-btn"}>
        <MUIButton
          variant={1} label={'Create New Advertisement'} size={'small'} onClick={handleNewAdBtnClick}
          buttonStyle={{width: '15em'}}
        />
      </div>

    </div>
  )
}


export default MyProfileDisplay