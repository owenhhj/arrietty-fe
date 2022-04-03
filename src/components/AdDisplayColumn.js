import {useEffect, useState} from "react";
import SearchBar from "./searchBar/SearchBar";
import AdDisplayCard from "./adDisplay/AdDisplayCard";
import {dataFetch} from "./common/common";

const ads = [
  {id: 0, username: 'user1', userNetId: 'aa1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling This!!!', textbookTitle: 'Calculus', isbn: '123-4564033823', author: 'Owen', publisher: 'Owens Pub', edition: '3', originalPrice: '998', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:50, comment:'nothing to tell really', createdTime: null},
  {id: 1, username: 'user2', userNetId: 'bb1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Buying This!!!', textbookTitle: 'sdrfg', isbn: '123-4564033823', author: 'Robert', publisher: 'Owens Pub', edition: '3', originalPrice: '3456', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_ad_preview_image.jpg', price:234, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
  {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null},
]

function AdDisplayColumn() {
  const ROOT = 'https://localhost:8000/';
  let scrolling = false;
  let lastScrollPos = 0;
  const [adData, setAdData] = useState([]);
  // const [queryBody, setQueryBody] = useState({
  //   'adType': 'textbook',
  //   'keyword': 'textbook1',  // todo pending back-end accept null
  //   'pageNum': 0
  // });
  let queryBody = {
    'adType': 'textbook',
    'keyword': 'textbook1',  // todo pending back-end accept null
    'pageNum': 0
  };

  useEffect(() => {
    console.log('onMount search with:', queryBody);
    dataFetch(
      `${ROOT}search`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(queryBody)
      },
      (r) => {
        setAdData(r);
        // setQueryBody({...queryBody, pageNum: 1});
        queryBody.pageNum = 1;
      },
      null
      );

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (document.body.offsetHeight-window.scrollY-window.innerHeight < 5) {
      window.removeEventListener('scroll', handleScroll);
      // console.log(window.scrollY, document.body.offsetHeight, window.innerHeight);
      handleLoadMore();
      console.log('inside Scroll after loading', queryBody.pageNum);
      setTimeout(() => {
        window.addEventListener('scroll', handleScroll);
      }, 2000);
    }
  }

  const handleSearchBar = (e) => {  // user search --> reset queryBody & queryPageNum
    let temp = {...e, pageNum: 0};
    // setQueryBody(temp);
    queryBody = temp;
    console.log('user search with:', temp);
    dataFetch(
      `${ROOT}search`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(temp)
      },
      (r) => {
        setAdData(r);
        // setQueryBody({...queryBody, pageNum: queryBody.pageNum+1});
        queryBody = {...queryBody, pageNum: queryBody.pageNum+1};
      },
      (e) => {
        console.warn(e);
      }
    )
  }

  // scroll to bottom --> auto fetch
  const handleLoadMore = () => {
    console.log('handleLoadMore with:', queryBody);
    dataFetch(
      `${ROOT}search`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(queryBody)
      },
      (r) => {
        console.log(r.length)
        let temp = adData;
        r.forEach(item => {
          temp.push(item);
        })
        console.log('temp',temp.length);
        setAdData(temp)
        // setAdData([...adData, ...r]);
        // setQueryBody({...queryBody, pageNum: queryBody.pageNum+1});
        queryBody.pageNum+=1;
      },
      (e) => {
        console.warn(e);
      }
    )
  }

  return (
    <div>

      <SearchBar callback={handleSearchBar}/>

      {adData.map((ad, index) => {
        return (
          // <AdDisplayCard key={index} adData={ad}/>
          <AdDisplayCard key={ad.id} adData={ad}/>
        );
      })}

      <div>
        <button onClick={handleLoadMore}>LoadMore</button>
      </div>


      <div style={{width: 'auto', height:'300px'}}>

      </div>
    </div>
  );
}

export default AdDisplayColumn;




