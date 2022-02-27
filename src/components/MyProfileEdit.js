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

  // 2-way bind input content to pass to parent
  const [profileDataEdit, setProfileDataEdit] = useState(props.profileDataEdit)
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (e.target.name === "submit") {
      const axios = require('axios')
      axios.post("http://localhost:3001/profile-update", profileDataEdit)
        .then((res) => {
          if (res.data.responseStatus.status === "ok") {
            props.callback({action: "update", body: profileDataEdit})
          }
        })
        .catch((err) => {
          console.log("Edit axios error:", err)
        })
    }
    else {
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

  // parent decides to show disp/edit
  if (!props.show) {
    return null
  }
  return (
    <div className="MyProfileEdit">
      <p>{props.profileData.netId}</p>

      {/* form to edit [name, year, major, bio] */}
      <form id="formEdit">
        <div>
          <label htmlFor="editUserName">Name</label>
          {/* TODO: see if placeholder works */}
          <input type="text" id="editUserName" name="userName" defaultValue={profileDataEdit.userName} onChange={handleFormChange}/>
        </div>
        <div>
          <label htmlFor="editSchoolYear">Year</label>
          <select id="editSchoolYear" name="schoolYear" defaultValue={profileDataEdit.schoolYear} onChange={handleFormChange}>
            {editYearOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="editMajor">Major</label>
          <select id="editMajor" name="major" defaultValue={profileDataEdit.major} onChange={handleFormChange}>
            {editMajorOptions.map((major) => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="editBio">Bio</label>
          <input type="text" id="editBio" name="bio" defaultValue={profileDataEdit.bio} onChange={handleFormChange}/>
        </div>
      </form>
      <div>
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
