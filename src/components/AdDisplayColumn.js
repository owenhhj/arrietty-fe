import {useEffect, useState} from "react";
import SearchBar from "./searchBar/SearchBar";
import AdDisplayCard from "./adDisplay/AdDisplayCard";
import {dataFetch} from "./common/common";

// const ads = [
//   {id: 0, username: 'user1', userNetId: 'aa1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling This!!!', textbookTitle: 'Calculus', isbn: '123-4564033823', author: 'Owen', publisher: 'Owens Pub', edition: '3', originalPrice: '998', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:50, comment:'nothing to tell really', createdTime: null},
//   {id: 1, username: 'user2', userNetId: 'bb1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Buying This!!!', textbookTitle: 'sdrfg', isbn: '123-4564033823', author: 'Robert', publisher: 'Owens Pub', edition: '3', originalPrice: '3456', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_ad_preview_image.jpg', price:234, comment:'nothing to tell really', createdTime: null},
// ]

function AdDisplayColumn() {
  const ROOT = 'https://localhost:8000/';
  const [adData, setAdData] = useState([]);  // adListing data
  const [isLoading, setIsLoading] = useState(0);  // index --> loadingMsg[]
  const [queryBody, setQueryBody] = useState({  // save previous query for loadMore
    'adType': 'textbook',
    'pageNum': 0
  });
  const loadingMsg = ['', 'Loading...', 'No more advertisements...'];

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
        let temp = queryBody;
        temp.pageNum++;
        setQueryBody(temp);
      },
      null
      );
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading) {
      handleLoadMore();
    }
  }, [isLoading]);

  const handleScroll = () => {
    if (document.body.offsetHeight-window.scrollY-window.innerHeight < 5) {
      setIsLoading(1);
    } else if (document.body.offsetHeight-window.scrollY-window.innerHeight > 100) {
      setIsLoading(0);
    }
  }

  const handleSearchBar = (e) => {  // user search --> reset queryBody & queryPageNum
    // setIsLoading(false);
    let temp = {...e, pageNum: 0};
    setQueryBody(temp);
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
        temp.pageNum++;
        setQueryBody(temp);
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
        if (r.length === 0) {  // show 'no more ads'
          setIsLoading(2);
          return;
        }
        let temp = adData;
        r.forEach(item => {
          temp.push(item);
        })
        setAdData(temp)
        temp = queryBody;  // save this query for loading more
        temp.pageNum++;
        setQueryBody(temp);
        setIsLoading(0);
      },
      (e) => {
        setIsLoading(0);
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

      <div style={{width: 'auto', height:'300px'}}>
        {isLoading!==0 && <div><p>{loadingMsg[isLoading]}</p></div>}
      </div>
    </div>
  );
}

export default AdDisplayColumn;




