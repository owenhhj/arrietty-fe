import './AdDisplayCard.css';
import AdDisplayCardHoverMore from "./AdDisplayCardHoverMore";
import {useState} from "react";

function AdDisplayCard({
  adData={},
  contactInfo={
    name: 'Yuechuan Zhang', netId: 'yz3919'
  }
                       }) {
  const [hover, setHover] = useState(false);
  const [hoverPos, setHoverPos] = useState({});

  // todo
  const handleHover = (e) => {
    setHoverPos({
      xPos: e.relatedTarget.pageX,
      yPos: e.relatedTarget.pageY
    })
    setHover(true);
    console.log(e);
  }

  const handleHoverLeave = () => {
    setHover(false);
  }

  return (
    <div>
      <div className={'AdDisplayCard'} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave}>

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
          <div className={'col-3-to-unlock-container'}>
            <div className={'col-3-to-unlock'}>
              <img src="./lock_black_48dp.svg" alt=""/>
              <p>Tap to unlock user info</p>
            </div>
          </div>
          <div className={'col-3-buttons-container'}>
            <div className={'col-3-buttons'}>
              <div className={'btn-tap'}>
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











