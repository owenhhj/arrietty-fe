import "./AdListingDetailCard.css";
import Modal from "react-modal";
import ImageSlider from 'ac-react-simple-image-slider';
import {useState, useRef, useEffect} from "react";

export default function AdListingDetailCard(
  {
    isOpen,
    adData,
    callback
  }
){
  const ref = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);
  const modalStyles = {
    content: {
      position: "absolute",
      left:"15vw",
      top:"10vh",
      width:"70vw",
      height:"80vh",
      border:"none",
      background: "transparent"
    },
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  const handleClickLeftArrow = ()=>{
    if(imageIndex===0){
      setImageIndex(adData.imageIds.split(",").length-1);
    }
    else{
      setImageIndex(imageIndex-1);
    }

  }

  const handleClickRightArrow = ()=>{
    setImageIndex((imageIndex+1)%adData.imageIds.split(",").length);
  }

  const getImageData = ()=>{
    let ret = [];
    let imageIds = adData.imageIds.split(",");
    for (let i=0; i<imageIds.length; i++){
      ret.push(
        {
          src: `./image?id=${imageIds[i]}`,
          title: `image#${imageIds[i]}`
        }
      );
    }
    return ret;
  }

  return (
    <Modal isOpen={isOpen} style={modalStyles}>
      <div className={"ad-listing-detail-container card"} ref={ref}>
        <div className={"image-slider-container"} >
          <ImageSlider
            height={"90%"}
            width={"90%"}
            data = {getImageData()}
            autoPlay={false}
            showDots={false}
            showArrows={true}
            infinite={true}
            elementWrapperStyles={{animationDuration: '0s'}}
            itemStyles={{animationDuration: '0s'}}
            leftArrowComponent={
              <svg onClick={handleClickLeftArrow} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.41 10.41L17 9L11 15L17 21L18.41 19.59L13.83 15L18.41 10.41Z" fill="white"/>
              </svg>
            }
            rightArrowComponent={
              <svg onClick={handleClickRightArrow} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.59 10.41L13 9L19 15L13 21L11.59 19.59L16.17 15L11.59 10.41Z" fill="white"/>
              </svg>
            }
          />
        </div>

        <div className={"ad-listing-detail-info"}>
          <div className={"row1"}>
            <p>{`${imageIndex+1}/${adData.imageIds.split(",").length}`}</p>
          </div>
          <div className={"row2"}>
            <p>{adData.adTitle}</p>
          </div>
          <div className={"row3"}>
            <p>{adData.price} RMB</p>
          </div>
          <div className={"row4"}>
            <p>{adData.comment}</p>
          </div>
        </div>

        <div className={'cancel-btn'} onClick={callback}>
          <img src="./close_black_48dp.svg" alt="" />
        </div>

      </div>
    </Modal>
  );

}