import './RouteMyPosts.css';
import MyProfile from "./myProfile/MyProfile";
import MyPostsCanvas from "./myPosts/MyPostsCanvas";

export default function RouteMyPosts() {

  return (
    <div className={'myposts'}>

      <div className={'myposts-grid-container'}>
        <div className={'myposts-grid-profile'}>
          <MyProfile/>
        </div>
        <div className={'myposts-grid-canvas'}>
          <MyPostsCanvas/>
        </div>
      </div>

    </div>
  );
};



