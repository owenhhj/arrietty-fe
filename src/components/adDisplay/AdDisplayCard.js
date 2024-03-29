import './AdDisplayCard.css';
import AdDisplayCardHoverMore from "./AdDisplayCardHoverMore";
import AdListingDetailCard from "./AdListingDetailCard";
import {capFirstLetter, translateTimeAgo} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";

function AdDisplayCard({
  adData,
  MY_NETID,
  unmarkSelf=null  // from FavoriteColumn
                       }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const IMAGE = process.env.REACT_APP_API_IMAGE;
  const MARK = process.env.REACT_APP_API_MARK;
  const TAP = process.env.REACT_APP_API_TAP;
  // eslint-disable-next-line no-unused-vars
  const [isMine, setIsMine] = useState(!!adData.userNetId && adData.userNetId===MY_NETID);
  const [contactInfo, setContactInfo] = useState({});
  const [tapped, setTapped] = useState(!!adData.userNetId);  // true if field exists
  const [numOfTaps, setNumOfTaps] = useState(0);
  const [marked, setMarked] = useState(!!adData.isMarked);
  const [hover, setHover] = useState(false);
  const [hoverPos, setHoverPos] = useState({});
  const [showDetailCard, setShowDetailCard] = useState(false);

  useEffect(() => {
    if (!!adData.userNetId) {
      let temp = {
        username: adData.username!==null ? adData.username : 'Qilin',
        netId: adData.userNetId,
        avatarImageId: adData.userAvatarImageId
      };
      setContactInfo(temp);
    }
    if (!!adData.numberOfTaps && Number(adData.numberOfTaps)>=0) {
      setNumOfTaps(Number(adData.numberOfTaps));
    }
  }, []);

  const handleMouseMove = (e) => {
    setHoverPos({xPos: e.pageX+15, yPos: e.pageY+15});
  };

  const handleHoverEnter = () => {
    setHover(true);
  };

  const handleHoverLeave = () => {
    setHover(false);
  };

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({action: "add", body: {msg: msg, good: good}});
  };

  const handleTap = (e) => {
    e.stopPropagation();  // prevent clicking the card below at the same time
    if (!!adData.userNetId || tapped) {  // double check for state
      handleShowNoti('Cannot withdraw tap', -1);
    } else {
      dataFetch(
        `${ROOT}${TAP}?id=${adData.id}`,
        {},
        (res) => {
          setContactInfo(res);
          setTapped(true);
          setNumOfTaps(numOfTaps+1);
        },
        (err) => {
          handleShowNoti('Tap failure', -1);
        }
      );
    }
  };

  const handleMark = (e) => {
    e.stopPropagation();  // prevent clicking the card below at the same time
    if (marked) {
      dataFetch(
        `${ROOT}${MARK}?id=${adData.id}&status=off`,
        {method: 'GET'},
        () => {
          setMarked(false);
          if (unmarkSelf) {
            unmarkSelf(adData.id);
          }
        },
        (err) => {
          handleShowNoti('Unmark failure', -1);
        }
      );
    } else {
      dataFetch(
        `${ROOT}${MARK}?id=${adData.id}&status=on`,
        {method: 'GET'},
        () => {
          setMarked(true);
        },
        (err) => {
          handleShowNoti('Mark failure', -1);
        }
      );
    }
  };

  const handleShowDetail = () => {
    setShowDetailCard(true);
  };

  const handleDetailCard = () => {
    // the only action for now is to close the card
    setShowDetailCard(false);
  };

  return (
    <div>
      <AdListingDetailCard isOpen={showDetailCard} adData={adData} callback={handleDetailCard}/>
      <div
        className={'AdDisplayCard card non-text'}
        onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onMouseMove={handleMouseMove}
        onClick={handleShowDetail}
      >
        <div className={'col-1 clickable-btn'}>

          {adData.imageIds && <img src={`${ROOT}${IMAGE}?id=${adData.imageIds.split(',')[0]}`} alt=""/>}
          {!adData.imageIds && <img src="./default_cover.jpg" alt=""/>}

          <div className={'col-1-num-of-pics'}>
            {adData.imageIds && <p>{adData.imageIds.split(',').length}</p>}
            {!adData.imageIds && <p>0</p>}
          </div>
        </div>

        <div className={'col-2'}>
          <div className={'col-2-ad-title'}>
            <p>{adData.adTitle}</p>
          </div>
          <div className={'col-2-price'}>
            <p className={'price-selling'}>{adData.price} RMB</p>
            {adData.adType==='textbook' && <p className={'price-original'}>{adData.originalPrice} RMB</p>}
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
              <p className={'tag'}>{capFirstLetter(adData.adType)}</p>
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

                  {contactInfo.avatarImageId && (
                    <img src={`${ROOT}${IMAGE}?id=${contactInfo.avatarImageId}`} alt=""/>
                  )}
                  {!contactInfo.avatarImageId && (
                    <img src={'./default_avatar.jpg'} alt=""/>
                  )}

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
                <div className={'tap-mark clickable-btn'} onClick={handleTap} style={{backgroundColor: tapped?"#DDDDDD":""}}>
                  <img src="./touch_app_black_48dp.svg" alt=""/>
                  {numOfTaps<=0 && <p>Tap</p>}
                  {numOfTaps>0 && <p>{numOfTaps}</p>}
                </div>
              }
              {!isMine &&
                <div className={'tap-mark clickable-btn'} onClick={handleMark}>
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










