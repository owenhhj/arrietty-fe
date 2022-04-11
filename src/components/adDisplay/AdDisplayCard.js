import './AdDisplayCard.css';
import AdDisplayCardHoverMore from "./AdDisplayCardHoverMore";
import {translateTimeAgo} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";
import {getSiteInfo} from "../common/SiteInfoProvider";

const fakeAd = {
  id: 1, adType: 'textbook', adTitle: 'This is a fake title for an ad but this is very long', price: '1233425',
  comment: 'This is a fake comment for and ad but this is very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long',
  createTime: "Apr 4, 2022, 12:00:00 AM", isMarked: true, numberOfTaps: 60
}

const fakeContact = {username:'Nameee eeeaw sfee aew faewf eawf', netId:'abcd12345', avatarImageId:'./default_avatar.jpg'};

function AdDisplayCard({
  adData=fakeAd,  // one piece of adData  <--> one advertisement
                       }) {
  const ROOT = 'https://localhost:8000/';
  const MY_NETID = getSiteInfo().netId;
  // eslint-disable-next-line no-unused-vars
  const [isMine, setIsMine] = useState(!!adData.userNetId && adData.userNetId===MY_NETID);
  const [tapped, setTapped] = useState(!!adData.userNetId);  // true if field exists
  const [numOfTaps, setNumOfTaps] = useState(0);
  const [marked, setMarked] = useState(!!adData.isMarked);  // fixme pending
  const [hover, setHover] = useState(false);
  const [hoverPos, setHoverPos] = useState({});
  const [contactInfo, setContactInfo] = useState(fakeContact);

  useEffect(() => {
    if (!!adData.userNetId) {
      let temp = {
        username: adData.username!==null ? adData.username : fakeContact.username,
        netId: adData.userNetId,
        avatarImageId: adData.userAvatarImageId
      };
      // console.log('AdDisplayCard onMount set contactInfo to:', temp);
      setContactInfo(temp);
    }
    if (!!adData.numberOfTaps && Number(adData.numberOfTaps)>=0) {
      setNumOfTaps(Number(adData.numberOfTaps));
    }
  }, []);

  const handleMouseMove = (e) => {
    setHoverPos({xPos: e.pageX+15, yPos: e.pageY+15});
  };

  const handleHover = () => {
    setHover(true);
  };

  const handleHoverLeave = () => {
    setHover(false);
  };

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({action: "add", body: {msg: msg, good: good}});
  };

  const handleTap = () => {
    if (!!adData.userNetId || tapped) {  // double check for state
      handleShowNoti('Cannot withdraw tap', false);
    } else {
      dataFetch(`${ROOT}tap?id=${adData.id}`,
        {},
        (res) => {
          setContactInfo(res);
          setTapped(true);
          setNumOfTaps(numOfTaps+1);
        },
        (err) => {
          console.warn(err);
          handleShowNoti('Tap failure', false);
        }
      );
    }
  };

  const handleMark = () => {
    if (marked) {
      dataFetch(
        `${ROOT}mark?id=${adData.id}&status=off`,
        {method: 'GET'},
        () => {
          setMarked(false);
        },
        (err) => {
          console.warn(err);
          handleShowNoti('Unmark failure', false);
        }
      );
    } else {
      dataFetch(
        `${ROOT}mark?id=${adData.id}&status=on`,
        {method: 'GET'},
        () => {
          setMarked(true);
        },
        (err) => {
          console.warn(err);
          handleShowNoti('Mark failure', false);
        }
      );
    }
  }

  return (
    <div>
      <div className={'AdDisplayCard card clickable'} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} onMouseMove={handleMouseMove}>

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

        <div className={'col-3 non-text'}>
          <div className={'col-3-tags-container'}>
            <div className={'col-3-tags'}>
              <p className={'tag'}>{adData.adType}</p>
              <p className={'last-mod'}>{translateTimeAgo(adData.createTime)}</p>
            </div>
          </div>
          {!tapped &&
            <div className={'col-3-to-unlock-container'}>
              <div className={'col-3-to-unlock card'}>
                <img src="./lock_black_48dp.svg" alt=""/>
                <p>Tap to unlock user info</p>
              </div>
            </div>
          }
          {tapped &&
            <div className={'col-3-to-unlock-container'}>
              <div className={'col-3-unlocked card'}>
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
              {!isMine &&
                <div className={'tap-mark clickable'} onClick={handleTap} style={{backgroundColor: tapped?"#DDDDDD":""}}>
                  <img src="./touch_app_black_48dp.svg" alt=""/>
                  {numOfTaps<=0 && <p>Tap</p>}
                  {numOfTaps>0 && <p>{adData.numberOfTaps}</p>}
                </div>
              }
              {!isMine &&
                <div className={'tap-mark clickable'} onClick={handleMark}>
                  {!marked && <img src="bookmark_border_black_48dp.svg" alt=""/>}
                  {marked && <img src="bookmark_black_48dp.svg" alt=""/>}
                  <p>Mark</p>
                </div>
              }
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











