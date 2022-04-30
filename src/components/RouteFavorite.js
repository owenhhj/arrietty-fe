import MyProfile from "./myProfile/MyProfile";
import FavoriteColumn from "./favorite/FavoriteColumn";

function RouteFavorite() {

  return (
    <div className={'myposts'}>

      <div className={'myposts-grid-container'}>
        <div className={'myposts-grid-profile'}>
          <MyProfile/>
        </div>
        <div className={'myposts-grid-canvas'}>
          <FavoriteColumn/>
        </div>
      </div>

    </div>
  );
}

export default RouteFavorite;






