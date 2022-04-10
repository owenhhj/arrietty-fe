import './FavoriteColumn.css';
import RoutePageTitleCard from "../common/RoutePageTitleCard";
import FavoriteCard from "./FavoriteCard";  // todo FavCard or just use adDisplay?
import AdDisplayCard from "../adDisplay/AdDisplayCard";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";

function FavoriteColumn() {
  const ROOT = 'https://localhost:8000/';
  const pageTitle = 'Notifications';
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    dataFetch(
      `${ROOT}myFavorite`,
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

    </div>
  );
}

export default FavoriteColumn;








