import './AdDisplayCard.css';
import AdDisplayCardHoverMore from "./AdDisplayCardHoverMore";
import {useState} from "react";

function AdDisplayCard({
  adData={},
  contactInfo={
    userName: 'Yuechuan Zhang', userNetId: 'yz3919', userAvatarImageId: './avatar.jpg'
  }
                       }) {
  const [tapped, setTapped] = useState(false);  // todo adData.tapped not in README
  const [hover, setHover] = useState(false);
  const [hoverPos, setHoverPos] = useState({});

  const handleMouseMove = (e) => {
    setHoverPos({
      xPos: e.clientX+15,
      yPos: e.clientY+15
    });
  }

  const handleHover = (e) => {
    setHover(true);
  }

  const handleHoverLeave = () => {
    setHover(false);
  }

  const handleTap = (e) => {
    e.preventDefault();
    if (tapped) {
      // alert('Cannot withdraw tap');
      // return;
      setTapped(false);
    } else {
      setTapped(true);
    }
  }

  return (
    <div>
      <div className={'AdDisplayCard'} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} onMouseMove={handleMouseMove}>

        <div className={'col-1'}>
          <img src="./default_cover.jpg" alt=""/>
          {/* num of pics icon */}
        </div>

        <div className={'col-2'}>
          <div className={'col-2-ad-title'}>
            <p>Show me your money</p>
          </div>
          <div className={'col-2-price'}>
            <p className={'price-selling'}>1000RMB</p>
            <p className={'price-original'}>100RMB</p>
          </div>
          <div className={'col-2-hr'}>
            <hr/>  {/*todo make this common comp?*/}
          </div>
          <div className={'col-2-comment'}>
            <p>The book is basically useless. But, if you still have to buy, why not buy from me at a higher price?</p>
          </div>
        </div>

        <div className={'col-3'}>
          <div className={'col-3-tags-container'}>
            <div className={'col-3-tags'}>
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
                    <img src={contactInfo.userAvatarImageId} alt=""/>
                  </div>
                  <div className={'owner-info'}>
                    <p className={'owner-info-name'}>{contactInfo.userName}</p>
                    <p className={'owner-info-netId'}>{contactInfo.userNetId}@nyu.edu</p>
                  </div>
                </div>
              </div>
          }
          <div className={'col-3-buttons-container'}>
            <div className={'col-3-buttons'}>
              <div className={'btn-tap'} onClick={handleTap}>
                <img src="./touch_app_black_48dp.svg" alt=""/>
                <p>Tap</p>
              </div>
              <div className={'btn-mark'}>
                <img src="bookmark_border_black_48dp.svg" alt=""/>
                <p>Mark</p>
              </div>
            </div>

          </div>
        </div>


      </div>

      {hover && <AdDisplayCardHoverMore {...hoverPos}/>}

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











