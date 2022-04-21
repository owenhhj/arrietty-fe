import './FavoriteColumn.css';
import RoutePageTitleCard from "../common/RoutePageTitleCard";
import AdDisplayCard from "../adDisplay/AdDisplayCard";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";

function FavoriteColumn() {
  const ROOT = 'https://localhost:8000/';
  const pageTitle = 'Favorite';
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    dataFetch(
      `${ROOT}getFavorite`,
      {method: 'GET'},
      setFavs,
      (e) => {console.warn(e);}
    );
  }, []);

  return (
    <div className={'FavoriteColumn'}>
      <RoutePageTitleCard pageTitle={pageTitle}/>

      {favs.map((ad, index) => {
        return (
          <AdDisplayCard key={ad.id} adData={ad}/>
        );
      })}

      {/*dummy*/}
      {/*<AdDisplayCard/>*/}

    </div>
  );
}

export default FavoriteColumn;








