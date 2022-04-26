import './MyProfile.css'
import Button from "../common/Button";
import React from "react";
import {MUIButton} from "../common/MUIComponents";

function MyProfileDisplay({
  data=null,
  callback=null
                          }) {
  const handleCallback = (e) => {
    e.preventDefault()
    callback({action: "switch"})
  }

  const handleNewAdBtnClick = ()=>{
    callback({action: "addNewAd"})
  }

  return (
    <div className="MyProfileDisplay">
      <div className="MyProfileDisplay1">
        <div className="divAvatarStripe">
          <img className="avatarStripe" src={`./avatar_stripe.jpg`} alt=""/>
        </div>
        <div className="divAvatar">
          <img  className="avatar" src={"./avatar"} alt=""/>
        </div>
        <div className="MyProfileDisplay1Name">{data.username}</div>
        <div className="MyProfileDisplay1NetId">{data.netId}</div>
      </div>

      <div className="MyProfileDisplay2">
        <div className="MyProfileDisplay2Text">
          <div>
            <span className="fieldName">School year:</span>
            <span className={"field-value"}>{data.schoolYear}</span>
          </div>
          <div>
            <span className="fieldName">Major:</span>
            <span className={"field-value"}>{data.major}</span>
          </div>

          {/* `bio` not in use */}
          {/*<div>*/}
          {/*  <span className="fieldName">Bio:</span>*/}
          {/*  <span className={"field-value"}>{data.bio}</span>*/}
          {/*</div>*/}

        </div>
        <div className="divEditIcon">
          <img className="editIcon" onClick={handleCallback} src={"./pencil-icon.svg"} alt=""/>
        </div>
      </div>

      <div className={"new-ad-btn"}>
        <MUIButton variant={1} label={'New Ad'} size={'small'} buttonStyle={{width: '6em'}} onClick={handleNewAdBtnClick}/>
      </div>


    </div>
  )
}


export default MyProfileDisplay