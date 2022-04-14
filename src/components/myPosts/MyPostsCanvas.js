import './MyPostsCanvas.css';
import MyPostsCard from "./MyPostsCard";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import MyPostsEdit from "./MyPostsEdit";

const fakeAd = {
  id: 111, adType: 'textbook', adTitle: 'Tttthis is a fake title for an ad but this is very long', price: '1233425',
  comment: 'This is a fake comment for and ad but this is very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long',
  createTime: "Apr 4, 2022, 12:00:00 AM", numberOfTaps: 99, imageIds: "./default_cover.jpg"
}

const fakeAd2 = {
  id: 222, adType: 'textbook', adTitle: 'this is a fake title', price: '123',
  comment: 'This is a fake comment for and ad bery long very long very long very long very long',
  createTime: "Apr 4, 2022, 12:00:00 AM", numberOfTaps: 64, imageIds: "./default_cover.jpg"
}

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
  const defaultEditState = {show: false, id: -1};
  const [showEditAdForm, setShowEditAdForm] = useState(false);
  const [idToEdit, setIdToEdit] = useState(-1);

  useEffect(() => {
    setMyAds([fakeAd, fakeAd2]);  // fixme remove this
    refreshData();
  }, []);

  useEffect(() => {
    if(showEditAdForm){
      document.getElementById("app-root").style.filter = 'blur(2px)';
    } else{
      document.getElementById("app-root").style.filter = 'blur(0px) grayscale(0%)';
    }
  }, [showEditAdForm]);

  const refreshData = () => {
    console.log('refreshData called')
    dataFetch(
      `${ROOT}myAdvertisement`,
      {method: 'GET'},
      (res) => {
        setMyAds(res);
      },
      (err) => {
        console.warn(err);
      }
    );
  };

  // todo refactor all uses of dispatch
  const showNoti = showGeneralNoti();

  const handleCallbackEdit = (id) => {
    setIdToEdit(id);
    setShowEditAdForm(true);
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
        showNoti({action: "add", body: {msg: 'Ad deletion success', good: true}});
        refreshData();
      },
      (err) => {
        console.warn(err)
        showNoti({action: "add", body: {msg: 'Ad deletion failure', good: false}});
      }
    )
  }

  const handleEditSubmit = (f) => {
    console.log('MyPostsEdit to submit with:')
    for (let pair of f.entries()) {
      console.log('   ', pair[0], pair[1]);
    }
    dataFetch(
      "https://localhost:8000/advertisement?action=update",
      {
        method: 'POST',
        body: f
      },
      (res)=>{
        console.log('parent form res:', res);
        showNoti({msg: 'Ad Edit Success', good: true});
        setShowEditAdForm(false);
      },
      (err)=>{
        console.log('parent form res:', err);
        showNoti({msg: 'Ad Edit Failure', good: false});
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

      {/*<MyPostsCard key={fakeAd2.id} adData={fakeAd2} callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}

      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
      {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}

      <Modal isOpen={showEditAdForm} style={customStyles}>
        {/*<AdUploadForm callback={setShowEditAdForm()}/>*/}
        <MyPostsEdit adDataOriginal={myAds.filter(ad=>ad.id===idToEdit)[0]} toClose={()=>setShowEditAdForm(false)} toSubmit={handleEditSubmit}/>
      </Modal>

    </div>
  );
}

export default MyPostsCanvas;






