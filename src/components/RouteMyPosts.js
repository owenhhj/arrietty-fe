import MyProfile from "./myProfile/MyProfile";
import MyPostsCanvas from "./myPosts/MyPostsCanvas";

export default function RouteMyPosts() {

  return (
    <div className={'RouteMyPosts page'}>
      <MyProfile/>
      <MyPostsCanvas/>
    </div>
  );
};



