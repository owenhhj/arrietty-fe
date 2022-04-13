import './MyPostsCard.css';

const fakeAd = {
  id: 1, adType: 'textbook', adTitle: 'Tttthis is a fake title for an ad but this is very long', price: '1233425',
  comment: 'This is a fake comment for and ad but this is very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long',
  createTime: "Apr 4, 2022, 12:00:00 AM", numberOfTaps: 99, imageIds: '3,6,9'
}

const fakeAd2 = {
  id: 1, adType: 'textbook', adTitle: 'this is a fake title', price: '123',
  comment: 'This is a fake comment for and ad bery long very long very long very long very long',
  createTime: "Apr 4, 2022, 12:00:00 AM", numberOfTaps: 64, imageIds: '3,6,9'
}

function MyPostsCard({
  adData=fakeAd2,
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
          {/*<img src="./default_cover.jpg" alt=""/>*/}
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






