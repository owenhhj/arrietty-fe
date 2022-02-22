import {useState, useEffect} from "react"


function MyProfileEdit(props) {
  const date = new Date()
  const editYearOptions = []
  let i;
  for (i=date.getFullYear()-2; i<date.getFullYear()+5; i++) {
    editYearOptions.push(i)
  }
  const editMajorOptions = ["Computer Science", "Data Science", "Other Majors"]

  // 2-way bind input content to pass to parent
  const [profileDataEdit, setProfileDataEdit] = useState(props.profileDataEdit)
  const handleFormSubmit = (e) => {
    console.log("handleFormSubmit called")
  }

  const handleFormChange = (e) => {
    e.preventDefault()
    setProfileDataEdit(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="MyProfileEdit">
      <h3>{props.title}</h3>
      <p>{props.profileData.netid}</p>
      <p>{props.profileData.name}</p>

      {/* form to edit [name, year, major, bio] */}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="editName">Name</label>
          {/* TODO: see if placeholder works */}
          <input type="text" id="editName" name="name" defaultValue={profileDataEdit.name} onChange={handleFormChange}/>
        </div>
        <div>
          <label htmlFor="editYear">Year</label>
          <select id="editYear" name="year" defaultValue={profileDataEdit.year} onChange={handleFormChange}>
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
        <div>
          {/* TODO: two form buttons? */}
          <input type="submit" name="btnSubmit" value="Submit"/>
          <input type="submit" name="btnCancel" value="Cancel"/>
        </div>
      </form>

    </div>
  )
}

MyProfileEdit.defaultProps = {
  title: "My Profile Edit",
  profileData: {
    netid: "abc1234",
    name: "myname",
    year: "2022",
    major: "Computer Science",
    bio: "I'm a guy"
  },
  profileDataEdit: {
    netid: "abc1234",
    name: "myname",
    year: "2022",
    major: "Computer Science",
    bio: "I'm a guy"
  }
}

export default MyProfileEdit

