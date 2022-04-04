import "./MyProfile.css"
import {useState} from "react"
import {dataFetch} from "./common/common";
import Input from "./common/Input";
import Button from "./common/Button";

function getYearOptions() {
  // let date = new Date();
    // for (let i=date.getFullYear()-2; i<date.getFullYear()+5; i++) {ans.push(i)}
  return ["freshman", "sophomore", "junior", "senior"]
}

function getMajorOptions() {
  return ["Computer Science", "Data Science", "Other Majors"]
}

function MyProfileEdit(props) {
  const editYearOptions = getYearOptions()
  const editMajorOptions = getMajorOptions()
  const ROOT = 'https://localhost:8000/'

  // 2-way bind input content to pass to parent
  const [profileDataEdit, setProfileDataEdit] = useState(props.data);
  const [avatarImageSrc, setAvatarImageSrc] = useState("./avatar");
  let formData = {...profileDataEdit};
  let avatarFileInputDom;
  const handleFormSubmit = () => {
      dataFetch(
          ROOT+"profile",
          {
              method:'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          },
          (x)=>{
              setProfileDataEdit(formData);
              props.callback({action: "update", body: formData});
            },
          null
      )

      // TODO: image size check
      if(avatarFileInputDom.files && avatarFileInputDom.files[0]){
          let form = new FormData();
          form.append("file", avatarFileInputDom.files[0]);
          dataFetch(
              ROOT+"avatar",
              {
                  method:'POST',
                  body: form
              },
              (x)=>{
                formData.avatarImageUrl = avatarImageSrc;
                props.callback({action: "update", body: formData});
                window.location.reload();
              },
              null
          )

      }

  }

  // real-time bind keyboard input
  const handleFormChange = (key, value)=>{
    formData[key] = value;
  }

  const handleAvatarEdit = ()=>{
      avatarFileInputDom.click();
  };

  const onAvatarImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setAvatarImageSrc(URL.createObjectURL(event.target.files[0]));
    }
  }


  return (
    <div className="MyProfileEdit">
        <div className="MyProfileEdit1">
            <div className="divAvatarStripe">
                <img className="avatarStripe" src={`./avatar_stripe.jpg`} alt=""/>
            </div>
            <div className="divAvatar" onClick={handleAvatarEdit}>
                <img className="avatar" src={avatarImageSrc} alt=""/>
                <div className={"avatar-edit"}>
                    <p>Edit</p>
                </div>
                <input ref={(r)=>{avatarFileInputDom=r}} onChange={onAvatarImageChange} type={"file"}/>
            </div>
            <div className="MyProfileDisplay1Name">{profileDataEdit.username}</div>
            <div className="MyProfileDisplay1NetId">{profileDataEdit.netId}</div>
        </div>
      <div className="MyProfileEdit2">

          <div className={"profile-edit-row"}>
            {/*<img className={"profile-edit-username"} src={"./username-icon.svg"} alt=""/>*/}
            <Input type="text" identifier="username" prompt="Username" placeholder={profileDataEdit.username} onChange={handleFormChange}/>
          </div>
          <div className={"profile-edit-row"}>
            {/*<img className={"profile-edit-school-year"} src={"./grade-year-icon.svg"} alt=""/>*/}
            <Input identifier="schoolYear" prompt={"Class year"} type="select" placeholder={profileDataEdit.schoolYear}  onChange={handleFormChange}
                   children={
                       editYearOptions.map((year) => {
                           if(year===profileDataEdit.schoolYear){
                               return (
                                   <option key={year} value={year} selected>{year}</option>
                               );
                           }
                           else {
                               return (
                                   <option key={year} value={year}>{year}</option>
                               );
                           }
                       }
                   )}
            />
          </div>
          <div className={"profile-edit-row"}>
            {/*<img className={"profile-edit-major"} src={"./major-icon.svg"} alt=""/>*/}
            <Input identifier="major" prompt={"Major"} type={"select"} placeholder={profileDataEdit.major} onChange={handleFormChange }
                   children={editMajorOptions.map((major) => {
                       if(major===profileDataEdit.major){
                           return (
                               <option key={major} value={major} selected>{major}</option>
                           )
                       }
                       else{
                           return (
                               <option key={major} value={major}>{major}</option>
                           )
                       }

                   })} />
          </div>
          <div className={"profile-edit-row"}>
            {/*<img className={"profile-edit-bio"} src={"./bio-icon.svg"} alt=""/>*/}
            <Input type="text" identifier="bio" prompt={"Bio"} placeholder={profileDataEdit.bio} onChange={handleFormChange}/>
          </div>

      </div>


      <div className="MyProfileEdit3">
        <Button buttonStyle={"btn--primary"} buttonSize={"btn--medium"} text="Submit" onClick={handleFormSubmit}/>
        <Button buttonStyle={"btn--normal"} buttonSize={"btn--medium"}  text="Cancel" onClick={()=>{props.callback({action: "switch"})}}/>
      </div>

    </div>
  )
}


export default MyProfileEdit
