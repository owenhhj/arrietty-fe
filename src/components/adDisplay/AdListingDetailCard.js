import "./AdListingDetailCard.css";
import Modal from "react-modal";
import ImageSlider from 'ac-react-simple-image-slider';
import {useState, useRef, useEffect} from "react";
import {getModalStyles} from "../common/common";

export default function AdListingDetailCard({
                                              isOpen,
                                              adData,
                                              callback
                                            }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const IMAGE = process.env.REACT_APP_API_IMAGE;
  const ref = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);

  const sliderWrapperStyles = {};

  const sliderImageStyles = {
    animationDuration: '0.5s',
    objectFit: 'contain',
    objectPosition: 'center'
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  const handleClickLeftArrow = () => {
    setImageIndex(
      (adData.imageIds.split(',').length + imageIndex - 1) % adData.imageIds.split(',').length
    );
  };

  const handleClickRightArrow = () => {
    setImageIndex((imageIndex + 1) % adData.imageIds.split(',').length);
  };

  const getImageData = () => {
    let ret = [];
    let imageIds = adData.imageIds.split(",");
    for (let i = 0; i < imageIds.length; i++) {
      ret.push(
        {
          // src: `./image?id=${imageIds[i]}`,
          src: `${ROOT}${IMAGE}?id=${imageIds[i]}`,
          title: `image#${imageIds[i]}`
        }
      );
    }
    return ret;
  };

  return (
    <>
      <Modal isOpen={isOpen} style={getModalStyles()}>
        <div className={'ad-listing-detail-card card'} ref={ref}>

          <div className={'grid-images'}>
            {adData.imageIds && (
              <ImageSlider
                height={'90%'} width={'90%'}
                data={getImageData()}
                autoPlay={false} showDots={false} showArrows={true} infinite={true}
                elementWrapperStyles={sliderWrapperStyles} itemStyles={sliderImageStyles}
                leftArrowComponent={
                  <svg onClick={handleClickLeftArrow} width="30" height="30" viewBox="0 0 30 30" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.41 10.41L17 9L11 15L17 21L18.41 19.59L13.83 15L18.41 10.41Z" fill="white"/>
                  </svg>
                }
                rightArrowComponent={
                  <svg onClick={handleClickRightArrow} width="30" height="30" viewBox="0 0 30 30" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.59 10.41L13 9L19 15L13 21L11.59 19.59L16.17 15L11.59 10.41Z" fill="white"/>
                  </svg>
                }
              />
            )}
            {!adData.imageIds && <img src="./default_cover.jpg" alt=""/>}
          </div>

          <div className={'grid-details'}>
            <div className={'grid-details-content'}>
              <div className={'grid-details-content-row-1'}>
                {adData.imageIds && <p>{`${imageIndex + 1}/${adData.imageIds.split(",").length}`}</p>}
              </div>
              <hr/>
              <div className={'grid-details-content-row-2'}>
                <p>{adData.adTitle}</p>
              </div>
              <div className={'grid-details-content-row-3'}>
                <p>{adData.price} RMB</p>
              </div>
              <div className={'grid-details-content-row-4'}>
                <p>{adData.comment}</p>
              </div>
            </div>
          </div>

          <img className={'icon-close clickable-icon'} src="./close_black_48dp.svg" alt="" onClick={callback}/>

        </div>
      </Modal>
    </>
  );
}



