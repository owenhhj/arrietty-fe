import "./MyProfile.css"
import {useState} from "react"
import {dataFetch} from "../common/common";
import Input from "../common/Input";
import Button from "../common/Button";
import {MUIButton, MUITagSelect, MUITextField} from "../common/MUIComponents";

function getYearOptions() {
  // let date = new Date();
  // for (let i=date.getFullYear()-2; i<date.getFullYear()+5; i++) {ans.push(i)}
  return ["freshman", "sophomore", "junior", "senior"].map((y, index) => {
    return {id: index, label: y};
  });
}

// todo more majors from back-end or defined here?
function getMajorOptions() {
  return ["Computer Science", "Data Science", "Other Majors"].map((y, index) => {
    return {id: index, label: y};
  });
}

function MyProfileEdit(props) {
  const editYearOptions = getYearOptions();
  const editMajorOptions = getMajorOptions();
  const ROOT = 'https://localhost:8000/';

  // 2-way bind input content to pass to parent
  const [profileDataEdit, setProfileDataEdit] = useState(props.data);
  const [avatarImageSrc, setAvatarImageSrc] = useState("./avatar");
  let formData = {...profileDataEdit};
  let avatarFileInputDom;
  const handleFormSubmit = () => {
    dataFetch(
      ROOT + "profile",
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      },
      (x) => {
        setProfileDataEdit(formData);
        props.callback({action: "update", body: formData});
      },
      null
    );

    // todo image size check
    if (avatarFileInputDom.files && avatarFileInputDom.files[0]) {
      let form = new FormData();
      form.append("file", avatarFileInputDom.files[0]);
      dataFetch(
        ROOT + "avatar",
        {
          method: 'POST',
          body: form
        },
        (x) => {
          formData.avatarImageUrl = avatarImageSrc;
          props.callback({action: "update", body: formData});
          window.location.reload();
        },
        null
      );
    }
  };

  const handleFormChange = (identifier, value) => {
    if (identifier==='schoolYear' || identifier==='major') {
      formData[identifier] = value.label;
      return;
    }
    formData[identifier] = value;
  };

  const handleAvatarEdit = () => {
    avatarFileInputDom.click();
  };

  const onAvatarImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarImageSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

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
          <input ref={(r) => {
            avatarFileInputDom = r
          }} onChange={onAvatarImageChange} type={"file"}/>
        </div>
        <div className="MyProfileDisplay1Name">{profileDataEdit.username}</div>
        <div className="MyProfileDisplay1NetId">{profileDataEdit.netId}</div>
      </div>
      <div className="MyProfileEdit2">

        <div className={"profile-edit-row"}>
          {/*<img className={"profile-edit-username"} src={"./username-icon.svg"} alt=""/>*/}
          <p>Username</p>
          <MUITextField
            identifier={'username'} placeholder={profileDataEdit.username}
            styleBox={{width: '100%'}} onChange={handleFormChange}
          />
        </div>
        <div className={"profile-edit-row"}>
          {/*<img className={"profile-edit-school-year"} src={"./grade-year-icon.svg"} alt=""/>*/}
          <p>Year</p>
          <MUITagSelect
            identifier={'schoolYear'} options={editYearOptions}
            style={{width: '100%'}}
            onChange={handleFormChange}
          />
        </div>
        <div className={"profile-edit-row"}>
          <p>Major</p>
          <MUITagSelect
            identifier={'major'} options={editMajorOptions}
            style={{width: '100%'}}
            onChange={handleFormChange}
          />
          {/*<img className={"profile-edit-major"} src={"./major-icon.svg"} alt=""/>*/}
        </div>

        {/* `bio` not in use */}
        {/*<div className={"profile-edit-row"}>*/}
        {/*  /!*<img className={"profile-edit-bio"} src={"./bio-icon.svg"} alt=""/>*!/*/}
        {/*  <Input type="text" identifier="bio" prompt={"Bio"} placeholder={profileDataEdit.bio}*/}
        {/*         onChange={handleFormChange}/>*/}
        {/*</div>*/}

      </div>


      <div className="MyProfileEdit3">
        <MUIButton variant={1} size={'small'} label={'submit'} onClick={handleFormSubmit}/>
        <MUIButton variant={2} size={'small'} label={'cancel'} onClick={()=>{props.callback({action: 'switch'})}}/>
      </div>

    </div>
  );
}


export default MyProfileEdit;
