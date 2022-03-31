import {useEffect, useState} from "react";
import SearchBar from "./searchBar/SearchBar";
import AdDisplayCard from "./adDisplay/AdDisplayCard";
import {dataFetch} from "./common/common";

const ads = [
  {id: 0, username: 'user1', userNetId: 'aa1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling This!!!', textbookTitle: 'Calculus', isbn: '123-4564033823', author: 'Owen', publisher: 'Owens Pub', edition: '3', originalPrice: '998', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:50, comment:'nothing to tell really', createdTime: null},
  {id: 1, username: 'user2', userNetId: 'bb1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Buying This!!!', textbookTitle: 'sdrfg', isbn: '123-4564033823', author: 'Robert', publisher: 'Owens Pub', edition: '3', originalPrice: '3456', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_ad_preview_image.jpg', price:234, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null}
]

// todo fetch content with searchBar and pass down to AdListing
function AdDisplayColumn() {
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    // todo fetch
    setAdData(ads);
  }, []);



  return (
    <div>
      <div style={{width: "fit-content"}}>
        <button onClick={()=>{setAdData(adData.length!==0?[]:ads);}}>toggle Ads</button>
      </div>

      <SearchBar/>

      {adData.map((ad, index) => {
        return (<AdDisplayCard key={index} adData={ad} contactInfo={ad}/>);
      })}



    </div>
  );
}

export default AdDisplayColumn;




