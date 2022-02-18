import './MyProfileCard.css'

function MyProfileCard(props) {

  return (
    <div className="MyProfileCard">
      <h2>{props.title}</h2>

      
      
      
      
      
    </div>
  )
}

MyProfileCard.defaultProps = {
  title: "My Profile Card"
}

export default MyProfileCard
