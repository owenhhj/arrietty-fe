import {useEffect, useState} from "react";
import SearchBar from "./searchBar/SearchBar";
import AdDisplayCard from "./adDisplay/AdDisplayCard";
import {dataFetch} from "./common/common";

const ads = [
  {id: 0, username: 'user1', userNetId: 'aa1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling This!!!', textbookTitle: 'Calculus', isbn: '123-4564033823', author: 'Owen', publisher: 'Owens Pub', edition: '3', originalPrice: '998', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:50, comment:'nothing to tell really', createdTime: null},
  {id: 1, username: 'user2', userNetId: 'bb1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Buying This!!!', textbookTitle: 'sdrfg', isbn: '123-4564033823', author: 'Robert', publisher: 'Owens Pub', edition: '3', originalPrice: '3456', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_ad_preview_image.jpg', price:234, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null}
]

function AdDisplayColumn() {
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    // todo fetch onMount
    setAdData(ads);
  }, []);

  // todo refactor into two steps
  const handleSearchBar = (e) => {
    console.log('ready to fetch in Column with search:', e);
    e.pageNum = 0;
    dataFetch(
      'https://localhost:8000/search',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(e)},
      (res) => {console.log('res', res)},
      (err) => {console.log('err', err)})
  }

  return (
    <div>
      <div style={{width: "fit-content"}}>
        <button onClick={()=>{setAdData(ads)}}>SetDefaultAds</button>
      </div>

      <SearchBar callback={handleSearchBar}/>

      {adData.map((ad, index) => {
        return (<AdDisplayCard key={index} adData={ad} contactInfo={ad}/>);
      })}

    </div>
  );
}

export default AdDisplayColumn;




