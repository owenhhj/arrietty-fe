import './MyProfile.css'
import Button from "../common/Button";
import React from "react";

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
          <div>
            <span className="fieldName">Bio:</span>
            <span className={"field-value"}>{data.bio}</span>
          </div>
        </div>
        <div className="divEditIcon">
          <img className="editIcon" onClick={handleCallback} src={"./pencil-icon.svg"} alt=""/>
        </div>
      </div>

      <div className="MyProfileDisplay3">
        <svg  width="25" height="25" viewBox="0 0 50 50" fill="#595959" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.5833 10.4167V39.5833H10.4167V10.4167H39.5833ZM39.5833 6.25H10.4167C8.125 6.25 6.25 8.125 6.25 10.4167V39.5833C6.25 41.875 8.125 43.75 10.4167 43.75H39.5833C41.875 43.75 43.75 41.875 43.75 39.5833V10.4167C43.75 8.125 41.875 6.25 39.5833 6.25Z" fill="#595959" />
          <path d="M29.1668 35.4166H14.5835V31.2499H29.1668V35.4166ZM35.4168 27.0833H14.5835V22.9166H35.4168V27.0833ZM35.4168 18.7499H14.5835V14.5833H35.4168V18.7499Z" fill="#595959"/>
        </svg>
        <div>{data.numPosts}</div>
        <svg  width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.0002 45.8333C27.2918 45.8333 29.1668 43.9583 29.1668 41.6666H20.8335C20.8335 43.9583 22.7085 45.8333 25.0002 45.8333ZM37.5002 33.3333V22.9166C37.5002 16.5208 34.1043 11.1666 28.1252 9.74992V8.33325C28.1252 6.60409 26.7293 5.20825 25.0002 5.20825C23.271 5.20825 21.8752 6.60409 21.8752 8.33325V9.74992C15.9168 11.1666 12.5002 16.4999 12.5002 22.9166V33.3333L8.3335 37.4999V39.5833H41.6668V37.4999L37.5002 33.3333ZM33.3335 35.4166H16.6668V22.9166C16.6668 17.7499 19.8127 13.5416 25.0002 13.5416C30.1877 13.5416 33.3335 17.7499 33.3335 22.9166V35.4166Z" fill="#595959"/>
        </svg>
        <div>{data.numNoti}</div>
      </div>

      <div className={"new-ad-btn"}>
        <Button buttonStyle={"btn--primary"} buttonSize={"btn--medium"} text={"+ Add a new ad"}  onClick={handleNewAdBtnClick}/>
      </div>


    </div>
  )
}


export default MyProfileDisplay