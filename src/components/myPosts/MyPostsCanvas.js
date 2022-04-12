import MyPostsCard from "./MyPostsCard";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";

function MyPostsCanvas() {
  const ROOT = 'https://localhost:8000/';

  const dispatch = showGeneralNoti();

  const handleCallbackEdit = (id) => {
    console.log('callbackEdit')
  }

  const handleCallbackDelete = (id) => {
    console.log('callbackDelete')
    dataFetch(
      `${ROOT}advertisement?action=delete`,
      {method: 'POST', body: {id: id}},
      (res) => {
        dispatch({action: "add", body: {msg: 'Ad deletion success', good: true}});
        refreshData();
      },
      (err) => {
        console.warn(err)
        dispatch({action: "add", body: {msg: 'Ad deletion failure', good: false}});
      }
    )
  }

  const refreshData = () => {
    console.log('refreshData called')
    // setData
  }

  return (
    <>
      <MyPostsCard callbackDelete={handleCallbackDelete}/>
    </>
  );
}

export default MyPostsCanvas;






