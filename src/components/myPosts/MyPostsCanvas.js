import './MyPostsCanvas.css';
import MyPostsCard from "./MyPostsCard";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useEffect, useState} from "react";
import Modal from "react-modal";

// todo refactor into common.js
const customStyles = {
  content: {
    position: "absolute",
    left:0,
    top:"1rem",
    width:"100vw",
    height:"calc(100vh-2rem)",
    "overflow-y": "scroll",
    background: "transparent",
    display: "flex",
    "justify-content":"center",
    border:"none",
  },
};

function MyPostsCanvas() {
  const ROOT = 'https://localhost:8000/';
  const [myAds, setMyAds] = useState([]);
  const [showEditAdForm, setShowEditAdForm] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if(showEditAdForm){
      document.getElementById("app-root").style.filter = 'blur(2px)';
    } else{
      document.getElementById("app-root").style.filter = 'blur(0px) grayscale(0%)';
    }
  }, [showEditAdForm]);

  const dispatch = showGeneralNoti();

  const handleCallbackEdit = (id) => {
    console.log('callbackEdit id:', id)

  }

  const handleCallbackDelete = (id) => {
    let temp = new FormData();
    temp.set('id', id);
    for (let pair of temp.entries()) {
      console.log('inside temp form:', pair[0], pair[1])
    }
    dataFetch(
      `${ROOT}advertisement?action=delete`,
      {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: temp
      },
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
    dataFetch(
      `${ROOT}myAdvertisement`,
      {method: 'GET'},
      (res) => {
        setMyAds(res)
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  return (
    <div className={'MyPostsCanvas card'}>

      {myAds.map(ad => {
        return (
          <MyPostsCard key={ad.id} adData={ad} callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>
        );
      })}

      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}

      <Modal isOpen={showEditAdForm} style={customStyles}>
        {/*<AdUploadForm callback={setShowEditAdForm()}/>*/}
      </Modal>

    </div>
  );
}

export default MyPostsCanvas;






