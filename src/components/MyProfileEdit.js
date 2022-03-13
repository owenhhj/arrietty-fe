import "./MyProfile.css"
import {useState} from "react"

function getYearOptions() {
  let date = new Date()
  let ans = []
  for (let i=date.getFullYear()-2; i<date.getFullYear()+5; i++) {ans.push(i)}
  return ans
}

function getMajorOptions() {
  return ["Computer Science", "Data Science", "Other Majors"]
}

function MyProfileEdit(props) {
  const editYearOptions = getYearOptions()
  const editMajorOptions = getMajorOptions()
  const ROOT = 'http://localhost:8000/'

  // 2-way bind input content to pass to parent
  const [profileDataEdit, setProfileDataEdit] = useState(props.profileDataEdit)
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (e.target.name === "submit") {
      const axios = require('axios')
      axios.post(ROOT+"profile-update", profileDataEdit)
        .then((res) => {
          if (res.data.responseStatus.status === "ok") {
            props.callback({action: "update", body: profileDataEdit})
          }})
        .catch((err) => {
          console.log("Edit axios error:", err)})
    } else {
      props.callback({action: "switch"})
    }
  }

  // real-time bind keyboard input
  const handleFormChange = (e) => {
    e.preventDefault()
    setProfileDataEdit(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))}

  return (
    <div className="MyProfileEdit">
      <div className="MyProfileEdit1">
        <div className="divAvatarStripe">
          <img className="avatarStripe" src={`"${ROOT}static/avatar_stripe.jpg"`} alt=""/>
        </div>
        <div className="divAvatar">
          <img className="avatar" src={`"${ROOT}static/avatar.jpg"`} alt=""/>
        </div>
        <div className="MyProfileEdit1NetId">{props.data.netId}</div>
      </div>


      <div className="MyProfileEdit2">
        <form id="formEdit">
          <div>
            {/*<label htmlFor="editUserName">Name</label>*/}
            <img src={`${ROOT}static/name.svg`} alt=""/>
            <input type="text" id="editUserName" name="userName" defaultValue={profileDataEdit.userName} onChange={handleFormChange}/>
          </div>
          <div>
            {/*<label htmlFor="editSchoolYear">Year</label>*/}
            <img src={`${ROOT}static/school.svg`} alt=""/>
            <select id="editSchoolYear" name="schoolYear" defaultValue={profileDataEdit.schoolYear} onChange={handleFormChange}>
              {editYearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            {/*<label htmlFor="editMajor">Major</label>*/}
            <img src={`${ROOT}static/major.svg`} alt=""/>
            <select id="editMajor" name="major" defaultValue={profileDataEdit.major} onChange={handleFormChange}>
              {editMajorOptions.map((major) => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
          </div>
          <div>
            {/*<label htmlFor="editBio">Bio</label>*/}
            <img src={`${ROOT}static/bio.svg`} alt=""/>
            <input type="text" id="editBio" name="bio" defaultValue={profileDataEdit.bio} onChange={handleFormChange}/>
          </div>
        </form>
      </div>


      <div className="MyProfileEdit3">
        <input type="submit" name="submit" value="Submit" onClick={handleFormSubmit}/>
        <input type="submit" name="cancel" value="Cancel" onClick={handleFormSubmit}/>
      </div>

    </div>
  )
}

MyProfileEdit.defaultProps = {
  profileData: {
    id: 1,
    netId: "abc1234",
    userName: "My Name",
    schoolYear: "My Year",
    major: "My Major",
    bio: "My Bio",
    numPosts: 0,
    numNoti: 0
  },
  profileDataEdit: {
    id: 1,
    netId: "abc1234",
    userName: "My Name",
    schoolYear: "My Year",
    major: "My Major",
    bio: "My Bio",
    numPosts: 0,
    numNoti: 0
  }
}

export default MyProfileEdit
