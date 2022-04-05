import './AdDisplayCard.css';
import AdDisplayCardHoverMore from "./AdDisplayCardHoverMore";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";

const fakeAd = {
  id: 1, adType: 'textbook', adTitle: 'This is a fake title for and ad but this is very long', price: '1233425',
  comment: 'This is a fake comment for and ad but this is very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long'
}

const fakeContact = {username:'Nameee eeeaw sfee aew faewf eawf', netId:'abcd12345', avatarImageId:'./default_avatar.jpg'};

function AdDisplayCard({
  adData=fakeAd,  // one piece of adData
                       }) {
  const ROOT = 'https://localhost:8000/';
  const [tapped, setTapped] = useState(false);  // todo adData.tapped not in README
  const [hover, setHover] = useState(false);
  const [hoverPos, setHoverPos] = useState({});
  const [contactInfo, setContactInfo] = useState(fakeContact);

  // todo InfoVisual Hw return null component while loading?
  useEffect(() => {
    dataFetch(`${ROOT}tap?id=${adData.id}`,
      {},
      setContactInfo,
      (e) => {console.warn(e)}
    );
  }, [adData]);

  const handleMouseMove = (e) => {
    setHoverPos({xPos: e.pageX+15, yPos: e.pageY+15});
  }

  const handleHover = () => {
    setHover(true);
  }

  const handleHoverLeave = () => {
    setHover(false);
  }

  const handleTap = (e) => {
    e.preventDefault();
    if (tapped) {
      alert('Cannot withdraw tap');  // todo use GeneralNoti
    } else {
      setTapped(true);
    }
  }

  return (
    <div>
      <div className={'AdDisplayCard'} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} onMouseMove={handleMouseMove}>

        <div className={'col-1'}>
          <img src={`${ROOT}image?id=${adData.imageIds.split(',')[0]}`} alt=""/>
          {/*<img src="./default_cover.jpg" alt=""/>*/}

          {/* todo num of pics icon */}

        </div>

        <div className={'col-2'}>
          <div className={'col-2-ad-title'}>
            <p>{adData.adTitle}</p>
          </div>
          <div className={'col-2-price'}>
            <p className={'price-selling'}>{adData.price} RMB</p>
            <p className={'price-original'}>{adData.originalPrice} RMB</p>
          </div>
          <div className={'col-2-hr'}>
            <hr/>
          </div>
          <div className={'col-2-comment'}>
            <p>{adData.comment}</p>
          </div>
        </div>

        <div className={'col-3'}>
          <div className={'col-3-tags-container'}>
            <div className={'col-3-tags'}>
              {/*todo tag/time*/}
              <p className={'tag'}>Textbook</p>
              <p className={'last-mod'}>1 hour ago</p>
            </div>
          </div>
          {!tapped &&
            <div className={'col-3-to-unlock-container'}>
              <div className={'col-3-to-unlock'}>
                <img src="./lock_black_48dp.svg" alt=""/>
                <p>Tap to unlock user info</p>
              </div>
            </div>
          }
          {tapped &&
              <div className={'col-3-to-unlock-container'}>
                <div className={'col-3-unlocked'}>
                  <div className={'owner-avatar'}>
                    {/*<img src={contactInfo.avatarImageId} alt=""/>*/}
                    <img src={`${ROOT}image?id=${contactInfo.avatarImageId}`} alt=""/>
                  </div>
                  <div className={'owner-info'}>
                    <p className={'owner-info-name'}>{contactInfo.username}</p>
                    <p className={'owner-info-netId'}>{contactInfo.netId}@nyu.edu</p>
                  </div>
                </div>
              </div>
          }
          <div className={'col-3-buttons-container'}>
            <div className={'col-3-buttons'}>
              <div className={'btn-tap clickable'} onClick={handleTap} style={{backgroundColor: tapped?"#DDDDDD":""}}>
                <img src="./touch_app_black_48dp.svg" alt=""/>
                <p>Tap</p>
              </div>
              <div className={'btn-mark clickable'}>
                <img src="bookmark_border_black_48dp.svg" alt=""/>
                <p>Mark</p>
              </div>
            </div>

          </div>
        </div>


      </div>

      {hover && adData.adType==='textbook' && <AdDisplayCardHoverMore {...adData} {...hoverPos}/>}

    </div>

  );
}

export default AdDisplayCard;

export function TapToUnlock() {
  return (
      <div className={'col-3-to-unlock-container'}>
        <div className={'col-3-to-unlock'}>
          <img src="./lock_black_48dp.svg" alt=""/>
          <p>Tap to unlock user info</p>
        </div>
      </div>
  );
}











