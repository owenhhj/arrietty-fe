import './MyProfileCard.css'

function MyProfileCardEdit(props) {
  const date = new Date()

  const editGraduationOptions = []
  let i;
  for (i=date.getFullYear()-2; i<date.getFullYear()+5; i++) {
    editGraduationOptions.push(i)
  }

  const editMajorOptions = ["Computer Science", "Data Science", "Other Majors"]

  return (
    <div className="MyProfileCard">
      <h2>{props.title}</h2>
      <p>{props.netid}</p>

      <div>
        <label htmlFor="editName">Name</label>
        <input type="text" id="editName" placeholder={props.name}/>
      </div>
      <div>
        <label htmlFor="editGraduation">Graduation</label>
        <select name="editGraduation" id="editGraduation">
          {editGraduationOptions.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="editMajor">Major</label>
        <select name="editMajor" id="editMajor">
          {editMajorOptions.map((major) => (
            <option value={major}>{major}</option>
          ))}
        </select>
      </div>



    </div>
  )
}

MyProfileCardEdit.defaultProps = {
  title: "My Profile Card Edit",
  netid: "abc1234",
  name: "myname",
  graduation: "2022",
  major: "Computer Science",
  bio: "I'm a guy"
}

export default MyProfileCardEdit

