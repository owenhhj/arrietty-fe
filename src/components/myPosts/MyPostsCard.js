import './MyPostsCard.css';
import {useEffect, useState} from "react";
import {MUIButton} from "../common/MUIComponents";
import {convertTimeBackToFront} from "../common/common";

function MyPostsCard({
                       adData = {},
                       callbackEdit = null,
                       callbackDelete = null
                     }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const IMAGE = process.env.REACT_APP_API_IMAGE;
  const [adTime, setAdTime] = useState('');

  // 'Apr 5, 2022, 10:20:45 PM'
  useEffect(() => {
    let d = convertTimeBackToFront(adData.createTime);
    setAdTime(
      d.toLocaleString('en', {month: 'short', day: 'numeric', year: 'numeric'})
    );
  }, []);

  const handleEdit = () => {
    callbackEdit(adData.id);
  };

  const handleDelete = () => {
    callbackDelete(adData.id)
  };

  return (
    <div style={{display: 'inline-block'}}>
      <div className={'MyPostsCard card'}>
        <div className={'rows-container'}>
          <div className={'row-thumbnail'}>
            <img src={`${ROOT}${IMAGE}?id=${adData.imageIds.split(',')[0]}`} alt=""/>
            {/*<img src={adData.imageIds} alt=""/>*/}
          </div>
          <hr/>
          <div className={'row-title'}><p>{adData.adTitle}</p></div>
          <div className={'row-price'}><p>{adData.price} RMB</p></div>
          <div className={'row-time row-price'}><p>{adTime}</p></div>
          <div className={'row-tapped-by row-price'}>
            <p>Tapped {adData.numberOfTaps} time{adData.numberOfTaps > 1 ? 's' : ''}</p>
          </div>
          <hr/>
          <div className={'row-buttons'}>
            <div className={'btn-edit'}>
              <MUIButton
                label={'Edit'} size={'small'} variant={1} buttonStyle={{height: '2em'}} onClick={handleEdit}
              />
            </div>
            <div className={'btn-delete'}>
              <MUIButton
                label={'Delete'} size={'small'} variant={3} buttonStyle={{height: '2em'}} onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default MyPostsCard;






