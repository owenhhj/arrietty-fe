import './MyPostsCard.css';

function MyPostsCard({
  adData= {},
  callbackEdit=null,
  callbackDelete=null
                     }) {
  const ROOT = 'https://localhost:8000/';

  const handleEdit = () => {
    callbackEdit(adData.id);
  }

  const handleDelete = () => {
    // console.log('mypostscard ready to callbackDelete:', adData, 'id is', adData.id)
    callbackDelete(adData.id)
  }

  return (
    <div className={'MyPostsCard card'}>
      <div className={'rows-container'}>

        <div className={'row-thumbnail'}>
          <img src={`${ROOT}image?id=${adData.imageIds.split(',')[0]}`} alt=""/>
          {/*<img src={adData.imageIds} alt=""/>*/}
        </div>

        <hr/>

        <div className={'row-title'}>
          <p>{adData.adTitle}</p>
        </div>

        <div className={'row-price'}>
          <p>{adData.price} RMB</p>
        </div>

        <div className={'row-time row-price'}>
          <p>{adData.createTime}</p>
        </div>

        <div className={'row-tapped-by row-price'}>
          <p>Tapped {adData.numberOfTaps} time{adData.numberOfTaps>1?'s':''}</p>
        </div>

        <hr/>

        <div className={'row-buttons'}>
          <div className={'btn-edit'}>
            <p className={'clickable'} onClick={handleEdit}>edit</p>
          </div>
          <div className={'btn-delete'}>
            <p className={'clickable'} onClick={handleDelete}>delete</p>
          </div>
        </div>

      </div>

      
      
      
      
      
    </div>
  );
}

export default MyPostsCard;






