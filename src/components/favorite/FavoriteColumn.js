import './FavoriteColumn.css';
import RoutePageTitleCard from "../common/RoutePageTitleCard";
import AdDisplayCard from "../adDisplay/AdDisplayCard";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";

function FavoriteColumn() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const FAVORITE = process.env.REACT_APP_API_FAVORITES;
  const pageTitle = 'Favorite';
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    dataFetch(
      `${ROOT}${FAVORITE}`,
      {method: 'GET'},
      setFavs,
      (e) => {console.warn(e);}
    );
  }, []);

  const removeUnmarked = (id) => {
    let temp = favs;
    temp = temp.filter(ad => ad.id !== id);
    setFavs(temp);
  };

  return (
    <div className={'FavoriteColumn'}>
      <RoutePageTitleCard pageTitle={pageTitle}/>

      {favs.map((ad, index) => {
        return (
          <AdDisplayCard key={ad.id} adData={ad} unmarkSelf={removeUnmarked}/>
        );
      })}

    </div>
  );
}

export default FavoriteColumn;








