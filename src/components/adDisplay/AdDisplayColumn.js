import './AdDisplayColumn.css';
import {useEffect, useState} from "react";
import SearchBar from "../searchBar/SearchBar";
import AdDisplayCard from "./AdDisplayCard";
import {dataFetch} from "../common/common";

const loadingMsg = ['', 'Loading...', 'No more advertisements...'];  // not in use for now

export default function AdDisplayColumn({
                                          adTypeOnMount = 'textbook'
                                        }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const SEARCH = process.env.REACT_APP_API_SEARCH;
  const [adData, setAdData] = useState([]);  // adListing data
  const [isLoading, setIsLoading] = useState(0);  // index --> loadingMsg[]
  const [adType, setAdType] = useState(adTypeOnMount);
  const [queryBody, setQueryBody] = useState({  // save previous query for loadMore
    'adType': adTypeOnMount,
    'pageNum': 0
  });

  useEffect(() => {
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
    if (document.body.offsetHeight - window.scrollY - window.innerHeight < 5) {
      setIsLoading(1);
    } else if (document.body.offsetHeight - window.scrollY - window.innerHeight > 100) {
      setIsLoading(0);
    }
  };

  const handleSearchBar = (e) => {
    let temp = {...e, pageNum: 0};
    setQueryBody(temp);
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
    );
  };

  // scroll to bottom --> auto fetch
  const handleLoadMore = () => {
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
    );
  };

  return (
    <div className={'AdDisplayColumn'}>

      <SearchBar adType={adType} setAdType={setAdType} callback={handleSearchBar}/>

      {adData.map((ad, index) => {
        return (
          <AdDisplayCard key={ad.id} adData={ad}/>
        );
      })}

      <div style={{width: 'auto', height: '200px'}}>
        {/* not in use, placeholder only */}
        {/*{isLoading!==0 && <div><p>{loadingMsg[isLoading]}</p></div>}*/}
      </div>
    </div>
  );
}






