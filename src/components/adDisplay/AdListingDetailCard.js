import "./AdListingDetailCard.css";
import Modal from "react-modal";
import ImageSlider from 'ac-react-simple-image-slider';
import {useState} from "react";


export default function AdListingDetailCard(
    {
        isOpen,
        adData
    }
){

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
            <div className={"ad-listing-detail-container card"}>
                <div className={"image-slider-container"} >
                    <ImageSlider
                        height={"90%"}
                        width={"90%"}
                        data = {getImageData}
                        autoPlay={false}
                        showDots={false}
                        showArrows={true}
                        infinite={true}
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
                        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_955_54)">
                                <path d="M19.9669 0H4.07533C3.74713 0 3.48071 0.245436 3.48071 0.548268V21.0824C3.48025 21.4938 3.72948 21.8708 4.1262 22.0588C4.52315 22.2466 5.0007 22.2139 5.36281 21.9738L12.0211 17.5729L18.6796 21.9736C19.042 22.2132 19.519 22.2458 19.9158 22.058C20.3123 21.8701 20.5617 21.4934 20.5617 21.0824V0.548268C20.5617 0.245436 20.2953 0 19.9669 0ZM19.3722 21.0822L12.3679 16.4525C12.1607 16.3157 11.882 16.3157 11.675 16.4525L4.67041 21.0824V1.09654H19.3722V21.0822Z" fill="#414141"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_955_54">
                                    <rect width="24.0547" height="22.1798" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <div className={"row2"}>
                        <p>A calculus book in very good condition, looking for a buyer ASAP!!</p>
                    </div>
                    <div className={"row3"}>
                        <p>100 RMB</p>
                    </div>
                    <div className={"row4"}>
                        <p>The book is in very good condition.  Write me an email if your interested. Also the price is negotiable. I just need to get rid of it in a week since I will be moving out very soon.</p>
                    </div>
                </div>
                <svg className={"cancel-btn"}  width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                    <path d="m374.5 280 180.25-180.25c7-7 7-17.5 0-24.5s-17.5-7-24.5 0l-180.25 180.25-180.25-180.25c-7-7-17.5-7-24.5 0s-7 17.5 0 24.5l180.25 180.25-180.25 180.25c-7 7-7 17.5 0 24.5 3.5 3.5 7 5.25 12.25 5.25s8.75-1.75 12.25-5.25l180.25-180.25 180.25 180.25c3.5 3.5 8.75 5.25 12.25 5.25s8.75-1.75 12.25-5.25c7-7 7-17.5 0-24.5z"/>
                </svg>

            </div>
        </Modal>
    );

}