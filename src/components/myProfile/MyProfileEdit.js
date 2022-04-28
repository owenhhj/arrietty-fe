import "./MyProfile.css"
import {useState} from "react"
import {dataFetch} from "../common/common";
import {MUIButton, MUITagSelect, MUITextField} from "../common/MUIComponents";

const getYearOptions = () => {
  let ans = [];
  let date = new Date();
  for (let i=date.getFullYear()-2; i<date.getFullYear()+5; i++) {
    ans.push({
      id: i,
      label: i
    });
  }
  return ans;
};

let profileEdit = {};
let avatarFileInputDom;

function MyProfileEdit({
  profilePrev,
  avatarSrc,
  setAvatarSrc,
  callback
                       }) {
  const ROOT = 'https://localhost:8000/';
  const editYearOptions = getYearOptions();
  const [avatarImageSrc, setAvatarImageSrc] = useState(avatarSrc);
  const [valiUsername, setValiUsername] = useState({error: false, helperText: 'between 1 and 40 letters...'});
  // let profileEdit = {...profilePrev};  // defined outside so that `valiUsername` won't force refresh component
  // let avatarFileInputDom;

  const handleFormSubmit = () => {
    let temp = profileEdit;

    if ((!profilePrev.username && !temp.username) || (temp.username && temp.username.length>40)) {
      setValiUsername({...valiUsername, error: true});
      return;
    } else if (!temp.username) {
      temp.username = profilePrev.username;
    }

    if (!temp.schoolYear) {
      temp.schoolYear = profilePrev.schoolYear;
    }

    dataFetch(
      `${ROOT}profile`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(temp)
      },
      (x) => {
        callback({action: 'update', body: temp});
      },
      null
    );

    // todo image size check
    if (avatarFileInputDom.files && avatarFileInputDom.files[0]) {  // run this only when uploaded new img
      let form = new FormData();
      form.append("file", avatarFileInputDom.files[0]);
      dataFetch(
        `${ROOT}avatar`,
        {
          method: 'POST',
          body: form
        },
        (res) => {
          setAvatarSrc(avatarImageSrc);
        },
        null
      );
    }
  };

  const handleFormChange = (identifier, value) => {
    if (identifier==='username') {
      setValiUsername({...valiUsername, error: false});
    }
    profileEdit[identifier] = value;
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
          <div className={"avatar-edit clickable"}>
            <p>Edit</p>
          </div>
          <input ref={(r) => {
            avatarFileInputDom = r
          }} onChange={onAvatarImageChange} type={"file"}/>
        </div>
        <div className="MyProfileDisplay1NetId">{profilePrev.netId}</div>
      </div>

      <div className="MyProfileEdit2">

        <div className={"profile-edit-row"}>
          <p>Username</p>
          <MUITextField
            identifier={'username'} placeholder={profilePrev.username?profilePrev.username:''}
            styleBox={{width: '100%'}} onChange={handleFormChange}
            error={valiUsername.error} helperText={valiUsername.error?valiUsername.helperText:''}
          />
        </div>
        <div className={"profile-edit-row"}>
          <p>Class</p>
          <MUITagSelect
            identifier={'schoolYear'} options={editYearOptions}
            style={{width: '100%'}}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <div className="MyProfileEdit3">
        <MUIButton variant={1} size={'small'} label={'submit'} onClick={handleFormSubmit}/>
        <MUIButton variant={2} size={'small'} label={'cancel'} onClick={()=>{callback({action: 'switch'})}}/>
      </div>

    </div>
  );
}


export default MyProfileEdit;
