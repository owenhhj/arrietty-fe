import {useState} from "react";
import "./AdListing.css";

function AdListing(
    {
        adType,
        adData,
        contactInfo
    }
){
    const [contactInfoData, setContactInfoData] = useState(contactInfo);

    // let imageIds = adData.imageIds.split(",");
    let imageIds = [];


    const getPreviewImage = ()=>{
        if (imageIds.length===0){
            return "./default_ad_preview_image.jpg";
        }
        else{
            return "./image?id="+imageIds[0];
        }
    }

    return (
        <div className={"ad-listing-container card"}>
            <div className={"preview-image-container"}>
                <img className={"preview-image"} src={getPreviewImage()} alt={"preview"}/>
                {/*{imageIds.length>0 &&*/}
                    <p className={"image-number"}>1</p>
                {/*}*/}
            </div>
            <div className={"mid-col"}>
                <div className={"ad-headline"}>
                    <p className={"ad-title"}>Calculus</p>
                    <p className={"ad-price"}>100 RMB</p>
                </div>
                <div className={"ad-info"}>
                    <p className={"ad-info-row"}>ISBN: 1238111-111</p>
                    <p className={"ad-info-row"}>Author: test</p>
                    <p className={"ad-info-row"}>Publisher: test</p>
                    <p className={"ad-info-row"}>Edition: test</p>
                    <p className={"ad-info-row"}>Original price: test</p>
                    <p className={"ad-info-row"}>Related course: test</p>
                </div>
            </div>
            <div className={"right-col"}>
                <div className={"right-col-row1"}>
                    <span className={"ad-tag"}>textbook</span>
                    <span className={"ad-upload-time"}>1 hour ago</span>
                </div>
                <div className={"right-col-row2"}>
                    <div className={"contact-info-locked"}>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 7H16.25V5C16.25 2.24 13.45 0 10 0C6.55 0 3.75 2.24 3.75 5V7H2.5C1.125 7 0 7.9 0 9V19C0 20.1 1.125 21 2.5 21H17.5C18.875 21 20 20.1 20 19V9C20 7.9 18.875 7 17.5 7ZM6.25 5C6.25 3.34 7.925 2 10 2C12.075 2 13.75 3.34 13.75 5V7H6.25V5ZM17.5 19H2.5V9H17.5V19ZM10 16C11.375 16 12.5 15.1 12.5 14C12.5 12.9 11.375 12 10 12C8.625 12 7.5 12.9 7.5 14C7.5 15.1 8.625 16 10 16Z" fill="#595959"/>
                        </svg>
                        <span>Tap to unlock user info</span>
                    </div>
                </div>
                <div className={"right-col-row3"}>
                    <p>“The book is in very good condition.
                        Write me an email if your interested.”</p>
                </div>
            </div>
        </div>
    );

}

export default AdListing;