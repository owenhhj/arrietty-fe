import './AdDisplayColumn.css';
import {useEffect, useState} from "react";
import SearchBar from "../searchBar/SearchBar";
import AdDisplayCard from "./AdDisplayCard";
import {dataFetch} from "../common/common";

function AdDisplayColumn() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const SEARCH = process.env.REACT_APP_API_SEARCH;
  const [adData, setAdData] = useState([]);  // adListing data
  const [isLoading, setIsLoading] = useState(0);  // index --> loadingMsg[]
  const [queryBody, setQueryBody] = useState({  // save previous query for loadMore
    'adType': 'textbook',
    'pageNum': 0
  });
  const loadingMsg = ['', 'Loading...', 'No more advertisements...'];

  useEffect(() => {
    // console.log('onMount search with:', queryBody);
    dataFetch(
      `${ROOT}${SEARCH}`,
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

  // user search --> reset queryBody & queryPageNum
  const handleSearchBar = (e) => {
    // setIsLoading(false);
    let temp = {...e, pageNum: 0};
    setQueryBody(temp);
    // console.log('user search with:', temp);
    dataFetch(
      `${ROOT}${SEARCH}`,
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
    // console.log('handleLoadMore with:', queryBody);
    dataFetch(
      `${ROOT}${SEARCH}`,
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
    <div className={'AdDisplayColumn'}>

      <SearchBar callback={handleSearchBar}/>

      {adData.map((ad, index) => {
        return (
          <AdDisplayCard key={ad.id} adData={ad}/>
        );
      })}

      {/* dummy below */}
      {/*<AdDisplayCard/>*/}
      {/*<AdDisplayCard/>*/}
      {/*<AdDisplayCard/>*/}

      <div style={{width: 'auto', height:'200px'}}>
        {/* not in use, placeholder only */}
        {/*{isLoading!==0 && <div><p>{loadingMsg[isLoading]}</p></div>}*/}
      </div>
    </div>
  );
}

export default AdDisplayColumn;




